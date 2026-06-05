import { areaServedSchema, serviceSchema } from './structured-data';

export const serviceSchemaContract = serviceSchema({
  name: 'Website audits',
  description: 'Manual website audits for booking, trust, local SEO, and conversion UX.',
  path: '/website-audits',
  locale: 'en',
  serviceType: 'Website audit',
});

export const serviceTypeContract: 'Service' = serviceSchemaContract['@type'];
export const providerNameContract: 'Yourtimestudio' = serviceSchemaContract.provider.name;
export const areaServedNamesContract: string[] = areaServedSchema().map((area) => area.name);
