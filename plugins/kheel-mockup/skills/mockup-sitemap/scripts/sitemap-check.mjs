#!/usr/bin/env node
// Checks a sitemap's data: node sitemap-check.mjs <sitemap.html> [--root <project space>]
// Prints errors and notes, and exits non-zero on any error. Needs nothing but Node.
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const args = process.argv.slice(2);
const file = args.find(a => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--root');
const rootAt = args.indexOf('--root');
if (!file) {
  console.error('usage: node sitemap-check.mjs <sitemap.html> [--root <project space>]');
  process.exit(2);
}
const root = rootAt >= 0 ? resolve(args[rootAt + 1]) : dirname(resolve(file));

const html = readFileSync(file, 'utf8');
const m = html.match(/<script type="application\/json" id="sitemap">([\s\S]*?)<\/script>/);
if (!m) {
  console.error(`✗ ${file}: no <script type="application/json" id="sitemap"> block`);
  process.exit(1);
}
let data;
try {
  data = JSON.parse(m[1]);
} catch (e) {
  console.error(`✗ ${file}: the sitemap block is not valid JSON: ${e.message}`);
  process.exit(1);
}

const errors = [], notes = [];
const RESERVED = new Set(['settings', 'sidebar', 'customize', 'upgrade', 'downloads']);
const TONES = new Set(['done', 'planned', 'future', 'retired']);
const statuses = new Map((data.statuses || []).map(s => [s.id, s]));
const roles = data.roles || null;

if (!statuses.size) errors.push('no statuses');
for (const s of statuses.values()) {
  if (!s.label) errors.push(`status "${s.id}" has no label`);
  if (!TONES.has(s.tone)) errors.push(`status "${s.id}" has tone "${s.tone}"; use done, planned, future or retired`);
}
if (!Array.isArray(data.zones) || !data.zones.length) errors.push('no zones');
if (data.questions) notes.push('the data carries "questions": report open questions to the user instead, and remove the field');

const pages = new Map();
function walk(p, where, parent) {
  const at = `${where} › ${p.name || p.id}`;
  if (!p.id) { errors.push(`${at}: no id`); return; }
  if (!/^[A-Za-z0-9-]+$/.test(p.id)) errors.push(`${at}: id "${p.id}" must be letters, digits and hyphens`);
  if (RESERVED.has(p.id) || p.id.startsWith('comment-')) errors.push(`${at}: id "${p.id}" is reserved by some hosts; choose another`);
  if (pages.has(p.id)) errors.push(`${at}: id "${p.id}" is used twice`);
  pages.set(p.id, { page: p, at, parent });
  if (!p.name) errors.push(`${at}: no name`);
  if (!statuses.has(p.status)) errors.push(`${at}: status "${p.status}" is not one of the statuses`);
  if (p.who && roles && !(p.who in roles)) errors.push(`${at}: who "${p.who}" is not one of the roles`);
  if (!p.desc) notes.push(`${at}: no description`);
  if (p.route) notes.push(`${at}: has a route; the sitemap shows the flow, not addresses, so remove it`);
  for (const mk of [].concat(p.mockup || [])) {
    if (!existsSync(join(root, mk))) errors.push(`${at}: mockup "${mk}" not found under ${root}`);
  }
  (p.kids || []).forEach(k => walk(k, at, p.id));
}
(data.zones || []).forEach(z => {
  if (!z.name) errors.push(`zone "${z.id}": no name`);
  if (z.route) notes.push(`zone "${z.name || z.id}": has a route; the sitemap shows the flow, not addresses, so remove it`);
  if (!Array.isArray(z.groups) || !z.groups.length) { errors.push(`zone "${z.name || z.id}": no groups`); return; }
  z.groups.forEach(g => (g.pages || []).forEach(p => walk(p, z.name + (g.name ? ' › ' + g.name : ''), null)));
});

const connected = new Map([...pages.keys()].map(id => [id, new Set()]));
for (const [id, { page, parent }] of pages) {
  for (const l of page.links || []) {
    if (!pages.has(l)) { errors.push(`${pages.get(id).at}: links to "${l}", which is not a page`); continue; }
    if (l === id) continue;
    connected.get(id).add(l);
    connected.get(l).add(id);
  }
  if (parent) { connected.get(id).add(parent); connected.get(parent).add(id); }
}
for (const [id, set] of connected) {
  const { parent, page } = pages.get(id);
  const others = [...set].filter(x => x !== parent && !(page.kids || []).some(k => k.id === x));
  if (!others.length) notes.push(`${pages.get(id).at}: connected to nothing but its own parent and kids`);
}

const counts = [...statuses.values()].map(s => `${[...pages.values()].filter(p => p.page.status === s.id).length} ${s.label.toLowerCase()}`);
console.log(`${file}: ${pages.size} pages (${counts.join(', ')}) in ${(data.zones || []).length} zones`);
notes.forEach(n => console.log(`· ${n}`));
errors.forEach(e => console.log(`✗ ${e}`));
console.log(errors.length ? `${errors.length} error(s)` : 'no errors');
process.exit(errors.length ? 1 : 0);
