# Stockwik marketing site

External-facing marketing and SEO site for **Stockwik** — inventory planning, forecasting, and purchasing for Shopify merchants.

## Pages

| File | Purpose | Primary keyword target |
|------|---------|------------------------|
| `index.html` | Homepage | brand + "inventory planning for Shopify" |
| `product.html` | Product / features deep-dive | "Shopify inventory management / forecasting" |
| `pricing.html` | Pricing tiers + billing FAQ | "stockwik pricing" |
| `stocky-alternative.html` | Stocky-replacement SEO page | "Stocky alternative", "Stocky shutdown" |

`styles.css` is the shared design system — the single source of truth for color, type, and components across all pages.

## Design system

- **Type:** Rajdhani Bold (display, headings, numbers, buttons, badges, table headers) + Inter (body, small UI text). Loaded from Google Fonts.
- **Palette:** indigo `#26215C`, mid/purple `#534AB7`, amber `#EF9F27` (accent — used sparingly for CTAs/actions), ink `#1A1640`.
- **Logo:** the "replenish loop" mark in `assets/`.

## Local development

It's a static site — no build step. Open any page directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Before launch — content TODO

These are placeholder values that must be replaced with real, verified content:

- [ ] **Pricing** — the `$29 / $79 / $199` tiers in `pricing.html` are placeholders.
- [ ] **Install links** — every `Install on Shopify` button points to `#`; repoint to the real App Store listing once live.
- [ ] **POS Pro price** — the "~$89/mo" figure on the Stocky page is from a single source; confirm current Shopify POS Pro pricing.
- [ ] **Mobile menu** — the hamburger button exists but isn't wired to a toggle yet.
- [ ] **Phase 2 pages** — About, Contact, Blog, Privacy, Terms are stubbed in the footer, not built.

## Verified facts (Stocky page)

- Stocky full shutdown + API deactivation: **August 31, 2026**.
- Removed from Shopify App Store: **February 2, 2026** (no new installs/reinstalls).
- Stocky required **Shopify POS Pro**; multi-location transfers were **removed in 2025**.
- Supplier data **cannot** be exported from Stocky.

(Confirm against Shopify's official announcement before publishing competitive claims.)
