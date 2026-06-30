# Suppliers & buy options import/export

Both suppliers and buy options support spreadsheet import/export, so you can set up or update many at once. Both follow the same safe **preview → apply** flow as the rest of Stockwik.

## Suppliers

**Export** from the Suppliers page's Actions menu — you get every field (name, contacts, address, currency, payment terms, lead time, instructions, notes, archived), plus a supplier ID for clean round-trips.

**Import** matches rows in two ways:

- If a row has a **supplier ID** that exists → it's an **update** (you can even rename).
- If there's no ID → Stockwik matches on **name** (case-insensitive). A match updates; no match **creates** a new supplier.

Validation checks the basics (name required; currency, payment terms, and country must be recognized values; lead time a whole number ≥ 0). A blank cell leaves that field unchanged.

## Buy options

**Export** gives every option with its product SKU and supplier for context, plus an option ID.

**Import** matches in two ways:

- By **option ID** if present → update (change pack size, cost, supplier, etc.).
- Otherwise by **(SKU + supplier + units per pack)** — since a product can have several options from one supplier at different pack sizes. A match updates; no match creates.

The product SKU must already exist (products aren't created here); an unrecognized supplier is created automatically.

## The shared flow

1. Upload your CSV (grab the template if you want exact headers).
2. Review the **dry-run preview** — creates, updates, unchanged, and errors, with nothing written yet.
3. Fix any flagged rows, then **Apply**.

> **Note:** Imports are **all-or-nothing** — one bad row blocks the batch until you fix it, so you never get a half-applied import. Re-running the same file changes nothing.

## Related
- [Managing suppliers](../suppliers/managing-suppliers)
- [Buy options](../suppliers/buy-options)
- [Import & export inventory](../inventory/import-export-inventory)
