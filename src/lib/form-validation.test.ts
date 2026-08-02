import { describe, expect, it } from 'vitest';
import {
  getAuditSchema,
  getLeadSchema,
  isFormInboxReady,
} from './form-validation';

const messages = {
  nameRequired: 'name required',
  businessRequired: 'business required',
  emailRequired: 'email required',
  emailInvalid: 'email invalid',
  sectorRequired: 'sector required',
  websiteRequired: 'website required',
  websiteInvalid: 'website invalid',
  messageRequired: 'message required',
};

describe('server-side form validation', () => {
  it('trims accepted lead values and rejects whitespace-only required values', () => {
    const schema = getLeadSchema(messages);
    const accepted = schema.parse({
      name: '  Ada  ',
      email: '  ada@example.com ',
      message: '  Please contact me.  ',
      websiteUrl: '  https://example.com/contact  ',
    });

    expect(accepted).toMatchObject({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Please contact me.',
      websiteUrl: 'https://example.com/contact',
    });
    expect(schema.safeParse({ name: '   ', email: 'ada@example.com', message: 'Hi' }).success).toBe(false);
    expect(schema.safeParse({ name: 'Ada', email: 'ada@example.com', message: '   ' }).success).toBe(false);
  });

  it('allows only HTTP(S) website URLs and rejects unknown keys', () => {
    const leadSchema = getLeadSchema(messages);
    expect(
      leadSchema.safeParse({
        name: 'Ada',
        email: 'ada@example.com',
        message: 'Hi',
        websiteUrl: 'javascript:alert(1)',
      }).success,
    ).toBe(false);
    expect(
      leadSchema.safeParse({
        name: 'Ada',
        email: 'ada@example.com',
        message: 'Hi',
        admin: true,
      }).success,
    ).toBe(false);

    const auditSchema = getAuditSchema(messages);
    expect(
      auditSchema.safeParse({
        name: 'Ada',
        businessName: 'Studio',
        email: 'ada@example.com',
        sector: 'hospitality',
        websiteUrl: 'ftp://example.com',
      }).success,
    ).toBe(false);
  });

  it('enables storage only for an explicit readiness flag', () => {
    expect(isFormInboxReady({})).toBe(false);
    expect(isFormInboxReady({ FORM_INBOX_READY: 'false' })).toBe(false);
    expect(isFormInboxReady({ FORM_INBOX_READY: 'TRUE' })).toBe(false);
    expect(isFormInboxReady({ FORM_INBOX_READY: 'true' })).toBe(true);
  });
});
