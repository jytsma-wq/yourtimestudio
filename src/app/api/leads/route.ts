import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';
import { sendLeadNotification } from '@/lib/email/notifications';
import { recaptchaActions } from '@/lib/recaptcha-actions';
import { verifyRecaptchaToken } from '@/lib/recaptcha';

const leadSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  businessName: z.string().max(200).optional(),
  email: z.string().min(1, 'Email is required').email('Invalid email address').max(300),
  phone: z.string().max(50).optional(),
  sector: z.string().max(100).optional(),
  websiteUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  budgetRange: z.string().max(100).optional(),
  preferredLanguage: z.string().max(50).optional(),
  message: z.string().min(1, 'Message is required').max(5000),
  source: z.string().max(50).optional(),
  recaptchaToken: z.string().min(1, 'reCAPTCHA verification is required'),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

export async function POST(request: NextRequest) {
  try {
    const rateLimit = checkRateLimit(request, {
      keyPrefix: 'lead',
      maxRequests: 5,
      windowMs: 10 * 60 * 1000,
    });

    if (rateLimit.limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rateLimit.retryAfter) },
        }
      );
    }

    const body = await request.json();

    // Honeypot check — bots fill this field
    if (body.honeypot) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors).flat()[0] || 'Validation failed';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;
    const recaptcha = await verifyRecaptchaToken({
      token: data.recaptchaToken,
      expectedAction: recaptchaActions.contact,
      remoteIp: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
    });

    if (!recaptcha.success) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    const lead = await db.lead.create({
      data: {
        name: data.name,
        businessName: data.businessName || null,
        email: data.email,
        phone: data.phone || null,
        sector: data.sector || null,
        websiteUrl: data.websiteUrl || null,
        budgetRange: data.budgetRange || null,
        preferredLanguage: data.preferredLanguage || null,
        message: data.message,
        source: data.source || 'contact_form',
      },
    });

    await sendLeadNotification(lead);

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
