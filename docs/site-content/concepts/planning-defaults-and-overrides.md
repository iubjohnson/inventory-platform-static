# Planning defaults & overrides

Stockwik uses a few planning levers to calculate your reorder levels. You set sensible **defaults** once for your whole store, then **override** them on individual products where it makes sense. This two-level system keeps things simple without losing control.

## Organization defaults

Set in **Settings → Planning defaults**, these apply to every product unless a product overrides them:

- **Days of cover** — how many days of stock you want to hold; sets your *order-up-to (maximum)* level. (Default: 56.)
- **Safety-stock days** — buffer on top of supplier lead time; feeds your *reorder point (minimum)*. (Default: 14.)
- **Default receiving location** — where new purchase orders are delivered.

> **Tip:** Lead time isn't a planning default — it lives on each **supplier** (because different suppliers deliver at different speeds). Set it on the Suppliers page.

## Per-product overrides

On a product's detail page, open the **Replenishment rules** tab. Here you can override the math for just that product with four fields:

| Field | What it does |
|---|---|
| **Days of cover** | Override the org default for this product's maximum. |
| **Safety-stock days** | Override the org default for this product's reorder point. |
| **Minimum override** | Pin the reorder point to a fixed number, ignoring the formula. |
| **Maximum override** | Pin the order-up-to level to a fixed number, ignoring the formula. |

Leave a field blank to use the calculated/default value ("auto"); enter a number to **pin** it. The fields show you what "auto" currently works out to, so you always know what you're changing.

> **Example:** A critical component with a flaky supplier → raise its safety-stock days so you reorder earlier. A slow-moving accessory → lower its days of cover so you don't overstock. A product with a hard supplier minimum → pin its maximum.

## Bulk editing via CSV

You can set overrides for many products at once by importing a CSV from the Inventory page. Each override column accepts a **number** (pin it), the word **`auto`** (revert to the default), or a **blank** cell (leave it unchanged). See [Import & export inventory](../inventory/import-export-inventory).

## Related
- [How reorder levels are calculated](../concepts/how-reorder-levels-are-calculated)
- [Settings: Planning defaults](../settings/planning-defaults)
- [Import & export inventory](../inventory/import-export-inventory)
