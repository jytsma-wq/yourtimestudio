import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { exampleScreenshotDirectory } from '@/content/examples';
import { getExampleUiLabels } from '@/lib/examples/labels';
import { getLocalizedFeaturedExamples } from '@/lib/examples/localized';
import styles from './OrganicHome.module.css';

export async function ExampleBuildsSection({ number }: { number?: string }) {
  const labels = await getExampleUiLabels();
  const examples = await getLocalizedFeaturedExamples();

  return (
    <section
      className={`${styles.section} ${styles.examples}`}
      data-number={number}
      aria-labelledby="examples-heading"
    >
      <div className={styles.sectionInner}>
        <div className={`${styles.sectionIntro} ${styles.reveal}`}>
          <div>
            <p className={styles.sectionKicker}>{labels.home.sectionLabel}</p>
            <h2 id="examples-heading">{labels.home.heading}</h2>
          </div>
          <p>{labels.home.note}</p>
        </div>

        <div className={styles.projectList}>
          {examples.map((example, index) => {
            const reverse = index % 2 === 1;

            return (
              <article
                key={example.id}
                className={`${styles.project} ${reverse ? styles.projectReverse : ''}`}
              >
                <Link
                  href={`/work/${example.slug}`}
                  className={`${styles.projectMedia} ${styles.reveal}`}
                  data-analytics-event="work_example_card_click"
                  data-analytics-section="homepage_examples"
                  data-analytics-item={example.slug}
                  aria-label={`${labels.buttons.viewExample}: ${example.title}`}
                >
                  <Image
                    src={`${exampleScreenshotDirectory}/${example.screenshotFilename}`}
                    alt={example.imageAlt}
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1024px) 62vw, 58vw"
                  />
                </Link>

                <div className={`${styles.projectCopy} ${styles.reveal}`}>
                  <p className={styles.projectLabels}>
                    <span>0{index + 1}</span>
                    <span>{labels.proofLabels[example.proofLevel]}</span>
                    <span>{labels.statusLabels[example.status]}</span>
                  </p>

                  <h3>{example.title}</h3>
                  <p className={styles.projectDescription}>{example.shortDescription}</p>

                  <dl className={styles.projectMeta}>
                    <div>
                      <dt>{labels.fields.businessType}</dt>
                      <dd>{example.businessType}</dd>
                    </div>
                  </dl>

                  <ul className={styles.projectModules} aria-label={labels.fields.pagesModules}>
                    {example.modules.slice(0, 3).map((module) => (
                      <li key={module}>{module}</li>
                    ))}
                  </ul>

                  <dl className={styles.projectMeta}>
                    <div>
                      <dt>{labels.fields.clientLearning}</dt>
                      <dd>{example.clientLearning[0]}</dd>
                    </div>
                  </dl>

                  <Link
                    href={`/work/${example.slug}`}
                    className={styles.textLink}
                    data-analytics-event="work_example_card_click"
                    data-analytics-section="homepage_examples_text"
                    data-analytics-item={example.slug}
                  >
                    {labels.buttons.viewExample}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>

                  <p className={styles.projectDisclosure}>{example.disclaimer}</p>
                </div>
              </article>
            );
          })}
        </div>

        <Link
          href="/work"
          className={styles.textLink}
          data-analytics-event="work_examples_index_cta_click"
          data-analytics-section="homepage_examples"
        >
          {labels.home.cta}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
