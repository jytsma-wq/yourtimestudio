import 'server-only';

import { existsSync } from 'node:fs';
import path from 'node:path';
import type { ExampleSystem } from '@/content/example-systems';

export type ExampleScreenshotDevice = 'desktop' | 'tablet' | 'mobile';

export type AvailableExampleScreenshot = {
  device: ExampleScreenshotDevice;
  src: string;
};

export function publicWorkAssetExists(src?: string): src is string {
  if (!src || !src.startsWith('/')) return false;

  const normalizedPath = src.split('?')[0].replace(/^\/+/, '');
  const publicPath = path.join(process.cwd(), 'public', normalizedPath);

  return existsSync(publicPath);
}

export function getAvailableExampleScreenshots(system: ExampleSystem): AvailableExampleScreenshot[] {
  return ([
    { device: 'desktop', src: system.screenshot?.desktop },
    { device: 'mobile', src: system.screenshot?.mobile },
    { device: 'tablet', src: system.screenshot?.tablet },
  ] as Array<{ device: ExampleScreenshotDevice; src?: string }>).filter(
    (screenshot): screenshot is AvailableExampleScreenshot => publicWorkAssetExists(screenshot.src)
  );
}

export function getPrimaryExampleScreenshot(system: ExampleSystem): string | undefined {
  return getAvailableExampleScreenshots(system)[0]?.src;
}
