import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { type Locale } from '@/lib/i18n/config';
import styles from './OrganicHome.module.css';

interface FounderSectionProps {
  locale: Locale;
}

export async function FounderSection({ locale }: FounderSectionProps) {
  const t = await getTranslations('founder');

  return (
    <section
      className={styles.founder}
      data-locale={locale}
      aria-labelledby="founder-heading"
    >
      <div className={styles.founderLayout}>
        <div className={`${styles.founderCopy} ${styles.reveal}`}>
          <p className={styles.sectionKicker}>{t('founder.sectionLabel')}</p>
          <h2 id="founder-heading">{t('founder.heading')}</h2>
          <p>{t('founder.bio')}</p>

          <div className={styles.founderFacts}>
            <span>{t('founder.location')}</span>
            <span>{t('founder.statAvailable')}</span>
          </div>

          <div className={styles.founderActions}>
            <Link href="/website-audits" className={styles.textLink}>
              {t('founder.cta')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/about" className={styles.textLink}>
              {t('founder.secondaryCta')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ol className={styles.processList} aria-label={t('founder.panelHeading')}>
          {[0, 1, 2, 3].map((index) => (
            <li key={index} className={styles.reveal}>
              <h3>{t(`founder.responsibilities.${index}.title`)}</h3>
              <p>{t(`founder.responsibilities.${index}.desc`)}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.founderNotes}>
        <article className={styles.reveal}>
          <h3>{t('founder.supportTitle')}</h3>
          <p>{t('founder.supportBody')}</p>
        </article>
        <article className={styles.reveal}>
          <h3>{t('founder.noFakeTitle')}</h3>
          <p>{t('founder.noFakeBody')}</p>
        </article>
      </div>
    </section>
  );
}
