import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaultConfigPath = path.join(rootDir, 'examples.screenshots.config.mjs');
const outputRoot = path.join(rootDir, 'public', 'work');
const args = new Set(process.argv.slice(2));

const viewports = [
  { name: 'desktop', width: 1440, height: 1100 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 1200 },
];

const stableScreenshotCss = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }

  [id*="cookie" i],
  [class*="cookie" i],
  [aria-label*="cookie" i],
  [data-testid*="cookie" i],
  [id*="consent" i],
  [class*="consent" i],
  [aria-label*="consent" i],
  [data-testid*="consent" i],
  [id*="gdpr" i],
  [class*="gdpr" i],
  [data-testid*="gdpr" i],
  [id*="privacy-banner" i],
  [class*="privacy-banner" i] {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
`;

function printHelp() {
  console.log(`Capture local example website screenshots.

Usage:
  npm run screenshots:examples
  npm run screenshots:examples -- --config ./examples.screenshots.config.mjs
  npm run screenshots:examples -- --dry-run
  npm run screenshots:examples -- --previews

Outputs:
  public/work/{slug}/desktop-{route}.png
  public/work/{slug}/tablet-{route}.png
  public/work/{slug}/mobile-{route}.png

Optional --previews also writes viewport-only crops:
  public/work/{slug}/preview-desktop-{route}.png
`);
}

function getArgValue(flag, fallback) {
  const argv = process.argv.slice(2);
  const index = argv.indexOf(flag);

  if (index === -1) return fallback;
  return argv[index + 1] || fallback;
}

function normalizeUrl(baseUrl, routePath) {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const pathWithoutLeadingSlash = routePath.replace(/^\/+/, '');
  return new URL(pathWithoutLeadingSlash, base).toString();
}

function safeSegment(value, label) {
  const segment = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (!segment) {
    throw new Error(`Invalid ${label}: "${value}"`);
  }

  return segment;
}

function validateConfig(config) {
  if (!Array.isArray(config)) {
    throw new Error('examples.screenshots.config.mjs must export a default array.');
  }

  return config.map((site, siteIndex) => {
    if (!site || typeof site !== 'object') {
      throw new Error(`Config item ${siteIndex} must be an object.`);
    }

    if (!site.slug || typeof site.slug !== 'string') {
      throw new Error(`Config item ${siteIndex} is missing a string slug.`);
    }

    if (!site.url || typeof site.url !== 'string') {
      throw new Error(`Config item ${site.slug} is missing a string url.`);
    }

    try {
      new URL(site.url);
    } catch {
      throw new Error(`Config item ${site.slug} has an invalid url: ${site.url}`);
    }

    if (!Array.isArray(site.routes) || site.routes.length === 0) {
      throw new Error(`Config item ${site.slug} must include at least one route.`);
    }

    return {
      slug: safeSegment(site.slug, 'site slug'),
      url: site.url,
      routes: site.routes.map((route, routeIndex) => {
        if (!route || typeof route !== 'object') {
          throw new Error(`Route ${routeIndex} for ${site.slug} must be an object.`);
        }

        if (!route.name || typeof route.name !== 'string') {
          throw new Error(`Route ${routeIndex} for ${site.slug} is missing a string name.`);
        }

        if (!route.path || typeof route.path !== 'string') {
          throw new Error(`Route ${route.name} for ${site.slug} is missing a string path.`);
        }

        return {
          name: safeSegment(route.name, 'route name'),
          path: route.path,
        };
      }),
    };
  });
}

async function loadConfig(configPath) {
  const absolutePath = path.resolve(rootDir, configPath);
  const configModule = await import(`${pathToFileURL(absolutePath).href}?v=${Date.now()}`);
  return validateConfig(configModule.default);
}

async function importPlaywright() {
  try {
    return await import('@playwright/test');
  } catch (error) {
    throw new Error(
      [
        'Could not import @playwright/test.',
        'Install development dependencies first, then run this workflow manually.',
        `Original error: ${error.message}`,
      ].join('\n')
    );
  }
}

async function preparePage(page) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ content: stableScreenshotCss });

  await page.evaluate(() => {
    window.scrollTo(0, 0);

    const buttonLabels = [
      'accept',
      'agree',
      'allow all',
      'got it',
      'ok',
      'decline',
      'reject',
      'deny',
    ];

    for (const button of document.querySelectorAll('button, [role="button"]')) {
      const label = button.textContent?.trim().toLowerCase();
      if (label && buttonLabels.some((candidate) => label === candidate || label.includes(candidate))) {
        button.click();
        break;
      }
    }
  });

  await page.addStyleTag({ content: stableScreenshotCss });
}

async function captureRoute(page, site, route, viewport, capturePreviews) {
  const targetUrl = normalizeUrl(site.url, route.path);
  const outputDir = path.join(outputRoot, site.slug);
  const outputFile = path.join(outputDir, `${viewport.name}-${route.name}.png`);

  await mkdir(outputDir, { recursive: true });
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  console.log(`- ${site.slug}/${route.name} ${viewport.name}: ${targetUrl}`);

  await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 45_000 });
  await preparePage(page);
  await page.screenshot({ path: outputFile, fullPage: true });

  if (capturePreviews) {
    const previewFile = path.join(outputDir, `preview-${viewport.name}-${route.name}.png`);
    await page.screenshot({ path: previewFile, fullPage: false });
  }
}

async function main() {
  if (args.has('--help') || args.has('-h')) {
    printHelp();
    return;
  }

  const configPath = getArgValue('--config', defaultConfigPath);
  const capturePreviews = args.has('--previews');
  const config = await loadConfig(configPath);

  if (args.has('--dry-run')) {
    console.log(`Validated ${config.length} example screenshot target(s).`);
    for (const site of config) {
      for (const route of site.routes) {
        console.log(`- ${site.slug}/${route.name}: ${normalizeUrl(site.url, route.path)}`);
      }
    }
    return;
  }

  const { chromium } = await importPlaywright();
  const browser = await chromium.launch();

  try {
    for (const site of config) {
      console.log(`\nCapturing ${site.slug}`);
      const context = await browser.newContext({
        deviceScaleFactor: 1,
        locale: 'en-US',
      });
      const page = await context.newPage();

      try {
        for (const route of site.routes) {
          for (const viewport of viewports) {
            await captureRoute(page, site, route, viewport, capturePreviews);
          }
        }
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  console.log(`\nScreenshots written to ${path.relative(rootDir, outputRoot)}`);
}

main().catch((error) => {
  console.error('\nScreenshot capture failed.');
  console.error(error.message);
  process.exitCode = 1;
});
