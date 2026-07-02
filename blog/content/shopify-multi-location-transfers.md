---
title: Multi-Location Inventory Transfers on Shopify
description: How to move stock between Shopify locations without losing track of it — statuses, receiving, short shipments, and when to transfer instead of reorder.
date: 2026-07-14
category: Operations
slug: shopify-multi-location-transfers
---

# Multi-location stock transfers on Shopify (now that Stocky's are gone)

A stock transfer moves inventory from one of your locations to another — warehouse to storefront, shop to shop — and the whole job is keeping both locations' numbers honest while the goods are on the road. It's also a capability in flux for Shopify merchants: **Stocky removed multi-location transfers in 2025**, ahead of its full shutdown on August 31, 2026, so many retailers who relied on it are rebuilding this workflow elsewhere.

## Transfer or reorder? The five-minute decision

Before creating a purchase order, check your *other* locations. The classic multi-location pattern: a size is dead in one shop and sold out in the other. A transfer beats a reorder whenever:

- **The stock already exists** — one location is overstocked (or just slow) in exactly what another needs.
- **Speed matters** — a van between locations is days faster than a supplier's lead time.
- **It's effectively free** — no MOQ, no case-pack rounding, no supplier invoice.

A reorder is right when *all* locations are short — that's real demand outgrowing real supply, a job for [reorder points](/blog/shopify-reorder-points-guide.html), not shuffling.

## The lifecycle that keeps counts honest

The mechanics matter more than they look, because a transfer is two inventory movements separated by time. The clean model:

| Stage | What happens to inventory |
|---|---|
| **Draft** | Nothing — you're composing the plan |
| **In transit** | Source stock decreases; destination unchanged |
| **Partial / Received** | Destination increases by what actually arrived |

The subtle but important property: **while stock is in transit it's absent from both locations' available counts** — exactly matching where it physically is (a box in a van). If the system instead moves stock instantly, the destination "has" inventory it can't sell for two days, and anything that sells in that window oversells.

## Handle the ugly cases up front

Transfers go wrong in mundane ways, and your process needs an answer for each:

- **Short receipt** — 10 shipped, 8 arrived. Decide explicitly: keep the transfer open for the stragglers, credit the missing units back to the source, or write them off as lost. Silence is how two units vanish from your books forever.
- **Simultaneous sales** — customers keep buying while you count boxes. Each leg of the transfer should be its own clean adjustment so a sale mid-transfer can't corrupt the numbers.
- **Paper for the mover** — whoever drives the van needs a printed list of what's supposed to be in it. That document is also your receiving checklist at the other end.

## What this looks like in Stockwik

[Stockwik](/product.html) implements exactly this model for Shopify stores: draft → confirm (stock leaves the source and the transfer goes in-transit) → receive at the destination, with short receipts prompting an explicit *return-to-source or mark-as-lost* choice, printable transfer documents, and both legs written back to Shopify as separate clean adjustments ([full walkthrough](/docs/transfers/transferring-stock.html)). Since planning is per-location, the Reorder page also shows you where stock actually sits before you buy more of it.

## FAQ

### Can Shopify transfer inventory between locations?
Shopify's admin has basic transfer records, and apps add the operational layer — in-transit tracking, receiving against the transfer, short-shipment handling, and transfer documents.

### What happened to Stocky's transfers?
Stocky removed multi-location transfers in 2025, and the whole app shuts down August 31, 2026. If transfers were part of your Stocky workflow, that capability needs a new home before then — see our [migration checklist](/blog/stocky-shutting-down-migration-checklist.html).

### Should in-transit stock show as available?
No — at either location. It can't be sold at the source (it's gone) or the destination (it hasn't arrived). Available counts should reflect what's physically sellable.
