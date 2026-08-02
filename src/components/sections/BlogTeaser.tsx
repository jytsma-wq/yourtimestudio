import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { type Locale } from '@/lib/i18n/config';
import { sectors } from '@/lib/sector-config';
import { Section } from '@/components/shared/Section';

interface BlogTeaserProps {
  locale: Locale;
}

const articleMeta = [
  { key: '0' as const, categoryKey: 'hospitality' as const },
  { key: '1' as const, categoryKey: 'medical' as const },
  { key: '2' as const, categoryKey: 'beauty' as const },
];

export async function BlogTeaser({ locale: _locale }: BlogTeaserProps) {
  const t = await getTranslations('blog');

  return (
    <Section border>
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 border-b border-border pb-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="section-label">{t('sectionLabel')}</p>
            <p className="editorial-kicker text-muted-foreground">{t('fieldNotes')}</p>
          </div>
          <div>
            <h2 className="editorial-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            {t('heading')}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="grid gap-8 pt-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border border-border bg-card p-6 shadow-none md:p-8">
            <p className="editorial-kicker text-navy">{t('description')}</p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight text-foreground">
              {t('articles.0.title')}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t('featuredDescription')}
            </p>
            <Link
              href="/insights"
              className="mt-8 inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-semibold text-foreground no-underline transition-colors duration-150 ease-in-out hover:border-accent hover:text-navy"
            >
              {t('allArticles')}
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="border-y border-border">
            {articleMeta.map((article) => {
              const sector = sectors[article.categoryKey];
              return (
                <Link
                  key={article.key}
                  href="/insights"
                  className="group grid gap-4 border-b border-border py-5 last:border-b-0 md:grid-cols-[1fr_auto] md:items-start"
                >
                  <div>
                    <span className={`editorial-kicker ${sector.textClass}`}>
                      {t(`categories.${article.categoryKey}`)}
                    </span>
                    <p className="mt-2 text-lg font-semibold leading-snug text-foreground group-hover:text-navy">
                      {t(`articles.${article.key}.title`)}
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{t(`articles.${article.key}.date`)}</span>
                      <span className="text-border">/</span>
                      <span>{t(`articles.${article.key}.readTime`)}</span>
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground transition-colors group-hover:text-navy" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
