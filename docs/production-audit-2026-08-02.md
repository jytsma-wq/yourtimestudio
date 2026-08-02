# Production audit — 2026-08-02

## Scope

This audit covered the public multilingual website, all template preview routes, both lead APIs, the Prisma/SQLite deployment path, security headers, consent controls, accessibility, SEO metadata, locale continuity, CI, and the Hostinger deployment runbook.

## Corrections completed

- Hardened lead and audit requests with same-origin checks, JSON content-type enforcement, a streamed 16 KiB request limit, strict schema validation, honeypots, and bounded URL input.
- Hardened the process-local rate limiter against User-Agent rotation and unbounded bucket growth.
- Added enforced framing/form/base protections and a production CSP without `unsafe-eval`, including the explicit same-origin template-preview exception.
- Added one versioned Prisma migration, fail-closed form-inbox readiness, CI migration/runtime smoke steps, and backup/restore guidance.
- Added accessible form validation and success focus, semantic pricing and comparison controls, reduced-motion behavior, skip links, modal focus containment, Escape handling, scroll restoration, and reliable focus return.
- Added persistent cookie preferences and consent-gated analytics loading without covering the WhatsApp action.
- Preserved path, query, and hash when changing languages; template preview links now retain their selected locale.
- Corrected sitemap coverage, canonical/hreflang metadata, Open Graph image data, and structured-data safety.
- Expanded production smoke coverage across localized public routes, template preview/raw modes, both form-inbox states, APIs, CSP and database startup.

## Verification results

| Check | Result |
| --- | --- |
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| `pnpm build` | Passed; 520 static pages generated |
| `pnpm test` | Passed; production readiness plus 11 test files / 59 tests |
| Locale/preview coverage | Passed; EN/KA/RU/TR, 18 templates, localized preview state and raw-preview isolation |
| `pnpm audit --prod` | Passed; no known vulnerabilities |
| `git diff --check` | Passed; only Windows line-ending notices |
| Live browser: EN/KA/RU/TR, locale continuity, desktop menu, mobile menu, forms, consent, preview context | Passed |
| Live browser console | No errors or warnings |

GitHub CI additionally applies the disposable SQLite migration and smoke-tests the standalone production server with the form inbox disabled and enabled.

## Deployment status

The repository is safe to merge and deploy after the environment owner completes the external operational items below and validates them in staging.

## External items still required

- Connect a monitored production inbox or CRM and enable `FORM_INBOX_READY` only after that operational path is verified; forms currently fail closed by design.
- Put the SQLite database outside the replaceable application directory and confirm host permissions.
- Configure encrypted backups, retention, and a tested restore procedure.
- Configure trusted proxy headers and a distributed/edge rate and body-size limiter if the app runs on multiple processes or instances.
- Supply the legal entity/data-controller identity, retention period, subprocessors, and obtain legal review of the privacy and terms text.
- Migrate the remaining enforced `unsafe-inline` allowances to nonce/hash-based script and style policies after validating the hosting runtime.
