# Transferring stock

> **Available on Pro.** Transfers appear only if your store has more than one location.

A transfer moves stock from one location to another — ship it from the source, receive it at the destination, and Stockwik keeps both locations' inventory accurate in Shopify along the way.

`[SCREENSHOT: transfer detail]`

## Creating a transfer

1. Go to **Transfers** → **+ New transfer**.
2. Choose a **source** and a **destination** location (they must differ).
3. Add products and a **quantity** for each. You can't transfer more than is available at the source.
4. **Save as draft** to finish later, or **Confirm & ship** to send it.

## Ship → receive → close

- **Confirm & ship** — Stockwik re-checks availability, then reduces the **source** location's stock and marks the transfer **In transit**.
- **Receive** — at the destination, open the transfer and enter what arrived (full or partial). The destination's stock increases. A full receipt closes it as **Received**; a partial one keeps it open as **Partial** for the rest.
- **Short or cancel** — if units go missing or you cancel, Stockwik asks whether to **return them to source** (credit them back) or **mark them lost**.

## Statuses

| Status | Meaning |
|---|---|
| **Draft** | Created but not shipped; no stock has moved. |
| **In transit** | Shipped; stock left the source, not yet received. |
| **Partial** | Some units received at the destination. |
| **Received** | Fully received. |
| **Cancelled** | Cancelled (with missing units returned or written off). |

You can print or download a **transfer document** (PDF) for the people moving the stock.

> **Note:** While stock is in transit it's simply absent from both locations' available counts — exactly where it physically is. Each leg is a clean, separate adjustment, so transfers are safe even if sales happen at the same time.

## Related
- [Inventory: on hand, available & committed](../concepts/inventory-on-hand-available-committed)
- [Settings: Locations](../settings/locations)
- [Plans & features](../account/plans-and-features)
