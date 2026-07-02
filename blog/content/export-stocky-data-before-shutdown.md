---
title: How to Export Your Stocky Data Before Shutdown
description: What you can export from Stocky before the Aug 31, 2026 shutdown, what you can't (supplier data), and how to save everything that matters.
date: 2026-07-02
category: Stocky migration
slug: export-stocky-data-before-shutdown
order: 2
---

# How to export your Stocky data before the shutdown (and what you can't export)

Before Stocky shuts down on **August 31, 2026**, you can export most of your historical data — purchase orders and inventory reports download as CSVs from the app's export features. The critical exception is **supplier data: Stocky has no supplier export**, so lead times, contacts, costs, and product–supplier relationships must be written down manually before the deadline. After August 31 the app and its APIs stop working, and anything you didn't save is unrecoverable.

## What exports, what doesn't

| Data | Exportable from Stocky? | Where it lives after the shutdown |
|---|---|---|
| Products, variants, inventory levels | Not needed — this is Shopify data | Shopify (unaffected) |
| Orders & sales history | Not needed — this is Shopify data | Shopify (unaffected) |
| Historical purchase orders | **Yes** — CSV export | Your saved CSVs |
| Inventory reports | **Yes** — CSV export | Your saved CSVs |
| **Suppliers (contacts, lead times, costs, MOQs)** | **No — cannot be exported** | Only what you document manually |
| Forecasting settings (min/max levels) | Partially, via reports | Your saved CSVs / manual notes |

The first two rows are the reassuring part: the data that drives forecasting — your actual sales — never belonged to Stocky. Any replacement app reads it straight from Shopify.

## Step 1: Export purchase orders and reports

In Stocky, work through the export options and download CSVs of your historical purchase orders and any inventory reports you use. Save them somewhere permanent (not just your Downloads folder). You'll want old POs for:

- reference when re-creating orders in a new tool ("what did we order last September?"),
- receiving and invoice disputes that surface months later, and
- a sanity check that your new tool's suggested quantities are in the same ballpark as what you historically bought.

> **Tip:** Export *everything* available, even reports you don't think you need. Storage is free; after August 31 there is no second chance.

## Step 2: Document your suppliers by hand

This is the step with no shortcut. For **each supplier**, record:

- Supplier name and your contact person (email, phone)
- **Lead time** — how many days from placing an order to stock arriving
- **Minimum order quantities** and **case/pack sizes** per product
- Unit costs you currently pay
- Which products you buy from them (a product list or vendor tag)
- Payment terms and any seasonal ordering deadlines

A spreadsheet with one row per supplier–product pair covers it. An hour or two of typing now saves you re-negotiating or re-discovering all of this from old emails later.

> **Warning:** This is the only part of the migration that is truly time-boxed. Sales history rebuilds automatically; supplier knowledge doesn't.

## Step 3: Move the data into your replacement

How the import works depends on the tool you pick. In [Stockwik](/product.html), the pieces land like this:

- **Suppliers** are created automatically from your Shopify vendor data when you connect the store — then you add lead times, MOQs, and pack sizes from the sheet you made in Step 2 (see [Managing suppliers](/docs/suppliers/managing-suppliers.html)).
- **Sales history** syncs directly from Shopify — a rolling year of orders — so [sales velocity](/docs/concepts/how-sales-velocity-works.html) and reorder suggestions work from day one without any Stocky import.
- **Old POs** stay in your CSV archive for reference; new POs are created going forward from live [reorder suggestions](/docs/reordering/the-reorder-page.html).

## FAQ

### Can I export my suppliers from Stocky?
No. Supplier data cannot be exported from Stocky. Document it manually — names, contacts, lead times, costs, MOQs, and which products each supplier provides — before August 31, 2026.

### Do I need to export my sales history?
No. Sales history is Shopify data, not Stocky data. It stays in your store and any replacement forecasting app reads it directly.

### What happens if I miss the deadline?
On August 31, 2026 the app and all Stocky APIs stop working. Data that only existed inside Stocky — supplier records above all — becomes unrecoverable.

---

*Full context and a step-by-step plan: [Stocky is shutting down — the migration checklist](/blog/stocky-shutting-down-migration-checklist.html). Weighing replacements? Start with [Best Stocky alternatives for Shopify](/blog/best-stocky-alternatives.html).*
