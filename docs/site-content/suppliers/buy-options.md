# Buy options

A buy option is one way you purchase a product from a supplier — its pack size, cost, and minimum order. (For the concept and why units-per-pack matters, see [Buy options & pack sizes](../concepts/buy-options-and-pack-sizes).) This page covers creating and managing them.

## Where to manage buy options

- **On a product** — open the product's detail page and go to the **Suppliers** tab to see and edit every option for that product.
- **The Buy options page** — under Suppliers, a catalog of every buy option across all products. Search by SKU, product, or supplier SKU; filter by supplier; sort; and bulk-edit via CSV.

## Adding a buy option

From a product's Suppliers tab, click **+ Add buy option**:

1. **Supplier** — pick an existing one, or choose "+ New supplier…" to create one on the spot.
2. **Pack type** — Each, Case, Box, Pallet, or Custom (type your own name, e.g. "Bag of 50").
3. **Units per pack** — how many sellable units are in one pack (1 for Each, 12 for a Case of 12). This is the conversion Stockwik uses to turn order quantities into stock units.
4. **Supplier SKU** *(optional)* — the supplier's item number; printed on POs.
5. **Cost** *(optional)* — the price **per pack**; Stockwik shows the resulting per-unit cost.
6. **Minimum order quantity** *(optional)* — the smallest number of packs the supplier accepts.
7. **Primary** — tick to make this the default option used for reorder suggestions (only one per product; ticking it un-ticks any previous primary).

Save the option. Edit or delete existing options from the same table.

> **Note:** If you change an existing option's pack size, re-enter its cost — Stockwik won't silently reinterpret the old price against the new pack.

> **Tip:** The **primary** option is the one the Reorder page uses to suggest quantities and build draft POs, so make sure it reflects how you usually buy the product.

## Related
- [Buy options & pack sizes (concept)](../concepts/buy-options-and-pack-sizes)
- [Managing suppliers](../suppliers/managing-suppliers)
- [Suppliers & buy options import/export](../suppliers/import-export)
