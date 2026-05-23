/**
 * Solid-color blur placeholder data URLs for above-the-fold images.
 * These prevent layout shift and provide a smooth loading experience
 * without requiring build-time image processing.
 *
 * Generated as tiny 10x10 solid-color SVGs encoded to base64.
 */

function solidColorBlurDataURL(r: number, g: number, b: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="rgb(${r},${g},${b})"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

// Hospitality vertical — navy-tinted neutral
export const hospitalityBlur = solidColorBlurDataURL(42, 100, 88);

// Medical vertical — blue-tinted neutral
export const medicalBlur = solidColorBlurDataURL(55, 80, 140);

// Beauty vertical — warm rose neutral
export const beautyBlur = solidColorBlurDataURL(170, 120, 95);

// Founder/team photo — warm neutral
export const teamBlur = solidColorBlurDataURL(180, 170, 155);

// Portfolio images
export const hotelPortfolioBlur = solidColorBlurDataURL(42, 100, 88);
export const dentalPortfolioBlur = solidColorBlurDataURL(55, 80, 140);
export const beautyPortfolioBlur = solidColorBlurDataURL(170, 120, 95);
