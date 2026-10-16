#!/usr/bin/env node
// Check mockups in a browser: render each one in the viewer, print its warnings, save a screenshot, and exit
// non-zero if any mockup has a warning.
//
//   node mockup-check.mjs [options] [mockup or folder ...]
//
// With no mockups named, every mockup in the project space is checked. Mockups and folders are paths relative to
// the current directory or to the project space.
//
//   --root <dir>     the project space (the folder holding design-system/); found from the first path named, or
//                    from the current directory, by walking up
//   --url <url>      the project space as already served (http://localhost:8000/); otherwise this script serves it
//   --shots <dir>    write a screenshot of each mockup there (default: a folder in the system's temp directory)
//   --no-shots       don't take screenshots
//   --catalogue      also check the catalogue, which checks every component's Example
//   --size <w>x<h>   the browser window (default 1500x1000)
//   --timeout <s>    how long to wait for a page to render (default 20)
//   --browser <path> the Chromium executable, if Playwright can't find its own
//
// Needs Node 18+ and Playwright (`npm i -D playwright` in the project, or installed globally). The viewer must be
// runtime 0.10.0 or later, which tells the script when a page is done (<html data-mockup="ready">); with an older
// runtime the script waits for the network to go quiet instead and says so.
//
// The design system is given to the viewer as a _bundle.json built in memory from its files, so a page load reads
// it in one request rather than one per file. Nothing is written into the project space.
//
// Exit status: 0 no warnings, 1 warnings or a page that failed to render, 2 a problem running the check.

import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.md': 'text/markdown; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
};
const SKIP_DIRS = new Set(['node_modules']);

function fail(message) {
  console.error(message);
  process.exit(2);
}

// ───────────────────────────── arguments

function parseArgs(argv) {
  const o = { paths: [], shots: undefined, noShots: false, catalogue: false, width: 1500, height: 1000, timeout: 20 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const val = () => { if (i + 1 >= argv.length) fail(`${a} needs a value`); return argv[++i]; };
    if (a === '--root') o.root = val();
    else if (a === '--url') o.url = val();
    else if (a === '--shots') o.shots = val();
    else if (a === '--no-shots') o.noShots = true;
    else if (a === '--catalogue') o.catalogue = true;
    else if (a === '--size') { const m = val().match(/^(\d+)x(\d+)$/); if (!m) fail('--size is <width>x<height>'); o.width = +m[1]; o.height = +m[2]; }
    else if (a === '--timeout') o.timeout = Number(val());
    else if (a === '--browser') o.browser = val();
    else if (a === '-h' || a === '--help') {
      const src = readFileSync(new URL(import.meta.url), 'utf8').split('\n');
      console.log(src.slice(1, src.findIndex((l) => l.startsWith('import'))).map((l) => l.replace(/^\/\/ ?/, '')).join('\n').trim());
      process.exit(0);
    } else if (a.startsWith('-')) fail(`Unknown option ${a} (see --help)`);
    else o.paths.push(a);
  }
  return o;
}

// ───────────────────────────── the project space and its mockups

function findRoot(from) {
  let dir = path.resolve(from);
  if (existsSync(dir) && statSync(dir).isFile()) dir = path.dirname(dir);
  for (;;) {
    if (existsSync(path.join(dir, 'design-system', '_runtime.js'))) return dir;
    const up = path.dirname(dir);
    if (up === dir) return null;
    dir = up;
  }
}

const isMockup = (file) => /^(?:\s|<\?xml[^>]*\?>|<!--[\s\S]*?-->)*<mockup[\s>/]/.test(readFileSync(file, 'utf8'));

// Every mockup under dir, as the catalogue finds them: outside design-system/, skipping folders whose names start
// with "." or "_" and node_modules, and only .xml files whose root element is <mockup>.
function listMockups(root, dir) {
  const found = [];
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) {
        if (/^[._]/.test(e.name) || SKIP_DIRS.has(e.name) || p === path.join(root, 'design-system')) continue;
        walk(p);
      } else if (e.name.endsWith('.xml') && isMockup(p)) found.push(p);
    }
  };
  walk(dir);
  return found;
}

function resolveTargets(root, paths) {
  if (!paths.length) return listMockups(root, root);
  const out = [];
  for (const p of paths) {
    const abs = [path.resolve(p), path.resolve(root, p)].find((c) => existsSync(c));
    if (!abs) fail(`${p}: no such file or folder`);
    if (statSync(abs).isDirectory()) out.push(...listMockups(root, abs));
    else out.push(abs);
  }
  return [...new Set(out)];
}

// The design system's text files in one object, as the viewer reads _bundle.json: every .md except _guide.md, the
// components (with those in a folder of components/), the extensions and the icons, keyed by their path within
// design-system/.
function buildBundle(ds) {
  const files = {};
  const add = (rel, filter) => {
    const dir = path.join(ds, rel);
    if (!existsSync(dir)) return;
    for (const f of readdirSync(dir).sort()) {
      if (!filter(f) || !statSync(path.join(dir, f)).isFile()) continue;
      files[rel ? `${rel}/${f}` : f] = readFileSync(path.join(dir, f), 'utf8');
    }
  };
  add('', (f) => f.endsWith('.md') && f !== '_guide.md');
  add('components', (f) => f.endsWith('.md'));
  const groups = path.join(ds, 'components');
  if (existsSync(groups)) {
    for (const g of readdirSync(groups, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort()) {
      add(`components/${g}`, (f) => f.endsWith('.md'));
    }
  }
  add('extensions', (f) => f.endsWith('.md'));
  add('assets/icons', (f) => f.endsWith('.svg'));
  return JSON.stringify({ files });
}

// ───────────────────────────── a static server for the project space

function serve(root) {
  const server = createServer((req, res) => {
    let rel;
    try { rel = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { res.writeHead(400).end(); return; }
    const file = path.join(root, rel);
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    let st;
    try { st = statSync(file); } catch { res.writeHead(404).end(); return; }
    const head = { 'Cache-Control': 'no-cache' };
    if (st.isDirectory()) {
      if (!rel.endsWith('/')) { res.writeHead(301, { Location: rel + '/' }).end(); return; }
      const index = path.join(file, 'index.html');
      if (existsSync(index)) { res.writeHead(200, { ...head, 'Content-Type': MIME['.html'] }).end(req.method === 'HEAD' ? undefined : readFileSync(index)); return; }
      // A listing, so the catalogue can find the mockups.
      const links = readdirSync(file, { withFileTypes: true })
        .map((e) => { const n = encodeURIComponent(e.name) + (e.isDirectory() ? '/' : ''); return `<a href="${n}">${n}</a>`; }).join('\n');
      res.writeHead(200, { ...head, 'Content-Type': MIME['.html'] }).end(req.method === 'HEAD' ? undefined : `<!doctype html>\n${links}\n`);
      return;
    }
    res.writeHead(200, { ...head, 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Content-Length': st.size });
    res.end(req.method === 'HEAD' ? undefined : readFileSync(file));
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

// ───────────────────────────── Playwright

async function loadPlaywright() {
  try { return await import('playwright'); } catch { /* not beside this script */ }
  const places = [path.join(process.cwd(), 'noop.js')];
  try { places.push(path.join(execSync('npm root -g', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(), 'noop.js')); } catch { /* no npm */ }
  for (const from of places) {
    for (const name of ['playwright', 'playwright-core']) {
      try { return await import(pathToFileURL(createRequire(from).resolve(name)).href); } catch { /* try the next */ }
    }
  }
  fail('Playwright is not installed. Install it in the project (npm i -D playwright, then npx playwright install chromium) or globally (npm i -g playwright).');
}

// ───────────────────────────── the check

async function main() {
  const o = parseArgs(process.argv.slice(2));
  const root = path.resolve(o.root || findRoot(o.paths[0] || process.cwd()) || fail('No project space found: run this inside one, or name it with --root <dir> (the folder holding design-system/).'));
  const ds = path.join(root, 'design-system');
  if (!existsSync(path.join(ds, 'README.md')) || !existsSync(path.join(ds, '_runtime.js'))) fail(`${root} is not a project space: it needs design-system/README.md and design-system/_runtime.js`);

  const mockups = resolveTargets(root, o.paths).map((f) => path.relative(root, f).split(path.sep).join('/'));
  const pages = [...(o.catalogue ? [{ label: 'design-system/ (catalogue)', query: '' }] : []),
    ...mockups.map((m) => ({ label: m, query: `?m=${encodeURI(m)}` }))];
  if (!pages.length) fail(`No mockups found in ${root}`);

  const shots = o.noShots ? null : path.resolve(o.shots || path.join(tmpdir(), `mockup-check-${path.basename(root)}`));
  if (shots) mkdirSync(shots, { recursive: true });

  const server = o.url ? null : await serve(root);
  const base = o.url ? new URL(o.url.endsWith('/') ? o.url : o.url + '/') : new URL(`http://127.0.0.1:${server.address().port}/`);
  const dsUrl = new URL('design-system/', base);

  const pw = await loadPlaywright();
  const chromium = pw.chromium || pw.default?.chromium;
  let browser;
  try {
    browser = await chromium.launch(o.browser ? { executablePath: o.browser } : {});
  } catch (e) {
    fail(`Could not start Chromium: ${e.message.split('\n')[0]}\nInstall it (npx playwright install chromium) or name one with --browser <path>.`);
  }
  const page = await browser.newPage({ viewport: { width: o.width, height: o.height } });
  const bundle = buildBundle(ds);
  await page.route(new URL('_bundle.json', dsUrl).href, (r) => r.fulfill({ status: 200, contentType: 'application/json', body: bundle }));

  let logs = [];
  page.on('console', (m) => { if (m.text().includes('[mockup]')) logs.push(m.text().replace(/^\[mockup\] /, '')); });
  page.on('pageerror', (e) => logs.push(`Page error: ${e.message}`));

  let total = 0;
  let failed = 0;
  let oldRuntime = false;
  const started = Date.now();
  for (const p of pages) {
    logs = [];
    let warnings;
    let problem = '';
    try {
      await page.goto(new URL(p.query, dsUrl).href, { waitUntil: 'load', timeout: o.timeout * 1000 });
      const signal = await page.evaluate(() => !!window.mockup).catch(() => false);
      if (signal) {
        await page.waitForFunction(() => ['ready', 'error'].includes(document.documentElement.dataset.mockup), null, { timeout: o.timeout * 1000 });
        warnings = await page.evaluate(() => window.mockup.warnings);
      } else {
        oldRuntime = true;
        await page.waitForLoadState('networkidle', { timeout: o.timeout * 1000 });
        await page.waitForTimeout(300);
      }
    } catch (e) {
      problem = `Did not finish rendering: ${e.message.split('\n')[0]}`;
    }
    const lines = [...new Set([...(warnings || logs), ...logs.filter((l) => l.startsWith('Page error'))])];
    if (problem) { lines.push(problem); failed++; }
    total += lines.length;
    console.log(`${String(lines.length).padStart(3)} warning${lines.length === 1 ? ' ' : 's'}  ${p.label}`);
    for (const l of lines) console.log(`      ${l}`);
    if (shots) {
      const file = path.join(shots, (p.query ? p.label.replace(/\.xml$/, '') : '_catalogue') + '.png');
      mkdirSync(path.dirname(file), { recursive: true });
      await page.screenshot({ path: file, fullPage: true }).catch(() => {});
    }
  }
  await browser.close();
  server?.close();

  const secs = ((Date.now() - started) / 1000).toFixed(1);
  console.log(`\n${pages.length} page${pages.length === 1 ? '' : 's'}, ${total} warning${total === 1 ? '' : 's'}${failed ? `, ${failed} failed to render` : ''} (${secs}s)`);
  if (shots) console.log(`Screenshots in ${shots}`);
  if (oldRuntime) console.log('The viewer is older than runtime 0.10.0, so pages were judged done when the network went quiet; update the viewer (the mockup-init skill) for a reliable check.');
  process.exit(total ? 1 : 0);
}

main().catch((e) => fail(e.stack || String(e)));
