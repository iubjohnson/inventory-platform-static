# Stockwik docs — content drafts (hand-off)

This folder contains **finished draft prose** for the Stockwik public user manual, one Markdown file per
docs page, organized to mirror the site's intended URL structure. It's meant to be handed to the agent
building the static marketing site (Cloudflare Pages, separate repo).

## How it maps to the site
- The folder/file layout matches the sitemap in `docs/docs-site-build-brief.md` (§4). Example:
  `concepts/how-reorder-levels-are-calculated.md` → `/docs/concepts/how-reorder-levels-are-calculated`.
- `index.md` is the docs landing page (category grid).
- Cross-links between pages are written as **relative paths without extensions** (e.g.
  `../concepts/how-syncing-works`) — adjust to match the site's routing if needed.

## For the site agent
- These are content sources. Convert each `.md` to the site's page format, add nav, styling, and search.
- **Frontmatter:** none is included (kept format-agnostic). Add `title` / `description` per your generator.
  The H1 on each page is the title; the first paragraph works as the meta description.
- **Callouts:** written as `> **Tip:** …` / `> **Note:** …` blockquotes — restyle as callout components.
- **Plan badges:** pages/features that require a paid tier say so at the top (e.g. "Available on Growth and
  up" / "Available on Pro"). Render these as badges. Tier rules: POs, Receiving, Counts, Reports, cost edits
  → **Growth**; Transfers + multi-location → **Pro**; everything else is on all plans.
- **`[SCREENSHOT: …]` markers:** placeholders where a screen capture belongs — Bryan will supply images.
- **Authoritative facts:** the formulas, defaults, statuses, and the plan→feature matrix are intentionally
  consistent across pages and were verified against the app. Don't alter the numbers; if something needs to
  change, update `docs/docs-site-build-brief.md` (§5) first and keep pages in sync.

## Do not document
Admin/back-office features, "view as customer" impersonation, dev-only options (manual API-key connect,
the processed-date toggle, multi-org switching), and unshipped roadmap items. See the brief's §7.
