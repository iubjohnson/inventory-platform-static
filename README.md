# Stockwik marketing site

External-facing marketing and SEO site for **Stockwik** — inventory planning, forecasting, and purchasing for Shopify merchants. Static HTML/CSS, deployed via Cloudflare Pages (auto-deploy on push to `main`).

## Pages

| File | Purpose | Primary keyword target |
|------|---------|------------------------|
| `index.html` | Homepage | brand + "inventory planning for Shopify" |
| `product.html` | Product / features deep-dive | "Shopify inventory management / forecasting" |
| `pricing.html` | Pricing tiers + billing FAQ | "stockwik pricing" |
| `stocky-alternative.html` | Stocky-replacement SEO page | "Stocky alternative", "Stocky shutdown" |
| `about.html`, `contact.html`, `changelog.html` | Company pages | — |
| `privacy.html`, `terms.html` | Legal | — |
| `blog/` | SEO blog — generated from `blog/content/*.md` via `node blog/build-blog.mjs` | long-tail inventory topics |
| `docs/` | Help center — generated from `docs/site-content/*.md` via `node docs/build-docs.mjs` | support + AI-citation content |

Blog and docs HTML are **generated** — edit the markdown and rebuild; never hand-edit the output. The blog build also emits `blog/feed.xml` and the site-wide `sitemap.xml`.

`styles.css` is the shared design system — the single source of truth for color, type, and components across all pages. Full brand spec in `brand/`.

Analytics: GA4 (`G-NLFR1F2THM`) via a gtag snippet in every public page's `<head>` — inserted directly in root pages and emitted by the blog/docs generators. `brand/*.html` is internal and untagged.

## Local development

Internal links are extensionless pretty URLs (`/pricing`, not `/pricing.html`), so use a server that resolves them the way Cloudflare Pages does:

```bash
npx serve .
# then visit http://localhost:3000
```

(`python3 -m http.server` serves files literally, so extensionless links 404 there.)

## Remaining pre-launch TODO

Pricing ($29/$39/$49), install CTAs, mobile menu, and all Phase-2 pages (About/Contact/Blog/Privacy/Terms) have shipped. Still open:

- [ ] **Legal review** — attorney pass on `privacy.html` + `terms.html`; fill `[Legal Entity Name]`, `[State/Country]` governing law, `[Business mailing address]` placeholders.

## Verified facts (Stocky page)

- Stocky full shutdown + API deactivation: **August 31, 2026**.
- Removed from Shopify App Store: **February 2, 2026** (no new installs/reinstalls).
- Stocky required **Shopify POS Pro** ($89/mo/location, $79 on annual — verified 2026-07-16); multi-location transfers were **removed in 2025**.
- Supplier data **cannot** be exported from Stocky.

Keep competitive claims factual and verifiable.
