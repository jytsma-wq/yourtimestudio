import type { Metadata } from 'next';
import Link from 'next/link';
import { geistMono, geistSans } from '@/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Page not found - Yourtimestudio',
  description: 'The requested page could not be found.',
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-canvas font-sans text-ink antialiased`}>
        <main className="flex min-h-screen items-center justify-center px-[var(--container-padding)] py-16">
          <section className="w-full max-w-2xl rounded-md border border-hairline bg-surface p-6 md:p-8">
            <p className="mono-label mb-4 text-oxide-hover">404 / route check</p>
            <h1 className="text-heading-lg text-ink">Page not found.</h1>
            <p className="mt-4 max-w-xl text-body leading-[1.7] text-muted">
              This route does not exist or has moved. Use the main site routes for audits, work, pricing, or contact.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-md bg-oxide px-5 text-sm font-semibold text-white transition-colors hover:bg-oxide-hover"
              >
                Go home
              </Link>
              <Link
                href="/website-audits"
                className="inline-flex h-11 items-center justify-center rounded-md border border-hairline px-5 text-sm font-semibold text-ink transition-colors hover:border-sea/40 hover:bg-surface-elevated"
              >
                Request audit
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
