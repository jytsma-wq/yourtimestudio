# Hostinger Deployment Guide

This project is ready for Hostinger Node.js Web Apps, not static shared hosting.

## Recommended Hostinger Target

Use a Hostinger plan with Node.js Web Apps support, such as Business or Cloud hosting. Deploy from GitHub if available; otherwise upload the project as an archive.

Hostinger references:

- Node.js app deployment: <https://www.hostinger.com/tutorials/deploy-node-js-application>
- Node.js website deployment support: <https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/>

## Runtime Settings

- Node.js version: `20.9.0` or newer
- Package manager: `pnpm`
- Application root: repository root, the folder containing `package.json`
- Entry file: `server.js`
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`
- Start command: `pnpm start`

`pnpm build` creates a Next.js standalone server and copies `public` plus `.next/static` into `.next/standalone`. `pnpm start` runs `server.js`, which starts `.next/standalone/server.js` on Hostinger's `PORT`.

## Environment Variables

Set these in Hostinger, not in Git:

```env
DATABASE_URL="file:/home/YOUR_HOSTINGER_USER/domains/YOUR_DOMAIN/app/db/custom.db"
NEXT_PUBLIC_SITE_URL="https://batumilighthouse.com"
NEXT_PUBLIC_CONTACT_EMAIL="hello@batumilighthouse.com"
NEXT_PUBLIC_ANALYTICS_DOMAIN="batumilighthouse.com"
NEXT_PUBLIC_WHATSAPP=""
NEXT_PUBLIC_WHATSAPP_HREF=""
NEXT_PUBLIC_INSTAGRAM_URL=""
NEXT_PUBLIC_LINKEDIN_URL=""
NEXT_PUBLIC_FACEBOOK_URL=""
```

`DATABASE_URL` is required for contact and audit request storage. Use an absolute SQLite path from Hostinger SSH or File Manager. Without it, the website still renders and forms show a safe fallback message, but submissions are not saved.

## Database Notes

The app currently uses SQLite through Prisma. The production database file should live at `db/custom.db` in the deployed application, referenced by an absolute `file:` URL. The database file is intentionally excluded from Git; `pnpm db:push` creates it during deployment. Before first launch, confirm that Hostinger can write to the `db` directory.

If the database is empty or missing tables, run the Prisma setup command from Hostinger SSH:

```bash
pnpm db:push
```

Back up `db/custom.db` before redeploying, replacing files, or changing the schema.

## Post-Deploy Checks

Open these URLs after deployment:

- `/`
- `/website-audits`
- `/pricing`
- `/work`
- `/templates`
- `/templates/hotel-01-luxury`
- `/preview/hotel-01-luxury`
- `/template-sites/hotel-01-luxury/booking`
- `/about`
- `/contact`
- `/privacy`
- `/terms`
- `/does-not-exist`
- `/ka`, `/ru`, `/tr`

Check:

- Header, footer, and mobile drawer work.
- Language switcher routes to Georgian, Russian, and Turkish pages.
- Contact form validates empty and invalid fields.
- Audit form validates empty and invalid fields.
- Valid form submission stores data, or shows the safe fallback if `DATABASE_URL` is missing.
- Internal example builds are clearly labelled as internal examples.
- The template catalog shows 18 entries in English, Georgian, Russian, and Turkish.
- Template previews load inside the preview shell, and their internal links stay inside `/preview/...`.
- `/preview/...` and `/template-sites/...` are noindex and absent from `sitemap.xml`.
- Raw template routes can be framed only by the same origin; normal business pages still use `frame-ancestors 'none'`.
- No horizontal overflow at mobile widths.
- No browser console errors or hydration errors.

## Known Limitations

- No production email delivery is configured.
- No CRM integration is configured.
- No payment or checkout flow is configured.
- No live booking engine is configured.
- SQLite is acceptable for a small launch, but backups and file permissions must be managed carefully.
