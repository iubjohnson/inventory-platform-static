# The onboarding walkthrough

The first time you open Stockwik, a setup wizard walks you through connecting your store and getting your planning data in shape. It takes just a few minutes, and most steps are optional — you can refine everything later. Here's what each step does.
## Step 1 — Connect

Stockwik connects to your Shopify store so it can read your products, inventory, sales, and locations.

If you installed Stockwik from the Shopify App Store, this step is already done — you'll move straight to importing. (You'll only see a connect prompt if a store isn't linked yet.)

## Step 2 — Import

Stockwik pulls everything in from Shopify, with a progress bar as it goes:

- **Locations** → **Products** → **Inventory** → **Sales** (a full year of order history).

This usually takes **20–60 seconds**, depending on catalog size (products are the longest part). When it finishes, Stockwik automatically:

- creates a **supplier** for each vendor on your Shopify products, and
- sets up a default **"Each"** buy option for every product (so you can reorder right away).

> **Note:** Shopify only gives us the vendor *name*, so the auto-created suppliers start bare. You'll add details like lead times in the next step.

## Step 3 — Suppliers *(optional)*

Stockwik shows the suppliers it created from your Shopify vendors. The most important thing to add here is each supplier's **lead time** (how many days they take to deliver) — it directly affects when Stockwik tells you to reorder.

You can:

- **Download** the supplier list as a CSV, fill in lead times, contacts, payment terms, and addresses in a spreadsheet, then **re-upload** it, or
- **Skip** for now and edit suppliers anytime from the Suppliers page.

> **Tip:** Even a rough lead time is better than none. If you're not sure, start with your best estimate — Stockwik uses 7 days until you set one.

## Step 4 — Planning defaults

Two settings shape every reorder suggestion. Both are in days, and both can be fine-tuned per product later.

- **Days of cover** — how many days of stock you want to hold. This sets your *order-up-to* (maximum) level. A common starting point is **60–90 days**. (Default: 90.)
- **Safety stock (days)** — extra buffer on top of your supplier's lead time, to absorb demand spikes or late deliveries. This feeds your *reorder point*. (Default: 14.)

If you have more than one location, you'll also pick a **default receiving location** — where new purchase orders are delivered.

See [How reorder levels are calculated](../concepts/how-reorder-levels-are-calculated) to understand exactly how these feed the math.

## Step 5 — Product costs *(optional)*

Costs power your inventory value, profit margins, and purchase-order totals. Stockwik imports the **"Cost per item"** already set in Shopify, and shows how many products still need one.

You can download a CSV, fill in any missing costs, and re-upload — or skip and add costs later.

## Step 6 — Buy options *(optional)*

You're already set to reorder, because every product defaults to buying as **"Each"** (one unit at a time). You only need this step if you buy some products in **cases, boxes, or pallets**.

A **buy option** describes one way you purchase a product — its pack size, cost, minimum order, and supplier. The key field is **units per pack**: how many sellable units come in one purchase.

> **Example:** You sell cans individually but buy them by the case of 24. Set the pack type to "Case", units per pack to 24, and the cost to the case price. Stockwik then orders in whole cases while tracking your stock in single cans.

Download the template, set up your packs, and re-upload — or skip and add buy options later from a product's detail page.

## Step 7 — Finish

That's it. Your products, suppliers, and buy options are in place. Click **Finish setup** to go to your dashboard.
> **Tip:** Steps 3–6 can all be revisited anytime — refine lead times, costs, and packs whenever you like. A good first move after finishing is to review your supplier lead times and check your [Reorder list](../reordering/the-reorder-page).

## Related
- [Installing Stockwik](../getting-started/installing)
- [Dashboard tour](../getting-started/dashboard-tour)
- [How reorder levels are calculated](../concepts/how-reorder-levels-are-calculated)
- [Buy options & pack sizes](../concepts/buy-options-and-pack-sizes)
