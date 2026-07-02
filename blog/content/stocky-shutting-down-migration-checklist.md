---
title: Stocky Is Shutting Down — Migration Checklist
description: Stocky shuts down August 31, 2026. What still works, what data you can (and can't) export, and a step-by-step plan to move your Shopify store off it.
date: 2026-07-02
category: Stocky migration
slug: stocky-shutting-down-migration-checklist
order: 1
---

# Stocky is shutting down August 31, 2026: a migration checklist for Shopify merchants

Shopify is retiring Stocky, its inventory-management app for POS Pro retailers. The app was delisted from the Shopify App Store on **February 2, 2026**, and on **August 31, 2026** Stocky shuts down completely — the app and its APIs stop working. If your store still relies on Stocky for purchase orders, forecasting, or stock counts, you need a replacement in place before that date, and one piece of your data — **suppliers — cannot be exported at all**, so part of the migration is manual.

## The dates that matter

| Date | What happens |
|---|---|
| July 2025 | Multi-location inventory transfers (and min/max forecasting) removed from Stocky |
| February 2, 2026 | Stocky delisted from the Shopify App Store — no new installs |
| **August 31, 2026** | **Full shutdown: the app and all Stocky APIs stop working** |

There's no indication these dates will slip. Waiting until August means doing a rushed migration during the run-up to Q4 buying — the worst possible time to be without reorder visibility.

## What you lose when Stocky goes

Stocky handled the *planning* side of inventory that Shopify's admin doesn't fully cover: demand forecasting, reorder suggestions, purchase orders, receiving, supplier records, and stocktakes. Your **products, inventory levels, and sales history are not affected** — those live in Shopify itself, not in Stocky. What disappears is the layer that told you *when* and *how much* to buy, plus any data that only existed inside Stocky.

> **Important:** Supplier data — contacts, lead times, costs, which products come from whom — **cannot be exported from Stocky**. If you don't write it down before August 31, it's gone.

## The migration checklist

1. **Export what Stocky lets you export.** Historical purchase orders and inventory reports can be downloaded as CSVs from Stocky's export features. Do this now and file the CSVs somewhere safe — you'll want old POs for reference and for warranty/receiving disputes. (Step-by-step: [How to export your Stocky data before the shutdown](/blog/export-stocky-data-before-shutdown.html).)
2. **Manually record your supplier data.** For each supplier: name, contact, typical lead time in days, minimum order quantities, case/pack sizes, costs, and the products you buy from them. A simple spreadsheet is fine. This is the one step with a hard deadline and no undo.
3. **Choose a replacement before your last Stocky order cycle.** Give yourself at least one full reorder cycle on the new tool while Stocky still works, so you can compare its suggestions against what you'd have done. (Our honest comparison of the options: [Best Stocky alternatives for Shopify](/blog/best-stocky-alternatives.html).)
4. **Reconnect your planning settings.** In whatever tool you choose, re-enter supplier lead times, safety-stock buffers, and pack sizes. In [Stockwik](/product.html), suppliers are created automatically from your Shopify vendors — you add lead times and buy options on top.
5. **Verify the forecasts rebuild correctly.** Good news: forecasting tools don't need Stocky's data. Your sales history lives in Shopify, and a replacement app reads it directly — Stockwik, for example, pulls a rolling year of order history and has reorder suggestions ready after its first sync.
6. **Run both in parallel for a couple of weeks.** Sanity-check that reorder points and suggested quantities look right against your own judgment before you rely on them.
7. **Uninstall Stocky** once your first real purchase orders have gone through the new tool end-to-end — created, sent, and received.

## Will you still need POS Pro?

Stocky required a Shopify POS Pro subscription, so some retailers keep POS Pro partly *for* Stocky. Most replacement inventory apps — Stockwik included — are standalone Shopify apps with no POS Pro requirement. If Stocky was your main reason for the subscription, the migration is a good moment to re-check whether you still need it for other POS features.

## FAQ

### When exactly does Stocky stop working?
August 31, 2026. That's the full shutdown: the app stops functioning and all Stocky APIs are deactivated. It was already delisted from the App Store on February 2, 2026.

### Will I lose my sales history or inventory counts?
No. Products, inventory levels, orders, and sales history are Shopify data — Stocky only read them. Any replacement app rebuilds its forecasts from your Shopify history directly.

### What's the one thing I can't get back later?
Supplier records. Stocky has no supplier export, so document lead times, contacts, costs, and MOQs manually before the shutdown.

### How long does switching actually take?
The manual part is documenting suppliers — an afternoon for most stores. Apps like Stockwik sync your catalog and a year of sales history on install, so you have working reorder suggestions the same day; budget a week or two of running in parallel to build trust in the numbers.

---

*Stockwik was built for exactly this: reorder points, purchase orders, receiving, transfers, and cycle counts for Shopify merchants — no POS Pro required. See [how it compares to Stocky](/stocky-alternative.html) or the [feature tour](/product.html).*
