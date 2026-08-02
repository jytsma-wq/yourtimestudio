import Link from "next/link";

type DemoDisclosureProps = {
  templateId: string;
  slug: string;
};

export function TemplateDemoDisclosure({ templateId, slug }: DemoDisclosureProps) {
  const previewHref = `/preview/${templateId}${slug ? `/${slug}` : ""}`;

  return (
    <aside
      aria-label="Template demonstration notice"
      className="border-t border-white/15 bg-[#171714] px-5 py-4 text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="leading-6 text-white/70">
          Fictional demonstration. Forms validate locally and do not send or store information.
        </p>
        <Link
          href={previewHref}
          target="_top"
          className="inline-flex min-h-11 shrink-0 items-center font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Return to preview controls
        </Link>
      </div>
    </aside>
  );
}
