import { expect, test } from '@playwright/test';
import { defaultLocale, launchLocales, type Locale } from '../src/lib/i18n/config';
import en from '../src/content/messages/en.json';
import ka from '../src/content/messages/ka.json';
import ru from '../src/content/messages/ru.json';
import tr from '../src/content/messages/tr.json';

const messagesByLocale = { en, ka, ru, tr } as const;

function localizedPath(locale: Locale, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

test.describe('localized form pages', () => {
  for (const locale of launchLocales) {
    test(`contact form renders localized strings and accepts input in ${locale}`, async ({ page }) => {
      const messages = messagesByLocale[locale];

      await page.goto(localizedPath(locale, '/contact'));

      await expect(page.getByRole('heading', { name: messages.contactPage.heading })).toBeVisible();
      await expect(page.getByRole('heading', { name: messages.contactPage.form.heading })).toBeVisible();
      await expect(page.getByText(messages.legalNotice.formText)).toBeVisible();

      const form = page.locator('#contact-form');
      await form.getByLabel(messages.contactPage.form.name, { exact: false }).fill('Mariam K.');
      await form.getByLabel(messages.contactPage.form.email, { exact: false }).fill('mariam@example.com');
      await form.getByLabel(messages.contactPage.form.website, { exact: false }).fill('https://example.com');
      await form.getByLabel(messages.contactPage.form.message, { exact: false }).fill('I need a clearer booking path.');

      await expect(form.getByLabel(messages.contactPage.form.name, { exact: false })).toHaveValue('Mariam K.');
      await expect(form.getByLabel(messages.contactPage.form.email, { exact: false })).toHaveValue('mariam@example.com');
      await expect(form.getByLabel(messages.contactPage.form.message, { exact: false })).toHaveValue('I need a clearer booking path.');
    });

    test(`audit form renders localized strings and accepts input in ${locale}`, async ({ page }) => {
      const messages = messagesByLocale[locale];

      await page.goto(localizedPath(locale, '/website-audits'));

      await expect(page.getByRole('heading', { name: messages.auditPage.hero.title })).toBeVisible();
      await expect(page.getByRole('heading', { name: messages.auditPage.form.heading })).toBeVisible();

      await page.getByLabel(messages.auditPage.form.name, { exact: false }).fill('Mariam K.');
      await page.getByLabel(messages.auditPage.form.business, { exact: false }).fill('Seafront Rooms');
      await page.getByLabel(messages.auditPage.form.email, { exact: false }).fill('mariam@example.com');
      await page.getByLabel(messages.auditPage.form.website, { exact: false }).fill('https://example.com');

      const sector = messages.contactPage.sectors[0];
      const sectorControl = page.getByRole('combobox', { name: new RegExp(messages.auditPage.form.sector) });
      await sectorControl.focus();
      await page.keyboard.press('Enter');
      await page.keyboard.press('Enter');

      await expect(page.getByLabel(messages.auditPage.form.name, { exact: false })).toHaveValue('Mariam K.');
      await expect(page.getByLabel(messages.auditPage.form.business, { exact: false })).toHaveValue('Seafront Rooms');
      await expect(page.getByLabel(messages.auditPage.form.email, { exact: false })).toHaveValue('mariam@example.com');
      await expect(page.getByLabel(messages.auditPage.form.website, { exact: false })).toHaveValue('https://example.com');
      await expect(sectorControl).toContainText(sector);
    });
  }
});
