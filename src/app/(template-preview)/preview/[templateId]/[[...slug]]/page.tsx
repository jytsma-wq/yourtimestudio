import { createSeoMetadata } from "@website-template-factory/ui";
import { notFound } from "next/navigation";

import { PreviewShell } from "@/components/templates/TemplatePreviewShell";
import {
  getTemplateShowcaseEntry,
  templateShowcaseEntries
} from "@/lib/templates/catalog";

type PreviewParams = {
  templateId: string;
  slug?: string[];
};

type PreviewPageProps = {
  params: Promise<PreviewParams>;
};

function joinedSlug(parts?: string[]) {
  return parts?.join("/") ?? "";
}

export function generateStaticParams() {
  return templateShowcaseEntries.flatMap((template) =>
    template.pages.map((page) => ({
      templateId: template.id,
      slug: page.slug ? page.slug.split("/") : []
    }))
  );
}

export async function generateMetadata({ params }: PreviewPageProps) {
  const { templateId, slug } = await params;
  const template = getTemplateShowcaseEntry(templateId);
  const pageSlug = joinedSlug(slug);
  const page = template?.pages.find((item) => item.slug === pageSlug);

  if (!template || !page) {
    return createSeoMetadata({
      title: "Preview not found | Batumi Lighthouse",
      description: "This template preview route does not exist.",
      noIndex: true
    });
  }

  return createSeoMetadata({
    title: `${template.brandName} ${page.label} Preview | Batumi Lighthouse`,
    description: `Preview the ${page.label.toLowerCase()} page from ${template.brandName}, an original ${template.name.toLowerCase()} website template.`,
    canonicalPath: `/preview/${template.id}${pageSlug ? `/${pageSlug}` : ""}`,
    noIndex: true
  });
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { templateId, slug } = await params;
  const template = getTemplateShowcaseEntry(templateId);
  const pageSlug = joinedSlug(slug);

  if (!template || !template.pages.some((page) => page.slug === pageSlug)) {
    notFound();
  }

  return (
    <PreviewShell
      templateId={template.id}
      brandName={template.brandName}
      category={template.category}
      initialSlug={pageSlug}
      pages={template.pages}
    />
  );
}
