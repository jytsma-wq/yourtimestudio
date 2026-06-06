import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaultConfigPath = path.join(rootDir, 'examples.screenshots.config.mjs');
const outputRoot = path.join(rootDir, 'public', 'work');
const argv = process.argv.slice(2);
const args = new Set(argv);

const navigationTimeoutMs = 15_000;
const networkIdleTimeoutMs = 8_000;

const viewports = [
  { name: 'desktop', width: 1440, height: 1100 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 1200 },
];

const stableScreenshotCss = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    transition-duration: 0s !important;
    scroll-behavior: auto !important;
  }

  [data-cookie-banner],
  [role="dialog"][aria-label*="cookie" i],
  #cookie-banner,
  .cookie-banner {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
`;

const cookieSelectors = [
  '[data-cookie-banner]',
  '[role="dialog"][aria-label*="cookie" i]',
  '#cookie-banner',
  '.cookie-banner',
];

function printHelp() {
  console.log(`Capture local example website screenshots.

Usage:
  npm run examples:screenshots
  npm run examples:screenshots -- --config ./examples.screenshots.config.mjs
  npm run examples:screenshots -- --dry-run
  npm run examples:screenshots -- --previews

Outputs:
  public/work/{slug}/desktop-{route}.png
  public/work/{slug}/tablet-{route}.png
  public/work/{slug}/mobile-{route}.png

Optional --previews also writes desktop viewport-only crops:
  public/work/{slug}/preview-{route}.png
`);
}

function getArgValue(flag, fallback) {
  const index = argv.indexOf(flag);

  if (index === -1) return fallback;
  return argv[index + 1] || fallback;
}

function normalizeUrl(baseUrl, routePath) {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const pathWithoutLeadingSlash = routePath.replace(/^\/+/, '');
  return new URL(pathWithoutLeadingSlash, base).toString();
}

function relativeOutputPath(filePath) {
  return path.relative(rootDir, filePath).replaceAll(path.sep, '/');
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
      label: typeof site.label === 'string' && site.label.trim() ? site.label.trim() : site.slug,
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

async function hideCookieBanners(page) {
  for (const selector of cookieSelectors) {
    await page.locator(selector).evaluateAll((elements) => {
      for (const element of elements) {
        element.setAttribute(
          'style',
          'display:none!important;visibility:hidden!important;pointer-events:none!important;'
        );
      }
    }).catch(() => {});
  }
}

async function preparePage(page) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ content: stableScreenshotCss }).catch(() => {});
  await hideCookieBanners(page);
  await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
  await page.waitForTimeout(250);
  await page.addStyleTag({ content: stableScreenshotCss }).catch(() => {});
}

async function navigateWithFallback(page, targetUrl, site, route) {
  let response;

  try {
    response = await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: navigationTimeoutMs,
    });
  } catch (error) {
    console.warn(`[skip] ${site.slug}/${route.name}: navigation failed for ${targetUrl}`);
    console.warn(`       ${error.message}`);
    return { ok: false, status: undefined };
  }

  const status = response?.status();

  if (status === 404) {
    console.warn(`[skip] ${site.slug}/${route.name}: route returned 404 (${targetUrl})`);
    return { ok: false, status };
  }

  if (status && status >= 400) {
    console.warn(`[skip] ${site.slug}/${route.name}: route returned ${status} (${targetUrl})`);
    return { ok: false, status };
  }

  try {
    await page.waitForLoadState('networkidle', { timeout: networkIdleTimeoutMs });
  } catch {
    console.warn(`[warn] ${site.slug}/${route.name}: network idle timeout; capturing current loaded state.`);
  }

  return { ok: true, status };
}

async function captureViewport(page, site, route, viewport, outputDir, capturePreviews) {
  const targetUrl = normalizeUrl(site.url, route.path);
  const outputFile = path.join(outputDir, `${viewport.name}-${route.name}.png`);

  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  const navigation = await navigateWithFallback(page, targetUrl, site, route);

  if (!navigation.ok) {
    return false;
  }

  await preparePage(page);
  await page.screenshot({ path: outputFile, fullPage: true });
  console.log(`[write] ${relativeOutputPath(outputFile)}`);

  if (capturePreviews && viewport.name === 'desktop') {
    const previewFile = path.join(outputDir, `preview-${route.name}.png`);
    await page.screenshot({ path: previewFile, fullPage: false });
    console.log(`[write] ${relativeOutputPath(previewFile)}`);
  }

  return true;
}

async function captureSite(browser, site, capturePreviews) {
  const outputDir = path.join(outputRoot, site.slug);
  const skippedRoutes = [];
  let createdCount = 0;

  await mkdir(outputDir, { recursive: true });

  console.log(`\nCapturing ${site.label} (${site.slug})`);
  console.log(`Source: ${site.url}`);

  for (const route of site.routes) {
    const context = await browser.newContext({
      deviceScaleFactor: 1,
      locale: 'en-US',
    });
    const page = await context.newPage();
    let routeCaptured = false;
    let routeSkipped = false;

    try {
      for (const viewport of viewports) {
        const didCapture = await captureViewport(page, site, route, viewport, outputDir, capturePreviews);

        if (!didCapture) {
          skippedRoutes.push(`${site.slug}/${route.name}`);
          routeSkipped = true;
          break;
        }

        createdCount += 1;
        routeCaptured = true;
      }
    } finally {
      await context.close();
    }

    if (routeCaptured && !routeSkipped) {
      console.log(`[done] ${site.slug}/${route.name}`);
    }
  }

  return { createdCount, skippedRoutes };
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
  const skippedRoutes = [];
  let createdCount = 0;

  try {
    for (const site of config) {
      const result = await captureSite(browser, site, capturePreviews);
      createdCount += result.createdCount;
      skippedRoutes.push(...result.skippedRoutes);
    }
  } finally {
    await browser.close();
  }

  console.log(`\nScreenshots written to ${relativeOutputPath(outputRoot)}`);
  console.log(`Created ${createdCount} full-page screenshot(s).`);

  if (skippedRoutes.length > 0) {
    console.log(`Skipped ${skippedRoutes.length} route(s): ${skippedRoutes.join(', ')}`);
  }
}

main().catch((error) => {
  console.error('\nScreenshot capture failed.');
  console.error(error.message);
  process.exitCode = 1;
});
