import { cx } from "./cx";

export type GalleryItem = {
  title: string;
  alt: string;
  tone?: string;
};

type GalleryGridProps = {
  items: readonly GalleryItem[];
  className?: string;
};

const toneClass: Record<string, string> = {
  room: "from-[#2a211a] via-[#5f472f] to-[#c7a45a]",
  dish: "from-[#221913] via-[#6f2f25] to-[#d1a35a]",
  service: "from-[#15120f] via-[#3f4a36] to-[#c7a45a]",
  private: "from-[#1b1518] via-[#4b2631] to-[#b78a47]"
};

export function GalleryGrid({ items, className }: GalleryGridProps) {
  return (
    <div className={cx("grid gap-4 md:grid-cols-4", className)}>
      {items.map((item, index) => (
        <figure
          key={item.title}
          className={cx(
            "min-h-72 overflow-hidden border border-[var(--wtf-color-border,#dbe3ef)] bg-[var(--wtf-color-surface-muted,#f1f5f9)]",
            index === 0 && "md:col-span-2 md:row-span-2",
            index === 0 ? "md:min-h-[36rem]" : "md:min-h-72"
          )}
        >
          <div
            aria-label={item.alt}
            role="img"
            className={cx(
              "h-full min-h-72 bg-gradient-to-br p-5",
              toneClass[item.tone ?? "room"] ?? toneClass.room
            )}
          >
            <div className="flex h-full items-end border border-white/20 p-4">
              <figcaption className="max-w-56 text-sm font-semibold uppercase tracking-wide text-white">
                {item.title}
              </figcaption>
            </div>
          </div>
        </figure>
      ))}
    </div>
  );
}
