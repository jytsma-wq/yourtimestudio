import { z } from 'zod';

type CommonMessages = {
  emailInvalid: string;
  emailRequired: string;
  nameRequired: string;
  websiteInvalid: string;
};

export type LeadValidationMessages = CommonMessages & {
  messageRequired: string;
};

export type AuditValidationMessages = CommonMessages & {
  businessRequired: string;
  sectorRequired: string;
  websiteRequired: string;
};

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function optionalText(maxLength: number) {
  return z.string().trim().max(maxLength).optional();
}

export function getLeadSchema(messages: LeadValidationMessages) {
  return z
    .object({
      name: z.string().trim().min(1, messages.nameRequired).max(200),
      businessName: optionalText(200),
      email: z.string().trim().min(1, messages.emailRequired).email(messages.emailInvalid).max(300),
      phone: optionalText(50),
      sector: optionalText(100),
      websiteUrl: z
        .string()
        .trim()
        .max(500)
        .refine((value) => value === '' || isHttpUrl(value), messages.websiteInvalid)
        .optional(),
      budgetRange: optionalText(100),
      preferredLanguage: optionalText(50),
      message: z.string().trim().min(1, messages.messageRequired).max(5000),
      source: optionalText(50),
      honeypot: optionalText(200),
    })
    .strict();
}

export function getAuditSchema(messages: AuditValidationMessages) {
  return z
    .object({
      name: z.string().trim().min(1, messages.nameRequired).max(200),
      businessName: z.string().trim().min(1, messages.businessRequired).max(200),
      email: z.string().trim().min(1, messages.emailRequired).email(messages.emailInvalid).max(300),
      phone: optionalText(50),
      sector: z.string().trim().min(1, messages.sectorRequired).max(100),
      websiteUrl: z
        .string()
        .trim()
        .min(1, messages.websiteRequired)
        .max(500)
        .refine(isHttpUrl, messages.websiteInvalid),
      message: optionalText(5000),
      website_check: optionalText(200),
    })
    .strict();
}

export function isFormInboxReady(
  env: Record<string, string | undefined> = process.env,
) {
  return env.FORM_INBOX_READY === 'true';
}
