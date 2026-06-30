# Buy options & pack sizes

You count stock in single units, but you often *buy* in cases, boxes, or pallets. A **buy option** is how Stockwik bridges the two — it describes one way you purchase a product from a supplier, and how many sellable units come in each pack.

## What a buy option includes

Each buy option has:

- **Supplier** — who you buy it from.
- **Pack type** — Each, Case, Box, Pallet, or a Custom name (e.g. "Bag of 50").
- **Units per pack** — how many sellable units are in one pack (1 for Each, 12 for a Case of 12, and so on). This is the key conversion.
- **Supplier SKU** — the supplier's item number (printed on purchase orders).
- **Cost** — the price **per pack** (Stockwik shows the per-unit cost too).
- **Minimum order quantity (MOQ)** — the smallest number of packs the supplier will accept.
- **Primary** — the default option used for reorder suggestions (one per product).

## Why units-per-pack matters

Your inventory is always tracked in single units, but ordering happens in packs. Units-per-pack lets Stockwik convert between them:

> **Example:** You sell cans individually but buy them by the **case of 24**. Set pack type = Case, units per pack = 24, cost = the case price. When Stockwik suggests you need 50 units, it rounds up to **3 cases (72 units)** so you order in whole cases.

## Multiple options per product

A product can have several buy options — for example, the same item from two different suppliers, or the same supplier in different pack sizes. Mark one as **primary**; that's the one the [Reorder page](../reordering/the-reorder-page) uses to suggest quantities. You can switch the primary anytime.

> **Note:** New products start with a default **"Each"** buy option at their Shopify cost, so you can reorder immediately. You only need to set up packs for products you actually buy in cases, boxes, or pallets.

## Where to manage them

- On a **product's detail page**, under the **Suppliers** tab.
- On the standalone **Buy options** page (under Suppliers), where you can search, filter, and bulk-edit via CSV.

See [Buy options](../suppliers/buy-options) for the step-by-step.

## Related
- [Buy options (how-to)](../suppliers/buy-options)
- [The Reorder page](../reordering/the-reorder-page)
- [How reorder levels are calculated](../concepts/how-reorder-levels-are-calculated)
