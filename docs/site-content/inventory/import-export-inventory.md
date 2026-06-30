# Import & export inventory

For bulk changes, Stockwik lets you export your products to a spreadsheet, edit them, and re-import. It's the fastest way to set costs and planning overrides across many products at once.

## Exporting

From the Inventory page's **Actions** menu, choose **Export CSV**. The file includes the full planning picture for each product — SKU, supplier, ABC class, on hand/available/incoming, velocity, days of stock, suggested min/max, your overrides, cost, price, value, and recent sales totals.

> **Note:** Override columns show the word **`auto`** when a product is using the calculated default, or a number when you've pinned it.

## What you can import

Import updates a small set of editable columns (matched to products by **SKU** — products are never created by import):

- **`cost`**
- **`min_override`**, **`max_override`**
- **`days_of_cover_override`**, **`safety_stock_days_override`**

### Override syntax

For each override cell:

- **A number** → pin that value.
- **`auto`** → clear the override and go back to the calculated default.
- **Blank** → leave it unchanged. (This makes partial files safe — you won't wipe existing settings.)

## The import flow

1. From **Actions → Import products**, upload your CSV. (Use **Download import template** if you want the exact headers.)
2. Stockwik runs a **dry-run preview** — it validates every row and shows what would change (updates, unchanged, and any errors) **without writing anything**.
3. Fix any flagged rows, then **Apply**.

> **Note:** Imports are **all-or-nothing** — if any row has an error, nothing is applied until you fix it. This prevents half-finished imports. Re-importing the same file is safe (already-correct rows simply stay unchanged).

## Related
- [Inventory list & views](../inventory/inventory-list-and-views)
- [Planning defaults & overrides](../concepts/planning-defaults-and-overrides)
- [Suppliers & buy options import/export](../suppliers/import-export)
