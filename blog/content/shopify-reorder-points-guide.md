---
title: How to Calculate Reorder Points for Shopify
description: The reorder point formula (daily sales × lead time + safety stock), a worked example, and how to automate it across every variant in your Shopify store.
date: 2026-07-02
category: Reordering
slug: shopify-reorder-points-guide
order: 4
---

# How to calculate reorder points for your Shopify store (with a worked example)

A reorder point is the stock level at which you should place a new order — low enough that you're not sitting on excess cash, high enough that you don't run out before the shipment lands. The formula is simple: **reorder point = daily sales × (supplier lead time in days + safety-stock days)**. The hard part isn't the math; it's keeping it current for hundreds of variants whose sales pace keeps changing. This guide walks through the formula by hand, then shows how to automate it.

## The formula, piece by piece

**Reorder point = daily sales × (supplier lead time + safety-stock days)**

- **Daily sales** — average units sold per day. Use recent history, weighted toward the last few weeks; a year-old spike shouldn't set today's reorder point.
- **Supplier lead time** — days from placing an order to stock arriving. This is per supplier: a domestic mill might be 7 days, an overseas factory 60.
- **Safety-stock days** — buffer days against a sales spike or a late delivery. Two weeks is a sensible default for most products; more for critical items with unreliable suppliers.

> **Plain English:** order when you have just enough left to cover the delivery wait, plus a couple of weeks of cushion.

## A worked example

Say a **Pima Tee · M / White** sells **0.5 units a day**, your supplier (Pacific Knit Co.) delivers in **7 days**, and you keep **14 days** of safety stock:

| Level | Math | Result |
|---|---|---|
| **Reorder point** | 0.5 × (7 + 14) | **≈ 10 units** |
| **Order-up-to level** | 0.5 × 90 days of cover | **45 units** |

When available stock drops to about **10**, it's time to order. And the *second* number answers the follow-up question — how much? — which brings us to:

## How much to order: the order-up-to level

The reorder point says *when*; an **order-up-to level** says *how much*. Decide how many days of demand you want on the shelf when a shipment lands ("days of cover" — 90 days, roughly 12 weeks, is a reasonable default for most small merchants) and refill to it:

**Order-up-to = daily sales × days of cover**

**Suggested order quantity = order-up-to − available − incoming**

Subtracting **incoming** (units already on an open purchase order) is what stops you from double-ordering. Continuing the example: order-up-to is 45, you have 12 available and 0 incoming → order **33 units**. If Pacific Knit Co. sells that tee in cases of 12, round up to **3 cases (36 units)**.

> **Tip:** Always compute from **available** stock (free to sell), not on-hand — units already committed to unfulfilled orders can't cover future demand. More on the difference: [On hand, available & committed](/docs/concepts/inventory-on-hand-available-committed.html).

## Why spreadsheets fall over

The formula works in a spreadsheet for a dozen products. It stops working when:

- **Sales pace changes** — daily sales is a moving number, and a stale velocity gives you a wrong reorder point in whichever direction hurts more.
- **You have variants** — an apparel store with 40 styles in 6 sizes and 4 colors is ~960 reorder points, each with its own velocity.
- **Seasonality** — a product heading into its peak needs a bigger buffer than its off-season average suggests.
- **Lead times differ by supplier** — one formula column can't reflect that your reorder point on domestic goods should be a third of the one on container-shipped goods.

This is the job [Stockwik](/product.html) automates: it computes [sales velocity](/docs/concepts/how-sales-velocity-works.html) from a rolling year of your Shopify order history (recent sales weighted heavier), applies each supplier's real lead time and your safety-stock buffer, recalculates every variant's reorder point continuously, and rounds suggested quantities to your supplier's case sizes and MOQs. Products then surface by status — **Stockout risk**, **Reorder**, **Watch**, or **Healthy** — so the morning check is a glance, not a spreadsheet session. (Full math, with defaults and overrides: [How reorder levels are calculated](/docs/concepts/how-reorder-levels-are-calculated.html).)

## FAQ

### What is the reorder point formula?
Reorder point = daily sales × (supplier lead time in days + safety-stock days). Example: 0.5 sales/day × (7-day lead time + 14 safety days) ≈ 10 units.

### What's a good safety stock?
Around 14 days of demand is a sensible default. Raise it for critical products or unreliable suppliers; lower it for slow movers where overstock ties up cash.

### How is a reorder point different from a low-stock alert?
A low-stock alert fires at a number you picked once, by hand. A reorder point is *calculated* from current sales pace and lead time — it moves when your business does.

### Should reorder points be per variant?
Yes. Sizes and colors sell at very different rates; a style-level reorder point overstocks slow variants while the popular size stocks out.
