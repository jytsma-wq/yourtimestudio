import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, Search } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-canvas px-[var(--container-padding)] py-16">
      <div className="w-full max-w-2xl rounded-md border border-hairline bg-surface p-6 text-left md:p-8">
        <p className="mono-label mb-4 text-oxide-hover">404 / route check</p>
        <h1 className="text-heading-lg text-ink">
          {t('heading')}
        </h1>
        <p className="mt-4 max-w-xl text-body leading-[1.7] text-muted">
          {t('body')}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="size-4 mr-2" />
              {t('home')}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/website-audits">
              <Search className="size-4 mr-2" />
              {t('audit')}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="text-muted hover:bg-surface-elevated hover:text-ink">
            <Link href="/contact">
              {t('contact')}
              <ArrowRight className="size-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
