---
title: How to Create Purchase Orders for Shopify
description: A practical purchase-order workflow for Shopify merchants — from reorder suggestion to sent PO to received stock — without spreadsheets or email archaeology.
date: 2026-07-16
category: Purchasing
slug: shopify-purchase-orders-guide
---

# How to create purchase orders for your Shopify store (without spreadsheets)

A purchase order is the written record of what you asked a supplier for — products, quantities, costs, and where it's going. Small merchants often skip formal POs ("I just email Dave at the mill"), and it works until it doesn't: a disputed invoice, a short shipment nobody notices, or reorder math that double-orders because nothing tracked what was already on the way. A real PO workflow fixes all three, and it's less work than the email-archaeology approach, not more.

## Why POs earn their keep

- **Incoming visibility feeds your reorder math.** The suggested-quantity formula is *order-up-to − available − **incoming*** — and "incoming" only exists if open POs are tracked somewhere. No POs, no protection against double-ordering.
- **Receiving needs something to receive against.** When the boxes arrive, the PO is the checklist: what was supposed to come, at what cost. Without it, whatever's in the box becomes the truth.
- **Disputes get settled by the paper.** Short shipments and price disagreements surface weeks later; the PO with its costs and quantities is the record both sides work from.

## The workflow, end to end

**1. Start from suggestions, not a blank page.** The best PO is drafted by your reorder list: everything at or below its reorder point, with suggested quantities already computed and rounded to pack sizes, grouped into **one draft PO per supplier**. Building by hand works too — pick the supplier and destination location, add lines — but suggestion-driven drafting is where the time savings live ([how suggestions become POs](/docs/reordering/create-pos-from-suggestions.html)).

**2. Edit the draft freely.** A draft is a proposal: add or remove lines, adjust quantities and costs, note the supplier's order number, add instructions for the supplier and internal notes for your team. Quantities are expressed in *packs* (3 cases), with the unit math shown alongside.

**3. Send it.** Mark the PO as ordered — the expected delivery date comes from the supplier's lead time — then get it to the supplier however they work: a formatted email with PDF attached, a printed PDF, or your own portal/EDI channel with the PO as the internal record.

**4. Receive against it.** When stock lands, receive line by line: expected vs. actually received, partials kept open for the balance. Receiving pushes the new stock (and per-receipt costs) back to Shopify so inventory value stays accurate.

## The lifecycle at a glance

| Status | Meaning |
|---|---|
| **Draft** | Being composed — fully editable |
| **Ordered** | Sent to the supplier; goods on the way (counts as "incoming") |
| **Partial** | Some lines received; the rest outstanding |
| **Received** | Everything in; PO closed |
| **Cancelled** | Called off |

> **Tip:** Line details (pack, cost) should be **snapshotted** onto the PO when it's created — if you renegotiate a case price next month, an already-sent order shouldn't silently change underneath the supplier who quoted it.

## What this looks like in Stockwik

This whole loop is core [Stockwik](/product.html): one-click draft POs per supplier from the [Reorder page](/docs/reordering/the-reorder-page.html), pack-aware lines, emailed or printable POs with your company details, and receiving that writes stock and costs back to Shopify ([creating & editing POs](/docs/purchase-orders/creating-and-editing-pos.html)). Open POs feed straight back into the suggestion math as incoming stock — closing the loop that spreadsheets never quite close.

## FAQ

### Does Shopify have purchase orders built in?
Shopify's admin has been adding basic PO records, but the planning loop — suggestions that draft the PO, pack-size math, receiving with cost updates, incoming feeding reorder suggestions — is app territory.

### Should I create one PO per supplier or per product?
Per supplier. One order per vendor per cycle keeps shipping consolidated, hits MOQs more easily, and matches how the invoice will arrive.

### What if I order through a supplier portal?
Keep the PO anyway as your internal record — mark it ordered and place the order in the portal. You still get incoming tracking and a receiving checklist.
