import { pageOgImages } from './metadata';

export const keyPageOgImageContract: Record<
  'home' | 'hospitality' | 'medical' | 'beauty' | 'audits' | 'pricing' | 'about' | 'work',
  string
> = pageOgImages;

export const existingSpecificOgImages = [
  pageOgImages.hospitality,
  pageOgImages.medical,
  pageOgImages.beauty,
  pageOgImages.audits,
];
