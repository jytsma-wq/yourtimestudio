import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/site-config';
import { db } from '@/lib/db';

export async function GET() {
  try {
    await db.lead.count({ take: 1 });
    return NextResponse.json({
      ok: true,
      service: siteConfig.slug,
      database: 'ready',
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        service: siteConfig.slug,
        database: 'unavailable',
      },
      { status: 503 },
    );
  }
}
