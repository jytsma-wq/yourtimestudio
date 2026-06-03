# Website Examples assets

Screenshots for Website Examples belong in:

`public/examples`

Use real screenshots only. Do not use generated mockups, concept art, or stock images as proof of completed work.

## Recommended format

- File type: `.webp`
- Aspect ratio: `16:10`
- Recommended size: `1600x1000` px
- Keep captures readable on mobile and desktop.
- Avoid browser chrome unless it is part of the real screenshot and helps context.

## Expected filenames

- `boutique-hotel-direct-booking.webp`
- `clinic-trust-website.webp`
- `beauty-salon-booking.webp`
- `batumi-lighthouse-website.webp`

## Adding screenshots

1. Place the real screenshot in `public/examples`.
2. In `src/content/examples.ts`, set the example `screenshot` field to `/examples/<filename>`.
3. Keep `imageAlt` factual. For demo builds, say it is a demo website screenshot.

## Adding links later

Use these optional fields in `src/content/examples.ts` only when the URL is real and safe to publish:

- `liveUrl`
- `demoUrl`
- `repositoryUrl`

Do not invent live URLs. Do not present demo builds, prototypes, concepts, or internal work as real client projects.
