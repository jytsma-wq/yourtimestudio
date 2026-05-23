import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';

const auditSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  businessName: z.string().min(1, 'Business name is required').max(200),
  email: z.string().min(1, 'Email is required').email('Invalid email address').max(300),
  phone: z.string().max(50).optional(),
  sector: z.string().min(1, 'Sector is required').max(100),
  websiteUrl: z.string().min(1, 'Website URL is required').url('Invalid URL').max(500),
  message: z.string().max(5000).optional(),
  website_check: z.string().max(0, 'Bot detected').optional(),
});

export async function POST(request: NextRequest) {
  try {
    const rateLimit = checkRateLimit(request, {
      keyPrefix: 'audit',
      maxRequests: 3,
      windowMs: 15 * 60 * 1000,
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
    if (body.website_check) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const parsed = auditSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors).flat()[0] || 'Validation failed';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;

    const audit = await db.auditRequest.create({
      data: {
        name: data.name,
        businessName: data.businessName,
        email: data.email,
        phone: data.phone || null,
        sector: data.sector,
        websiteUrl: data.websiteUrl,
        message: data.message || null,
      },
    });

    return NextResponse.json({ success: true, id: audit.id }, { status: 201 });
  } catch (error) {
    console.error('Audit request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
