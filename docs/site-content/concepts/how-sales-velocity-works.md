# How sales velocity works

"Velocity" is just how fast a product sells. It's the engine behind every reorder suggestion: it decides when a product needs reordering and how much to buy. Stockwik calculates it from your actual Shopify sales history, so you don't have to estimate anything.

## Blended velocity (your normal pace)

Stockwik's main measure is **blended velocity** — your average weekly sales, weighted so that **recent sales count more** than older ones. That weighting matters: if a product has picked up (or slowed down) lately, the number reflects today's reality rather than being dragged around by stale history.

From blended velocity, Stockwik derives:

- **Daily sales** = blended weekly velocity ÷ 7 — the figure used in the reorder math.
- **Days of stock** = available ÷ daily sales — how long your current stock will last at the current pace.

> **Example:** A product with 80 units available selling about 4 a day has roughly **20 days of stock** left.

## Peak velocity (your busy stretch)

Some products sell evenly all year; others have a clear busy season. So Stockwik also tracks **peak velocity** — the product's sales rate during its busiest sustained stretch. This is what lets it plan ahead for seasonal demand instead of being caught short.

## Seasonal products

When a product's peak is **noticeably higher** than its everyday pace, Stockwik flags it as **seasonal** and adjusts automatically:

- **In its peak season**, the order-up-to (maximum) level is calculated from the *peak* rate — so you build stock up before the rush.
- **Outside peak season**, it reverts to the normal blended rate — so you're not sitting on peak-sized inventory in the quiet months.

This is detected from the product's own sales pattern; there's nothing to configure. You can see whether a product is treated as seasonal on its detail page.

> **Tip:** If a reorder suggestion suddenly jumps up, a seasonal product entering its peak window is the usual reason — Stockwik is getting you ready for the busy period.

## What feeds velocity

Velocity is calculated from the **sales** Stockwik pulls from Shopify — a rolling **full year** of order history. Refunds that restock are netted out, and cancelled orders are excluded, so the rate reflects genuine demand. Sales stay current each time you run a [Sync](../concepts/how-syncing-works).

> **Note:** A brand-new product with no sales history has no velocity yet, so Stockwik can't suggest a reorder quantity for it until it has sold. You can always pin a manual minimum/maximum in the meantime — see [Planning defaults & overrides](../concepts/planning-defaults-and-overrides).

## Related
- [How reorder levels are calculated](../concepts/how-reorder-levels-are-calculated)
- [How syncing works](../concepts/how-syncing-works)
- [Planning defaults & overrides](../concepts/planning-defaults-and-overrides)
