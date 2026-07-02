---
title: How Sales Velocity Works for Shopify Inventory
description: Sales velocity — how fast each product sells — drives every good reorder decision. How to measure it, why plain averages mislead, and how to put it to work.
date: 2026-07-07
category: Forecasting
slug: sales-velocity-explained
---

# Sales velocity: the number behind every good reorder decision

Sales velocity is simply how fast a product sells — units per week or per day. It's the engine behind every reorder decision: velocity determines *when* a product hits its reorder point and *how much* you should buy. Get velocity right and the rest of inventory planning is arithmetic; get it wrong and every downstream number — reorder points, order quantities, days of stock — is wrong in whichever direction costs you more.

## The problem with a plain average

The obvious way to measure velocity is "units sold last year ÷ 52." The trouble is that a plain average treats every week as equally informative, and your business isn't static:

- A product that's **picking up** — say a Pima Tee that did 2/week all year but 5/week the last month — gets planned at its stale, low rate. You reorder late and thin, and stock out just as it's taking off.
- A product that's **slowing down** gets planned at its old, high rate. You keep buying like it's still hot and pile up dead stock.
- A one-time spike (a feature, a flash sale) a year ago drags the average around long after it stopped saying anything about demand.

The fix is a **recency-weighted average**: recent weeks count more than older ones, so the number tracks what the product is doing *now* while still smoothing out day-to-day noise.

## Three numbers, one health check

From weekly velocity you derive the two numbers you'll actually use day to day:

| Number | Formula | What it tells you |
|---|---|---|
| Daily sales | weekly velocity ÷ 7 | The drain rate — feeds all reorder math |
| Days of stock | available ÷ daily sales | How long the current pile lasts |
| Reorder point | daily sales × (lead time + safety days) | The stock level that means "order now" |

> **Example:** a product with 80 units available selling about 4 a day has roughly **20 days of stock** left. If your supplier takes 21 days to deliver, you're already late.

Note the input: **available** stock (free to sell), not on-hand — units committed to unfulfilled orders can't cover future demand ([the difference explained](/docs/concepts/inventory-on-hand-available-committed.html)).

## Clean inputs: count demand, not noise

Velocity should reflect **genuine demand**, so measure it from your order history with two corrections: net out refunds that restocked, and exclude cancelled orders. Otherwise a fraud cancellation or a bulk return quietly inflates the sales rate — and your next order with it. A rolling **year** of history is the sweet spot: long enough to capture seasonality, short enough to stay relevant.

## One velocity isn't enough for seasonal products

A product with a real busy season has two meaningful rates: its everyday pace and its **peak** pace. Plan year-round on the blend and you'll be short every peak; plan year-round on the peak and you'll carry bloated stock all off-season. The answer is to use the peak rate when the busy window approaches and the blended rate the rest of the year — which is what [Stockwik](/product.html) does automatically, detecting seasonal patterns from each product's own history with nothing to configure ([how it works](/docs/concepts/how-sales-velocity-works.html)).

## Putting velocity to work

In practice, velocity turns into action through the reorder math covered in [our reorder-points guide](/blog/shopify-reorder-points-guide.html): reorder point = daily sales × (lead time + safety days), order-up-to = daily sales × days of cover. Stockwik computes a recency-weighted velocity per **variant** from a rolling year of Shopify history and keeps all of it current on every sync — so the M/White tee and the XS/Olive tee each get planned at their own pace, not the style average.

## FAQ

### What is sales velocity?
How fast a product sells, expressed in units per week or per day. It's calculated from sales history — ideally weighted toward recent weeks so it reflects current demand.

### How do I calculate days of stock?
Available units ÷ daily sales. A product with 30 available selling 2 a day has 15 days of stock.

### Why is my reorder suggestion suddenly bigger?
Usually one of two reasons: the product's recent sales pace picked up (recency weighting responds fast), or a seasonal product is entering its peak window and is being planned at its peak rate.

### Does velocity work for new products?
Not until they've sold — no history means no rate. Pin a manual minimum based on a comparable product, then let calculated velocity take over after a few weeks of sales.
