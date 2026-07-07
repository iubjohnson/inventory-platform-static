// Stockwik docs generator.
// Converts docs/site-content/**/*.md into static /docs/**.html pages.
// Run manually:  node docs/build-docs.mjs
// The deployed site stays build-step-free; this just emits committed HTML.
//
// Conventions (from docs/site-content/README.md):
//  - H1 = page title; first paragraph = meta description.
//  - `> **Available on …**`  -> plan badge line.
//  - `> **Tip/Note/Example/Plain English:** …` -> styled callouts.
//  - `[SCREENSHOT: …]` (in backticks) -> left in place as a placeholder.
//  - index.md defines the section structure (nav + landing grid).
// Canonical facts (formulas, defaults, statuses, plan matrix) are copied
// verbatim from the source; this script never rewrites them.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DOCS_DIR = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(DOCS_DIR, 'site-content');
const INSTALL = 'https://apps.shopify.com/stockwik-inventory-management?utm_source=stockwik_site&amp;utm_medium=referral&amp;utm_campaign=install_cta&amp;utm_content=docs_header';
const SHOPIFY_IC = '<svg class="shopify-ic" viewBox="0 0 24 24" fill="currentColor"><path d="M15.3 3.3c-.2 0-.4.1-.5.1l-.7.2c-.4-1.1-1-2-2.2-2-1.6 0-2.7 1.9-3.1 3.3l-1.6.5c-.5.2-.5.2-.6.7L4.6 19.6 14 21.4l5.1-1.1L16.3 4c-.3-.5-.7-.7-1-.7z"/></svg>';

// ---------- helpers ----------
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = s => esc(s).replace(/"/g, '&quot;');

function resolveLink(url, dir) {
  if (/^(https?:|mailto:|tel:|#|\/)/i.test(url)) return url;
  let p = path.posix.normalize(dir + url);
  if (p.endsWith('/')) p = p.slice(0, -1);
  if (!/\.[a-z0-9]+$/i.test(p)) p += '.html';
  return p;
}

// Sentinel for stashed code spans — a char that can't appear in markdown text.
const SENT = String.fromCharCode(0);

function inline(s, dir) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (m, c) => {
    const t = c.trim();
    if (/^\[SCREENSHOT:/i.test(t)) codes.push('<span class="doc-shot-inline">' + esc(t) + '</span>');
    else codes.push('<code>' + esc(c) + '</code>');
    return SENT + (codes.length - 1) + SENT;
  });
  s = esc(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (m, alt, src) =>
    '<img class="doc-img" src="' + resolveLink(src.trim(), dir).replace(/"/g, '&quot;') + '" alt="' + alt.replace(/"/g, '&quot;') + '" loading="lazy">');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, txt, url) =>
    '<a href="' + escAttr(resolveLink(url.trim(), dir)) + '">' + txt + '</a>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/(^|[^\w])_([^_\n]+)_/g, '$1<em>$2</em>');
  s = s.replace(new RegExp(SENT + '(\\d+)' + SENT, 'g'), (m, n) => codes[+n]);
  return s;
}

function planBadge(text) {
  let html = esc(text).replace(/\b(Growth|Pro|Starter)\b/g, (m, p) =>
    '<span class="plan-badge ' + p.toLowerCase() + '">' + p + '</span>');
  const lock = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
  return '<div class="doc-plan">' + lock + '<span>' + html + '</span></div>';
}

function blockquote(text, dir) {
  const t = text.trim();
  let pm = t.match(/^\*\*\s*(Available on[^*]*?)\s*\*\*\.?\s*$/i);
  if (pm) return planBadge(pm[1].trim());
  let cm = t.match(/^\*\*\s*([^:*]+?):\s*\*\*\s*([\s\S]*)$/);
  if (cm) {
    const label = cm[1].trim();
    const body = cm[2].trim();
    const known = ['tip', 'note', 'example', 'plain english', 'warning', 'important'];
    const key = label.toLowerCase();
    const cls = known.includes(key) ? key.replace(/\s+/g, '-') : 'note';
    return '<div class="doc-callout ' + cls + '"><div class="doc-callout-label">' + esc(label) +
      '</div><div class="doc-callout-body">' + inline(body, dir) + '</div></div>';
  }
  return '<blockquote class="doc-quote">' + inline(t, dir) + '</blockquote>';
}

function splitRow(line) {
  let s = line.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|')) s = s.slice(0, -1);
  return s.split('|').map(c => c.trim());
}

function table(lines, dir) {
  const header = splitRow(lines[0]);
  const aligns = splitRow(lines[1]).map(c => {
    const l = c.startsWith(':'), r = c.endsWith(':');
    return l && r ? 'center' : r ? 'right' : l ? 'left' : '';
  });
  const body = lines.slice(2).map(splitRow);
  const cls = i => (aligns[i] ? ' class="ta-' + aligns[i] + '"' : '');
  let h = '<div class="doc-table-wrap"><table><thead><tr>' +
    header.map((c, i) => '<th' + cls(i) + '>' + inline(c, dir) + '</th>').join('') + '</tr></thead><tbody>';
  for (const row of body) {
    h += '<tr>' + row.map((c, i) => '<td' + cls(i) + '>' + inline(c, dir) + '</td>').join('') + '</tr>';
  }
  return h + '</tbody></table></div>';
}

function buildList(lines, dir) {
  function parse(start, indent) {
    const items = [];
    let i = start, type = null;
    while (i < lines.length) {
      const m = lines[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
      if (!m) {
        if (items.length) { items[items.length - 1].text += ' ' + lines[i].trim(); i++; continue; }
        break;
      }
      const ind = m[1].length;
      if (ind < indent) break;
      if (ind > indent) {
        const [childHtml, ni] = parse(i, ind);
        if (items.length) items[items.length - 1].children += childHtml;
        i = ni; continue;
      }
      if (type === null) type = /\d+\./.test(m[2]) ? 'ol' : 'ul';
      items.push({ text: m[3], children: '' });
      i++;
    }
    const html = '<' + type + '>' + items.map(it =>
      '<li>' + inline(it.text, dir) + it.children + '</li>').join('') + '</' + type + '>';
    return [html, i];
  }
  return parse(0, 0)[0];
}

function isTableStart(lines, i) {
  return lines[i].includes('|') && i + 1 < lines.length &&
    lines[i + 1].includes('|') && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1]);
}

function convert(md, dir) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') { i++; continue; }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { out.push('<h' + h[1].length + '>' + inline(h[2].trim(), dir) + '</h' + h[1].length + '>'); i++; continue; }
    if (/^---+\s*$/.test(line)) { out.push('<hr>'); i++; continue; }
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, '')); i++; }
      out.push(blockquote(buf.join('\n'), dir));
      continue;
    }
    if (isTableStart(lines, i)) {
      const tbl = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim() !== '') { tbl.push(lines[i]); i++; }
      out.push(table(tbl, dir));
      continue;
    }
    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const listLines = [];
      while (i < lines.length && lines[i].trim() !== '' &&
        (/^\s*([-*]|\d+\.)\s+/.test(lines[i]) || /^\s+\S/.test(lines[i]))) {
        listLines.push(lines[i]); i++;
      }
      out.push(buildList(listLines, dir));
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() !== '' &&
      !/^(#{1,6}\s|>|---+\s*$)/.test(lines[i]) &&
      !/^\s*([-*]|\d+\.)\s+/.test(lines[i]) &&
      !isTableStart(lines, i)) {
      para.push(lines[i]); i++;
    }
    const t = para.join(' ').trim();
    const img = t.match(/^!\[[^\]]*\]\([^)]+\)$/);
    const sm = t.match(/^`\[SCREENSHOT:([^\]]*)\]`$/i);
    if (img) out.push('<figure class="doc-figure">' + inline(t, dir) + '</figure>');
    else if (sm) out.push('<div class="doc-shot"><span class="doc-shot-ic">▦</span>[SCREENSHOT:' + esc(sm[1]) + ']</div>');
    else if (t) out.push('<p>' + inline(t, dir) + '</p>');
  }
  return out.join('\n');
}

// ---------- structure from index.md ----------
function parseIndex() {
  const md = fs.readFileSync(path.join(SRC, 'index.md'), 'utf8').replace(/\r\n/g, '\n');
  const lines = md.split('\n');
  let title = 'Stockwik Help', intro = '';
  const sections = [];
  let cur = null, seenH1 = false;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const h1 = l.match(/^#\s+(.*)$/);
    if (h1) { title = h1[1].trim(); seenH1 = true; continue; }
    const h2 = l.match(/^##\s+(.*)$/);
    if (h2) { cur = { title: h2[1].trim(), intro: '', pages: [] }; sections.push(cur); continue; }
    const li = l.match(/^- \[([^\]]+)\]\(([^)]+)\)\s*$/);
    if (li) {
      cur.pages.push({ title: li[1].trim(), href: li[2].trim(), url: resolveLink(li[2].trim(), '/docs/') });
      continue;
    }
    if (l.trim() === '') continue;
    // plain paragraph: landing intro (before first section) or a section intro
    if (!cur && seenH1 && !intro) intro = l.trim();
    else if (cur && !cur.intro && cur.pages.length === 0) cur.intro = l.trim();
  }
  return { title, intro, sections };
}

// ---------- chrome ----------
function header() {
  return `<header class="site-header">
  <div class="wrap nav">
    <a class="brand" href="/index.html"><img src="/assets/mark_primary.svg" alt="Stockwik" style="width:34px;height:34px;"><span class="wm">stockwik</span></a>
    <nav class="nav-links">
      <a href="/product.html">Product</a>
      <a href="/pricing.html">Pricing</a>
      <a href="/stocky-alternative.html">Stocky alternative</a>
    </nav>
    <div class="nav-cta"><a class="login-link" href="https://app.stockwik.com" target="_blank" rel="noopener noreferrer">Log in</a><a class="btn btn-primary" href="${INSTALL}">${SHOPIFY_IC}Install on Shopify</a></div>
    <button class="menu-btn" aria-label="Menu">☰</button>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div><div class="brand"><img src="/assets/mark_white.svg" alt="" style="width:32px;height:32px;"><span class="wm">stockwik</span></div><p class="foot-about">Inventory planning, forecasting, and purchasing for small and mid-size Shopify merchants. Built by an operator who lived the problem.</p></div>
      <div><h4>Product</h4><a href="/product.html">Features</a><a href="/pricing.html">Pricing</a><a href="/stocky-alternative.html">Stocky alternative</a><a href="/docs/">Docs</a><a href="/changelog.html">Changelog</a></div>
      <div><h4>Company</h4><a href="/about.html">About</a><a href="/contact.html">Contact</a><a href="/blog/">Blog</a></div>
      <div><h4>Legal</h4><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a></div>
    </div>
    <div class="foot-bottom"><span>© 2026 Stockwik. All rights reserved.</span><span>Made for Shopify merchants.</span></div>
  </div>
</footer>`;
}

function searchBox(extraClass) {
  return `<div class="docs-search${extraClass || ''}" data-docs-search>
        <input type="search" placeholder="Search the docs…" aria-label="Search the docs" autocomplete="off">
        <div class="docs-search-results" data-results></div>
      </div>`;
}

function sidebar(sections, currentUrl) {
  let h = '<nav class="docs-nav" aria-label="Docs">';
  for (const s of sections) {
    h += '<div class="docs-nav-sec"><h5>' + esc(s.title) + '</h5><ul>';
    for (const p of s.pages) {
      const active = p.url === currentUrl ? ' class="active" aria-current="page"' : '';
      h += '<li><a href="' + escAttr(p.url) + '"' + active + '>' + esc(p.title) + '</a></li>';
    }
    h += '</ul></div>';
  }
  return h + '</nav>';
}

function shell({ title, descr, body, scripts }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${escAttr(descr || '')}">
<link rel="icon" type="image/svg+xml" href="/assets/mark_primary.svg">
<link rel="stylesheet" href="/styles.css">
</head>
<body>
${header()}
${body}
${footer()}
${scripts || ''}
<script src="/nav.js" defer></script>
</body>
</html>
`;
}

function plainText(s) {
  return s.replace(/`[^`]*`/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_>#]/g, '').replace(/\s+/g, ' ').trim();
}

function descFromMd(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  let started = false;
  for (const l of lines) {
    if (/^#\s/.test(l)) { started = true; continue; }
    if (!started) continue;
    const t = l.trim();
    if (!t || t.startsWith('>') || t.startsWith('#') || t.startsWith('`[SCREENSHOT')) continue;
    return plainText(t).slice(0, 180);
  }
  return '';
}

function headingsFromMd(md) {
  return (md.match(/^#{2,3}\s+.*$/gm) || []).map(l => plainText(l)).join(' ');
}

// ---------- build ----------
const { title: siteTitle, intro: landingIntro, sections } = parseIndex();
const searchIndex = [];
let pageCount = 0;

for (const sec of sections) {
  for (const pg of sec.pages) {
    const srcFile = path.join(SRC, pg.href + '.md');
    if (!fs.existsSync(srcFile)) { console.warn('MISSING source: ' + srcFile); continue; }
    const md = fs.readFileSync(srcFile, 'utf8');
    const h1 = (md.match(/^#\s+(.*)$/m) || [, pg.title])[1].trim();
    const dir = path.posix.dirname(pg.url) + '/';
    const contentHtml = convert(md, dir);
    const descr = descFromMd(md);

    const breadcrumb = '<nav class="docs-breadcrumb"><a href="/docs/">Docs</a><span>/</span><span>' +
      esc(sec.title) + '</span></nav>';
    const body = `<section class="section docs-section">
  <div class="wrap docs-wrap">
    <button class="docs-menu-btn" data-sidebar-toggle aria-label="Toggle docs menu">☰ Docs menu</button>
    <aside class="docs-sidebar">
      ${searchBox()}
      ${sidebar(sections, pg.url)}
    </aside>
    <main class="docs-main">
      ${breadcrumb}
      <article class="doc-content">
${contentHtml}
      </article>
    </main>
  </div>
</section>`;
    const html = shell({
      title: h1 + ' — Stockwik Help',
      descr,
      body,
      scripts: '<script src="/docs/search-index.js"></script>\n<script src="/docs/docs.js"></script>'
    });
    const outFile = path.join(DOCS_DIR, pg.href + '.html');
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html);
    pageCount++;
    searchIndex.push({ t: h1, u: pg.url, s: sec.title, d: descr, k: headingsFromMd(md) });
  }
}

// landing page
let grid = '<div class="docs-grid">';
for (const s of sections) {
  grid += '<div class="docs-cat"><h3>' + esc(s.title) + '</h3>';
  if (s.intro) grid += '<p class="docs-cat-intro">' + inline(s.intro, '/docs/') + '</p>';
  grid += '<ul>';
  for (const p of s.pages) grid += '<li><a href="' + escAttr(p.url) + '">' + esc(p.title) + '</a></li>';
  grid += '</ul></div>';
}
grid += '</div>';

const landingBody = `<section class="section-sm docs-hero" style="padding-top:56px;">
  <div class="wrap center">
    <span class="eyebrow">Help center</span>
    <h1 style="margin:14px 0 12px;">${esc(siteTitle)}</h1>
    <p class="lede" style="margin:0 auto;">${inline(landingIntro, '/docs/')}</p>
    ${searchBox(' docs-search-lg')}
  </div>
</section>
<section class="section" style="padding-top:8px;">
  <div class="wrap">
    ${grid}
  </div>
</section>`;

fs.writeFileSync(path.join(DOCS_DIR, 'index.html'), shell({
  title: siteTitle + ' — Stockwik',
  descr: plainText(landingIntro).slice(0, 180),
  body: landingBody,
  scripts: '<script src="/docs/search-index.js"></script>\n<script src="/docs/docs.js"></script>'
}));

fs.writeFileSync(path.join(DOCS_DIR, 'search-index.js'),
  'window.DOCS_SEARCH=' + JSON.stringify(searchIndex) + ';\n');

console.log('Built ' + pageCount + ' doc pages + landing + search index (' + searchIndex.length + ' entries).');
