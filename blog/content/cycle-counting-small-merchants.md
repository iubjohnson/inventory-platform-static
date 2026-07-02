---
title: Cycle Counting for Shopify Stores: A Guide
description: Keep inventory accurate without an annual shutdown count — small rolling batches, variance tracking, and a staleness rotation that never misses a product.
date: 2026-08-04
category: Operations
slug: cycle-counting-small-merchants
---

# Cycle counts: keep inventory accurate without closing the shop

A cycle count is a small, routine physical count — one supplier's products, one shelf, twenty minutes — instead of the annual everything-at-once stocktake that shuts the shop and ruins a weekend. It matters because every planning number you rely on sits on top of one assumption: that the stock the system shows is the stock on the shelf. That assumption decays constantly — mis-picks, try-ons, returns to the wrong bin, miscounted receipts, plain theft — and cycle counting is how you repair it faster than it erodes.

## Why the annual count fails

The once-a-year stocktake has three built-in problems: errors live in your numbers for up to a year before they're found (quietly mis-timing reorders the whole time — remember, [reorder math](/blog/shopify-reorder-points-guide.html) runs on *available* stock); it's a monster task, so it gets deferred; and one exhausted evening of counting everything produces worse counts than twenty fresh minutes counting a slice. Cycle counting inverts all three: small batches, high frequency, always current.

## A rotation that runs itself

The question that kills most counting programs is "what should we count today?" The answer that works is a **staleness rotation**:

1. Sort your catalog by **last counted** date, oldest (and never-counted) first.
2. Count the top batch — by supplier or by shelf area, whatever matches how your stockroom is organized.
3. Confirm the correct ones, fix the wrong ones, commit — which stamps today's date on everything you touched and drops it to the bottom of the list.

Each pass automatically targets whatever's most overdue. No schedule to maintain, no spreadsheet of what's been done — the sort order *is* the schedule. Weight it by value if you like: fast movers and expensive products earn a spot in the rotation more often than the slow tail.

> **Tip:** "This one's correct" is a result worth recording, not a wasted count. Confirmations are the proof your numbers can be trusted — a product confirmed accurate last week is one you don't need to second-guess when its reorder suggestion looks odd.

## Handle the mid-count sale

The classic small-shop hazard: you're counting while the store is open, someone buys two units mid-count, and your "counted 14" overwrites the sale and adds phantom stock. A safe workflow re-checks the system number at commit time — if it changed while you counted, that line gets flagged for a re-verify instead of silently clobbering reality. If your process is a clipboard and a CSV import, at least count fast-moving products at opening time, not mid-rush.

## Watch the variance, not just the count

Each count's **variance** (counted − expected, valued at cost) is a diagnostic, not just a correction:

- **Consistent shortfalls on one supplier's products** → receiving misses or short shipments — tighten [the receiving process](/blog/receiving-inventory-best-practices.html).
- **Shrinkage concentrated in one area** → a layout or security problem with a location attached.
- **Rising total variance over time** → your process is decaying; count more often, not less.

A history of count sessions — who counted, when, net variance — turns "our inventory feels off" into a trend line you can act on.

## What this looks like in Stockwik

[Stockwik's counts](/docs/counts/cycle-counts-and-adjustments.html) implement this whole pattern: a count grid refreshed from Shopify before you start, supplier filters for tidy batches, a sortable **Last counted** column that runs the staleness rotation for you, one-tap "correct" confirmations, live variance in units and dollars, a stale-guard that catches mid-count sales, and a session history that feeds a shrinkage report. Commit writes the counted truth back to Shopify — so the [statuses and suggestions](/blog/prevent-stockouts-best-sellers.html) upstream are working from shelf reality.

## FAQ

### How often should a small merchant cycle count?
A short session weekly beats a big one monthly. With a staleness rotation, frequency per product sorts itself out — fast movers surface more often simply because their errors matter more and get noticed.

### Do I need to close the store to count?
No — that's the point of cycle counts. Count in small batches during quiet hours, with a process that catches sales happening mid-count.

### What's an acceptable inventory accuracy?
Track your variance trend rather than chasing a magic number. Improving is healthy; degrading means the process needs attention regardless of the absolute figure.
