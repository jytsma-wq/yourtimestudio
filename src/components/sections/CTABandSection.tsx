import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { type Locale } from '@/lib/i18n/config';
import styles from './OrganicHome.module.css';

interface CTABandSectionProps {
  locale: Locale;
}

export async function CTABandSection({ locale }: CTABandSectionProps) {
  const t = await getTranslations('ctaBand');

  return (
    <section
      id="cta"
      className={styles.cta}
      data-locale={locale}
      aria-labelledby="final-cta-heading"
    >
      <div className={styles.ctaLayout}>
        <div className={styles.reveal}>
          <p className={styles.sectionKicker}>{t('sectionLabel')}</p>
          <h2 id="final-cta-heading">{t('heading')}</h2>
        </div>

        <div className={`${styles.ctaBody} ${styles.reveal}`}>
          <p>{t('subtitle')}</p>
          <div className={styles.ctaActions}>
            <Link
              href="/website-audits"
              className={styles.ctaPrimary}
              data-analytics-event="final_audit_cta_click"
              data-analytics-section="final_cta"
            >
              <span aria-hidden="true">
                <ArrowDownRight className="size-4" />
              </span>
              <span>{t('primary')}</span>
            </Link>
            <Link
              href="/contact"
              className={styles.ctaSecondary}
              data-analytics-event="final_contact_cta_click"
              data-analytics-section="final_cta"
            >
              {t('secondary')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
