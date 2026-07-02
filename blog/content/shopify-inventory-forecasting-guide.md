---
title: Shopify Inventory Forecasting: A Practical Guide
description: How to forecast inventory for a Shopify store — sales velocity, days of stock, seasonality, and turning forecasts into actual purchase orders.
date: 2026-07-02
category: Forecasting
slug: shopify-inventory-forecasting-guide
order: 5
---

# Shopify inventory forecasting: a practical guide for small merchants

Inventory forecasting is using your sales history to predict future demand, so you order the right amount at the right time instead of guessing. For a Shopify merchant it comes down to three numbers per product: **sales velocity** (how fast it sells), **days of stock** (how long the current pile lasts), and **lead time** (how long a refill takes). If days of stock is smaller than lead time, you're already late. This guide covers how to compute those numbers by hand — and what a proper forecasting tool adds on top.

## Start with sales velocity

Velocity is just how fast a product sells — units per week or per day. Two rules make it useful instead of misleading:

- **Weight recent sales more heavily.** A product that did 2/week all year but 5/week the last month should be planned near 5, not the annual average. A recency-weighted average tracks today's reality.
- **Use real demand.** Net out refunds that restocked and exclude cancelled orders, or your velocity is inflated by sales that didn't stick.

From weekly velocity, **daily sales = weekly ÷ 7** — the number that feeds everything downstream.

> **Example:** a product with 80 units available selling about 4 a day has roughly **20 days of stock** left (80 ÷ 4).

## The three-number health check

| Number | How to get it | What it tells you |
|---|---|---|
| Daily sales | Recency-weighted weekly velocity ÷ 7 | How fast stock is draining |
| Days of stock | Available ÷ daily sales | How long until you run out |
| Lead time | Per supplier, from experience | How long a refill takes |

The comparison that matters: **days of stock vs. lead time + a safety buffer**. When days of stock falls to that threshold, order. That's all a [reorder point](/blog/shopify-reorder-points-guide.html) is — the same comparison expressed in units.

> **Tip:** Compute days of stock from **available** inventory (free to sell), not on-hand. Units committed to unfulfilled orders are already spoken for. See [On hand, available & committed](/docs/concepts/inventory-on-hand-available-committed.html).

## Don't let seasonality ambush you

An annual average hides the shape of the year. A product that sells 1/day in spring and 4/day from October on will stock out every Q4 if you plan on the blend — and if you plan on the peak year-round, you'll drown in stock every spring. The fix is to track a product's **peak rate** separately from its everyday rate: build up ahead of the busy stretch using the peak rate, then revert to the normal rate after. Look at last year's monthly sales per product; the seasonal ones are obvious in the chart.

## From forecast to purchase order

A forecast that doesn't change what you buy is a dashboard, not a tool. The output you want, per product, is a **suggested order quantity**:

**Suggested quantity = (daily sales × days of cover) − available − incoming**

…where *days of cover* is how much demand you want on the shelf (90 days is a sane default), and *incoming* is what's already on open POs so you never double-order. Round the result up to your supplier's case size or MOQ, group by supplier, and you have a purchase order — not just a prediction. (The full math: [How reorder levels are calculated](/docs/concepts/how-reorder-levels-are-calculated.html).)

## Doing it by hand vs. automating it

Everything above works in a spreadsheet — once, for a handful of products. The trouble is that velocity moves weekly, every variant has its own rate, and seasonal windows open and close. That's the part software should own. [Stockwik](/product.html) recalculates a recency-weighted velocity from a rolling year of your Shopify order history (refunds netted out, cancellations excluded), detects seasonal peaks automatically, and converts the forecast into ready-to-send purchase orders rounded to your suppliers' pack sizes — with every product flagged **Stockout risk**, **Reorder**, **Watch**, or **Healthy** so you know where to look first. It reads your existing Shopify history, so forecasts work from the first sync — there's nothing to accumulate. (Details: [How sales velocity works](/docs/concepts/how-sales-velocity-works.html).)

## FAQ

### How do I forecast inventory for a Shopify store?
Compute each product's sales velocity from recent order history (weighted toward recent weeks), divide available stock by daily sales to get days of stock, and reorder when days of stock approaches your supplier's lead time plus a safety buffer.

### How much sales history do I need?
A full year captures seasonality; a few months is enough for a workable velocity on steady sellers. A brand-new product with no sales has no velocity — set a manual minimum until it has history.

### What's the difference between forecasting and a reorder point?
Forecasting predicts demand; a reorder point converts that prediction into a trigger — the stock level at which you place an order. You need both: one to know how much, one to know when.

### Can I forecast new products with no sales history?
Not from data you don't have. Pin a manual minimum/maximum based on comparable products, then let the calculated levels take over once real sales accumulate.
