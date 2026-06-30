# How reorder levels are calculated

Stockwik answers three questions for every product: **when** to reorder, **how much** to order, and **how urgent** it is. It does this from your real sales history — no guessing, no spreadsheets. This page explains exactly how those numbers are built so you can trust them and tune them with confidence.

Every product gets two levels:

- a **reorder point** (the *minimum* — when to order), and
- an **order-up-to level** (the *maximum* — how high to refill).

Both are driven by how fast the product sells, how long your supplier takes to deliver, and how much buffer you want to keep.

> **Note:** All of this math uses **Available** stock (what's free to sell), not On hand. If you're unsure of the difference, see [Inventory: on hand, available & committed](../concepts/inventory-on-hand-available-committed).

---

## The reorder point (minimum)

This is the stock level at which you should place a new order. The idea is simple: you want to reorder while you still have *just enough* stock to last until the new shipment arrives — plus a safety cushion.

**Reorder point = daily sales × (supplier lead time + safety-stock days)**

- **Daily sales** — how many units you sell per day, on average (see [How sales velocity works](../concepts/how-sales-velocity-works)).
- **Supplier lead time** — how many days your supplier takes to deliver after you place an order (set on each supplier; defaults to 7 days).
- **Safety-stock days** — extra buffer days to protect against a sales spike or a late delivery (an org-wide default of 14 days, adjustable per product).

> **Plain English:** "Order when I have just enough left to cover the delivery wait, with a couple of weeks of buffer on top."

## The order-up-to level (maximum)

When you do reorder, this is the level you refill *up to*. It represents how much stock you want on the shelf when a shipment lands.

**Order-up-to = daily sales × days of cover**

- **Days of cover** — how many days of demand you want to hold (an org-wide default of 90 days — about 12 weeks — adjustable per product).

> **Plain English:** "Keep about 12 weeks of stock on hand."

---

## A worked example

Say a product sells **0.5 units per day**, your supplier's **lead time is 7 days**, your **safety stock is 14 days**, and your **days of cover is 90**:

| Level | Math | Result |
|---|---|---|
| **Reorder point** | 0.5 × (7 + 14) | **≈ 10 units** |
| **Order-up-to** | 0.5 × 90 | **45 units** |

So: when this product's available stock drops to about **10**, Stockwik flags it to reorder, and suggests buying enough to bring it back up to **45**.

---

## How the suggested order quantity is figured

On the [Reorder page](../reordering/the-reorder-page), Stockwik doesn't just tell you *what* to order — it tells you *how much*:

**Suggested quantity = order-up-to − available − incoming**

- **Incoming** is anything already on an open purchase order, so you're never told to double-order.
- The result is rounded **up** to your supplier's minimum order quantity (MOQ) and pack size, so you order whole cases or pallets rather than odd units.

Continuing the example: order-up-to is 45, you have 12 available and 0 incoming → suggested order ≈ **33 units**. If you buy that item by the case of 12, Stockwik rounds up to **3 cases (36 units)**.

> **Tip:** Products that are well-stocked ("Watch" or "Healthy") usually suggest **0** — they don't need ordering yet. You can still type in a quantity to add them to an order if you want to top up.

---

## Seasonal products

Some products sell steadily; others spike at a certain time of year. Stockwik detects when a product has a **strong seasonal peak** and treats it differently:

- **During its peak season**, the order-up-to level is calculated from the product's *peak* sales rate — so you stock up ahead of the rush.
- **Outside peak season**, it uses the normal blended rate — so you don't carry peak-sized inventory all year and end up overstocked.

You don't have to configure this; it's detected automatically from the product's sales pattern. (More in [How sales velocity works](../concepts/how-sales-velocity-works).)

---

## When you want to override the math

The calculated levels are a strong default, but you're always in control. On a product's detail page (**Replenishment rules** tab) you can:

- **Pin a minimum or maximum** to a fixed number — useful when a supplier has a hard minimum, or you simply always want a certain quantity on the shelf. A pinned value **replaces** the formula for that product.
- **Override days of cover or safety stock** for just that product — e.g. raise safety stock on a critical item with an unreliable supplier, or lower days of cover on a slow mover to avoid dead stock.

Org-wide defaults live in **Settings → Planning defaults**; per-product overrides live on the product. See [Planning defaults & overrides](../concepts/planning-defaults-and-overrides).

> **Note:** When you pin an override, the Reorder page still shows you what the formula *would* have suggested, so you can compare.

---

## What the statuses mean

On the Reorder page and the inventory list, each product carries a status based on these levels:

| Status | What it means |
|---|---|
| **Stockout risk** | You'll run out before a new order could arrive — even if you order today. Act now. |
| **Reorder** | At or below the reorder point. Time to order. |
| **Watch** | Above the reorder point but trending toward it. No action needed yet. |
| **Healthy** | Comfortably stocked. |
| **On order** | Units are already incoming on an open purchase order. |

---

## Related
- [How sales velocity works](../concepts/how-sales-velocity-works)
- [Inventory: on hand, available & committed](../concepts/inventory-on-hand-available-committed)
- [Planning defaults & overrides](../concepts/planning-defaults-and-overrides)
- [The Reorder page](../reordering/the-reorder-page)
