---
title: Inventory Planning for Apparel Brands on Shopify
description: Why apparel inventory is a variant problem — size curves, broken runs, case packs, long lead times — and how to plan reorders at the size/color level.
date: 2026-07-02
category: Industry playbooks
slug: apparel-inventory-planning-shopify
order: 6
---

# Inventory planning for apparel brands on Shopify: size curves, variants, and reorders

Apparel inventory planning has one rule that generic advice misses: **the unit of planning is the variant, not the product**. Your "Pima Tee" doesn't stock out — the *M / White* does, while *XS / Olive* gathers dust. Plan at the style level and you'll simultaneously overstock slow variants and lose sales on the popular ones. Everything else — size curves, broken runs, case packs, long mill lead times — follows from getting that unit right.

## Why apparel is harder than the average Shopify catalog

- **Variant explosion.** 40 styles × 6 sizes × 4 colors is 960 SKUs, each with its own sales rate. No one maintains 960 reorder points in a spreadsheet.
- **Size curves aren't flat.** M and L might be half your tee sales while XS and XXL are single digits — and the curve differs by style and by color.
- **Broken size runs quietly kill conversion.** A product page missing its two most popular sizes still looks "in stock" in your admin totals, but to half your shoppers it's sold out.
- **Suppliers sell in packs.** Mills and factories quote MOQs and case packs — often prepacked size ratios — not the 13 loose units your math suggested.
- **Lead times are long and mixed.** A domestic knitter might restock in a week; overseas production is 60–90 days. One safety buffer can't fit both.
- **Seasons flip the demand curve.** Chino shorts in March and fleece in October don't sell like their annual averages.

## Plan every variant like its own product

The mechanics are the same [reorder-point math](/blog/shopify-reorder-points-guide.html) any store uses — **daily sales × (lead time + safety days)** — just applied per variant:

| Variant | Daily sales | Lead time + buffer | Reorder point | Available | Status |
|---|---|---|---|---|---|
| Pima Tee · M / White | 0.9 | 7 + 14 days | ≈ 19 | 11 | **Reorder** |
| Pima Tee · S / Olive | 0.3 | 7 + 14 days | ≈ 6 | 4 | **Reorder** |
| Chino Shorts · 32 / Charcoal | 0.5 | 45 + 14 days | ≈ 30 | 26 | **Stockout risk** |
| Chino Shorts · 36 / Charcoal | 0.1 | 45 + 14 days | ≈ 6 | 31 | **Healthy** |

Two things to notice. The shorts' reorder points dwarf the tees' — same math, longer lead time (an overseas supplier vs. a domestic knit mill). And the 36-waist is healthy at 31 units while the 32 is at risk at 26: identical product, different velocity. That's the size curve doing its work — and why the style-level total ("57 shorts in stock") tells you nothing.

## Ordering: respect the pack, watch the curve

When you do reorder, two apparel-specific rules:

1. **Round to how the supplier sells.** If Loomstate Mills ships that tee in case packs of 12, a suggested 33 units becomes 3 cases (36). Build the rounding into the plan, or you'll do case math by hand on every line of every PO.
2. **Reorder the curve, not the total.** Refill each size to its own target rather than "topping up the style." This is what keeps runs unbroken — the M/L core deep, the tails shallow but present.

> **Tip:** Track your **sell-through by size** on new styles early. The first few weeks of a launch tell you whether the size curve you bought matches the one your customers vote for — while there's still time to adjust the reorder.

## Multi-location, counts, and the rest of the loop

If you run retail and warehouse (or two shops), a size can be dead in one location and sold out in the other — **transfers** are often faster than a new PO, and they're free. And because apparel accuracy erodes fast (try-ons, mis-scans, returns to the wrong shelf), regular **cycle counts** on your top styles keep the "available" number the whole plan rests on honest.

This whole loop is what [Stockwik](/product.html) runs for Shopify apparel merchants: velocity and reorder points per variant, statuses (**Stockout risk / Reorder / Watch / Healthy**) to surface what needs attention, POs that round to case packs and MOQs, [receiving](/docs/purchase-orders/receiving-stock.html), [transfers](/docs/transfers/transferring-stock.html), and [cycle counts](/docs/counts/cycle-counts-and-adjustments.html) — with seasonal peaks detected from each variant's own history.

## FAQ

### How do I stop breaking size runs?
Set reorder points per variant, sized to each variant's own velocity, and reorder when core sizes hit them — don't wait for the style total to look low. The style total is the last place a broken run shows up.

### How much of each size should I order?
Order to each size's own target: daily sales × days of cover, minus what's available and incoming, rounded to the supplier's pack. Your sales history *is* your size curve — use it rather than a generic ratio.

### What about brand-new styles with no history?
Borrow the size curve from your most comparable existing style, order conservatively, and re-order from real data once a few weeks of sales exist. New-variant velocity starts working as soon as there's history.
