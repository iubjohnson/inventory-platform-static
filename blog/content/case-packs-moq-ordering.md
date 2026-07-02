---
title: Case Packs, MOQs & Pack Sizes: Ordering Guide
description: Suppliers sell in cases and minimums, not the 33 loose units your math suggested. How to order the way suppliers actually sell without breaking your planning.
date: 2026-07-30
category: Purchasing
slug: case-packs-moq-ordering
---

# Case packs, MOQs, and pack sizes: order the way suppliers actually sell

Your inventory math lives in single units — you sell one tee at a time — but your suppliers live in **cases, boxes, pallets, and minimums**. The mill doesn't ship 33 tees; it ships cases of 12, three-case minimum. Every reorder therefore ends with a conversion step, and if that conversion happens in someone's head on every line of every PO, it's slow, error-prone, and quietly distorts your stock levels in both directions. The fix is to make pack rules part of the product's data, so the conversion happens in the math instead of in your head.

## The vocabulary, quickly

- **Pack size (units per pack)** — how many sellable units come in one orderable pack: a case of 12, a box of 50. This is the key conversion between "how you sell" and "how you buy."
- **MOQ (minimum order quantity)** — the smallest order the supplier will accept, usually expressed in packs: "three-case minimum."
- **Supplier SKU** — the supplier's item number for that pack, which is what belongs on the PO.
- **Pack cost** — the price per case/box; your *unit* cost is pack cost ÷ units per pack.

## Rounding: the decision hidden in every order line

Say the suggestion is **33 units** and the supplier sells cases of 12. Your options are 2 cases (24 — under-buying by 9) or 3 cases (36 — over by 3). The default should be **round up**: the shortfall from under-buying usually costs more (an earlier stockout, another order cycle, more freight) than a few units of extra cover on a product you know sells.

But watch the two exceptions:

- **Slow movers with big packs.** A 0.1/day product suggested at 4 units, sold in cases of 48, "rounds up" to more than a year of stock. That's not a rounding decision anymore — it's a buying decision: is this product worth a case? Sometimes the right answer is no, or a different supplier with smaller packs.
- **MOQs that dwarf the need.** A three-case minimum on a product that needs half a case turns the reorder into "buy 4½ months of cover or none." Batch it with the next real need for that supplier rather than triggering an order for one line.

> **Tip:** MOQs are also why **one PO per supplier per cycle** beats scattered single-product orders — several half-case needs across products clear a minimum together that none would alone. (More on that flow: [our purchase-orders guide](/blog/shopify-purchase-orders-guide.html).)

## Same product, more than one way to buy it

Real catalogs have wrinkles the simple model misses: the same tee available from two suppliers at different case sizes and prices, or one supplier offering both singles (expensive) and cases (cheap). Model each as its own **buy option** — supplier, pack, cost, MOQ — and mark one as the **primary** that reorder suggestions use. When the backup supplier becomes the main one, you switch the primary rather than re-keying data.

## What this looks like in Stockwik

This is exactly how [Stockwik](/product.html) models purchasing: every product carries [buy options](/docs/concepts/buy-options-and-pack-sizes.html) (pack type, units per pack, pack cost, supplier SKU, MOQ, primary flag), suggestions arrive **already converted** — 33 units becomes *3 cases (36 units)* on the draft PO — and MOQs are respected automatically. New products start with a simple "Each" option so nothing blocks a reorder; you add pack rules only for products you genuinely buy by the case. The result: [the reorder page](/docs/reordering/the-reorder-page.html) speaks supplier language, and nobody does case math at 7am.

## FAQ

### What's the difference between a pack size and an MOQ?
Pack size is how many units are in one orderable pack (case of 12). MOQ is the fewest packs the supplier will accept per order (3-case minimum). They compound: a 3-case MOQ of 12-packs means 36 units minimum.

### Should I round order quantities up or down?
Up, by default — under-buying usually costs more than a few extra units. Except on slow movers where a big pack means months of extra cover; treat those as a separate buying decision.

### How do I handle a product I buy from two suppliers?
Keep a buy option per supplier (each with its own pack, cost, and MOQ) and mark the one you're currently using as primary for suggestions. Switching suppliers is then one click, not a data migration.
