import {
  getTemplateById,
  templateIds,
  type BarCocktailPageSlug,
  type BarPubPageSlug,
  type BarRooftopPageSlug,
  type BeautySalonPageSlug,
  type BeautySpaPageSlug,
  type BeautyAestheticPageSlug,
  type DentistCosmeticPageSlug,
  type DentistClinicalPageSlug,
  type DentistFamilyPageSlug,
  type HotelBoutiquePageSlug,
  type HotelLuxuryPageSlug,
  type HotelResortPageSlug,
  type RestaurantBistroPageSlug,
  type RestaurantFastCasualPageSlug,
  type RestaurantPageSlug,
  type ShopFashionPageSlug,
  type ShopLifestylePageSlug,
  type ShopSpecialtyPageSlug,
  type TemplateId
} from "@website-template-factory/content";
import {
  BarCocktailTemplate,
  BarPubTemplate,
  BarRooftopTemplate,
  barCocktailTemplateConfig,
  barPubTemplateConfig,
  barRooftopTemplateConfig,
  getBarCocktailSeo,
  getBarPubSeo,
  getBarRooftopSeo,
  isBarCocktailSlug,
  isBarPubSlug,
  isBarRooftopSlug
} from "@website-template-factory/template-bar";
import {
  BeautySalonTemplate,
  BeautyAestheticTemplate,
  BeautySpaTemplate,
  beautySalonTemplateConfig,
  beautyAestheticTemplateConfig,
  beautySpaTemplateConfig,
  getBeautySalonSeo,
  getBeautyAestheticSeo,
  getBeautySpaSeo,
  isBeautySalonSlug,
  isBeautyAestheticSlug,
  isBeautySpaSlug
} from "@website-template-factory/template-beauty-salon";
import {
  DentistClinicalTemplate,
  DentistCosmeticTemplate,
  DentistFamilyTemplate,
  dentistClinicalTemplateConfig,
  dentistCosmeticTemplateConfig,
  dentistFamilyTemplateConfig,
  getDentistClinicalSeo,
  getDentistCosmeticSeo,
  getDentistFamilySeo,
  isDentistClinicalSlug,
  isDentistCosmeticSlug,
  isDentistFamilySlug
} from "@website-template-factory/template-dentist";
import {
  HotelBoutiqueTemplate,
  HotelLuxuryTemplate,
  HotelResortTemplate,
  getHotelBoutiqueSeo,
  getHotelLuxurySeo,
  getHotelResortSeo,
  hotelBoutiqueTemplateConfig,
  hotelLuxuryTemplateConfig,
  hotelResortTemplateConfig,
  isHotelBoutiqueSlug,
  isHotelLuxurySlug,
  isHotelResortSlug
} from "@website-template-factory/template-hotel";
import {
  RestaurantBistroTemplate,
  RestaurantFastCasualTemplate,
  RestaurantFineDiningTemplate,
  getRestaurantBistroSeo,
  getRestaurantFastCasualSeo,
  getRestaurantFineDiningSeo,
  isRestaurantBistroSlug,
  isRestaurantFastCasualSlug,
  isRestaurantFineDiningSlug,
  restaurantBistroTemplateConfig,
  restaurantFastCasualTemplateConfig,
  restaurantFineDiningTemplateConfig
} from "@website-template-factory/template-restaurant";
import {
  ShopFashionTemplate,
  ShopLifestyleTemplate,
  ShopSpecialtyTemplate,
  getShopFashionSeo,
  getShopLifestyleSeo,
  getShopSpecialtySeo,
  isShopFashionSlug,
  isShopLifestyleSlug,
  isShopSpecialtySlug,
  shopFashionTemplateConfig,
  shopLifestyleTemplateConfig,
  shopSpecialtyTemplateConfig
} from "@website-template-factory/template-shop";
import { Badge, Container, createSeoMetadata, type SEOInput } from "@website-template-factory/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { TemplateDemoDisclosure } from "@/components/templates/TemplateDemoDisclosure";

type PageParams = {
  templateId: string;
  slug?: string[];
};

type PageProps = {
  params: Promise<PageParams>;
};

function isTemplateId(id: string): id is TemplateId {
  return (templateIds as readonly string[]).includes(id);
}

function getSlug(parts?: string[]) {
  return parts?.join("/") ?? "";
}

function getRawBasePath(templateId: TemplateId) {
  return `/template-sites/${templateId}`;
}

function getRawPagePath(templateId: TemplateId, slug: string) {
  return `${getRawBasePath(templateId)}${slug ? `/${slug}` : ""}`;
}

type CompletedTemplateRoute = {
  id: TemplateId;
  pageSlugs: readonly string[];
  isSlug: (slug: string) => boolean;
  notFoundSeo: Pick<SEOInput, "title" | "description">;
  getSeo: (slug: string) => SEOInput;
  render: (slug: string) => ReactNode;
};

const completedTemplateRoutes = [
  {
    id: hotelLuxuryTemplateConfig.id,
    pageSlugs: hotelLuxuryTemplateConfig.pageSlugs,
    isSlug: isHotelLuxurySlug,
    notFoundSeo: {
      title: "Hotel page not found",
      description: "Missing route for the hotel luxury template."
    },
    getSeo: (slug) => getHotelLuxurySeo(slug as HotelLuxuryPageSlug),
    render: (slug) => (
      <HotelLuxuryTemplate
        slug={slug as HotelLuxuryPageSlug}
        basePath={getRawBasePath(hotelLuxuryTemplateConfig.id)}
        heroImageSrc={hotelLuxuryTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: hotelBoutiqueTemplateConfig.id,
    pageSlugs: hotelBoutiqueTemplateConfig.pageSlugs,
    isSlug: isHotelBoutiqueSlug,
    notFoundSeo: {
      title: "Boutique hotel page not found",
      description: "Missing route for the boutique hotel template."
    },
    getSeo: (slug) => getHotelBoutiqueSeo(slug as HotelBoutiquePageSlug),
    render: (slug) => (
      <HotelBoutiqueTemplate
        slug={slug as HotelBoutiquePageSlug}
        basePath={getRawBasePath(hotelBoutiqueTemplateConfig.id)}
        heroImageSrc={hotelBoutiqueTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: hotelResortTemplateConfig.id,
    pageSlugs: hotelResortTemplateConfig.pageSlugs,
    isSlug: isHotelResortSlug,
    notFoundSeo: {
      title: "Resort hotel page not found",
      description: "Missing route for the resort hotel template."
    },
    getSeo: (slug) => getHotelResortSeo(slug as HotelResortPageSlug),
    render: (slug) => (
      <HotelResortTemplate
        slug={slug as HotelResortPageSlug}
        basePath={getRawBasePath(hotelResortTemplateConfig.id)}
        heroImageSrc={hotelResortTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: beautySalonTemplateConfig.id,
    pageSlugs: beautySalonTemplateConfig.pageSlugs,
    isSlug: isBeautySalonSlug,
    notFoundSeo: {
      title: "Salon page not found",
      description: "Missing route for the beauty salon template."
    },
    getSeo: (slug) => getBeautySalonSeo(slug as BeautySalonPageSlug),
    render: (slug) => (
      <BeautySalonTemplate
        slug={slug as BeautySalonPageSlug}
        basePath={getRawBasePath(beautySalonTemplateConfig.id)}
        heroImageSrc={beautySalonTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: beautySpaTemplateConfig.id,
    pageSlugs: beautySpaTemplateConfig.pageSlugs,
    isSlug: isBeautySpaSlug,
    notFoundSeo: {
      title: "Spa page not found",
      description: "Missing route for the wellness spa template."
    },
    getSeo: (slug) => getBeautySpaSeo(slug as BeautySpaPageSlug),
    render: (slug) => (
      <BeautySpaTemplate
        slug={slug as BeautySpaPageSlug}
        basePath={getRawBasePath(beautySpaTemplateConfig.id)}
        heroImageSrc={beautySpaTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: beautyAestheticTemplateConfig.id,
    pageSlugs: beautyAestheticTemplateConfig.pageSlugs,
    isSlug: isBeautyAestheticSlug,
    notFoundSeo: {
      title: "Aesthetic clinic page not found",
      description: "Missing route for the aesthetic clinic template."
    },
    getSeo: (slug) => getBeautyAestheticSeo(slug as BeautyAestheticPageSlug),
    render: (slug) => (
      <BeautyAestheticTemplate
        slug={slug as BeautyAestheticPageSlug}
        basePath={getRawBasePath(beautyAestheticTemplateConfig.id)}
        heroImageSrc={beautyAestheticTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: dentistCosmeticTemplateConfig.id,
    pageSlugs: dentistCosmeticTemplateConfig.pageSlugs,
    isSlug: isDentistCosmeticSlug,
    notFoundSeo: {
      title: "Cosmetic dentist page not found",
      description: "Missing route for the premium cosmetic dentist template."
    },
    getSeo: (slug) => getDentistCosmeticSeo(slug as DentistCosmeticPageSlug),
    render: (slug) => (
      <DentistCosmeticTemplate
        slug={slug as DentistCosmeticPageSlug}
        basePath={getRawBasePath(dentistCosmeticTemplateConfig.id)}
        heroImageSrc={dentistCosmeticTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: dentistClinicalTemplateConfig.id,
    pageSlugs: dentistClinicalTemplateConfig.pageSlugs,
    isSlug: isDentistClinicalSlug,
    notFoundSeo: {
      title: "Dentist page not found",
      description: "Missing route for the clinical dentist template."
    },
    getSeo: (slug) => getDentistClinicalSeo(slug as DentistClinicalPageSlug),
    render: (slug) => (
      <DentistClinicalTemplate
        slug={slug as DentistClinicalPageSlug}
        basePath={getRawBasePath(dentistClinicalTemplateConfig.id)}
        heroImageSrc={dentistClinicalTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: dentistFamilyTemplateConfig.id,
    pageSlugs: dentistFamilyTemplateConfig.pageSlugs,
    isSlug: isDentistFamilySlug,
    notFoundSeo: {
      title: "Family dentist page not found",
      description: "Missing route for the family dentist template."
    },
    getSeo: (slug) => getDentistFamilySeo(slug as DentistFamilyPageSlug),
    render: (slug) => (
      <DentistFamilyTemplate
        slug={slug as DentistFamilyPageSlug}
        basePath={getRawBasePath(dentistFamilyTemplateConfig.id)}
        heroImageSrc={dentistFamilyTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: restaurantFineDiningTemplateConfig.id,
    pageSlugs: restaurantFineDiningTemplateConfig.pageSlugs,
    isSlug: isRestaurantFineDiningSlug,
    notFoundSeo: {
      title: "Restaurant page not found",
      description: "Missing route for the restaurant pilot template."
    },
    getSeo: (slug) => getRestaurantFineDiningSeo(slug as RestaurantPageSlug),
    render: (slug) => (
      <RestaurantFineDiningTemplate
        slug={slug as RestaurantPageSlug}
        basePath={getRawBasePath(restaurantFineDiningTemplateConfig.id)}
        heroImageSrc={restaurantFineDiningTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: restaurantBistroTemplateConfig.id,
    pageSlugs: restaurantBistroTemplateConfig.pageSlugs,
    isSlug: isRestaurantBistroSlug,
    notFoundSeo: {
      title: "Bistro page not found",
      description: "Missing route for the neighborhood bistro template."
    },
    getSeo: (slug) => getRestaurantBistroSeo(slug as RestaurantBistroPageSlug),
    render: (slug) => (
      <RestaurantBistroTemplate
        slug={slug as RestaurantBistroPageSlug}
        basePath={getRawBasePath(restaurantBistroTemplateConfig.id)}
        heroImageSrc={restaurantBistroTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: restaurantFastCasualTemplateConfig.id,
    pageSlugs: restaurantFastCasualTemplateConfig.pageSlugs,
    isSlug: isRestaurantFastCasualSlug,
    notFoundSeo: {
      title: "Fast casual restaurant page not found",
      description: "Missing route for the fast casual restaurant template."
    },
    getSeo: (slug) => getRestaurantFastCasualSeo(slug as RestaurantFastCasualPageSlug),
    render: (slug) => (
      <RestaurantFastCasualTemplate
        slug={slug as RestaurantFastCasualPageSlug}
        basePath={getRawBasePath(restaurantFastCasualTemplateConfig.id)}
        heroImageSrc={restaurantFastCasualTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: shopFashionTemplateConfig.id,
    pageSlugs: shopFashionTemplateConfig.pageSlugs,
    isSlug: isShopFashionSlug,
    notFoundSeo: {
      title: "Fashion shop page not found",
      description: "Missing route for the editorial fashion shop template."
    },
    getSeo: (slug) => getShopFashionSeo(slug as ShopFashionPageSlug),
    render: (slug) => (
      <ShopFashionTemplate
        slug={slug as ShopFashionPageSlug}
        basePath={getRawBasePath(shopFashionTemplateConfig.id)}
        heroImageSrc={shopFashionTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: shopLifestyleTemplateConfig.id,
    pageSlugs: shopLifestyleTemplateConfig.pageSlugs,
    isSlug: isShopLifestyleSlug,
    notFoundSeo: {
      title: "Lifestyle shop page not found",
      description: "Missing route for the lifestyle shop template."
    },
    getSeo: (slug) => getShopLifestyleSeo(slug as ShopLifestylePageSlug),
    render: (slug) => (
      <ShopLifestyleTemplate
        slug={slug as ShopLifestylePageSlug}
        basePath={getRawBasePath(shopLifestyleTemplateConfig.id)}
        heroImageSrc={shopLifestyleTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: shopSpecialtyTemplateConfig.id,
    pageSlugs: shopSpecialtyTemplateConfig.pageSlugs,
    isSlug: isShopSpecialtySlug,
    notFoundSeo: {
      title: "Specialty shop page not found",
      description: "Missing route for the specialty retail template."
    },
    getSeo: (slug) => getShopSpecialtySeo(slug as ShopSpecialtyPageSlug),
    render: (slug) => (
      <ShopSpecialtyTemplate
        slug={slug as ShopSpecialtyPageSlug}
        basePath={getRawBasePath(shopSpecialtyTemplateConfig.id)}
        heroImageSrc={shopSpecialtyTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: barCocktailTemplateConfig.id,
    pageSlugs: barCocktailTemplateConfig.pageSlugs,
    isSlug: isBarCocktailSlug,
    notFoundSeo: {
      title: "Cocktail bar page not found",
      description: "Missing route for the premium cocktail bar template."
    },
    getSeo: (slug) => getBarCocktailSeo(slug as BarCocktailPageSlug),
    render: (slug) => (
      <BarCocktailTemplate
        slug={slug as BarCocktailPageSlug}
        basePath={getRawBasePath(barCocktailTemplateConfig.id)}
        heroImageSrc={barCocktailTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: barPubTemplateConfig.id,
    pageSlugs: barPubTemplateConfig.pageSlugs,
    isSlug: isBarPubSlug,
    notFoundSeo: {
      title: "Pub page not found",
      description: "Missing route for the modern pub template."
    },
    getSeo: (slug) => getBarPubSeo(slug as BarPubPageSlug),
    render: (slug) => (
      <BarPubTemplate
        slug={slug as BarPubPageSlug}
        basePath={getRawBasePath(barPubTemplateConfig.id)}
        heroImageSrc={barPubTemplateConfig.defaultHeroImage}
      />
    )
  },
  {
    id: barRooftopTemplateConfig.id,
    pageSlugs: barRooftopTemplateConfig.pageSlugs,
    isSlug: isBarRooftopSlug,
    notFoundSeo: {
      title: "Rooftop bar page not found",
      description: "Missing route for the rooftop bar template."
    },
    getSeo: (slug) => getBarRooftopSeo(slug as BarRooftopPageSlug),
    render: (slug) => (
      <BarRooftopTemplate
        slug={slug as BarRooftopPageSlug}
        basePath={getRawBasePath(barRooftopTemplateConfig.id)}
        heroImageSrc={barRooftopTemplateConfig.defaultHeroImage}
      />
    )
  }
] as const satisfies readonly CompletedTemplateRoute[];

const completedTemplateRoutesById = new Map<string, CompletedTemplateRoute>(
  completedTemplateRoutes.map((route) => [route.id, route])
);

function getCompletedTemplateRoute(templateId: string) {
  return completedTemplateRoutesById.get(templateId);
}

function createStaticParamsForRoute(route: CompletedTemplateRoute) {
  return route.pageSlugs
    .filter((slug) => slug !== "")
    .map((slug) => ({
      templateId: route.id,
      slug: slug.split("/")
    }));
}

export function generateStaticParams() {
  return [
    ...templateIds.map((templateId) => ({ templateId, slug: [] })),
    ...completedTemplateRoutes.flatMap(createStaticParamsForRoute)
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const { templateId, slug } = await params;
  const joinedSlug = getSlug(slug);
  const completedRoute = getCompletedTemplateRoute(templateId);

  if (completedRoute) {
    if (!completedRoute.isSlug(joinedSlug)) {
      return createSeoMetadata({
        ...completedRoute.notFoundSeo,
        noIndex: true
      });
    }

    return createSeoMetadata({
      ...completedRoute.getSeo(joinedSlug),
      canonicalPath: getRawPagePath(completedRoute.id, joinedSlug),
      noIndex: true
    });
  }

  if (!isTemplateId(templateId)) {
    return createSeoMetadata({
      title: "Template not found",
      description: "Missing template route.",
      noIndex: true
    });
  }

  const template = getTemplateById(templateId);
  return createSeoMetadata({
    title: `${template.name} | Placeholder Preview`,
    description: `${template.name} is planned but not implemented yet.`,
    canonicalPath: `/template-sites/${template.id}`,
    noIndex: true
  });
}

export default async function TemplateRoute({ params }: PageProps) {
  const { templateId, slug } = await params;

  if (!isTemplateId(templateId)) {
    notFound();
  }

  const joinedSlug = getSlug(slug);
  const completedRoute = getCompletedTemplateRoute(templateId);

  if (completedRoute) {
    if (!completedRoute.isSlug(joinedSlug)) {
      notFound();
    }

    return (
      <>
        {completedRoute.render(joinedSlug)}
        <TemplateDemoDisclosure templateId={templateId} slug={joinedSlug} />
      </>
    );
  }

  if (slug && slug.length > 0) {
    notFound();
  }

  return <TemplatePlaceholder templateId={templateId} />;
}

function TemplatePlaceholder({ templateId }: { templateId: TemplateId }) {
  const template = getTemplateById(templateId);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Container className="py-16">
        <Link className="text-sm font-semibold text-sky-300" href="/">
          Back to showcase
        </Link>
        <div className="mt-16 max-w-3xl">
          <Badge className="border-slate-700 bg-slate-900 text-slate-300">
            {template.status.replace("-", " ")}
          </Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">{template.name}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">{template.positioning}</p>
          <dl className="mt-8 grid gap-4 border border-slate-700 p-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-400">Primary CTA</dt>
              <dd className="mt-1 font-semibold">{template.primaryCta}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Visual mood</dt>
              <dd className="mt-1 font-semibold">{template.visualMood}</dd>
            </div>
          </dl>
          <p className="mt-8 text-sm leading-6 text-slate-400">
            This placeholder keeps the preview link valid while making it clear that the real
            template route has not been built yet.
          </p>
        </div>
      </Container>
    </main>
  );
}
