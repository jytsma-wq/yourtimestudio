import { describe, expect, it } from 'vitest';

import { getLocaleHref } from './locale-switch';

describe('getLocaleHref', () => {
  it('keeps the default locale unprefixed', () => {
    expect(getLocaleHref('/contact', 'en')).toBe('/contact');
  });

  it('prefixes non-default locales', () => {
    expect(getLocaleHref('/contact', 'ka')).toBe('/ka/contact');
  });

  it('preserves query parameters and hashes', () => {
    expect(getLocaleHref('/contact', 'tr', '?template=hotel', '#details')).toBe(
      '/tr/contact?template=hotel#details'
    );
  });

  it('normalizes suffixes supplied without delimiters', () => {
    expect(getLocaleHref('/', 'ru', 'template=clinic', 'form')).toBe(
      '/ru?template=clinic#form'
    );
  });
});
