import Link from "next/link";

export default function PreviewNotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f3f0e8] px-5 py-16 text-[#171714]">
      <div className="max-w-xl border-t border-black/20 pt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#b63e27]">
          Preview unavailable
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
          This page is not part of the template.
        </h1>
        <p className="mt-5 text-lg leading-8 text-stone-600">
          Return to the collection to choose one of the 18 complete website previews.
        </p>
        <Link
          href="/templates"
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#171714] px-5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c95032] focus-visible:ring-offset-2"
        >
          Back to the collection
        </Link>
      </div>
    </main>
  );
}
