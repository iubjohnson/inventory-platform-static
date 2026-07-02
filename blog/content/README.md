# Blog source content

Markdown sources for the blog. `node blog/build-blog.mjs` converts these into
`blog/<slug>.html`, the `/blog/` listing, `blog/feed.xml`, and the site-wide
`/sitemap.xml`. **Never hand-edit the generated HTML** — edit the markdown and
rebuild (same rule as the docs).

## Frontmatter

```
---
title: How to Calculate Reorder Points for Shopify   # SEO <title>; aim ≤49 chars so " — Stockwik" fits in 60
description: One-sentence summary, ≤155 chars — used for meta description, cards, and the RSS feed.
date: 2026-07-02          # publish date, YYYY-MM-DD
updated: 2026-07-20       # optional; bump when you materially refresh the post
category: Reordering      # shown as the card pill + breadcrumb
slug: shopify-reorder-points-guide
order: 2                  # optional; sort tiebreaker for same-date posts (lower = first)
image: /assets/og/….png   # optional OG image (1200×630); falls back to the logo mark
---
```

## Body conventions

- **H1 = visible headline** (may be longer than the SEO title). Rendered by the
  template; don't repeat it in the body.
- **The first paragraph after the H1 becomes the answer-first lead** (`.post-lead`,
  styled larger). Make it a 2–4 sentence direct answer to the query the post
  targets — this is what search snippets and AI assistants quote.
- Same markdown dialect as the docs: `## / ###` headings, pipe tables,
  `> **Tip/Note/Example/Plain English/Warning/Important:** …` callouts, one
  level of list nesting, `![alt](src)` images.
- Internal links use **absolute site paths with `.html`**:
  `/product.html`, `/stocky-alternative.html`, `/docs/concepts/glossary.html`.
- Every post automatically gets the install CTA band appended with
  `utm_campaign=blog&utm_content=<slug>` — don't add your own.

## Content rules (from CLAUDE.md — non-negotiable)

- Plain, operator-to-operator voice. Specific over hype.
- Apparel-basics example data (Pima Tee, Chino Shorts; Pacific Knit Co.,
  Loomstate Mills, Northpoint Apparel). **Never beer/homebrew.**
- Status taxonomy exactly: Stockout risk / Reorder / Watch / Healthy.
- Canonical formulas/defaults come verbatim from the docs
  (`docs/site-content/concepts/…`) — don't invent numbers.
- Competitive claims must be factual and verifiable.
