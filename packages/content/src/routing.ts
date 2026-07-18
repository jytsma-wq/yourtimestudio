export type TemplateSeoContent = {
  title: string;
  description: string;
  canonicalPath: string;
  locale?: string;
  languages?: Record<string, string>;
};

export type RoutableTemplatePage<TSlug extends string> = {
  slug: TSlug;
  title: string;
  navLabel: string;
  intro: string;
  seo: TemplateSeoContent;
};

export type TemplateNavigationItem<TSlug extends string> = {
  label: string;
  slug: Exclude<TSlug, "">;
};

export type TemplateNavigationLink = {
  label: string;
  href: string;
};

type ResolveTemplatePageOptions<TSlug extends string, TPage extends RoutableTemplatePage<TSlug>> = {
  pages: readonly TPage[];
  slug: TSlug;
  basePath: string;
  locale: string;
  templateLabel: string;
};

export function createTemplatePath(basePath: string, slug = "") {
  return slug ? `${basePath}/${slug}` : basePath;
}

export function createTemplateNavigation<TSlug extends string>(
  basePath: string,
  items: readonly TemplateNavigationItem<TSlug>[]
): TemplateNavigationLink[] {
  return items.map((item) => ({
    label: item.label,
    href: createTemplatePath(basePath, item.slug)
  }));
}

export function appendTemplateNavigationLinks(
  links: readonly TemplateNavigationLink[],
  extraLinks: readonly TemplateNavigationLink[]
): TemplateNavigationLink[] {
  const seen = new Set<string>();

  return [...links, ...extraLinks].filter((link) => {
    if (seen.has(link.href)) {
      return false;
    }

    seen.add(link.href);
    return true;
  });
}

export function resolveTemplatePage<
  TSlug extends string,
  TPage extends RoutableTemplatePage<TSlug>
>({
  pages,
  slug,
  basePath,
  locale,
  templateLabel
}: ResolveTemplatePageOptions<TSlug, TPage>): TPage {
  const page = pages.find((item) => item.slug === slug);

  if (!page) {
    throw new Error(`Unknown ${templateLabel} page: ${slug}`);
  }

  return {
    ...page,
    seo: {
      ...page.seo,
      canonicalPath: createTemplatePath(basePath, slug),
      locale
    }
  } as TPage;
}
