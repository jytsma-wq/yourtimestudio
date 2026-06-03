import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/site-config';

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: siteConfig.slug,
  });
}
