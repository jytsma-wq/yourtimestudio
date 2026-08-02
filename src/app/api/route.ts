import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { isFormInboxReady } from '@/lib/form-validation';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

export async function GET() {
  const formsReady = isFormInboxReady();

  try {
    await Promise.all([
      db.lead.findFirst({ select: { id: true } }),
      db.auditRequest.findFirst({ select: { id: true } }),
    ]);

    return NextResponse.json(
      {
        ok: true,
        service: siteConfig.slug,
        database: 'ready',
        formsReady,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        service: siteConfig.slug,
        database: 'unavailable',
        formsReady,
      },
      {
        status: 503,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  }
}
