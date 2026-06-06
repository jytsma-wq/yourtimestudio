# Example Screenshot Workflow

Use this workflow to capture clean local screenshots of finished example websites for the Batumi Lighthouse Work page. It is a development-only process. The production site does not fetch GitHub repositories, live URLs, or screenshot data at runtime.

## 1. Start Each Example Website Locally

Clone or open each finished example website in its own workspace and start it on a fixed local port.

Recommended ports:

- Hotel direct booking system: `http://localhost:3101`
- Clinic trust website: `http://localhost:3102`
- Beauty appointment website: `http://localhost:3103`

Make sure each site is fully loaded locally before capturing screenshots. If the example site needs mock data, seed it locally first.

## 2. Configure Local URLs And Routes

Edit [examples.screenshots.config.mjs](../examples.screenshots.config.mjs) in the Batumi Lighthouse repo.

Each entry should include:

- `slug`: output folder name under `public/work/`
- `url`: local development URL for the example site
- `routes`: named paths to capture

Example:

```js
export default [
  {
    slug: 'hotel-direct-booking',
    url: 'http://localhost:3101',
    routes: [
      { name: 'home', path: '/' },
      { name: 'rooms', path: '/rooms' },
      { name: 'contact', path: '/contact' },
    ],
  },
];
```

## 3. Run The Capture Script

From the Batumi Lighthouse repo, run:

```bash
npm run screenshots:examples
```

The script uses Playwright locally, waits for network idle, disables animations, hides obvious cookie banners, and captures full-page screenshots.

To validate the config without launching Playwright or creating files, run:

```bash
npm run screenshots:examples -- --dry-run
```

Output paths:

```text
public/work/{slug}/desktop-{route}.png
public/work/{slug}/tablet-{route}.png
public/work/{slug}/mobile-{route}.png
```

Viewport sizes:

- Desktop: `1440x1100`
- Tablet: `834x1112`
- Mobile: `390x1200`

For viewport-only card crops, run:

```bash
npm run screenshots:examples -- --previews
```

That also writes:

```text
public/work/{slug}/preview-{viewport}-{route}.png
```

## 4. Commit Only Selected Optimized Screenshots

Review the generated images before committing. Keep only the screenshots that are sharp, useful, and representative of the system.

Optimize selected PNG files before committing them. Do not commit raw captures that are too large, visually weak, duplicated, or irrelevant to the Work page.

## 5. Update Example System Content

After selecting final screenshots, update [src/content/example-systems.ts](../src/content/example-systems.ts).

Use public paths such as:

```ts
screenshot: {
  desktop: '/work/hotel-direct-booking/desktop-home.png',
  tablet: '/work/hotel-direct-booking/tablet-home.png',
  mobile: '/work/hotel-direct-booking/mobile-home.png',
  alt: 'Hotel direct booking system homepage screenshot',
}
```

Keep `repoUrl` and `liveUrl` empty until there is a real repository or live URL that should be published.

## Notes

- This workflow is local/development only.
- It is not part of `npm run build`.
- The site still builds without Playwright browsers installed unless this screenshot script is run manually.
- The Work page reads only static content from `src/content/example-systems.ts`.
