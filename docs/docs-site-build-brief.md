# Stockwik `/docs` — Build Brief (hand-off to the static-site agent)

## Context
Stockwik needs a public, self-service user manual on the static marketing site (Cloudflare Pages,
separate repo, `stockwik.com/docs` or `help.stockwik.com`). It must let a merchant operate the entire
app **without contacting support**, and it lives on the public site (not in-app) so logged-out/locked-out
users can reach it and it's SEO-indexable. In-app help is just links pointing here.

**This file IS the hand-off brief.** It's written to be passed to the agent building the static site,
which has **no access to the app codebase** — so the "Canonical facts" section below is authoritative and
must be reproduced accurately. Everything here describes the app **as shipped today**; do not document
roadmap features (see Exclusions).

---

## 1. Deliverable & format
- A `/docs` section: one HTML page per leaf node in the sitemap (§4), plus a docs landing/index page with
  search or a category grid.
- **Task-oriented + reference + concepts** hybrid. How-to pages = numbered steps. Concept pages explain the
  "why" (especially the replenishment math). Reference pages = tables.
- Each page: H1 title, short intro (what/why/who), body, "Related" cross-links at the bottom.
- Insert **`[SCREENSHOT: description]`** placeholders where a screen capture belongs (Bryan adds images).
- Reuse a small set of components: **Tip / Note / Warning callouts**, **step lists**, **tables**, and a
  **plan badge** (`Starter` / `Growth` / `Pro`) shown on any feature/page that requires a paid tier.

## 2. Audience, voice & conventions
- Audience: Shopify SMB merchants, non-technical. Second person ("you"), plain language, short sentences.
- Lead with the task/outcome; avoid jargon — when a term is unavoidable, link to the Glossary.
- **Never expose internal tuning constants as promises** (e.g. the exact velocity half-life or the seasonal
  threshold). Describe behavior in plain terms ("recent sales count more"; "products with a strong seasonal
  peak"). Concrete user-facing defaults (days of cover 90, safety stock 14, lead time 7) ARE fine to state.
- Put a **plan badge** on every gated capability and a one-line "Available on Growth and up / Pro" note.
- Consistent terminology — use the Glossary (§5g) spellings exactly (e.g., "on hand", "available",
  "order-up-to (max)", "reorder point (min)", "buy option").

## 3. How to use the Canonical facts (§5)
The per-page outlines (§6) reference facts by tag like `{see §5b velocity}`. The site agent should pull the
exact numbers, formulas, statuses, and tier mapping from §5 rather than inventing them — this keeps facts
consistent across pages and correct. §5 is the single source of truth for this brief.

---

## 4. Sitemap (information architecture)
```
/docs  (landing: category grid + search)
├── getting-started/
│   ├── what-is-stockwik          — overview, who it's for, the core loop
│   ├── installing                — install from Shopify, permissions, the data we read
│   ├── choosing-a-plan           — plan selection, 14-day trial, billing is via Shopify
│   ├── creating-your-account     — signup, email verification, your workspace
│   ├── onboarding-walkthrough    — the 7-step setup wizard, step by step
│   └── dashboard-tour            — nav, Home cards, the Sync button, setup checklist
├── concepts/                     — "the why" (read this to trust the numbers)
│   ├── inventory-on-hand-available-committed
│   ├── how-sales-velocity-works
│   ├── how-reorder-levels-are-calculated   ← flagship concept page
│   ├── planning-defaults-and-overrides
│   ├── abc-classification
│   ├── buy-options-and-pack-sizes
│   └── how-syncing-works          — what syncs, Shopify as source of truth, 365-day window
├── inventory/
│   ├── inventory-list-and-views   — All / Overstocked / Dead stock / No supplier
│   ├── product-detail             — every field; editing cost; replenishment-rules tab
│   └── import-export-inventory    — CSV columns, override syntax, dry-run→apply
├── suppliers/
│   ├── managing-suppliers         — fields, lead time, seed-from-vendors, archive
│   ├── buy-options                — create/edit, packs, primary, MOQ
│   └── import-export              — supplier + buy-option CSV
├── reordering/
│   ├── the-reorder-page           — statuses, filters, destination, grouped by supplier
│   ├── understanding-suggestions  — suggested qty math, on-order, MOQ rounding, overrides
│   └── create-pos-from-suggestions
├── purchase-orders/   (Growth)
│   ├── creating-and-editing-pos   — manual + from reorder; lifecycle/statuses
│   ├── sending-a-po               — email / print / manual; company profile prerequisite
│   └── receiving-stock            — full/partial, short-receipt, cost push-back, history
├── counts/            (Growth)
│   └── cycle-counts-and-adjustments — flow, ✓ Correct, stale-guard, history
├── transfers/         (Pro)
│   └── transferring-stock         — create→ship→receive→close; cancel/return; short disposition
├── reports/           (Growth)
│   └── reports-overview           — the 4 groups + every report (one section each); period; export
├── settings/
│   ├── planning-defaults          — days of cover, safety stock, dead-stock threshold, ABC cutoffs
│   ├── company-profile            — PO "from" block
│   ├── locations                  — read-only, synced; default receiving location
│   └── plan-and-billing           — current plan, change plan, refresh, trial
├── account/
│   ├── plans-and-features         — tier matrix {see §5e}; what each unlocks
│   ├── changing-your-plan         — via Shopify; upgrades/downgrades; trial
│   ├── workspace-and-team         — one store = one workspace; inviting teammates
│   └── reconnecting-your-store    — "disconnected" vs "expired connection"; sign out
└── troubleshooting/
    ├── faq                        — top questions
    └── common-issues              — gates, locked features, stale numbers, email not sending
```

---

## 5. Canonical facts (authoritative — reproduce accurately)

**5a. Inventory model.** Four quantities, mirrored from Shopify (Shopify is the source of truth for stock):
- **On hand** — physical units in a location.
- **Committed** — units reserved to unfulfilled orders (will ship out).
- **Available** = on hand − committed (free to sell). **All replenishment math uses Available, not On hand.**
- **Incoming** — units on open purchase orders, expected to arrive.

**5b. Sales velocity.**
- **Blended velocity** = recency-weighted average weekly sales (recent weeks count more). **Daily velocity** = blended ÷ 7.
- **Peak velocity** = the busiest sustained stretch (best ~2-month rolling average) — used for seasonal items.
- **Seasonal** = a product whose peak is well above its blended rate; in its peak season the max uses peak velocity, off-season it uses blended (so you don't carry peak-size stock all year).
- **Days of stock** = available ÷ daily velocity (how long until you run out at the current pace).

**5c. Reorder levels (state in plain English + show a worked example).**
- **Reorder point (min)** = daily velocity × (supplier lead time + safety-stock days). "Order when on-hand drops to here."
- **Order-up-to (max)** = velocity basis × days of cover, where velocity basis = blended (or peak if seasonal & in-season). "Reorders bring stock up to here."
- **Suggested order qty** = round-up-to-MOQ of (max − available − incoming). Watch/Healthy items often suggest 0.
- **Hard overrides:** a pinned Min or Max number replaces the formula for that product.
- Defaults (org-level, overridable per product): **days of cover = 90**, **safety-stock days = 14**, **lead time = 7** (lead time comes from the supplier).
- Worked example to reuse: velocity 0.5/day, lead 7, safety 14 → min = 0.5×21 ≈ **10**; cover 90 → max = 0.5×90 = **45**.

**5d. Reorder statuses.** **Stockout risk** (days of stock < lead time — won't arrive in time even if ordered today), **Reorder** (at/below reorder point), **Watch** (approaching reorder point), **Healthy** (above), plus an **On order** badge when units are already on an open PO.

**5e. Plan → feature matrix (AUTHORITATIVE — from entitlements).**
| Capability | Starter $29 | Growth $39 | Pro $79 |
|---|---|---|---|
| View inventory, reorder suggestions, suppliers, buy options | ✓ | ✓ | ✓ |
| Planning settings, dashboard, sync, CSV import/export | ✓ | ✓ | ✓ |
| Create / send / **receive** purchase orders | — | ✓ | ✓ |
| Cycle counts & adjustments | — | ✓ | ✓ |
| Edit product cost (writes back to Shopify) | — | ✓ | ✓ |
| **Reports** (all four groups) | — | ✓ | ✓ |
| **Transfers** between locations | — | — | ✓ |
| **Multi-location** planning | — | — | ✓ |

So: **Starter = read-only advisor** (see what to buy; no Shopify writes, no Reports). **Growth = close the loop** (POs, receiving, counts, cost edits, Reports). **Pro = multi-location + transfers.** 14-day free trial on all; billing runs through Shopify's hosted pricing page (not in-app). Annual ≈ 2 months free. (Note: Starter does NOT include Reports — do not imply otherwise.)

**5f. Sync behavior.** Manual **Sync** button (top bar). A full sync pulls products, locations, inventory (on hand/available/committed), and sales (a **rolling 365-day** window). First sync auto-creates a supplier per Shopify vendor and a default **"Each"** buy option per product. The Counts page auto-refreshes inventory when opened. Writes (receiving, counts, cost) push to **Shopify first**, then record locally. There is no scheduled/webhook auto-sync yet — sync is user-triggered. (Phrase the window as "a full year of sales history" — do not claim multi-year.)

**5g. Glossary terms** (define each on a Glossary page and link to it): on hand, available, committed, incoming, velocity (blended/peak), days of stock, reorder point (min), order-up-to (max), days of cover, safety stock, lead time, buy option, units per pack/equivalent units, MOQ, primary buy option, ABC class, seasonal, stockout risk, dead stock, overstock, shrinkage, workspace.

---

## 6. Per-page content outlines
For each page: the headings + key points to cover, which §5 facts to pull, and screenshot markers. Keep
how-tos as numbered steps; put a plan badge on gated pages.

### Getting started
- **what-is-stockwik** — one-paragraph overview (reuse the marketing opener), the core loop (sync → see what to buy → order → receive → count), who it's for (Shopify SMBs). Link to choosing-a-plan + onboarding.
- **installing** — install from the Shopify App Store; the Shopify permission prompt (reads products, inventory, orders incl. full history, locations; writes inventory for receiving/counts); what data Stockwik reads {§5f}; note already-installed stores open straight in. `[SCREENSHOT: Shopify install/permission screen]`
- **choosing-a-plan** — plan selection happens before account setup; the three tiers at a glance {§5e}; 14-day trial; billing/checkout is on Shopify. Link to plans-and-features.
- **creating-your-account** — prefilled email/company/name, set a password, **email verification code**, your workspace is created. `[SCREENSHOT: signup]` `[SCREENSHOT: verification]`
- **onboarding-walkthrough** — the 7 steps, each as a short subsection: **1 Connect** (auto-done if installed from Shopify), **2 Import** (progress bar; ~20–60s; auto-seeds suppliers + "Each" buy options), **3 Suppliers** (optional — download/edit/re-upload the CSV or skip; lead time matters most), **4 Planning** (days of cover + safety stock {§5c}; default receiving location if >1), **5 Costs** (optional CSV; powers value/margins/PO totals), **6 Buy options** (optional — only if you buy in cases/pallets; explain units-per-pack), **7 Finish** → dashboard. Note you can redo Suppliers/Planning/Costs/Buy-options later. `[SCREENSHOT: each step]`
- **dashboard-tour** — left nav (Dashboard, Inventory, Reorder, Purchase orders, Adjustments, Transfers if ≥2 locations, Suppliers, Reports, Settings; locked items show a 🔒 with a plan badge), Home cards (To reorder, Awaiting receipt, Open POs, Overstock, Dead stock, Products) + setup checklist, the **Sync** button {§5f}, user menu. `[SCREENSHOT: dashboard]`

### Concepts
- **inventory-on-hand-available-committed** — define the four quantities {§5a} with a worked example (100 on hand, 20 committed → 80 available); stress that planning uses Available.
- **how-sales-velocity-works** — blended vs peak, days of stock, what "seasonal" means {§5b}, in plain terms (no magic constants).
- **how-reorder-levels-are-calculated** (flagship) — reorder point and order-up-to formulas in plain English + the worked example {§5c}; how lead time, days of cover, safety stock feed in; seasonal max; how overrides win; how the suggested qty is derived (with MOQ rounding and on-order). This is the page that lets a user trust/tune the numbers.
- **planning-defaults-and-overrides** — org defaults vs per-product overrides; where each is set (Settings vs product detail); the four override fields (min, max, days of cover, safety stock) and "auto vs pinned".
- **abc-classification** — ranked by revenue share; A/B/C; the configurable cutoffs (default 80/15/5); how to use it to prioritize.
- **buy-options-and-pack-sizes** — what a buy option is, units-per-pack conversion (sell singles, buy by the case of 12), primary option, MOQ; why inventory is in units but ordering is in packs.
- **how-syncing-works** — {§5f}; Shopify is the source of truth for stock; writes push to Shopify first; the 365-day rolling window (a full year); manual sync today (no auto-sync yet).

### Inventory
- **inventory-list-and-views** — the four views (All / Overstocked / Dead stock / No supplier) and the columns each shows {column meanings from §5a/§5b/§5d}; search, sort, resize, select, pagination; Actions menu (export/import/template). `[SCREENSHOT: inventory All view]`
- **product-detail** — header (image, name, SKU, ABC, "not reordering" flag), pricing/inventory stats, demand & planning stats, units-sold windows, velocity chart, **Replenishment rules tab** (min/max cards showing the computation + the four override fields → Save), **Suppliers tab** (buy options table; add/edit/delete). Note editing cost writes back to Shopify (Growth). `[SCREENSHOT: product detail]`
- **import-export-inventory** — export columns (overview); editable import columns (sku, cost, the four overrides); the **override syntax** (number = pin, `auto` = revert, blank = leave unchanged); products matched by SKU, never created; dry-run → preview → **all-or-nothing apply**; idempotent. `[SCREENSHOT: import preview]`

### Suppliers
- **managing-suppliers** — list columns + inline lead-time edit; the detail form fields (name, account #, website, contact, email, phone, **lead time**, currency, payment terms, address, special instructions on every PO, internal notes, archived); **Seed missing** (gap-fill suppliers from Shopify vendors). `[SCREENSHOT: supplier detail]`
- **buy-options** — what they are {concept link}; the standalone Buy options page (search/filter/sort); add-option flow (supplier or +new, pack type Each/Case/Box/Pallet/Custom, units per pack, supplier SKU, cost per pack, MOQ, primary).
- **import-export** — supplier CSV (two-tier match: id then name) and buy-option CSV (match: id then sku+supplier+units); validation highlights; all-or-nothing.

### Reordering
- **the-reorder-page** — status summary cards {§5d}, destination-location picker, status toggles (lean default = stockout+reorder), search, grouped-by-supplier with lead-time note + subtotal, the table columns; export options. `[SCREENSHOT: reorder page]`
- **understanding-suggestions** — how the suggested qty is computed {§5c suggested}, on-order awareness, MOQ rounding (order whole cases), why Watch/Healthy show 0, how a pinned override shows alongside the computed value; editing the order qty (in packs) and the live "= units".
- **create-pos-from-suggestions** — select lines → "Create N draft PO(s)" (one per supplier to the chosen destination) → review in Purchase orders. Note lines snapshot cost/pack at creation.

### Purchase orders `Growth`
- **creating-and-editing-pos** — manual (+ New PO: supplier, destination) and from reorder; PO fields (lines: product, qty in packs, pack, cost/pack, total units, unit cost, line total; header: supplier order #, notes for supplier, internal notes); statuses **Draft → Ordered → Partial → Received / Cancelled**; editing rules per status (draft fully editable; "Edit order" on ordered/partial). `[SCREENSHOT: PO detail]`
- **sending-a-po** — Mark as ordered; **Email PO** (PDF to supplier email; requires Company profile email set), **PDF / Print**, or send manually. `[SCREENSHOT: PO PDF]`
- **receiving-stock** — open an Ordered/Partial PO → Receive; enter counted qty per line (full or partial); commit pushes on-hand to Shopify (reason "received") then records the receipt; **short-receipt** → keep open (Partial) or close; cost is updated to the receipt cost and pushed back to Shopify; receiving history with per-line variance; safe to retry (idempotent).

### Counts `Growth`
- **cycle-counts-and-adjustments** — open Adjustments (auto-refreshes inventory); search/filter by supplier (count batch); enter counted qty or click **✓ Correct**; variance + variance $ shown; commit pushes the absolute on-hand to Shopify with a **stale-guard** (if a sale landed mid-count that line is rejected and re-prompted with fresh numbers; the rest commit); "last counted" stamped even at zero variance; **History** tab. `[SCREENSHOT: count grid]`

### Transfers `Pro`
- **transferring-stock** — appears only with ≥2 locations; create (source, destination, products, qty — blocked by source availability) → **Confirm & ship** (source available −qty; status In transit) → **Receive** at destination (full/partial; dest available +qty) → close; **cancel/short** → return-to-source or mark-lost; PDF; statuses Draft / In transit / Partial / Received / Cancelled. `[SCREENSHOT: transfer]`

### Reports `Growth`
- **reports-overview** — the four groups, each report as a short subsection describing what it shows:
  - *Inventory & valuation:* Inventory by location · Valuation (by location/category/supplier/health) · Dead/aged stock · Overstock · Reorder worksheet.
  - *Sales & profitability:* Monthly sales · ABC analysis · Sell-through · Top sellers · Gross margin (note: uses current cost, approximate).
  - *Purchasing & suppliers:* Spend by supplier · Open POs · Lead-time performance · Fill rate.
  - *Operations & audit:* Shrinkage · Transfers · Movement ledger (every stock movement; on-screen cap with full CSV export).
  - Common: period picker (30/90/365/custom), CSV + PDF export. `[SCREENSHOT: a report]`

### Settings
- **planning-defaults** — days of cover, safety stock, dead-stock threshold (months), ABC cutoffs (A/B/C %); these are org-wide and overridable per product.
- **company-profile** — name/email/phone/address; used as the "from" block + reply-to on POs.
- **locations** — read-only, synced from Shopify (edit in Shopify, re-sync); kind badges; default receiving location selector; addresses become PO ship-to.
- **plan-and-billing** — current plan + status + trial end; Change plan / Choose a plan (opens Shopify), Refresh; billing managed by Shopify.

### Account
- **plans-and-features** — the full matrix {§5e} + a short description of each tier's value; trial; annual.
- **changing-your-plan** — Settings → Plan & billing → Change plan → Shopify's pricing page; upgrades unlock immediately; downgrades; trial behavior.
- **workspace-and-team** — one Shopify store = one workspace; inviting teammates (Clerk user menu); multiple stores = multiple workspaces.
- **reconnecting-your-store** — two cases: **"Your store is disconnected"** (you uninstalled Stockwik in Shopify) and **"Reconnect your store / connection expired"** (the secure connection lapsed — data is safe); both → click **Reconnect store**; a **Sign out** link is on these screens. `[SCREENSHOT: reconnect card]`

### Troubleshooting
- **faq** — "Why am I seeing 'Choose a plan'?" (no active subscription), "Why is a feature locked / what's the 🔒?" ({§5e}, upgrade), "Why is my reorder suggestion 0?" (covered/Watch/Healthy), "Why did a suggestion jump?" (seasonal peak), "How far back are sales?" (a rolling year), "How often does it sync?" (manual today), "Does Stockwik change my Shopify inventory?" (only via receiving/counts/cost, and Shopify stays the source of truth).
- **common-issues** — stale numbers → run Sync; "connection expired"/"disconnected" → reconnect; PO email not sending → set Company profile email; count line rejected → re-verify (a sale landed mid-count); import blocked → fix the flagged row (all-or-nothing).

---

## 7. Exclusions (do NOT document — not user features / not shipped)
- Admin/operator console, "view as customer" impersonation, internal metrics.
- Dev/staging-only: manual API-key store connect, the "use processed date" toggle, the org switcher / creating multiple orgs (hidden in production).
- Roadmap/not-built: automatic/webhook sync, per-location demand attribution, barcode scanning, AVCO/FIFO & landed cost, Stocky CSV migration, variant/size-grid features, multi-year sales history. Don't imply these exist (omit, or a single "Coming soon" page if Bryan wants one — not in this scope).

## 8. Verification (how to confirm the docs are complete & correct)
- **Coverage:** every left-nav item and every Settings/Reports sub-section has a page; every §5 fact appears on at least its concept/reference page.
- **Accuracy:** cross-check all formulas, the tier matrix, statuses, and defaults against §5 (the authoritative source); confirm Starter is shown WITHOUT Reports.
- **Plan badges:** Purchase orders, Counts, Reports → `Growth`; Transfers + multi-location → `Pro`; everything else unbadged.
- **No leakage:** none of the §7 exclusions appear.
- **Links:** all internal cross-links and in-app "Help/Learn more" deep links resolve.
- **Task test:** a new merchant can, using only the docs, complete: connect → understand a reorder suggestion → create & receive a PO → run a cycle count. If any step is unclear, expand that page.
