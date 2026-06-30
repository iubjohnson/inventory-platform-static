# Cycle counts & adjustments

> **Available on Growth and up.**

Cycle counting is how you keep your inventory honest: physically count what's on the shelf, compare it to the system, and reconcile any difference back to Shopify. Stockwik makes this a quick, routine task.

`[SCREENSHOT: count grid]`

## Running a count

1. Open **Adjustments**. Stockwik refreshes your inventory from Shopify automatically, so you're counting against current numbers.
2. Optionally **filter by supplier** to count one vendor's products at a time (a tidy way to cycle through your catalog), or **search** for specific items.
3. For each product, either:
   - enter the **counted** quantity you physically see, or
   - click **✓ Correct** to confirm the system number is right (no variance).
4. As you go, **variance** and **variance $** show any discrepancies (counted − on hand, valued at cost).
5. When you're done, **commit** the count.

## What happens on commit

Stockwik writes your counts to Shopify (setting on hand to your counted figure) and records the session.

It also uses a **stale-guard**: if a sale came in *while you were counting* and changed a product's on-hand, that line is rejected and re-shown with the fresh number so you can re-verify it — the rest of your counts still commit. This stops a mid-count sale from quietly clobbering your numbers.

> **Tip:** Counting in small, regular batches (e.g. by supplier or aisle) is more sustainable — and more accurate — than one big annual count.

## History

The **History** tab lists past count sessions — date, location, who counted, lines, and net variance — and expands to show line-by-line detail. It's your audit trail for shrinkage over time (and feeds the [Shrinkage report](../reports/reports-overview)).

> **Note:** "Last counted" is stamped on a product even when there's **no** variance — confirming an item is correct is the whole point of cycle counting, so those confirmations are recorded too.

## Related
- [Inventory: on hand, available & committed](../concepts/inventory-on-hand-available-committed)
- [Reports overview](../reports/reports-overview)
- [How syncing works](../concepts/how-syncing-works)
