import { ArrowUpRight, Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { type Locale } from '@/lib/i18n/config';
import { pricingPackages } from '@/lib/pricing-config';
import styles from './OrganicHome.module.css';

interface PricingSectionProps {
  locale: Locale;
}

export async function PricingSection({ locale }: PricingSectionProps) {
  const t = await getTranslations('pricing');

  return (
    <section
      className={styles.pricing}
      data-locale={locale}
      aria-labelledby="pricing-heading"
    >
      <div className={styles.pricingTop}>
        <div className={`${styles.pricingIntro} ${styles.reveal}`}>
          <p className={styles.sectionKicker}>{t('sectionLabel')}</p>
          <h2 id="pricing-heading">{t('heading')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <aside className={`${styles.auditOffer} ${styles.reveal}`}>
          <small>{t('audit_offer.kicker')}</small>
          <h3>{t('audit_offer.title')}</h3>
          <p>{t('audit_offer.body')}</p>
          <Link
            href="/website-audits"
            className={styles.textLink}
            data-analytics-event="pricing_audit_cta_click"
            data-analytics-section="pricing_preview"
          >
            {t('audit_offer.cta')}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </aside>
      </div>

      <div className={styles.pricingGrid}>
        {pricingPackages.map((pkg) => (
          <article key={pkg.key} className={`${styles.pricePath} ${styles.reveal}`}>
            {pkg.prominent && <span className={styles.priceFlag}>{t('most_popular')}</span>}

            <h3>{t(`${pkg.key}.name`)}</h3>
            <p className={styles.priceBestFit}>
              <strong>{t('best_for_label')}:</strong> {t(`${pkg.key}.best_fit`)}
            </p>

            <dl className={styles.priceAmounts}>
              <div>
                <dt>{t('setup_label')}</dt>
                <dd>{t(`${pkg.key}.setup`)}</dd>
              </div>
              <div>
                <dt>{t('monthly_label')}</dt>
                <dd>{t(`${pkg.key}.monthly`)}</dd>
              </div>
            </dl>

            <dl className={styles.priceOutcome}>
              <div>
                <dt>{t('outcome_label')}</dt>
                <dd>{t(`${pkg.key}.outcome`)}</dd>
              </div>
            </dl>

            <details className={styles.priceDetails}>
              <summary>
                {t('includes_label')}
                <Plus className="size-4 shrink-0" aria-hidden="true" />
              </summary>
              <ul>
                {Array.from({ length: Math.min(pkg.itemCount, 4) }, (_, itemIndex) => (
                  <li key={itemIndex}>{t(`${pkg.key}.includes.${itemIndex}`)}</li>
                ))}
              </ul>
            </details>

            <dl className={styles.priceScope}>
              <div>
                <dt>{t('scope_note_label')}</dt>
                <dd>{t(`${pkg.key}.scope_note`)}</dd>
              </div>
            </dl>

            <Link
              href="/contact"
              className={styles.textLink}
              data-analytics-event="pricing_card_cta_click"
              data-analytics-section="pricing_preview"
              data-analytics-item={pkg.key}
            >
              {t('cta')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>

      <div className={styles.pricingNote}>
        <p>{t('guarantee')}</p>
        <Link
          href="/pricing"
          className={styles.textLink}
          data-analytics-event="pricing_full_page_cta_click"
          data-analytics-section="pricing_preview"
        >
          {t('see_full_pricing')}
        </Link>
      </div>
    </section>
  );
}
