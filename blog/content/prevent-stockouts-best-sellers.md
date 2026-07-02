---
title: How to Prevent Stockouts on Your Best Sellers
description: Best sellers stock out for predictable reasons — static alerts, invisible lead times, slow reactions. A playbook for keeping your top products in stock.
date: 2026-07-28
category: Reordering
slug: prevent-stockouts-best-sellers
---

# How to stop stocking out of your best sellers

Stockouts cluster on best sellers for a simple reason: they're the products where demand moves fastest, so any planning method that reacts slowly — a low-stock alert set last year, a monthly spreadsheet review, "I eyeball it" — fails there first. And a best-seller stockout is the most expensive kind: you lose the sale, the ad spend that drove the click, the search ranking the product's momentum earned, and sometimes the customer. The fix isn't heroics; it's making reorder timing *automatic* on exactly the products where timing matters most.

## Why it's always the best seller

- **Velocity outruns static alerts.** You set the alert at 10 when the product sold 0.5/day — six weeks after it accelerates to 2/day, an alert at 10 fires five days *after* the point of no return.
- **Lead time is invisible until it isn't.** With a 45-day overseas supplier, the decision window closed a month and a half before the shelf went empty. The stockout you see today was caused in May.
- **Healthy-looking numbers lull you.** 60 units feels comfortable — but at 3/day with a 21-day lead time, 60 units is *at the reorder point*, not above it.
- **The reorder was late *and* thin.** Ordering off stale velocity means the replenishment that finally lands is sized for the old, slower demand — so you stock out again in a month.

## The playbook

**1. Reorder points from live velocity, not memory.** The trigger has to move with demand: reorder point = daily sales × (lead time + safety days), recalculated continuously from recency-weighted sales ([the full math](/blog/shopify-reorder-points-guide.html), [how velocity works](/blog/sales-velocity-explained.html)). A best seller that doubles its pace doubles its reorder point the same week.

**2. Extra safety stock on the A-tier.** The products that hurt most when they're gone deserve the biggest cushion. Two weeks of buffer is a fine default; raise it on top sellers with volatile demand or shaky suppliers ([sizing guide](/blog/safety-stock-how-much.html)).

**3. Watch days of cover, not unit counts.** "60 units" means nothing; "20 days of stock against a 21-day lead time" is an alarm. Days of cover (available ÷ daily sales) is the one number that's comparable across your whole catalog.

**4. Keep incoming stock visible.** Half of over- and under-ordering is not knowing what's already on a PO. Suggested quantity = order-up-to − available − *incoming* — which requires [a real PO workflow](/blog/shopify-purchase-orders-guide.html).

**5. Mind the pack math.** If the suggestion is 33 units but the supplier ships cases of 12, someone has to decide 3 cases — every time, without arithmetic errors, or the reorder stalls in a draft.

**6. Make the check a glance, not a project.** The reason spreadsheet planning fails isn't the formulas — it's that nobody re-runs them daily. Surface the products that need action *today* and let everything healthy stay invisible.

## Statuses: triage you can act on

This is why [Stockwik](/product.html) boils every product down to one of four statuses:

| Status | Meaning | Action |
|---|---|---|
| **Stockout risk** | You'll run out before a new order could arrive | Act now |
| **Reorder** | At or below the reorder point | Order this cycle |
| **Watch** | Above the point but trending toward it | No action yet |
| **Healthy** | Comfortably stocked | Ignore |

The morning check becomes: open the [Reorder page](/docs/reordering/the-reorder-page.html), handle the red and amber rows, done. Velocity, lead times, safety stock, and incoming POs are all baked into the status — per variant, so the M/White that's flying doesn't hide behind the style's comfortable-looking total.

## FAQ

### What causes stockouts on best sellers specifically?
Fast-moving demand plus slow-reacting triggers. Static low-stock alerts and periodic manual reviews fail first on the products whose velocity changes quickest.

### How do I know how much stock to keep of a best seller?
Reorder point = daily sales × (lead time + safety-stock days); refill to daily sales × days of cover. Both scale automatically with the product's current velocity.

### Can I prevent stockouts without overstocking everything else?
Yes — that's the point of per-product math. Buffers sized in days of demand are naturally big on fast movers and small on slow ones, instead of one blanket rule.
