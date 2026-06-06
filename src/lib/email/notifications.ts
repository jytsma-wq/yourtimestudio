import { Resend } from 'resend';

type NullableString = string | null | undefined;

interface LeadNotificationData {
  id: string;
  name: string;
  businessName?: NullableString;
  email: string;
  phone?: NullableString;
  sector?: NullableString;
  websiteUrl?: NullableString;
  budgetRange?: NullableString;
  preferredLanguage?: NullableString;
  message: string;
  source: string;
}

interface AuditNotificationData {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone?: NullableString;
  sector: string;
  websiteUrl: string;
  message?: NullableString;
}

interface NotificationEmail {
  subject: string;
  text: string;
}

function present(value: NullableString): string {
  return value?.trim() || '(none)';
}

function formatLines(lines: Array<[string, NullableString]>): string {
  return lines.map(([label, value]) => `${label}: ${present(value)}`).join('\n');
}

export function buildLeadNotificationEmail(lead: LeadNotificationData): NotificationEmail {
  return {
    subject: `New contact lead: ${lead.name}`,
    text: [
      'A new contact lead was submitted.',
      '',
      formatLines([
        ['Lead ID', lead.id],
        ['Name', lead.name],
        ['Business', lead.businessName],
        ['Email', lead.email],
        ['Phone', lead.phone],
        ['Sector', lead.sector],
        ['Website', lead.websiteUrl],
        ['Budget', lead.budgetRange],
        ['Preferred language', lead.preferredLanguage],
        ['Source', lead.source],
      ]),
      '',
      `Message:\n${present(lead.message)}`,
    ].join('\n'),
  };
}

export function buildAuditNotificationEmail(audit: AuditNotificationData): NotificationEmail {
  return {
    subject: `New website audit request: ${audit.businessName}`,
    text: [
      'A new website audit request was submitted.',
      '',
      formatLines([
        ['Audit ID', audit.id],
        ['Name', audit.name],
        ['Business', audit.businessName],
        ['Email', audit.email],
        ['Phone', audit.phone],
        ['Sector', audit.sector],
        ['Website', audit.websiteUrl],
      ]),
      '',
      `Message:\n${present(audit.message)}`,
    ].join('\n'),
  };
}

async function sendNotificationEmail(email: NotificationEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.NOTIFICATION_EMAIL_TO?.trim();
  const from =
    process.env.NOTIFICATION_EMAIL_FROM?.trim() ||
    'Batumi Lighthouse <onboarding@resend.dev>';

  if (!apiKey || !to) {
    console.warn(
      'Email notification skipped: RESEND_API_KEY or NOTIFICATION_EMAIL_TO is not configured.'
    );
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: email.subject,
      text: email.text,
    });

    if (error) {
      console.error('Email notification failed:', error);
    }
  } catch (error) {
    console.error('Email notification error:', error);
  }
}

export async function sendLeadNotification(lead: LeadNotificationData): Promise<void> {
  await sendNotificationEmail(buildLeadNotificationEmail(lead));
}

export async function sendAuditNotification(audit: AuditNotificationData): Promise<void> {
  await sendNotificationEmail(buildAuditNotificationEmail(audit));
}
