# Create POs from suggestions

The fastest way to raise purchase orders is straight from your reorder list. Select what you want, and Stockwik drafts the POs for you — grouped by supplier.

## Steps

1. On the [Reorder page](../reordering/the-reorder-page), set your **destination** location.
2. **Select** the lines you want to order (use the checkboxes, or "Select all shown"). Adjust the **Order (buy)** quantity on any line if needed.
3. Click **Create draft PO(s)**. Stockwik creates **one draft purchase order per supplier** in your selection, delivering to the chosen destination.
4. A confirmation shows the PO numbers created. Head to **Purchase orders** to review, then send them.

![Create draft POs confirmation](/docs/assets/screenshots/create-draft-pos.png)

> **Note:** New POs are created as **drafts** — nothing is sent to a supplier until you review and mark them as ordered. See [Creating & editing POs](../purchase-orders/creating-and-editing-pos) and [Sending a PO](../purchase-orders/sending-a-po).

## What gets carried over

Each draft line uses the product's **primary buy option** — its supplier, pack, units per pack, and cost — and the supplier's lead time sets the expected delivery date. These details are **snapshotted onto the PO** at creation, so later edits to a buy option's cost won't retroactively change an existing PO.

> **Tip:** Creating POs is a Growth-and-up feature. On Starter you can still see all the suggestions; upgrade to turn them into orders. See [Plans & features](../account/plans-and-features).

## Related
- [The Reorder page](../reordering/the-reorder-page)
- [Creating & editing POs](../purchase-orders/creating-and-editing-pos)
- [Sending a PO](../purchase-orders/sending-a-po)
