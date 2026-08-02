import Image from 'next/image';

interface PhotographyScene {
  src: string;
  alt: string;
  title: string;
  format: string;
  className?: string;
}

interface PhotographySceneBoardProps {
  ariaLabel: string;
  heading: string;
  disclosure: string;
  scenes: readonly PhotographyScene[];
  priority?: boolean;
}

export function PhotographySceneBoard({
  ariaLabel,
  heading,
  disclosure,
  scenes,
  priority = false,
}: PhotographySceneBoardProps) {
  return (
    <div className="studio-scene-board" role="group" aria-label={ariaLabel}>
      <div className="studio-scene-board-header" aria-hidden="true">
        <span>{heading}</span>
      </div>

      <div className="studio-scene-board-grid">
        {scenes.map((scene, index) => (
          <figure
            key={scene.src}
            className={`group studio-scene-study studio-scene-study-${index + 1} ${scene.className ?? ''}`}
          >
            <div className="studio-scene-study-image">
              <Image
                src={scene.src}
                alt={scene.alt}
                fill
                priority={priority && index === 0}
                sizes={index === 0 ? '(max-width: 1024px) 92vw, 48vw' : '(max-width: 720px) 88vw, 28vw'}
                className="object-cover"
              />
            </div>
            <figcaption className="studio-scene-study-caption">
              <span>{scene.title}</span>
              <span>{scene.format}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="studio-scene-board-disclosure">{disclosure}</p>
    </div>
  );
}
