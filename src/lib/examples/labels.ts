import { getTranslations } from 'next-intl/server';
import type {
  ExampleProofLevel,
  ExampleSector,
  ExampleStatus,
  ExampleType,
} from '@/content/examples';

export async function getExampleUiLabels() {
  const t = await getTranslations('examplesUi');

  const proofLevels = {
    'verified-live': t('proofLabels.verifiedLive'),
    demo: t('proofLabels.demo'),
    concept: t('proofLabels.concept'),
    'private-client': t('proofLabels.privateClient'),
    internal: t('proofLabels.internal'),
  } satisfies Record<ExampleProofLevel, string>;

  return {
    page: {
      heading: t('page.heading'),
      subtitle: t('page.subtitle'),
      note: t('page.note'),
    },
    home: {
      sectionLabel: t('home.sectionLabel'),
      kicker: t('home.kicker'),
      heading: t('home.heading'),
      cta: t('home.cta'),
      note: t('home.note'),
    },
    preview: {
      screenshotComingSoon: t('preview.screenshotComingSoon'),
    },
    fields: {
      businessType: t('fields.businessType'),
      demonstratedProblem: t('fields.demonstratedProblem'),
      pagesModules: t('fields.pagesModules'),
      clientLearning: t('fields.clientLearning'),
      disclosure: t('fields.disclosure'),
      features: t('fields.features'),
      whatItShows: t('fields.whatItShows'),
    },
    typeLabels: {
      'real-project': t('typeLabels.realProject'),
      'demo-build': t('typeLabels.demoBuild'),
      concept: t('typeLabels.concept'),
      prototype: t('typeLabels.prototype'),
      'own-site': t('typeLabels.ownSite'),
    } satisfies Record<ExampleType, string>,
    statusLabels: {
      live: t('statusLabels.live'),
      'in-development': t('statusLabels.inDevelopment'),
      'demo-only': t('statusLabels.demoOnly'),
      private: t('statusLabels.private'),
    } satisfies Record<ExampleStatus, string>,
    proofLabels: proofLevels,
    sectorLabels: {
      hospitality: t('sectorLabels.hospitality'),
      medical: t('sectorLabels.medical'),
      beauty: t('sectorLabels.beauty'),
      studio: t('sectorLabels.studio'),
    } satisfies Record<ExampleSector, string>,
    buttons: {
      viewWebsite: t('buttons.viewWebsite'),
      viewDemo: t('buttons.viewDemo'),
      viewRepository: t('buttons.viewRepository'),
      viewExample: t('buttons.viewExample'),
      discussSimilarWebsite: t('buttons.discussSimilarWebsite'),
    },
    proofLine: (level: ExampleProofLevel) =>
      t('proofLine', { level: proofLevels[level] }),
  };
}
