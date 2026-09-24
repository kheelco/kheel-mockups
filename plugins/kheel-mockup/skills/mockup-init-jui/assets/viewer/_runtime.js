// Mockup runtime — renders XML mockups from a markdown design system, in the browser, without a build.
// Part of the mechanism, not the project: replaced as a unit when the mechanism is updated. Do not edit.
export const VERSION = '0.5.1';

// This file lives in the design system folder; the project space is the folder above it.
const DS_URL = new URL('./', import.meta.url);
const PROJECT = new URL('../', import.meta.url);
const BAR_HEIGHT = 40;

const UNIVERSAL = new Set(['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'width', 'grow', 'span', 'state', 'spec',
  'href', 'opens', 'closes', 'id', 'slot', 'class', 'role', 'title', 'style', 'tabindex', 'custom']);
const LAYOUT = new Set(['layout', 'gap', 'align', 'justify', 'wrap', 'cols']);
const VALUE_TYPES = ['text', 'number', 'boolean', 'icon', 'path'];

const state = {
  ds: null,
  warnings: [],
  dsWarnings: [],         // raised while loading the design system; shown on every page
  rootSpecs: [],          // [{ label, texts }]
  current: null,          // { path, url, state, type, title, states }
  dialogs: [],            // stack of overlay elements
  inspect: false,
  panelOpen: false,
};
const specOf = new WeakMap(); // element → [specification texts]
const authorStyled = new WeakSet(); // elements whose source carried a style attribute

// ───────────────────────────── helpers

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = (s) => (s || '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[`*]/g, '').trim();
const list = (s) => plain(s).split(',').map((x) => x.trim()).filter(Boolean);

function warn(message, el) {
  const where = el ? describe(el) : '';
  if (state.warnings.some((w) => w.message === message && w.where === where)) return;
  state.warnings.push({ message, where });
  console.warn('[mockup] ' + message + (where ? ' — ' + where : ''));
  scheduleChrome();
}

function describe(el) {
  if (!el || !el.attributes) return '';
  const attrs = [...el.attributes].filter((a) => !a.name.startsWith('data-km')).slice(0, 3)
    .map((a) => `${a.name}="${a.value.length > 28 ? a.value.slice(0, 28) + '…' : a.value}"`).join(' ');
  return `<${el.localName}${attrs ? ' ' + attrs : ''}>`;
}

async function fetchText(url) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText || ''} — ${url}`.trim());
  return res.text();
}

function relToProject(url) {
  const p = decodeURIComponent(new URL(url).pathname);
  const root = decodeURIComponent(PROJECT.pathname);
  return p.startsWith(root) ? p.slice(root.length) : p;
}

// ───────────────────────────── markdown

function frontMatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?/);
  const data = {};
  if (!m) return { data, body: text };
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { data, body: text.slice(m[0].length) };
}

function sections(body) {
  const out = {};
  let name = '';
  let buf = [];
  let fence = false;
  for (const line of body.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) fence = !fence;
    const h = !fence && line.match(/^##\s+(.+?)\s*#*\s*$/);
    if (h) { out[name] = buf.join('\n'); name = h[1].toLowerCase(); buf = []; } else buf.push(line);
  }
  out[name] = buf.join('\n');
  return out;
}

function fences(text, lang) {
  const out = [];
  const re = /^[ \t]*```([\w-]*)[^\n]*\n([\s\S]*?)^[ \t]*```[ \t]*$/gm;
  let m;
  while ((m = re.exec(text || ''))) if (!lang || m[1].toLowerCase() === lang) out.push(m[2]);
  return out;
}

function table(text) {
  const lines = (text || '').split(/\r?\n/).filter((l) => /^\s*\|/.test(l));
  if (lines.length < 2) return [];
  const split = (l) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map((c) => c.replace(/\\\|/g, '|').trim());
  const head = split(lines[0]).map((h) => h.toLowerCase());
  return lines.slice(2).map((l) => {
    const cells = split(l);
    const row = {};
    head.forEach((h, i) => { row[h] = cells[i] ?? ''; });
    return row;
  });
}

function dedent(t) {
  const lines = String(t).replace(/^\s*\n/, '').replace(/\s+$/, '').split('\n');
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^[ \t]*/)[0].length);
  const cut = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(cut)).join('\n');
}

function mdLite(t) {
  const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>');
  const bullet = /^\s*[-*]\s+/;
  return dedent(t).split(/\n\s*\n/).map((block) => {
    let html = '';
    let para = [];
    let items = [];
    const flush = () => {
      if (para.length) html += `<p>${inline(para.join(' '))}</p>`;
      if (items.length) html += '<ul>' + items.map((i) => `<li>${inline(i)}</li>`).join('') + '</ul>';
      para = [];
      items = [];
    };
    for (const line of block.split('\n')) {
      if (bullet.test(line)) { if (para.length) flush(); items.push(line.replace(bullet, '')); } else if (items.length && /^\s+\S/.test(line)) items[items.length - 1] += ' ' + line.trim();
      else { if (items.length) flush(); para.push(line.trim()); }
    }
    flush();
    return html;
  }).join('');
}

// ───────────────────────────── design system

async function loadDesignSystem() {
  const src = await fetchText(new URL('README.md', DS_URL));
  const { data, body } = frontMatter(src);
  const secs = sections(body);
  const ds = { meta: data, components: new Map(), order: [], icons: [], tokensCss: '' };

  ds.icons = [...(secs.icons || '').matchAll(/`([a-z0-9-]+)`/g)].map((m) => m[1]);

  const tokenLinks = [...(secs.tokens || '').matchAll(/\]\(([^)]+\.md)\)/g)].map((m) => m[1]);
  for (const link of tokenLinks.length ? tokenLinks : ['tokens.md']) {
    try { ds.tokensCss += fences(await fetchText(new URL(link, DS_URL)), 'css').join('\n') + '\n'; } catch (e) {
      warn(tokenLinks.length ? `Could not load tokens: ${e.message}` : 'The design system has no tokens yet (no tokens.md)');
    }
  }

  const rows = table(secs.components || '');
  ds.order = rows.map((r) => plain(r.component)).filter(Boolean);
  await Promise.all(rows.map(async (row) => {
    const tag = plain(row.component);
    const link = (row.component || '').match(/\]\(([^)]+)\)/);
    if (!tag) return;
    if (!link) { warn(`Manifest row for ${tag} has no link to its file`); return; }
    try {
      const def = parseComponent(await fetchText(new URL(link[1], DS_URL)), tag);
      def.file = link[1];
      if (row.version && plain(row.version) !== def.meta.version) warn(`Manifest lists ${tag} ${plain(row.version)} but its file is ${def.meta.version}`);
      if (row.kind && def.meta.kind && plain(row.kind) !== def.meta.kind) warn(`Manifest lists ${tag} as ${plain(row.kind)} but its file says ${def.meta.kind}`);
      ds.components.set(tag, def);
    } catch (e) { warn(`Could not load component ${tag}: ${e.message}`); }
  }));
  checkTokens(ds);
  return ds;
}

// Compare each component's Tokens table with its Style, and its semantic tokens with tokens.md.
function checkTokens(ds) {
  const defined = new Set([...ds.tokensCss.matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)].map((m) => m[1]));
  for (const def of ds.components.values()) {
    const declared = new Set([...def.style.matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)].map((m) => m[1]));
    const used = new Set([...def.style.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)/g)].map((m) => m[1]));
    const inStyle = new Set([...declared, ...used]);
    if (!def.tokens) { if (inStyle.size) warn(`${def.tag} has no Tokens section`); continue; }
    const listed = new Map(def.tokens.map((t) => [t.token, t.kind]));
    for (const t of inStyle) if (!listed.has(t)) warn(`${def.tag}: style uses ${t}, which is not in its Tokens table`);
    for (const [t, kind] of listed) {
      if (!inStyle.has(t)) warn(`${def.tag}: Tokens table lists ${t}, which its style does not use`);
      else if (kind === 'semantic' && defined.size && !defined.has(t)) warn(`${def.tag}: semantic token ${t} is not defined in tokens.md`);
      else if (kind === 'component' && !declared.has(t)) warn(`${def.tag}: component token ${t} is never set in its style`);
      else if (!['component', 'semantic', 'inherited'].includes(kind)) warn(`${def.tag}: ${t} has kind "${kind}"; expected component, semantic or inherited`);
    }
  }
}

function parseComponent(src, tag) {
  const { data, body } = frontMatter(src);
  const s = sections(body);
  const def = {
    tag,
    meta: data,
    title: (body.match(/^#\s+(.+)$/m) || [])[1] || tag,
    props: {},
    states: new Set(),
    slots: [],
    template: fences(s.template, 'html')[0] || '<slot></slot>',
    style: fences(s.style, 'css').join('\n'),
    example: fences(s.example, 'xml')[0] || '',
  };
  if (data.name && data.name !== tag) warn(`${tag}: front matter name is "${data.name}"`);
  for (const r of table(s.properties)) {
    const name = plain(r.property);
    if (!name) continue;
    const v = plain(r.values).toLowerCase();
    const typed = VALUE_TYPES.includes(v);
    def.props[name] = { controls: plain(r.controls), type: typed ? v : 'enum', values: typed ? null : list(r.values), default: plain(r.default) };
  }
  for (const r of table(s.states)) { const n = plain(r.state); if (n) def.states.add(n); }
  for (const r of table(s.slots)) {
    let n = plain(r.slot) || 'default';
    if (/^\(?default\)?$/i.test(n)) n = 'default';
    def.slots.push({ name: n, accepts: list(r.accepts).map((x) => x.toLowerCase()), suggests: list(r.suggests), layout: plain(r.layout) });
  }
  def.tokens = null; // [{ token, kind }] from the Tokens table, or null when the section is missing
  if (s.tokens !== undefined) {
    def.tokens = [];
    for (const r of table(s.tokens)) {
      const kind = plain(r.kind).toLowerCase();
      for (const m of (r.token || '').matchAll(/`(--[A-Za-z0-9_-]+)`/g)) def.tokens.push({ token: m[1], kind });
    }
  }
  def.slotNames = new Set([...def.template.matchAll(/<slot(?:\s+name="([^"]*)")?/g)].map((m) => m[1] || 'default'));
  def.layoutConfigurable = /\sdata-layout[\s>=]/.test(def.template);
  return def;
}

function routeSlot(def, child) {
  const explicit = child.getAttribute('slot');
  if (explicit) return explicit;
  const tag = child.localName;
  const dflt = def.slots.find((s) => s.name === 'default');
  if (dflt && dflt.accepts.includes(tag)) return 'default';
  const named = def.slots.filter((s) => s.name !== 'default' && s.accepts.includes(tag));
  return named.length === 1 ? named[0].name : 'default';
}

function slotAccepts(slot, node) {
  if (!slot.accepts.length || slot.accepts.includes('any')) return true;
  if (node.nodeType === 3) return !node.textContent.trim() || slot.accepts.includes('text');
  const tag = node.localName;
  if (slot.accepts.includes(tag)) return true;
  return slot.accepts.includes('text') && !tag.includes('-');
}

// ───────────────────────────── layout & spacing

const STEPS = new Set(['0', '1', '2', '3', '4', '5', '6', '8', '10', '12']);
const STEP = (v) => (v === 'auto' ? 'auto' : STEPS.has(v) ? `var(--space-${v})` : null);
const ALIGN = { start: 'start', center: 'center', end: 'end', stretch: 'stretch', baseline: 'baseline' };
const JUSTIFY = { start: 'flex-start', center: 'center', end: 'flex-end', between: 'space-between', around: 'space-around' };
const MARGINS = { m: ['margin'], mt: ['marginTop'], mr: ['marginRight'], mb: ['marginBottom'], ml: ['marginLeft'], mx: ['marginLeft', 'marginRight'], my: ['marginTop', 'marginBottom'] };

function applyBox(el) {
  const st = el.style;
  for (const [a, props] of Object.entries(MARGINS)) {
    const v = el.getAttribute(a);
    if (v == null) continue;
    const val = STEP(v);
    if (!val) { warn(`${a}="${v}" is not a spacing step (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, auto)`, el); continue; }
    props.forEach((p) => { st[p] = val; });
  }
  const w = el.getAttribute('width');
  if (w === 'full') { st.width = '100%'; st.alignSelf = 'stretch'; } else if (w === 'fit') st.width = 'fit-content';
  if (el.hasAttribute('grow') && el.getAttribute('grow') !== 'false') { st.flex = '1 1 0'; st.minWidth = '0'; }
  const sp = el.getAttribute('span');
  if (sp) st.gridColumn = sp === 'full' ? '1 / -1' : `span ${sp}`;
}

function applyLayout(src, target) {
  const g = (n) => src.getAttribute(n);
  const st = target.style;
  const l = g('layout');
  const cols = g('cols');
  if (l === 'row' || l === 'column') { st.display = 'flex'; st.flexDirection = l; } else if (l === 'grid' || (cols && !l)) {
    st.display = 'grid';
    const c = cols || 'auto';
    st.gridTemplateColumns = c === 'auto' ? 'repeat(auto-fill, minmax(min(var(--grid-min, 16rem), 100%), 1fr))' : `repeat(${c}, minmax(0, 1fr))`;
  } else if (l) warn(`layout="${l}" is not row, column or grid`, src);
  if (g('gap') != null) { const v = STEP(g('gap')); if (v) st.gap = v; else warn(`gap="${g('gap')}" is not a spacing step (0, 1, 2, 3, 4, 5, 6, 8, 10, 12)`, src); }
  if (g('align')) {
    st.alignItems = ALIGN[g('align')] || g('align');
    // `align` is also a legacy HTML attribute that centres text; the layout attribute must not.
    if (!src.style.textAlign) st.textAlign = 'start';
    if (src !== target && !src.style.textAlign) src.style.textAlign = 'start';
  }
  if (g('justify')) st.justifyContent = JUSTIFY[g('justify')] || g('justify');
  if (src.hasAttribute('wrap') && g('wrap') !== 'false') st.flexWrap = 'wrap';
}

// ───────────────────────────── components

const SHADOW_BASE = ':host{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}[hidden]{display:none!important}';

function testIf(expr, host) {
  const neg = expr.startsWith('!');
  const [name, val] = (neg ? expr.slice(1) : expr).split('=');
  const v = host.getAttribute(name.trim());
  const res = val !== undefined ? v === val.trim() : v != null && v !== 'false';
  return neg ? !res : res;
}

function defineComponent(def) {
  if (customElements.get(def.tag)) return;
  const observed = [...Object.keys(def.props), 'state'];
  customElements.define(def.tag, class extends HTMLElement {
    static get observedAttributes() { return observed; }

    connectedCallback() {
      if (this._kmReady) return;
      for (const [n, p] of Object.entries(def.props)) {
        if (p.default && p.type !== 'boolean' && !this.hasAttribute(n)) this.setAttribute(n, p.default);
      }
      for (const c of this.children) if (!c.hasAttribute('slot')) { const s = routeSlot(def, c); if (s !== 'default') c.setAttribute('slot', s); }
      applyBox(this);
      this._kmReady = true;
      this.render();
    }

    attributeChangedCallback() { if (this._kmReady) this.render(); }

    render() {
      const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
      const html = def.template.replace(/\{\{\s*([a-z][a-z0-9-]*)\s*\}\}/g, (_, n) => esc(this.getAttribute(n) ?? def.props[n]?.default ?? ''));
      root.innerHTML = `<style>${SHADOW_BASE}\n${def.style}</style>${html}`;
      for (const el of root.querySelectorAll('[data-if]')) {
        if (testIf(el.getAttribute('data-if'), this)) el.removeAttribute('data-if'); else el.remove();
      }
      const target = root.querySelector('[data-layout]');
      if (target) applyLayout(this, target);
      this.markFilled();
    }

    // data-filled lists the slots that hold content, so styles can hide empty regions: :host([data-filled~="footer"])
    markFilled() {
      const filled = new Set();
      for (const c of this.childNodes) {
        if (c.nodeType === 1) filled.add(c.getAttribute('slot') || 'default');
        else if (c.nodeType === 3 && c.textContent.trim()) filled.add('default');
      }
      const v = [...filled].join(' ');
      if (v) this.setAttribute('data-filled', v); else this.removeAttribute('data-filled');
    }
  });
}

const assetCache = new Map();
customElements.define('mockup-asset', class extends HTMLElement {
  static get observedAttributes() { return ['src']; }
  connectedCallback() { this.load(); }
  attributeChangedCallback() { if (this.isConnected) this.load(); }
  async load() {
    const src = this.getAttribute('src') || '';
    if (!src || /\/\.svg$|\{\{/.test(src)) { this.innerHTML = ''; return; }
    const url = new URL('assets/' + src, DS_URL).href;
    if (!assetCache.has(url)) assetCache.set(url, fetch(url).then((r) => (r.ok ? r.text() : Promise.reject(new Error(r.status)))));
    try {
      this.innerHTML = (await assetCache.get(url)).replace(/<!--[\s\S]*?-->/g, '').replace(/<\?xml[^>]*>/, '');
    } catch { this.innerHTML = ''; warn(`Missing asset ${src}`); }
  }
});

// ───────────────────────────── mockup XML

async function parseMockup(url) {
  let src;
  try { src = await fetchText(url); } catch (e) { return { error: `Could not load ${relToProject(url)}: ${e.message}` }; }
  const doc = new DOMParser().parseFromString(src, 'application/xml');
  const err = doc.querySelector('parsererror');
  if (err) {
    const detail = err.textContent.match(/error on line \d+ at column \d+:[^\n]*/)?.[0] || err.textContent.trim();
    return { error: `${relToProject(url)} is not well-formed XML:\n${detail}` };
  }
  return { doc };
}

async function resolveIncludes(doc, url, seen) {
  for (const inc of [...doc.getElementsByTagName('include')]) {
    const src = inc.getAttribute('src');
    const target = new URL(src || '', url);
    if (!src) { warn('<include> without src'); inc.remove(); continue; }
    if (seen.has(target.href)) { warn(`Include cycle through ${relToProject(target)}`); inc.remove(); continue; }
    const { doc: sub, error } = await parseMockup(target);
    if (error) { warn(error); inc.remove(); continue; }
    if (sub.documentElement.getAttribute('type') !== 'section') warn(`Included ${relToProject(target)} is not a section`);
    await resolveIncludes(sub, target, new Set([...seen, target.href]));
    // links inside the included section stay relative to the section's own file
    for (const el of sub.documentElement.getElementsByTagName('*')) {
      for (const a of ['href', 'opens']) {
        const v = el.getAttribute(a);
        if (v && !v.startsWith('#') && !/^[a-z][a-z0-9+.-]*:/i.test(v) && !v.startsWith('/')) el.setAttribute(a, new URL(v, target).pathname);
      }
    }
    for (const child of [...sub.documentElement.childNodes]) inc.parentNode.insertBefore(doc.importNode(child, true), inc);
    inc.remove();
  }
}

function extractSpecs(root) {
  const rootSpecs = [];
  let css = '';
  for (const st of [...root.getElementsByTagName('style')]) {
    if (st.parentNode !== root) warn('<style> belongs directly under <mockup>; it applies to the whole mockup wherever it is placed');
    css += st.textContent + '\n';
    st.remove();
  }
  const pending = new Map(); // xml element → [text]
  for (const s of [...root.getElementsByTagName('specification')]) {
    const parent = s.parentNode;
    const text = s.textContent;
    if (parent === root) rootSpecs.push(text);
    else { if (!pending.has(parent)) pending.set(parent, []); pending.get(parent).push(text); }
    s.remove();
  }
  return { rootSpecs, pending, css };
}

function convert(node, pending) {
  if (node.nodeType === 3 || node.nodeType === 4) return document.createTextNode(node.nodeValue);
  if (node.nodeType !== 1) return null;
  const el = document.createElement(node.localName);
  for (const a of node.attributes) if (!a.name.startsWith('xmlns')) el.setAttribute(a.name, a.value);
  if (node.hasAttribute('style')) authorStyled.add(el);
  if (pending.has(node)) specOf.set(el, pending.get(node));
  for (const c of node.childNodes) { const n = convert(c, pending); if (n) el.appendChild(n); }
  if (!state.ds.components.has(el.localName)) {
    applyBox(el);
    if ([...LAYOUT].some((a) => el.hasAttribute(a))) applyLayout(el, el);
  }
  return el;
}

function buildContent(root) {
  const { rootSpecs, pending, css } = extractSpecs(root);
  const frag = document.createDocumentFragment();
  if (css.trim()) { const st = document.createElement('style'); st.dataset.kmMockupCss = ''; st.textContent = css; frag.appendChild(st); }
  for (const c of root.childNodes) { const n = convert(c, pending); if (n) frag.appendChild(n); }
  return { frag, rootSpecs };
}

// ───────────────────────────── checks

function validate(scope, base) {
  const ds = state.ds;
  const prefix = (ds.meta.prefix || 'ui') + '-';
  const targets = [];
  for (const el of scope.querySelectorAll('*')) {
    const tag = el.localName;
    for (const a of ['href', 'opens']) {
      const v = el.getAttribute(a);
      if (v && !v.startsWith('#') && !/^[a-z]+:/i.test(v)) targets.push({ v, el, a });
    }
    const def = ds.components.get(tag);
    if (!def) {
      if (tag.startsWith(prefix) || (tag.includes('-') && tag !== 'mockup-asset')) warn(`Unknown component <${tag}>`, el);
      else if (authorStyled.has(el) && !el.closest('[custom]')) warn('Inline style outside a custom region — is a component, property or token missing?', el);
      if (el.hasAttribute('custom') && !el.getAttribute('custom').trim()) warn('custom region without a reason — say what it is and why the design system does not cover it', el);
      continue;
    }
    for (const a of el.attributes) {
      const n = a.name;
      if (def.props[n]) { checkValue(def, def.props[n], n, a.value, el); continue; }
      if (UNIVERSAL.has(n) || n.startsWith('data-') || n.startsWith('aria-')) {
        if (n === 'style' && authorStyled.has(el) && !el.closest('[custom]')) warn('Inline style outside a custom region — is a component, property or token missing?', el);
        if (n === 'custom' && !a.value.trim()) warn('custom region without a reason — say what it is and why the design system does not cover it', el);
        continue;
      }
      if (LAYOUT.has(n)) { if (!def.layoutConfigurable) warn(`<${tag}> does not accept layout attributes (${n})`, el); continue; }
      warn(`Unknown property "${n}" on <${tag}>`, el);
    }
    const st = el.getAttribute('state');
    if (st) for (const s of st.split(/\s+/)) if (s && !def.states.has(s)) warn(`Unknown state "${s}" for <${tag}>`, el);
    for (const c of el.childNodes) {
      if (c.nodeType === 8 || (c.nodeType === 3 && !c.textContent.trim())) continue;
      const sn = c.nodeType === 1 ? c.getAttribute('slot') || 'default' : 'default';
      if (!def.slotNames.has(sn)) { warn(sn === 'default' ? `<${tag}> has no default slot for ${c.nodeType === 3 ? 'text' : `<${c.localName}>`}` : `<${tag}> has no slot "${sn}"`, c.nodeType === 1 ? c : el); continue; }
      const slot = def.slots.find((s) => s.name === sn);
      if (slot && !slotAccepts(slot, c)) warn(`Slot "${sn}" of <${tag}> does not accept ${c.nodeType === 3 ? 'text' : `<${c.localName}>`}`, c.nodeType === 1 ? c : el);
    }
  }
  if (base) checkTargets(targets, base);
}

function checkValue(def, p, n, v, el) {
  if (p.type === 'enum' && p.values.length && !p.values.includes(v)) warn(`${n}="${v}" is not one of ${p.values.join(', ')}`, el);
  else if (p.type === 'number' && v !== '' && isNaN(Number(v))) warn(`${n}="${v}" is not a number`, el);
  else if (p.type === 'icon' && v && state.ds.icons.length && !state.ds.icons.includes(v)) warn(`Icon "${v}" is not in the design system`, el);
  else if (p.type === 'boolean' && v !== '' && v !== 'true' && v !== 'false' && v !== n) warn(`${n}="${v}" should be present or absent`, el);
}

async function checkTargets(targets, base) {
  const seen = new Map();
  for (const { v, el, a } of targets) {
    const url = new URL(v, base).href;
    if (!seen.has(url)) seen.set(url, fetch(url, { method: 'HEAD', cache: 'no-cache' }).then((r) => r.ok).catch(() => false));
    if (!(await seen.get(url))) warn(`${a}="${v}" — no such mockup`, el);
  }
}

// ───────────────────────────── viewer: page structure

let canvas;
let bar;
let panel;
let badgeLayer;
let hoverLabel;

const VIEWER_CSS = `
html,body{margin:0}
body{min-height:100vh}
#km-canvas{box-sizing:border-box;padding-top:${BAR_HEIGHT}px;min-height:100vh;--viewport-height:calc(100vh - ${BAR_HEIGHT}px);display:flex;flex-direction:column}
#km-canvas>.km-frame{flex:1;display:flex;flex-direction:column}
#km-canvas>.km-frame>*{flex:0 0 auto}
#km-canvas[data-type=page]>.km-frame>:only-child{flex:1}
#km-canvas[data-type=section],#km-canvas[data-type=dialog]{padding:${BAR_HEIGHT + 32}px 24px 32px;align-items:center}
#km-canvas[data-type=dialog]{background:var(--color-scrim,rgba(15,23,42,.45))}
#km-canvas[data-type=section]>.km-frame,#km-canvas[data-type=dialog]>.km-frame{width:100%;flex:none}
:is(#km-canvas[data-type=section],#km-canvas[data-type=dialog],.km-overlay)>.km-frame[data-width=small]{max-width:480px}
:is(#km-canvas[data-type=section],#km-canvas[data-type=dialog],.km-overlay)>.km-frame[data-width=medium]{max-width:800px}
:is(#km-canvas[data-type=section],#km-canvas[data-type=dialog],.km-overlay)>.km-frame[data-width=large]{max-width:1200px}
#km-canvas.km-panel-open{margin-right:380px}
[href],[opens],[closes]{cursor:pointer}
.km-overlay{position:fixed;inset:${BAR_HEIGHT}px 0 0 0;display:flex;align-items:center;justify-content:center;padding:24px;z-index:1000}
#km-canvas.km-panel-open .km-overlay{right:380px}
.km-overlay>.km-scrim{position:absolute;inset:0;background:var(--color-scrim,rgba(15,23,42,.45))}
.km-overlay>.km-frame{position:relative;width:100%;max-width:800px;max-height:100%;overflow:auto}
.km-inspect-outline{outline:1px dashed #8b5cf6!important;outline-offset:-1px}
.km-inspect-custom{outline:2px dashed #f97316!important;outline-offset:2px}
.km-highlight{outline:2px solid #f59e0b!important;outline-offset:2px}
.km-error{margin:${BAR_HEIGHT + 24}px 24px;padding:16px 20px;border:1px solid #fca5a5;background:#fef2f2;color:#7f1d1d;border-radius:8px;font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:pre-wrap}
#km-badges{position:fixed;inset:0;pointer-events:none;z-index:2000}
.km-badge{position:fixed;pointer-events:auto;min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:#f59e0b;color:#111;font:600 11px/18px system-ui,sans-serif;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.3);cursor:pointer;transform:translate(-4px,-4px)}
.km-hover-label{position:fixed;pointer-events:none;z-index:2100;background:#4c1d95;color:#fff;font:12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;padding:2px 6px;border-radius:4px;white-space:nowrap}
.km-cat{max-width:1100px;margin:0 auto;padding:32px 24px 64px;font-family:var(--font-body,system-ui,sans-serif)}
.km-cat h1{margin:0 0 4px}.km-cat .km-sub{color:var(--color-text-muted,#667085);margin:0 0 32px}
.km-cat h2{margin:40px 0 16px;padding-bottom:8px;border-bottom:1px solid var(--color-border,#e4e7ec)}
.km-cat-comp{border:1px solid var(--color-border,#e4e7ec);border-radius:12px;margin:0 0 20px;overflow:hidden;background:var(--color-surface,#fff)}
.km-cat-head{display:flex;gap:12px;align-items:baseline;flex-wrap:wrap;padding:14px 18px;border-bottom:1px solid var(--color-border,#e4e7ec)}
.km-cat-head code{font-weight:600}.km-cat-head .km-meta{color:var(--color-text-muted,#667085);font-size:13px}
.km-cat-head a{margin-left:auto;font-size:13px}
.km-cat-ex{padding:20px 18px;background:var(--color-bg,#f8fafc)}
.km-cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px}
.km-cat-icon{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 4px;border:1px solid var(--color-border,#e4e7ec);border-radius:8px;font:11px ui-monospace,monospace;color:var(--color-text-muted,#667085);background:var(--color-surface,#fff)}
.km-cat-icon mockup-asset{width:22px;height:22px;color:var(--color-text,#111)}.km-cat-icon svg{width:100%;height:100%}
.km-cat-swatch{border:1px solid var(--color-border,#e4e7ec);border-radius:8px;overflow:hidden;font:11px ui-monospace,monospace;background:var(--color-surface,#fff)}
.km-cat-swatch div{height:44px;border-bottom:1px solid var(--color-border,#e4e7ec)}.km-cat-swatch span{display:block;padding:6px 8px;word-break:break-all}
.km-cat-mockups{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px}
.km-cat-mockup{display:block;padding:12px 14px;border:1px solid var(--color-border,#e4e7ec);border-radius:8px;background:var(--color-surface,#fff);text-decoration:none;color:inherit}
.km-cat-mockup strong{display:block}.km-cat-mockup span{font-size:12px;color:var(--color-text-muted,#667085)}
`;

const CHROME_CSS = `
:host{all:initial}
*{box-sizing:border-box}
.bar{position:fixed;top:0;left:0;right:0;height:${BAR_HEIGHT}px;z-index:3000;display:flex;align-items:center;gap:14px;padding:0 12px;background:#0f172a;color:#e2e8f0;font:13px/1 system-ui,-apple-system,Segoe UI,sans-serif}
a,button{font:inherit;color:inherit}
a{text-decoration:none;opacity:.8}a:hover{opacity:1}
.title{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.type{opacity:.6;font-size:12px}
.tabs{display:flex;gap:2px;margin-left:8px}
.tab{background:transparent;border:0;padding:6px 10px;border-radius:6px;cursor:pointer;opacity:.7}
.tab:hover{opacity:1;background:#1e293b}.tab[aria-current=true]{opacity:1;background:#334155}
.spacer{flex:1}
.ds{opacity:.6;font-size:12px;white-space:nowrap}
.btn{background:#1e293b;border:1px solid #334155;padding:5px 10px;border-radius:6px;cursor:pointer}
.btn:hover{background:#334155}.btn[aria-pressed=true]{background:#7c3aed;border-color:#7c3aed;color:#fff}
.warn{background:transparent;border:1px solid #334155}.warn.has{background:#b45309;border-color:#b45309;color:#fff}
.panel{position:fixed;top:${BAR_HEIGHT}px;right:0;bottom:0;width:380px;z-index:2900;background:#fff;color:#1e293b;border-left:1px solid #e2e8f0;overflow:auto;font:13px/1.5 system-ui,-apple-system,Segoe UI,sans-serif;padding:0 0 24px}
.panel h3{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#64748b;margin:20px 16px 8px}
.item{margin:0 12px 8px;padding:10px 12px;border:1px solid #e2e8f0;border-radius:8px;cursor:default}
.item.spec{cursor:pointer}.item.spec:hover{border-color:#f59e0b;background:#fffbeb}
.item.custom{border-left:3px solid #f97316}.item.custom:hover{border-color:#f97316;background:#fff7ed}
.item p{margin:0 0 6px}.item p:last-child{margin:0}.item ul{margin:0 0 6px;padding-left:18px}
.item code{font:12px ui-monospace,SFMono-Regular,Menlo,monospace;background:#f1f5f9;padding:1px 4px;border-radius:4px}
.num{display:inline-block;min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:#f59e0b;color:#111;font:600 11px/18px system-ui;text-align:center;margin-right:6px}
.where{display:block;color:#64748b;font:11px ui-monospace,SFMono-Regular,Menlo,monospace;margin-top:4px;word-break:break-all}
.empty{margin:0 16px;color:#94a3b8}
.w{border-color:#fcd34d;background:#fffbeb}
`;

function setupPage() {
  document.getElementById('km-file-warning')?.remove();
  document.head.insertAdjacentHTML('beforeend', '<style id="km-tokens"></style>');
  const viewerStyle = document.createElement('style');
  viewerStyle.id = 'km-viewer';
  viewerStyle.textContent = VIEWER_CSS;
  document.head.appendChild(viewerStyle);

  canvas = document.createElement('div');
  canvas.id = 'km-canvas';
  document.body.appendChild(canvas);

  const barHost = document.createElement('div');
  barHost.id = 'km-bar';
  document.body.appendChild(barHost);
  const barRoot = barHost.attachShadow({ mode: 'open' });
  barRoot.innerHTML = `<style>${CHROME_CSS}</style><div class="bar"></div><div class="panel" hidden></div>`;
  bar = barRoot.querySelector('.bar');
  panel = barRoot.querySelector('.panel');

  badgeLayer = document.createElement('div');
  badgeLayer.id = 'km-badges';
  document.body.appendChild(badgeLayer);
  hoverLabel = document.createElement('div');
  hoverLabel.className = 'km-hover-label';
  hoverLabel.hidden = true;
  document.body.appendChild(hoverLabel);

  document.addEventListener('click', onClick, true);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && state.dialogs.length) closeDialog(); });
  document.addEventListener('mousemove', onHover, true);
  window.addEventListener('scroll', scheduleBadges, true);
  window.addEventListener('resize', scheduleBadges);
  window.addEventListener('popstate', route);
}

// ───────────────────────────── viewer: chrome

let chromeQueued = false;
function scheduleChrome() {
  if (chromeQueued || !bar) return;
  chromeQueued = true;
  requestAnimationFrame(() => { chromeQueued = false; renderChrome(); });
}

function renderChrome() {
  const c = state.current;
  const ds = state.ds;
  const n = state.warnings.length;
  const tabs = c && c.states.length
    ? `<div class="tabs">${['', ...c.states].map((s) => `<button class="tab" data-state="${esc(s)}" aria-current="${(c.state || '') === s}">${esc(s || 'default')}</button>`).join('')}</div>`
    : '';
  bar.innerHTML = `
    <a href="${esc(location.pathname)}" data-nav="catalogue" title="Catalogue">◧ Catalogue</a>
    ${c ? `<span class="title">${esc(c.title)}</span><span class="type">${esc(c.type)}</span>${tabs}` : '<span class="title">Design system</span>'}
    <span class="spacer"></span>
    ${ds ? `<span class="ds">${esc(ds.meta.name || 'Design system')} ${esc(ds.meta.version || '')}</span>` : ''}
    ${c ? `<button class="btn" data-act="inspect" aria-pressed="${state.inspect}">Inspect</button>` : ''}
    <button class="btn warn ${n ? 'has' : ''}" data-act="warnings">${n} warning${n === 1 ? '' : 's'}</button>`;
  bar.onclick = (e) => {
    const t = e.target.closest('[data-state],[data-act],[data-nav]');
    if (!t) return;
    e.preventDefault();
    if (t.dataset.nav) navigate(null);
    else if (t.dataset.state !== undefined) navigate(c.path, t.dataset.state || null);
    else if (t.dataset.act === 'inspect') setInspect(!state.inspect);
    else if (t.dataset.act === 'warnings') { state.panelOpen = !state.panelOpen || state.inspect; if (state.inspect && !state.panelOpen) setInspect(false); renderPanel(); }
  };
  renderPanel();
}

function collectSpecs() {
  const out = [];
  if (!canvas) return out;
  for (const el of canvas.querySelectorAll('*')) {
    const texts = [...(specOf.get(el) || [])];
    if (el.hasAttribute('spec')) texts.unshift(el.getAttribute('spec'));
    if (texts.length) out.push({ el, texts });
  }
  return out;
}

function renderPanel() {
  const open = state.panelOpen || state.inspect;
  panel.hidden = !open;
  canvas.classList.toggle('km-panel-open', open);
  if (!open) return;
  const specs = collectSpecs();
  let html = '';
  if (state.current) {
    html += '<h3>Specification</h3>';
    const roots = state.rootSpecs.filter((r) => r.texts.length);
    html += roots.length ? roots.map((r) => `<div class="item">${roots.length > 1 ? `<strong>${esc(r.label)}</strong>` : ''}${r.texts.map(mdLite).join('')}</div>`).join('') : '<p class="empty">None.</p>';
    html += '<h3>Annotations</h3>';
    html += specs.length ? specs.map((s, i) => `<div class="item spec" data-i="${i}"><span class="num">${i + 1}</span><code>${esc(s.el.localName)}</code>${s.texts.map(mdLite).join('')}</div>`).join('') : '<p class="empty">None.</p>';
    const customs = [...canvas.querySelectorAll('[custom]')];
    html += `<h3>Custom regions (${customs.length})</h3>`;
    html += customs.length ? customs.map((el, i) => `<div class="item spec custom" data-c="${i}"><code>${esc(el.localName)}</code> ${esc(el.getAttribute('custom') || '(no reason given)')}</div>`).join('') : '<p class="empty">None — everything is built from the design system.</p>';
    panel._customs = customs;
  }
  html += `<h3>Warnings (${state.warnings.length})</h3>`;
  html += state.warnings.length ? state.warnings.map((w) => `<div class="item w">${esc(w.message)}${w.where ? `<span class="where">${esc(w.where)}</span>` : ''}</div>`).join('') : '<p class="empty">None.</p>';
  panel.innerHTML = html;
  const target = (it) => (it ? (it.dataset.c !== undefined ? panel._customs?.[+it.dataset.c] : specs[+it.dataset.i]?.el) : null);
  panel.onmouseover = (e) => highlight(target(e.target.closest('.spec')));
  panel.onmouseleave = () => highlight(null);
  panel.onclick = (e) => { target(e.target.closest('.spec'))?.scrollIntoView({ block: 'center', behavior: 'smooth' }); };
  scheduleBadges();
}

let highlighted = null;
function highlight(el) {
  highlighted?.classList.remove('km-highlight');
  highlighted = el || null;
  highlighted?.classList.add('km-highlight');
}

function setInspect(on) {
  state.inspect = on;
  if (!on) state.panelOpen = false;
  const url = new URL(location.href);
  if (on) url.searchParams.set('inspect', ''); else url.searchParams.delete('inspect');
  history.replaceState(null, '', url.toString().replace(/inspect=(&|$)/, 'inspect$1'));
  const tags = [...state.ds.components.keys()];
  for (const el of canvas.querySelectorAll(tags.join(',') || 'x-none')) el.classList.toggle('km-inspect-outline', on);
  for (const el of canvas.querySelectorAll('[custom]')) el.classList.toggle('km-inspect-custom', on);
  hoverLabel.hidden = true;
  renderChrome();
}

let badgesQueued = false;
function scheduleBadges() {
  if (badgesQueued) return;
  badgesQueued = true;
  requestAnimationFrame(() => { badgesQueued = false; renderBadges(); });
}

function renderBadges() {
  badgeLayer.innerHTML = '';
  if (!state.inspect) return;
  collectSpecs().forEach((s, i) => {
    const r = s.el.getBoundingClientRect();
    if (!r.width && !r.height) return;
    const b = document.createElement('div');
    b.className = 'km-badge';
    b.textContent = i + 1;
    b.style.left = `${Math.max(0, r.left)}px`;
    b.style.top = `${Math.max(BAR_HEIGHT, r.top)}px`;
    b.title = s.texts.join('\n\n');
    b.onmouseenter = () => highlight(s.el);
    b.onmouseleave = () => highlight(null);
    badgeLayer.appendChild(b);
  });
}

function onHover(e) {
  if (!state.inspect) return;
  const comp = e.composedPath().find((n) => n instanceof Element && state.ds.components.has(n.localName));
  if (!comp || !canvas.contains(comp.getRootNode().host || comp)) { hoverLabel.hidden = true; return; }
  hoverLabel.hidden = false;
  hoverLabel.textContent = describe(comp);
  hoverLabel.style.left = `${Math.min(e.clientX + 12, innerWidth - hoverLabel.offsetWidth - 8)}px`;
  hoverLabel.style.top = `${e.clientY + 16}px`;
}

// ───────────────────────────── viewer: interaction

function baseFor(path) {
  const overlay = path.find((n) => n instanceof Element && n.classList?.contains('km-overlay'));
  return overlay ? new URL(overlay.dataset.url) : state.current?.url || PROJECT;
}

function onClick(e) {
  if (!canvas || !state.current) return;
  const path = e.composedPath();
  if (!path.includes(canvas)) return;
  for (const n of path) {
    if (!(n instanceof Element)) continue;
    if (n === canvas) break;
    if (n.classList.contains('km-scrim')) { e.preventDefault(); closeDialog(); return; }
    if (n.hasAttribute('closes')) { e.preventDefault(); closeDialog(); return; }
    if (n.hasAttribute('opens') && n.getAttribute('opens')) { e.preventDefault(); openDialog(n.getAttribute('opens'), baseFor(path)); return; }
    if (n.hasAttribute('href') && n.getAttribute('href')) { e.preventDefault(); follow(n.getAttribute('href'), baseFor(path)); return; }
  }
}

function follow(href, base) {
  if (href.startsWith('#')) { (document.getElementById(href.slice(1)) || canvas.querySelector(`[id="${CSS.escape(href.slice(1))}"]`))?.scrollIntoView({ behavior: 'smooth' }); return; }
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) { window.open(href, '_blank', 'noopener'); return; }
  navigate(relToProject(new URL(href, base)));
}

async function openDialog(rel, base) {
  const url = new URL(rel, base);
  const { doc, error } = await parseMockup(url);
  if (error) { warn(error); return; }
  const root = doc.documentElement;
  if (root.getAttribute('type') !== 'dialog') warn(`opens="${rel}" is not a dialog mockup`);
  await resolveIncludes(doc, url, new Set([url.href]));
  const { frag, rootSpecs } = buildContent(root);
  const overlay = document.createElement('div');
  overlay.className = 'km-overlay';
  overlay.dataset.url = url.href;
  overlay.innerHTML = '<div class="km-scrim"></div>';
  const frame = document.createElement('div');
  frame.className = 'km-frame';
  frame.dataset.width = root.getAttribute('width') || 'medium';
  frame.appendChild(frag);
  overlay.appendChild(frame);
  canvas.appendChild(overlay);
  overlay._kmSpec = { label: root.getAttribute('title') || rel, texts: rootSpecs };
  state.rootSpecs.push(overlay._kmSpec);
  state.dialogs.push(overlay);
  validate(frame, url);
  if (state.inspect) setInspect(true); else renderChrome();
}

function closeDialog() {
  const overlay = state.dialogs.pop();
  if (!overlay) return;
  state.rootSpecs = state.rootSpecs.filter((r) => r !== overlay._kmSpec);
  overlay.remove();
  renderChrome();
}

function navigate(path, st, replace) {
  const url = new URL(location.pathname, location.origin);
  if (path) url.searchParams.set('m', path);
  if (st) url.searchParams.set('state', st);
  if (state.inspect && path) url.searchParams.set('inspect', '');
  const s = url.toString().replace(/inspect=(&|$)/, 'inspect$1');
  if (replace) history.replaceState(null, '', s); else history.pushState(null, '', s);
  route();
}

// ───────────────────────────── viewer: pages

async function route() {
  const q = new URLSearchParams(location.search);
  state.warnings = [...state.dsWarnings];
  state.dialogs = [];
  state.rootSpecs = [];
  state.inspect = q.has('inspect');
  state.panelOpen = false;
  highlight(null);
  window.scrollTo(0, 0);
  if (q.get('m')) await showMockup(q.get('m'), q.get('state'));
  else await showCatalogue();
  if (state.inspect && state.current) setInspect(true); else renderChrome();
}

async function showMockup(path, stName) {
  const sibling = !stName && path.match(/^(.*)\.([a-z0-9-]+)\.xml$/);
  if (sibling) {
    const r = await parseMockup(new URL(`${sibling[1]}.xml`, PROJECT));
    const listed = (r.doc?.documentElement.getAttribute('states') || '').split(/\s+/);
    if (listed.includes(sibling[2])) { navigate(`${sibling[1]}.xml`, sibling[2], true); return; }
  }
  const baseUrl = new URL(path, PROJECT);
  const fileUrl = stName ? new URL(path.replace(/\.xml$/, `.${stName}.xml`), PROJECT) : baseUrl;
  canvas.innerHTML = '';
  canvas.removeAttribute('data-type');
  let base = null;
  if (stName) { const r = await parseMockup(baseUrl); base = r.doc?.documentElement || null; }
  const { doc, error } = await parseMockup(fileUrl);
  if (error) {
    state.current = { path, url: fileUrl, state: stName, type: '', title: path, states: [] };
    canvas.innerHTML = `<div class="km-error">${esc(error)}</div>`;
    warn(error);
    return;
  }
  const root = doc.documentElement;
  if (root.localName !== 'mockup') warn(`Root element is <${root.localName}>, expected <mockup>`);
  const type = root.getAttribute('type') || '';
  const title = root.getAttribute('title') || (base || root).getAttribute('title') || path;
  if (!['page', 'section', 'dialog'].includes(type)) warn(type ? `type="${type}" is not page, section or dialog` : 'Mockup has no type');
  if (!root.getAttribute('title')) warn('Mockup has no title');
  const states = ((base || root).getAttribute('states') || '').split(/\s+/).filter(Boolean);
  state.current = { path, url: fileUrl, state: stName, type: type || 'page', title, states };
  document.title = `${title} — mockup`;

  const dsv = root.getAttribute('design-system');
  if (dsv && state.ds.meta.version && dsv.split('.')[0] !== state.ds.meta.version.split('.')[0]) {
    warn(`Mockup was checked against design system ${dsv}; the design system is now ${state.ds.meta.version}`);
  }

  await resolveIncludes(doc, fileUrl, new Set([fileUrl.href]));
  const { frag, rootSpecs } = buildContent(root);
  state.rootSpecs = [{ label: title, texts: rootSpecs }];
  const frame = document.createElement('div');
  frame.className = 'km-frame';
  frame.dataset.width = root.getAttribute('width') || 'medium';
  frame.appendChild(frag);
  canvas.dataset.type = state.current.type;
  canvas.appendChild(frame);
  validate(frame, fileUrl);
  for (const st of states) {
    const u = new URL(path.replace(/\.xml$/, `.${st}.xml`), PROJECT);
    fetch(u, { method: 'HEAD', cache: 'no-cache' }).then((r) => { if (!r.ok) warn(`states lists "${st}" but ${relToProject(u)} does not exist`); }).catch(() => {});
  }
}

const MAX_DEPTH = 4;

// Mockups live anywhere in the project space: walk the server's directory listings from the project root,
// skipping the design system and hidden, underscore and dependency folders.
async function listMockups() {
  const found = [];
  const walk = async (url, depth) => {
    let html;
    try { const r = await fetch(url, { cache: 'no-cache' }); if (!r.ok) return; html = await r.text(); } catch { return; }
    const d = new DOMParser().parseFromString(html, 'text/html');
    for (const a of d.querySelectorAll('a[href]')) {
      const u = new URL(a.getAttribute('href'), url);
      if (!u.href.startsWith(url.href) || u.href === url.href || u.search) continue;
      const name = decodeURIComponent(u.pathname.slice(url.pathname.length)).replace(/\/$/, '');
      if (u.pathname.endsWith('/')) {
        if (u.href === DS_URL.href || /^[._]/.test(name) || name === 'node_modules') continue;
        if (depth < MAX_DEPTH) await walk(u, depth + 1);
      } else if (u.pathname.endsWith('.xml')) found.push(u);
    }
  };
  await walk(PROJECT, 0);
  const items = await Promise.all([...new Map(found.map((u) => [u.href, u])).values()].map(async (u) => {
    const { doc } = await parseMockup(u);
    const r = doc?.documentElement;
    if (r && r.localName !== 'mockup') return null; // some other XML file
    return { url: u, path: relToProject(u), title: r?.getAttribute('title') || relToProject(u), type: r?.getAttribute('type') || '?', states: (r?.getAttribute('states') || '').split(/\s+/).filter(Boolean) };
  }));
  const mockups = items.filter(Boolean);
  const siblings = new Set(mockups.flatMap((i) => i.states.map((s) => i.path.replace(/\.xml$/, `.${s}.xml`))));
  return mockups.filter((i) => !siblings.has(i.path)).sort((a, b) => a.path.localeCompare(b.path));
}

async function showCatalogue() {
  state.current = null;
  document.title = `${state.ds.meta.name || 'Design system'} — catalogue`;
  canvas.innerHTML = '';
  canvas.dataset.type = 'catalogue';
  const ds = state.ds;
  const wrap = document.createElement('div');
  wrap.className = 'km-cat';
  const colours = [...new Set([...ds.tokensCss.matchAll(/(--color-[a-z0-9-]+)\s*:/g)].map((m) => m[1]))];
  wrap.innerHTML = `
    <h1>${esc(ds.meta.name || 'Design system')}</h1>
    <p class="km-sub">Version ${esc(ds.meta.version || '—')} · source: ${esc(ds.meta.source || 'local')} · ${ds.components.size} components · ${ds.icons.length} icons · runtime ${VERSION}</p>
    <h2>Mockups</h2><div class="km-cat-mockups" id="km-cat-mockups"><p>Looking for mockups…</p></div>
    <h2>Components</h2><div id="km-cat-components"></div>
    <h2>Icons</h2><div class="km-cat-grid">${ds.icons.map((i) => `<div class="km-cat-icon"><mockup-asset src="icons/${esc(i)}.svg"></mockup-asset>${esc(i)}</div>`).join('')}</div>
    <h2>Colour tokens</h2><div class="km-cat-grid">${colours.map((c) => `<div class="km-cat-swatch"><div style="background:var(${c})"></div><span>${c}</span></div>`).join('')}</div>`;
  canvas.appendChild(wrap);

  const compHost = wrap.querySelector('#km-cat-components');
  if (!ds.order.length) compHost.innerHTML = '<p>No components yet. Add them to <code>design-system/components/</code> and list them in the manifest, or synchronise the design system from a remote source.</p>';
  for (const tag of ds.order) {
    const def = ds.components.get(tag);
    if (!def) continue;
    const box = document.createElement('section');
    box.className = 'km-cat-comp';
    box.id = tag;
    box.innerHTML = `<div class="km-cat-head"><code>&lt;${esc(tag)}&gt;</code><strong>${esc(def.title)}</strong><span class="km-meta">${esc(def.meta.version || '')} · ${esc(def.meta.kind || '')}${def.meta.status && def.meta.status !== 'active' ? ' · ' + esc(def.meta.status) : ''} — ${esc(def.meta.summary || '')}</span><a href="${esc(new URL(def.file, DS_URL).href)}" target="_blank">source</a></div><div class="km-cat-ex"></div>`;
    compHost.appendChild(box);
    const ex = box.querySelector('.km-cat-ex');
    if (!def.example) { ex.textContent = 'No example.'; continue; }
    const doc = new DOMParser().parseFromString(`<example>${def.example}</example>`, 'application/xml');
    if (doc.querySelector('parsererror')) { ex.textContent = 'Example is not well-formed XML.'; warn(`Example of ${tag} is not well-formed XML`); continue; }
    const { frag } = buildContent(doc.documentElement);
    ex.appendChild(frag);
    const before = state.warnings.length;
    validate(ex, null);
    for (const w of state.warnings.slice(before)) w.message = `Example of ${tag}: ${w.message}`;
  }

  const items = await listMockups();
  const host = wrap.querySelector('#km-cat-mockups');
  host.innerHTML = items.length
    ? items.map((i) => `<a class="km-cat-mockup" href="?m=${encodeURI(i.path)}"><strong>${esc(i.title)}</strong><span>${esc(i.type)} · ${esc(i.path)}${i.states.length ? ' · states: ' + esc(i.states.join(', ')) : ''}</span></a>`).join('')
    : '<p>No mockups found. Mockups are <code>.xml</code> files anywhere in the project space outside <code>design-system/</code>. If there are some, the server may not list directories: open one with <code>?m=&lt;path&gt;.xml</code>.</p>';
  host.onclick = (e) => { const a = e.target.closest('a'); if (a) { e.preventDefault(); navigate(new URL(a.href).searchParams.get('m')); } };
}

// ───────────────────────────── start

async function start() {
  if (location.protocol === 'file:') return; // index.html shows serving instructions
  setupPage();
  try {
    state.ds = await loadDesignSystem();
  } catch (e) {
    canvas.innerHTML = `<div class="km-error">Could not load the design system manifest (README.md beside _runtime.js)\n${esc(e.message)}</div>`;
    return;
  }
  state.dsWarnings = state.warnings.map((w) => ({ ...w, message: `Design system: ${w.message}` }));
  document.getElementById('km-tokens').textContent = state.ds.tokensCss;
  for (const def of state.ds.components.values()) defineComponent(def);
  await route();
}

start();
