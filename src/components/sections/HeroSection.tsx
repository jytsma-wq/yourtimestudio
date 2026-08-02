import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import type { Locale } from '@/lib/i18n/config';
import { OrganicHeroMedia, type OrganicHeroSlide } from './OrganicHeroMedia';
import { OrganicHeroScene } from './OrganicHeroScene';
import styles from './OrganicHome.module.css';

interface HeroSectionProps {
  locale: Locale;
}

const proofKeys = ['proof_band.0', 'proof_band.1', 'proof_band.2', 'proof_band.3'] as const;

export async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations('hero');
  const slides: OrganicHeroSlide[] = [
    {
      src: '/images/studio-scenes/hospitality-hero.webp',
      label: t('typewriter.hotel'),
      tone: 'hospitality',
    },
    {
      src: '/images/studio-scenes/clinic-story.webp',
      label: t('typewriter.clinic'),
      tone: 'clinic',
    },
    {
      src: '/images/studio-scenes/beauty-studio.webp',
      label: t('typewriter.salon'),
      tone: 'beauty',
    },
  ];

  return (
    <section
      id="hero"
      data-section-name={t('sectionLabel')}
      data-locale={locale}
      className={styles.hero}
    >
      <OrganicHeroMedia slides={slides} />
      <OrganicHeroScene />

      <div className={styles.heroInner}>
        <p className={styles.heroEyebrow}>{t('eyebrow')}</p>

        <div className={styles.heroCopy}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitlePrimary}>{t('title1')}</span>
            <em className={styles.heroTitleAccent}>{t('title2')}</em>
          </h1>

          <p className={styles.heroIntro}>{t('subtitle')}</p>
          <p className="sr-only">{t('visual_alt')}</p>

          <div className={styles.heroActions}>
            <Link
              href="/website-audits"
              className={styles.heroPrimary}
              data-analytics-event="homepage_primary_audit_cta_click"
              data-analytics-section="hero"
            >
              <span className={styles.heroActionDisc} aria-hidden="true">
                <ArrowDownRight className="size-4" />
              </span>
              <span>{t('cta_primary')}</span>
            </Link>

            <Link
              href="/work"
              className={styles.heroSecondary}
              data-analytics-event="homepage_work_cta_click"
              data-analytics-section="hero"
            >
              {t('cta_secondary')}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ul className={styles.heroProof}>
          {proofKeys.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
