# Understanding suggestions

The **Need** column on the Reorder page is Stockwik's suggested order quantity. Here's exactly how it's worked out, so you know when to trust it and when to adjust.

## How the suggested quantity is calculated

**Suggested quantity = order-up-to (max) − available − incoming**

- It tops you back up to your **maximum** level…
- …minus what you already have **available**…
- …minus anything already **incoming** on an open PO (so you don't double-order).

The result is then rounded **up** to your supplier's minimum order quantity and pack size, so you order whole cases or pallets rather than awkward part-packs.

> **Example:** Max is 28, you have 12 available and 0 incoming → you need 16. If you buy this item by the case of 12, Stockwik rounds up to **2 cases (24 units)**.

(For where the max comes from, see [How reorder levels are calculated](../concepts/how-reorder-levels-are-calculated).)

## Why some items suggest 0

Products that are **Watch** or **Healthy** usually suggest **0** — they don't need ordering yet. You can still type a quantity to add them to an order (handy for topping up while you've got a supplier's PO open anyway).

## On-order awareness

If a product already has units on an open purchase order, you'll see an **On order** badge, and that incoming quantity is subtracted from the suggestion — Stockwik won't tell you to re-buy what's already coming.

## When you've pinned an override

If you've pinned a minimum or maximum on a product, the suggestion uses your pinned value — and the page still shows what the formula *would* have suggested, so you can compare at a glance.

## Adjusting before you order

The **Order (buy)** field is fully editable — enter the number of **packs** you want, and the **= units** column shows the equivalent stock units live. Nothing is ordered until you create the PO.

## Related
- [The Reorder page](../reordering/the-reorder-page)
- [Create POs from suggestions](../reordering/create-pos-from-suggestions)
- [How reorder levels are calculated](../concepts/how-reorder-levels-are-calculated)
