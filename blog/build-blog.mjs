// Stockwik blog generator.
// Converts blog/content/*.md into static /blog/<slug>.html pages, the /blog/
// listing page, /blog/feed.xml (RSS), and the site-wide /sitemap.xml.
// Run manually:  node blog/build-blog.mjs
// The deployed site stays build-step-free; this just emits committed HTML.
//
// Conventions (see blog/content/README.md):
//  - Frontmatter (--- block) is required: title, description, date, category, slug.
//    Optional: updated, image.
//  - H1 in the markdown = visible headline (rendered in the post header).
//  - The first paragraph after the H1 becomes the styled answer-first lead.
//  - Internal links use absolute site paths with .html (e.g. /product.html,
//    /docs/concepts/glossary.html).
//
// The markdown converter below is copied from docs/build-docs.mjs — keep the
// two in sync manually. One deliberate difference: inline() here stashes code
// spans with <n> sentinels instead of space-delimited numbers,
// so bare numbers in prose ("reorder at 10 units") aren't corrupted.
// Canonical product facts (formulas, defaults, statuses) come verbatim from
// the source markdown; this script never rewrites them.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const BLOG_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(BLOG_DIR);
const SRC = path.join(BLOG_DIR, 'content');
const SITE = 'https://stockwik.com';
const INSTALL = 'https://apps.shopify.com/stockwik-inventory-management?utm_source=stockwik_site&amp;utm_medium=referral&amp;utm_campaign=install_cta&amp;utm_content=blog_header';
const SHOPIFY_IC = '<svg class="shopify-ic" viewBox="0 0 24 24" fill="currentColor"><path d="M15.3 3.3c-.2 0-.4.1-.5.1l-.7.2c-.4-1.1-1-2-2.2-2-1.6 0-2.7 1.9-3.1 3.3l-1.6.5c-.5.2-.5.2-.6.7L4.6 19.6 14 21.4l5.1-1.1L16.3 4c-.3-.5-.7-.7-1-.7z"/></svg>';

// ---------- helpers (copied from docs/build-docs.mjs) ----------
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = s => esc(s).replace(/"/g, '&quot;');

function resolveLink(url, dir) {
  if (/^(https?:|mailto:|tel:|#|\/)/i.test(url)) return url;
  let p = path.posix.normalize(dir + url);
  if (p.endsWith('/')) p = p.slice(0, -1);
  if (!/\.[a-z0-9]+$/i.test(p)) p += '.html';
  return p;
}

// Sentinel for stashed code spans: a char that can never appear in markdown
// text (unlike the docs generator's space-delimited numbers, which corrupt
// bare numbers in prose).
const SENT = String.fromCharCode(0);

function inline(s, dir) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (m, c) => {
    codes.push('<code>' + esc(c) + '</code>');
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

function blockquote(text, dir) {
  const t = text.trim();
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
    if (img) out.push('<figure class="doc-figure">' + inline(t, dir) + '</figure>');
    else if (t) out.push('<p>' + inline(t, dir) + '</p>');
  }
  return out.join('\n');
}

function plainText(s) {
  return s.replace(/`[^`]*`/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_>#]/g, '').replace(/\s+/g, ' ').trim();
}

// ---------- blog-specific ----------
function parseFrontmatter(raw, file) {
  const m = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(file + ': missing frontmatter block');
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  for (const req of ['title', 'description', 'date', 'category', 'slug']) {
    if (!meta[req]) throw new Error(file + ': frontmatter missing required "' + req + '"');
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) throw new Error(file + ': date must be YYYY-MM-DD');
  if (meta.updated && !/^\d{4}-\d{2}-\d{2}$/.test(meta.updated)) throw new Error(file + ': updated must be YYYY-MM-DD');
  return { meta, body: m[2] };
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function fmtDate(iso) {
  const [y, mo, d] = iso.split('-').map(Number);
  return MONTHS[mo - 1] + ' ' + d + ', ' + y;
}
function rfc822(iso) {
  return new Date(iso + 'T12:00:00Z').toUTCString();
}
function readTime(md) {
  const words = plainText(md).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

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

function shell({ title, descr, head, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${escAttr(descr || '')}">
<link rel="icon" type="image/svg+xml" href="/assets/mark_primary.svg">
<link rel="stylesheet" href="/styles.css">
${head || ''}</head>
<body>
${header()}
${body}
${footer()}
<script src="/nav.js" defer></script>
</body>
</html>
`;
}

function ctaBand(slug) {
  const url = 'https://apps.shopify.com/stockwik-inventory-management?utm_source=stockwik_site&amp;utm_medium=referral&amp;utm_campaign=blog&amp;utm_content=' + escAttr(slug);
  return `<section class="section-sm">
  <div class="wrap">
    <div class="cta-band">
      <img class="loop-bg" src="/assets/mark_white.svg" alt="">
      <span class="eyebrow" style="color:var(--amber);">Ready when you are</span>
      <h2 style="margin-top:12px;">Start planning smarter buys today.</h2>
      <p class="lede">Install Stockwik from the Shopify App Store, connect your store, and get your first reorder plan in minutes. Free to install with a 14-day trial.</p>
      <div class="hero-actions">
        <a class="btn btn-primary btn-lg" href="${url}">${SHOPIFY_IC}Install on Shopify</a>
        <a class="btn btn-white btn-lg" href="/pricing.html">See pricing</a>
      </div>
    </div>
  </div>
</section>`;
}

function jsonLd(post) {
  const canonical = SITE + '/blog/' + post.slug;
  const org = { '@type': 'Organization', name: 'Stockwik', url: SITE };
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.h1,
    description: post.meta.description,
    datePublished: post.meta.date,
    dateModified: post.meta.updated || post.meta.date,
    author: org,
    publisher: {
      '@type': 'Organization', name: 'Stockwik', url: SITE,
      logo: { '@type': 'ImageObject', url: SITE + '/assets/mark_primary.svg' }
    },
    mainEntityOfPage: canonical,
    url: canonical
  };
  if (post.meta.image) data.image = SITE + post.meta.image;
  return '<script type="application/ld+json">' + JSON.stringify(data) + '</script>';
}

function postHead(post) {
  const canonical = SITE + '/blog/' + post.slug;
  const image = SITE + (post.meta.image || '/assets/mark_primary.svg');
  const card = post.meta.image ? 'summary_large_image' : 'summary';
  return [
    '<link rel="canonical" href="' + canonical + '">',
    '<link rel="alternate" type="application/rss+xml" title="Stockwik Blog" href="/blog/feed.xml">',
    '<meta property="og:type" content="article">',
    '<meta property="og:site_name" content="Stockwik">',
    '<meta property="og:title" content="' + escAttr(post.meta.title) + '">',
    '<meta property="og:description" content="' + escAttr(post.meta.description) + '">',
    '<meta property="og:url" content="' + canonical + '">',
    '<meta property="og:image" content="' + escAttr(image) + '">',
    '<meta property="article:published_time" content="' + post.meta.date + '">',
    '<meta property="article:modified_time" content="' + (post.meta.updated || post.meta.date) + '">',
    '<meta name="twitter:card" content="' + card + '">',
    '<meta name="twitter:title" content="' + escAttr(post.meta.title) + '">',
    '<meta name="twitter:description" content="' + escAttr(post.meta.description) + '">',
    '<meta name="twitter:image" content="' + escAttr(image) + '">',
    jsonLd(post)
  ].join('\n') + '\n';
}

// ---------- build posts ----------
const files = fs.existsSync(SRC)
  ? fs.readdirSync(SRC).filter(f => f.endsWith('.md') && f.toLowerCase() !== 'readme.md')
  : [];
const posts = [];

for (const f of files) {
  const raw = fs.readFileSync(path.join(SRC, f), 'utf8');
  const { meta, body } = parseFrontmatter(raw, f);
  const h1m = body.match(/^#\s+(.*)$/m);
  const h1 = h1m ? plainText(h1m[1].trim()) : meta.title;
  // Drop the markdown H1 — the template renders the headline itself.
  const bodyNoH1 = h1m ? body.replace(/^#\s+.*$/m, '') : body;
  posts.push({ meta, slug: meta.slug, h1, body: bodyNoH1, minutes: readTime(bodyNoH1) });
}

posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : a.meta.date > b.meta.date ? -1 :
  (Number(a.meta.order) || 99) - (Number(b.meta.order) || 99) || a.slug.localeCompare(b.slug)));

// Scheduled publishing: posts dated in the future are parsed and validated but
// not built, listed, fed, or sitemapped until a build runs on/after their date.
const TODAY = new Date().toISOString().slice(0, 10);
const live = posts.filter(p => p.meta.date <= TODAY);
const scheduled = posts.filter(p => p.meta.date > TODAY);

// A post may only link to blog posts that are live by its own publish date —
// otherwise it ships with a link that 404s until the target's build day.
const bySlug = new Map(posts.map(p => [p.slug, p]));
for (const p of posts) {
  for (const m of p.body.matchAll(/\]\(\/blog\/([a-z0-9-]+)\.html/g)) {
    const target = bySlug.get(m[1]);
    if (!target) console.warn('WARN ' + p.slug + ': links to unknown post /blog/' + m[1]);
    else if (target.meta.date > p.meta.date) console.warn('WARN ' + p.slug + ' (' + p.meta.date +
      '): links to ' + m[1] + ' which only goes live ' + target.meta.date);
  }
  if (fs.existsSync(path.join(BLOG_DIR, p.slug + '.html')) && p.meta.date > TODAY)
    console.warn('WARN ' + p.slug + ': generated HTML exists but the post is now future-dated');
}

for (const post of live) {
  const { meta } = post;
  const pageTitle = (meta.title + ' — Stockwik').length <= 60 ? meta.title + ' — Stockwik' : meta.title;
  if (pageTitle.length > 60) console.warn('WARN ' + post.slug + ': <title> is ' + pageTitle.length + ' chars (>60)');
  if (meta.description.length > 160) console.warn('WARN ' + post.slug + ': description is ' + meta.description.length + ' chars (>160)');

  let contentHtml = convert(post.body, '/blog/');
  contentHtml = contentHtml.replace('<p>', '<p class="post-lead">'); // first paragraph = answer-first lead

  const updated = meta.updated || meta.date;
  const metaLine = 'Published <time datetime="' + meta.date + '">' + fmtDate(meta.date) + '</time>' +
    ' · Last updated <time datetime="' + updated + '">' + fmtDate(updated) + '</time>' +
    ' · ' + post.minutes + ' min read';

  const body = `<section class="section post-section" style="padding-top:48px;">
  <div class="wrap post-wrap">
    <nav class="docs-breadcrumb"><a href="/blog/">Blog</a><span>/</span><span>${esc(meta.category)}</span></nav>
    <header class="post-header">
      <span class="eyebrow">${esc(meta.category)}</span>
      <h1>${esc(post.h1)}</h1>
      <div class="post-meta">${metaLine}</div>
    </header>
    <article class="doc-content post-body">
${contentHtml}
    </article>
  </div>
</section>
${ctaBand(post.slug)}`;

  fs.writeFileSync(path.join(BLOG_DIR, post.slug + '.html'), shell({
    title: pageTitle,
    descr: meta.description,
    head: postHead(post),
    body
  }));
}

// ---------- listing page ----------
let cards = '<div class="blog-grid">';
for (const post of live) {
  cards += `<a class="blog-card" href="/blog/${escAttr(post.slug)}.html">
    <span class="blog-cat">${esc(post.meta.category)}</span>
    <h3>${esc(post.h1)}</h3>
    <p>${esc(post.meta.description)}</p>
    <div class="blog-card-meta"><time datetime="${post.meta.date}">${fmtDate(post.meta.date)}</time> · ${post.minutes} min read</div>
  </a>`;
}
cards += '</div>';

const listingHead = '<link rel="canonical" href="' + SITE + '/blog/">\n' +
  '<link rel="alternate" type="application/rss+xml" title="Stockwik Blog" href="/blog/feed.xml">\n';

const listingBody = `<section class="section-sm" style="padding-top:56px;">
  <div class="wrap center">
    <span class="eyebrow">Blog</span>
    <h1 style="margin:14px 0 12px;">Inventory planning, in plain English.</h1>
    <p class="lede" style="margin:0 auto;">Practical guides on forecasting, reordering, and purchasing for Shopify merchants — from the team behind Stockwik.</p>
  </div>
</section>
<section class="section" style="padding-top:8px;">
  <div class="wrap">
    ${cards}
  </div>
</section>`;

fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), shell({
  title: 'Blog — Stockwik',
  descr: 'Practical guides on inventory planning, forecasting, reordering, and purchasing for Shopify merchants.',
  head: listingHead,
  body: listingBody
}));

// ---------- RSS feed ----------
function buildFeed() {
  let items = '';
  for (const post of live) {
    const link = SITE + '/blog/' + post.slug;
    items += `  <item>
    <title>${esc(post.h1)}</title>
    <link>${link}</link>
    <guid isPermaLink="true">${link}</guid>
    <pubDate>${rfc822(post.meta.date)}</pubDate>
    <category>${esc(post.meta.category)}</category>
    <description>${esc(post.meta.description)}</description>
  </item>
`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Stockwik Blog</title>
  <link>${SITE}/blog/</link>
  <atom:link href="${SITE}/blog/feed.xml" rel="self" type="application/rss+xml"/>
  <description>Practical guides on inventory planning, forecasting, reordering, and purchasing for Shopify merchants.</description>
  <language>en-us</language>
${items}</channel>
</rss>
`;
}
fs.writeFileSync(path.join(BLOG_DIR, 'feed.xml'), buildFeed());

// ---------- sitemap (whole site; extensionless URLs — Cloudflare Pages 308s .html) ----------
function docsUrls() {
  const urls = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name !== 'site-content' && e.name !== 'assets') walk(p);
      } else if (e.name.endsWith('.html')) {
        let rel = path.relative(ROOT, p).split(path.sep).join('/');
        rel = rel.replace(/index\.html$/, '').replace(/\.html$/, '');
        urls.push(SITE + '/' + rel);
      }
    }
  })(path.join(ROOT, 'docs'));
  return urls.sort();
}

function buildSitemap() {
  const marketing = ['', '/product', '/pricing', '/stocky-alternative', '/changelog', '/about', '/contact', '/privacy', '/terms']
    .map(p => ({ loc: SITE + (p || '/') }));
  const docs = docsUrls().map(u => ({ loc: u }));
  const blog = [{ loc: SITE + '/blog/' }].concat(live.map(p => ({
    loc: SITE + '/blog/' + p.slug,
    lastmod: p.meta.updated || p.meta.date
  })));
  const all = marketing.concat(docs, blog);
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const u of all) {
    xml += '  <url><loc>' + u.loc + '</loc>' + (u.lastmod ? '<lastmod>' + u.lastmod + '</lastmod>' : '') + '</url>\n';
  }
  return xml + '</urlset>\n';
}
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), buildSitemap());

console.log('Built ' + live.length + ' live blog posts + listing + feed.xml + sitemap.xml.');
if (scheduled.length) {
  console.log('Scheduled (not built until their date):');
  for (const p of scheduled) console.log('  ' + p.meta.date + '  ' + p.slug);
}
