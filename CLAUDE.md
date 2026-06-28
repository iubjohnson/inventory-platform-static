# CLAUDE.md — Stockwik marketing site

Project conventions and context for Claude Code. Read this before making changes.

## What this is
External-facing marketing + SEO site for **Stockwik**, an inventory planning /
forecasting / purchasing app for Shopify merchants. Static HTML/CSS, no build step,
no framework. Deployed via Cloudflare Pages (Git auto-deploy on push to `main`).

## Files
- `index.html` — homepage
- `product.html` — product/features deep-dive
- `pricing.html` — pricing + billing FAQ
- `stocky-alternative.html` — "Stocky alternative" SEO page (highest-intent traffic)
- `styles.css` — shared design system; SINGLE SOURCE OF TRUTH for all styling
- `assets/` — logo SVGs (the "replenish loop" mark)

When adding a page, copy the header/footer from an existing page so nav stays consistent.

## Design system (do not drift from this)
**Full brand spec lives in `/brand`:**
- `brand/stockwik_brand_guidelines.html` — logo, color, type foundations + rationale
- `brand/stockwik_design_system.html` — UI components (typography, buttons, tabs, tables, forms, badges) with the full type scale and "which font goes where" table
- `brand/logos/` — complete logo set (horizontal + stacked lockups; primary/mono/reversed marks)
Read these before any significant visual work. The summary below is the quick reference.

- **Fonts:** Rajdhani Bold (700) for display, headings, numbers, buttons, badges,
  table headers. Inter for body + small UI text (labels, table data, captions).
  Rule: Rajdhani for large/short display; Inter for anything small or running
  (Rajdhani cramps at small sizes). Both load free from Google Fonts.
- **Type scale:** display 40 / h1 30 / h2 21 / h3 16 (Rajdhani); body 15 / small 13 / label 12 (Inter).
  Line-height ~1.0–1.1 for Rajdhani display, ~1.55–1.65 for Inter body.
  Numbers use tabular figures (`font-variant-numeric:tabular-nums`).
- **Colors (CSS vars in styles.css):**
  - indigo `#26215C` (primary), mid/purple `#534AB7` (links/accents/center dot),
    amber `#EF9F27` (ACTION color — CTAs only, used sparingly; "amber means do-this"),
    ink `#1A1640`, papers `#FBFAF7`/`#F4F2EC`, wash-indigo `#F5F4FC`.
  - Soft tints: mid-soft `#EEEDFE`, amber-soft `#FCEFD8`.
  - Status semantics: stockout=red `#A32D2D`, reorder=amber, watch=indigo, healthy=green `#3B6D11`.
- **Logo:** the "replenish loop" mark — a three-quarter indigo arc with a gap at top center,
  4 amber dots climbing toward the gap, a small arrowhead at the gap (pointing clockwise),
  and a filled mid-purple center dot. Geometry (100×100 viewBox, center 50,50): solid arc
  sweeps 26°→235° (0°=top, clockwise); 4 dots evenly spaced 235°→334°. Name- and font-agnostic.
  **Stacked lockup is the preferred primary** (wordmark is long). Don't reconstruct it —
  use the SVGs in `brand/logos/` or `assets/`.
- **Wordmark:** lowercase **"stockwik"** (name = "stock" + "quick"). Never capitalized in the logo.
- **Voice:** plain, operator-to-operator, specific. Not "revolutionize your workflow."
- Use existing component classes (.btn, .feat, .preview, .cmp, .faq, .cta-band, etc.)
  rather than inventing new styles. Keep amber rare.

## Product example data
Use **apparel basics** as example products everywhere (largest Shopify category).
Show variants (e.g. "Pima Tee · S / Olive", "Chino Shorts · 36 / Charcoal").
Suppliers: Pacific Knit Co., Loomstate Mills, Northpoint Apparel.
NEVER use beer/homebrew examples. Keep product names short enough to stay on one line in tables.

## App status taxonomy (must match the real app)
Four statuses: **Stockout risk / Reorder / Watch / Healthy**. Use these exact labels.
Real app column header is "Available" (not "On hand").

## Install CTAs
All "Install on Shopify" + "Start free trial" buttons link to:
`https://apps.shopify.com/stockwik-inventory-management`
with UTM params: `utm_source=stockwik_site&utm_medium=referral&utm_campaign=install_cta`
and a per-location `utm_content` (e.g. home_hero, pricing_growth, stocky_cta).
Encode `&` as `&amp;` in HTML. Footer About/Contact/Blog/Privacy/Terms are Phase 2 stubs (href="#") — leave them.

## Verified Stocky facts (for the stocky-alternative page)
- Full shutdown + API deactivation: **Aug 31, 2026**. App Store delisting: **Feb 2, 2026**.
- Stocky required **Shopify POS Pro** (~$89/mo — VERIFY current price before relying on it).
- Multi-location transfers **removed in 2025**. Supplier data **cannot** be exported.
- Always keep competitive claims factual and verifiable.

## Pre-launch TODO (placeholders to replace)
- [ ] Real pricing (the $29/$79/$199 tiers are placeholder)
- [ ] Confirm current Shopify POS Pro price
- [ ] Wire mobile hamburger menu (button exists, no toggle JS yet)
- [ ] Build Phase 2 pages: About, Contact, Blog, Privacy, Terms
- [ ] App Store listing name: "Stockwik: Inventory Planning" (≤30 chars, brand-first)

## Local dev
Static site — just serve the folder:
```
python3 -m http.server 8000   # http://localhost:8000
```
