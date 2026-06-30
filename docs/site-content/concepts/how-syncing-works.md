# How syncing works

Stockwik mirrors your Shopify store. Syncing is how it pulls the latest data in — and Shopify always stays the source of truth for your stock.

## What a sync pulls

Clicking **Sync** (top of the app) refreshes everything from Shopify:

- **Products** — names, SKUs, images, vendors.
- **Locations** — your Shopify locations and their addresses (used as the "ship to" on purchase orders).
- **Inventory** — on hand, available, and committed, per location.
- **Sales** — a rolling **full year** of order history, used to calculate velocity. Refunds that restock are netted out and cancelled orders are excluded, so the numbers reflect real demand.

## Shopify is the source of truth

Stockwik shows your stock exactly as Shopify reports it. It only writes back to Shopify when **you** take an action:

- receiving a purchase order,
- committing a cycle count, or
- updating a product's cost.

In each case, Stockwik pushes the change to Shopify **first**, then records it locally — so the two never drift apart.

## What happens on your first sync

The very first sync also sets you up to start planning immediately:

- a **supplier** is created for each vendor on your products, and
- a default **"Each"** buy option is created for every product.

You refine these during [onboarding](../getting-started/onboarding-walkthrough) and anytime after.

## When to sync

- Sync is **manual** today — click the button whenever you want fresh numbers (a good habit before working your reorder list or receiving stock).
- The **Adjustments** (counts) page automatically refreshes inventory when you open it, so you're counting against current numbers.

> **Note:** There's no automatic background sync yet, so if something looks out of date, run a Sync. A full sync typically takes 20–60 seconds depending on catalog size.

> **Tip:** "Full year of sales history" is a **rolling** window — Stockwik keeps the most recent year for velocity and reporting. It isn't multi-year archival.

## Related
- [Inventory: on hand, available & committed](../concepts/inventory-on-hand-available-committed)
- [How sales velocity works](../concepts/how-sales-velocity-works)
- [Reconnecting your store](../account/reconnecting-your-store)
