export type SEOInput = {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  locale?: string;
  languages?: Record<string, string>;
  noIndex?: boolean;
};

export function createSeoMetadata({
  title,
  description,
  canonicalPath,
  image,
  locale,
  languages,
  noIndex
}: SEOInput) {
  return {
    title,
    description,
    alternates: canonicalPath || languages ? { canonical: canonicalPath, languages } : undefined,
    openGraph: {
      title,
      description,
      locale,
      images: image ? [image] : undefined
    },
    robots: noIndex ? { index: false, follow: false } : undefined
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c")
      }}
    />
  );
}
