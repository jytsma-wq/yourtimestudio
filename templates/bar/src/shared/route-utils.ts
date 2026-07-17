export function createSlugGuard<TSlug extends string>(slugs: readonly TSlug[]) {
  return (slug: string): slug is TSlug => (slugs as readonly string[]).includes(slug);
}

export function createSeoResolver<TSlug extends string, TSeo>(
  getPage: (slug: TSlug, basePath?: string) => { seo: TSeo },
  defaultBasePath: string
) {
  return (slug: TSlug, basePath = defaultBasePath): TSeo => getPage(slug, basePath).seo;
}
