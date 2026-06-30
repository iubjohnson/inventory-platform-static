# Inventory: on hand, available & committed

Stockwik mirrors four inventory numbers from Shopify for every product. Knowing what each one means is the key to reading the rest of the app — especially the reorder suggestions, which are built on **available** stock, not on hand.

> **Note:** Shopify is the source of truth for your stock. Stockwik shows these numbers exactly as Shopify reports them — it never invents or quietly changes them. (Stockwik only writes back to Shopify when *you* receive a purchase order, commit a count, or update a cost.)

## The four numbers

| Number | What it is |
|---|---|
| **On hand** | The physical units actually sitting in a location. |
| **Committed** | Units already reserved for unfulfilled customer orders — they're spoken for and will ship out. |
| **Available** | **On hand − committed.** The units genuinely free to sell. |
| **Incoming** | Units on open purchase orders, expected to arrive. |

## A quick example

You have **100 units on hand**. Customers have placed orders for **20** of them that you haven't shipped yet, so those 20 are **committed**. That leaves **80 available** — the real number you can still sell.

If you also have a purchase order in transit for **50 units**, that 50 is your **incoming** stock.

## Why "available" is what matters for planning

It's tempting to look at On hand and feel comfortable — but those committed units are already going out the door. Planning against On hand would make you reorder too late.

That's why every replenishment calculation in Stockwik — the reorder point, the order-up-to level, days of stock, and the suggested order quantity — uses **available** stock. It reflects what you can truly sell before you need more.

> **Tip:** If a product looks healthy on On hand but shows up on your reorder list, check its committed quantity. A pile of unfulfilled orders can pull *available* below the reorder point even when the shelf still looks full.

## Where you'll see these numbers

- **Inventory list** — On hand and Available columns.
- **Product detail** — all four, plus a per-location breakdown if you have more than one location.
- **Reorder page** — Available (and incoming is folded into the suggested quantity).
- **Counts** — On hand and Available side by side while you count.

## Related
- [How reorder levels are calculated](../concepts/how-reorder-levels-are-calculated)
- [How syncing works](../concepts/how-syncing-works)
- [The Reorder page](../reordering/the-reorder-page)
