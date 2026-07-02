---
title: Shopify Built-In Inventory Tools: The Limits
description: What Shopify's built-in inventory tools cover, and the planning jobs they leave to you — forecasting, reorder points, and knowing how much to buy.
date: 2026-07-21
category: Shopify basics
slug: shopify-native-inventory-limits
---

# Shopify's built-in inventory tools: what they cover and where you'll outgrow them

Shopify's admin handles inventory **record-keeping** well: it tracks stock by location, adjusts levels with reason codes, moves quantities between locations, and has been steadily absorbing basics like simple purchase-order records and low-stock alerts. What it doesn't do is inventory **planning** — it will tell you a product is at 4 units, but never whether 4 is fine or a five-alarm fire, when you should have ordered, or how much to buy. Knowing which side of that line your problems live on tells you whether you need an app at all.

## What the admin genuinely covers

- **Stock tracking by location** — on-hand, committed, and available quantities per location, adjustable with reasons.
- **Basic transfers** — recording stock moved between your locations.
- **Simple purchase-order records and low-stock alerts** — Shopify has been adding these basics to the admin over time (check your plan's current feature set; it changes).
- **Inventory reports** — snapshots and history in Analytics.

If your operation is a handful of products, one supplier, and reordering "when it looks low" — honestly, the built-ins plus attention may be all you need. No app is cheaper than any app.

## The jobs it leaves on the table

| Job | Built-in answer | What's actually needed |
|---|---|---|
| *When* should I reorder? | A low-stock alert at a number you picked once | A reorder point computed from live sales velocity and each supplier's lead time |
| *How much* should I buy? | — | Order-up-to targets minus available minus incoming, rounded to case packs and MOQs |
| Is demand rising, falling, seasonal? | Raw sales reports | Recency-weighted velocity with seasonal-peak detection |
| Supplier knowledge | A vendor name field | Lead times, MOQs, pack sizes, costs per supplier — driving the math |
| Receiving discipline | Adjust quantities by hand | Receive against the PO, partials, per-receipt costs pushed back to Shopify |
| Counting stock | Manual adjustments | Cycle-count sessions with variance tracking and an audit trail |

The pattern in every row: the admin stores *state*, but planning needs *decisions* — and decisions come from math over your sales history, supplier lead times, and open orders combined.

## The honest test: where does your time go?

You've outgrown the built-ins when any of these is true:

- You maintain a **reorder spreadsheet** next to Shopify (the spreadsheet *is* the planning tool; it's just a bad one — here's [the math it's trying to do](/blog/shopify-reorder-points-guide.html)).
- You've **stocked out of a best seller** you own plenty of data about, or found dead stock you don't remember over-buying.
- **Variants** make manual planning combinatorial — 40 styles × sizes × colors is hundreds of independent reorder decisions.
- You've caught yourself **double-ordering** because nothing tracked what was already on a PO.
- Multiple locations mean you're guessing **where** stock is needed, not just how much ([transfer vs. reorder](/blog/shopify-multi-location-transfers.html)).

## Keep the admin for state, add planning on top

The good news: this isn't rip-and-replace. A planning app like [Stockwik](/product.html) sits *on top* of Shopify's records — it reads your products, locations, and sales history, computes velocity, reorder points, and suggested quantities per variant, runs the PO/receiving/counting workflows, and writes the results back so Shopify remains the source of truth ([how syncing works](/docs/concepts/how-syncing-works.html)). You keep everything the admin does well and add the layer it doesn't attempt.

## FAQ

### Is Shopify's built-in inventory management enough?
For record-keeping, yes. For planning — knowing when and how much to reorder — no; that math isn't what the admin is built to do. Small simple catalogs can bridge the gap with attention; growing ones can't.

### Does Shopify forecast inventory demand?
The admin reports what sold; it doesn't compute sales velocity, reorder points, or suggested order quantities per variant.

### Do I lose Shopify's inventory features if I add an app?
No — a planning app reads from and writes back to Shopify's inventory, so the admin's own tracking, reports, and integrations keep working unchanged.
