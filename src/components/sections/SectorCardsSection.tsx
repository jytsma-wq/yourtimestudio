import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { type Locale } from '@/lib/i18n/config';
import { sectorKeys, sectors, type SectorKey } from '@/lib/sector-config';
import styles from './OrganicHome.module.css';

interface SectorCardsSectionProps {
  locale: Locale;
}

const imageBySector: Record<SectorKey, string> = {
  hospitality: '/images/studio-scenes/hospitality-hero.webp',
  medical: '/images/studio-scenes/clinic-story.webp',
  beauty: '/images/studio-scenes/beauty-studio.webp',
};

export async function SectorCardsSection({ locale }: SectorCardsSectionProps) {
  const t = await getTranslations('sectors');

  return (
    <section
      className={`${styles.section} bg-background`}
      data-locale={locale}
      aria-labelledby="services-heading"
    >
      <div className={styles.sectionInner}>
        <div className={`${styles.sectionIntro} ${styles.reveal}`}>
          <div>
            <p className={styles.sectionKicker}>{t('sectionLabel')}</p>
            <h2 id="services-heading">{t('heading')}</h2>
          </div>
          <p>{t('subtitle')}</p>
        </div>

        <div className={styles.sectorStories}>
          {sectorKeys.map((sectorKey, index) => {
            const sector = sectors[sectorKey];
            const reverse = index % 2 === 1;

            return (
              <article
                key={sectorKey}
                className={`${styles.sectorStory} ${
                  reverse ? styles.sectorStoryReverse : ''
                }`}
              >
                <figure className={`${styles.sectorMedia} ${styles.reveal}`}>
                  <Image
                    src={imageBySector[sectorKey]}
                    alt={t(`${sectorKey}.subtitle`)}
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1024px) 60vw, 58vw"
                    className={sector.focalPoint}
                    placeholder="blur"
                    blurDataURL={sector.blur}
                  />
                </figure>

                <div className={`${styles.sectorCopy} ${styles.reveal}`}>
                  <h3>{t(`${sectorKey}.title`)}</h3>
                  <p>{t(`${sectorKey}.pain`)}</p>

                  <ul className={styles.deliverables}>
                    {[0, 1, 2].map((itemIndex) => (
                      <li key={itemIndex}>
                        {t(`${sectorKey}.deliverables.${itemIndex}`)}
                      </li>
                    ))}
                  </ul>

                  <Link href={sector.href} className={styles.textLink}>
                    {t(`${sectorKey}.cta`)}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
