import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import styles from './OrganicHome.module.css';

interface PhotographyShowcaseSectionProps {
  number?: string;
}

export async function PhotographyShowcaseSection({ number }: PhotographyShowcaseSectionProps) {
  const t = await getTranslations('photographyHome');

  return (
    <section
      className={styles.photography}
      data-number={number}
      aria-labelledby="photography-heading"
    >
      <div className={`${styles.photoHeading} ${styles.reveal}`}>
        <div>
          <p className={styles.sectionKicker}>{t('eyebrow')}</p>
          <h2 id="photography-heading">{t('heading')}</h2>
        </div>

        <div>
          <p>{t('body')}</p>
          <div className={styles.photoActions}>
            <Link
              href="/photography"
              className={styles.textLink}
              data-analytics-event="homepage_photography_cta_click"
              data-analytics-section="photography_showcase"
            >
              {t('primaryCta')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className={styles.textLink}>
              {t('secondaryCta')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.photoStage}>
        <figure className={`${styles.photoMain} ${styles.reveal}`}>
          <Image
            src="/images/studio-scenes/food-story.webp"
            alt={t('sceneAlts.food')}
            fill
            sizes="(max-width: 760px) 100vw, 68vw"
          />
          <figcaption>{t('sceneTitles.food')}</figcaption>
        </figure>

        <ol className={`${styles.photoJourney} ${styles.reveal}`}>
          {[0, 1, 2].map((index) => (
            <li key={index}>
              <strong>{t(`outputs.${index}.title`)}</strong>
              <p>{t(`outputs.${index}.body`)}</p>
            </li>
          ))}
        </ol>

      </div>

      <p className={styles.photoDisclosure}>{t('stage.disclosure')}</p>
    </section>
  );
}
