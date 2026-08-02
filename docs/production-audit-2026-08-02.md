# Production audit — 2026-08-02

## Scope

This audit covered the public multilingual website, all template preview routes, both lead APIs, the Prisma/SQLite deployment path, security headers, consent controls, accessibility, SEO metadata, locale continuity, CI, and the Hostinger deployment runbook.

## Corrections completed

- Hardened lead and audit requests with same-origin checks, JSON content-type enforcement, a streamed 16 KiB request limit, strict schema validation, honeypots, and bounded URL input.
- Hardened the process-local rate limiter against User-Agent rotation and unbounded bucket growth.
- Added enforced framing/form/base protections and a report-only full CSP, including the explicit same-origin template-preview exception.
- Added an initial Prisma migration, deployment-safe SQLite file preparation, database-backed readiness, CI migration/runtime smoke steps, and backup/restore guidance.
- Added accessible form validation and success focus, semantic pricing and comparison controls, reduced-motion behavior, skip links, modal focus containment, Escape handling, scroll restoration, and reliable focus return.
- Added persistent cookie preferences and consent-gated analytics loading without covering the WhatsApp action.
- Preserved path, query, and hash when changing languages; template preview links now retain their selected locale.
- Corrected sitemap coverage, canonical/hreflang metadata, Open Graph image data, and structured-data safety.
- Expanded production smoke coverage to every public page and all 181 template slugs in both preview and raw modes.

## Verification results

| Check | Result |
| --- | --- |
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| `pnpm build` | Passed; 521 static pages generated |
| `SMOKE_BASE_URL=http://127.0.0.1:3000 pnpm test` | Passed; production readiness plus 5 test files / 30 tests |
| Preview/raw runtime matrix | Passed; 181 slugs × 2 modes = 362 routes |
| `pnpm audit --prod` | Passed; no known vulnerabilities |
| `git diff --check` | Passed; only Windows line-ending notices |
| Live browser: EN/KA/RU/TR, locale continuity, desktop menu, mobile menu, forms, consent, preview context | Passed |
| Live browser console | No errors or warnings |

The live contact submission used synthetic local-only data against a temporary audit database.

## Deployment status

The repository is safe to merge and deploy after the environment owner completes the external operational items below and validates them in staging.

## External items still required

- Configure production email or CRM notifications; submissions are currently stored in the database only.
- Put the SQLite database outside the replaceable application directory and confirm host permissions.
- Configure encrypted backups, retention, and a tested restore procedure.
- Configure trusted proxy headers and a distributed/edge rate and body-size limiter if the app runs on multiple processes or instances.
- Supply the legal entity/data-controller identity, retention period, subprocessors, and obtain legal review of the privacy and terms text.
- Observe the report-only CSP in production, then migrate to a nonce/hash-based strict enforced policy before removing the temporary inline/eval allowances.
