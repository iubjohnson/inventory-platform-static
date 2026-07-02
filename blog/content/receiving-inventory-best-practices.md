---
title: Receiving Inventory: Best Practices for Shopify
description: Receiving is where inventory accuracy is won or lost. How to receive against POs, handle short shipments and partials, and keep costs current.
date: 2026-07-23
category: Purchasing
slug: receiving-inventory-best-practices
---

# Receiving inventory: stop losing stock between the truck and the shelf

Receiving is the least glamorous step in the buying loop and the one where inventory accuracy is actually won or lost. Every number your planning relies on — available stock, days of cover, reorder timing — inherits whatever happened at the receiving door. A shipment counted carelessly (or "received" by just trusting the packing slip) plants an error that compounds: the system thinks you have 36, you have 31, and you discover the difference as a stockout you never saw coming.

## The one rule: receive against the order, not the box

The packing slip tells you what the supplier *claims* they sent. The purchase order tells you what you *asked for*. Receiving means comparing physical reality to both:

1. Open the PO for the shipment and go line by line: expected quantity vs. **what you physically count**.
2. Record what actually arrived — full or partial — line by line.
3. Commit, so the counted reality (not the paperwork) becomes your inventory.

That's the whole discipline. Everything else is handling the exceptions well.

## Handle the three exceptions explicitly

- **Short shipments.** Ordered 36, received 24. Decide on the spot: keep the PO **open** for the backordered balance, or **close it as-is** if the supplier isn't sending the rest. An open partial keeps those 12 units visible as *incoming* — closing silently makes them vanish from your planning.
- **Damage and substitutions.** Damaged units aren't sellable inventory — don't receive them into stock and "deal with it later"; later never comes. Record what's actually shelf-ready.
- **Split deliveries.** One PO arriving across two weeks is normal for larger orders. Receive each delivery as its own partial receipt against the same PO, with a history of who received what, when.

## Let receiving maintain your costs

A receipt is also the moment you *know* the real unit cost — it's on the invoice in your hand. A good workflow updates each product's cost from the receipt and pushes it to Shopify's "Cost per item," so margin reports and inventory valuation track what you're actually paying, not what you paid in 2024. Doing this by hand across every receipt is exactly the kind of chore that stops happening by March; it should be a side effect of receiving, not a separate task.

## Process habits that keep the door honest

- **Receive the same day stock arrives.** Unreceived boxes are unsellable inventory and invisible to your reorder math ("incoming" that already arrived).
- **Count, don't skim** — at least for A-tier products. If full counts are impractical, always count your best sellers and spot-check the rest.
- **One owner per shipment.** A receipt history with names attached ("who received this, when, with what variance") turns arguments into lookups.
- **Reconcile variances weekly.** A supplier who's short-shipped three times isn't unlucky — that's data for your next negotiation, and for their [safety-stock setting](/blog/safety-stock-how-much.html).

## What this looks like in Stockwik

[Stockwik's receiving](/docs/purchase-orders/receiving-stock.html) is built on exactly this model: receive against an ordered PO line by line with expected quantities pre-filled, partials kept open or closed explicitly, per-receipt history with variance, and stock plus costs pushed to Shopify on commit — so the [reorder math](/blog/shopify-reorder-points-guide.html) upstream is always working from what actually landed. It's the second half of the [PO workflow](/blog/shopify-purchase-orders-guide.html); one without the other is half a loop.

## FAQ

### What does "receiving against a PO" mean?
Recording actual arrivals line by line against the purchase order's expected quantities — so discrepancies are caught at the door, and inventory reflects a physical count rather than the packing slip.

### How should I handle a partial delivery?
Receive what arrived and keep the PO open for the balance. The outstanding units stay visible as incoming stock, and the next delivery gets received against the same order.

### Why did my inventory drift even though we receive everything?
Common causes: receiving from the packing slip instead of counting, damaged units received as sellable, and shipments that sat unreceived for days while sales continued. Regular cycle counts catch the residue.
