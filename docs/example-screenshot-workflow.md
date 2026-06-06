# Example Screenshot Workflow

Use this workflow to capture local screenshots of the two real example systems for the Batumi Lighthouse Work page. It is a development-only process. Batumi Lighthouse does not fetch GitHub repositories, live URLs, or screenshot data at runtime.

## 1. Clone The Example Repos Separately

Clone each example website outside the Batumi Lighthouse repo:

```bash
git clone https://github.com/jytsma-wq/silk-beauty-salon.git
git clone https://github.com/jytsma-wq/Grand-boutique-hotel.git
```

Keep each project in its own workspace so screenshots are captured from local running apps.

## 2. Install Dependencies

In each example repo, install its dependencies with the package manager used by that repo.

Common examples:

```bash
npm install
```

or:

```bash
pnpm install
```

Seed or configure any local data the example site needs before capturing screenshots.

## 3. Start Silk Beauty Salon On Port 3101

Start Silk Beauty Salon locally at:

```text
http://localhost:3101
```

Use the repo's own dev command and force port `3101` if needed. For a Next.js app, that is commonly:

```bash
npm run dev -- -p 3101
```

## 4. Start Grand Boutique Hotel On Port 3102

Start Grand Boutique Hotel locally at:

```text
http://localhost:3102
```

For a Next.js app, that is commonly:

```bash
npm run dev -- -p 3102
```

## 5. Configure Routes

The default route configuration lives at [examples.screenshots.config.mjs](../examples.screenshots.config.mjs).

Default targets:

- Silk Beauty Salon: `http://localhost:3101`
- Grand Boutique Hotel: `http://localhost:3102`

If the actual repos use different routes, update the `routes` array before capture. For example, if Silk uses `/services` instead of `/treatments`, change the route name and path there.

Route failures are non-fatal. If a configured route returns `404` or cannot load, the script logs the skipped route and continues with the rest.

## 6. Run The Capture Script

From the Batumi Lighthouse repo, run:

```bash
npm run examples:screenshots
```

To validate the config without launching Playwright or creating files:

```bash
npm run examples:screenshots -- --dry-run
```

To also capture desktop viewport-only previews:

```bash
npm run examples:screenshots -- --previews
```

## 7. Review Generated Screenshots

Screenshots are written to:

```text
public/work/{slug}/desktop-{route}.png
public/work/{slug}/tablet-{route}.png
public/work/{slug}/mobile-{route}.png
```

Optional preview output:

```text
public/work/{slug}/preview-{route}.png
```

Viewport sizes:

- Desktop: `1440x1100`
- Tablet: `834x1112`
- Mobile: `390x1200`

The script waits for network idle with a timeout fallback, disables animations, hides common cookie banners, and captures full-page screenshots for route archives.

## 8. Keep Only Strong Images

Review the generated files before committing. Delete weak screenshots, duplicated captures, awkward route states, cookie overlays, loading states, and images that do not help explain the interface.

Keep only the strongest desktop and mobile images for the portfolio presentation. Optimize selected PNG files before committing them if they are large.

## 9. Update Example System Content

After selecting final screenshots, update [src/content/example-systems.ts](../src/content/example-systems.ts) if route names differ from the default config.

Example:

```ts
screenshot: {
  desktop: '/work/silk-beauty-salon/desktop-home.png',
  tablet: '/work/silk-beauty-salon/tablet-home.png',
  mobile: '/work/silk-beauty-salon/mobile-home.png',
  alt: 'Silk Beauty Salon homepage interface shown as a beauty appointment website example',
}
```

The Work page and detail pages degrade to fallback visuals when screenshot files are missing, so deleting weak screenshots will not break the site.

## Notes

- This workflow is local-only and development-only.
- It is not part of `npm run build`.
- It does not fetch GitHub at runtime.
- It outputs selected assets under `public/work`.
- Batumi Lighthouse reads screenshots only through static content paths.
