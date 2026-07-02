---
title: Safety Stock: How Much Do You Actually Need?
description: Safety stock protects you from demand spikes and late deliveries. How to size the buffer in days of demand, when to raise or lower it, and what it costs.
date: 2026-07-09
category: Reordering
slug: safety-stock-how-much
---

# Safety stock: how much buffer does your store actually need?

Safety stock is the cushion between "the math said we'd be fine" and reality — extra inventory that absorbs a sales spike or a late delivery so you don't stock out. The practical way to size it is in **days of demand**, not units: around **14 days** is a sensible default for most products, more for critical items with unreliable suppliers, less for slow movers where the buffer just ties up cash. Sizing it in days means the buffer automatically scales with how fast each product actually sells.

## Why days beat units

"Keep 20 extra units of everything" is the spreadsheet-era approach, and it fails in both directions: 20 units is a month of cushion on a slow mover (dead cash) and two days on your best seller (no protection at all). Expressed in days, the same rule sizes itself:

| Product | Daily sales | 14 days of safety stock |
|---|---|---|
| Pima Tee · M / White | 0.9/day | ≈ 13 units |
| Pima Tee · XS / Olive | 0.1/day | ≈ 1–2 units |
| Chino Shorts · 32 / Charcoal | 0.5/day | ≈ 7 units |

Same policy, three very different buffers — each proportional to the risk it's protecting against.

## Where safety stock sits in the math

Safety stock doesn't sit on a shelf with a label; it lives inside your reorder point:

**Reorder point = daily sales × (supplier lead time + safety-stock days)**

The lead-time part covers demand *while you wait* for a normal delivery. The safety days cover the two things that go wrong: demand running hotter than expected, and the delivery landing later than promised. If both behave, the buffer just rolls forward untouched. (Full walk-through with a worked example: [How to calculate reorder points](/blog/shopify-reorder-points-guide.html).)

## When to raise it

- **Unreliable or long lead times.** A supplier who's "45 days, usually" deserves more cushion than one who hits 7 days every time. Overseas production with a missed boat can slip weeks, not days.
- **Critical products.** Your best sellers and anything a customer came specifically to buy — the cost of a stockout (lost sale, lost ad spend, lost momentum) dwarfs the cost of a few extra units. See [how sales velocity identifies these](/blog/sales-velocity-explained.html).
- **Volatile demand.** Products whose weekly sales swing hard need more buffer than steady sellers with the same average.
- **Single-source items.** No backup supplier means no plan B — the buffer *is* the plan B.

## When to lower it

- **Slow movers.** Two weeks of buffer on a 0.1/day product is ~1 unit; rounding up beyond that is just parked cash.
- **Fast, reliable, nearby suppliers.** If a reorder reliably lands in 5 days, a 14-day cushion may be double what you need.
- **Cash is tight.** Safety stock is insurance, and insurance has a premium: carrying cost. Trimming buffer on B- and C-tier products frees cash for the A-tier where stockouts actually hurt.

> **Note:** Textbook safety-stock formulas (z-scores, demand standard deviation) exist and are statistically sound — but they need clean demand-variance data per SKU and assume you'll maintain the model. For a small merchant, days-of-demand with per-product overrides captures most of the benefit with none of the ceremony.

## Set the default, override the exceptions

The workable pattern: one org-wide default (14 days), then per-product overrides for the exceptions — raise it on the critical single-source item, drop it on the slow tail. That's exactly how [Stockwik](/product.html) is set up: safety stock is a planning default in Settings, adjustable per product, and it's baked into every reorder point automatically ([Planning defaults & overrides](/docs/concepts/planning-defaults-and-overrides.html)).

## FAQ

### What is safety stock?
Extra inventory held to absorb demand spikes and delivery delays. It's the buffer between your forecast and reality.

### How much safety stock should I keep?
Start at about 14 days of demand per product. Raise it for critical items, volatile sellers, and unreliable suppliers; lower it for slow movers and fast, dependable ones.

### Is safety stock the same as a reorder point?
No — safety stock is one ingredient. Reorder point = daily sales × (lead time + safety-stock days). The buffer extends the reorder point so an order gets placed earlier.

### Does more safety stock always mean fewer stockouts?
Diminishing returns kick in fast. The first two weeks of buffer prevent most stockouts; beyond that you're mostly paying carrying cost for rare events.
