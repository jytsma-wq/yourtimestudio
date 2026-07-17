# Template Library Integration

## Purpose

Batumi Lighthouse remains the founder-led business website. The 18-template factory is integrated as a product library that helps prospective clients choose a direction before discussing a tailored build.

The integration does not replace the homepage, service pages, pricing, audits, work examples, forms, SEO, or multilingual studio experience.

## Read-Only Audit Decision

The active source repository was confirmed as `F:\OneDrive\Documents\batumilighthouse`. It contains the current founder-led redesign, multilingual content, forms, analytics consent, SEO, security headers, and deployment setup.

The template factory at `F:\OneDrive\Documents\lighthouse website templates` remains the source for the shared UI, tokens, content models, six category packages, and 18 original template assets.

The older Batumi Lighthouse checkout was not used because it predates the founder-led redesign.

## Safe Migration Order

1. Create a clean safety checkpoint of the Batumi Lighthouse redesign.
2. Work on the protected `codex/template-library-integration` branch.
3. Import shared packages, category packages, base TypeScript configuration, and licensed template assets.
4. Expand the root pnpm workspace and transpile the local packages through Next.js.
5. Keep the business site at the root and add a localized catalog at `/templates`.
6. Add localized detail pages at `/templates/[templateId]` for all 18 templates.
7. Render buyer controls at `/preview/[templateId]/...` and raw fictional sites at `/template-sites/[templateId]/...`.
8. Keep preview and raw routes out of the sitemap and mark both route families noindex.
9. Allow same-origin framing only for `/template-sites/...`; retain `frame-ancestors 'none'` for normal business pages.
10. Pass a selected template into the existing locale-aware contact form without changing the database schema or sending test submissions.
11. Replace inherited fictional review quotes with an explicit no-review placeholder.
12. Verify all locales, all 18 previews, mobile navigation, inner preview links, forms, headers, sitemap, lint, types, tests, and production build.

## Public Route Model

- `/templates`: localized catalog with six category filters and 18 entries.
- `/templates/[templateId]`: localized explanation, preview link, and template-specific enquiry CTA.
- `/preview/[templateId]/[[...slug]]`: noindex buyer preview shell with page and viewport controls.
- `/template-sites/[templateId]/[[...slug]]`: noindex fictional demo rendering, isolated from Batumi Lighthouse navigation and floating controls.

Default English routes use no locale prefix. Georgian, Russian, and Turkish use `/ka`, `/ru`, and `/tr` respectively.

## Content And Proof Policy

- Every demo business is fictional and visibly disclosed.
- Demo forms validate locally and do not send or store information.
- No demo publishes invented customer or buyer quotes.
- Public catalog text is translated in all four supported locales.
- Final client sites must replace fictional business details, imagery, contact data, prices, policies, legal text, and proof before launch.

## Deployment Notes

The production build statically generates the localized catalog, 72 localized detail pages, 181 preview routes, and 181 raw demo routes. Template assets live under `public/templates` and are copied into the standalone output by the existing deployment script.

Post-deploy QA must verify catalog filtering, a localized detail route, an enquiry handoff, one preview per category, raw-route framing, noindex metadata, and sitemap exclusion.
