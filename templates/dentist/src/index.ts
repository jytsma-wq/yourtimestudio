export const templateFamily = {
  category: "dentist",
  plannedTemplates: 3,
  status: "planned"
} as const;

export {
  DentistClinicalTemplate,
  dentistClinicalTemplateConfig,
  getDentistClinicalSeo,
  isDentistClinicalSlug,
  type DentistClinicalTemplateProps
} from "./dentist-01-clinical/preview";

export {
  DentistCosmeticTemplate,
  dentistCosmeticTemplateConfig,
  getDentistCosmeticSeo,
  isDentistCosmeticSlug,
  type DentistCosmeticTemplateProps
} from "./dentist-02-premium-cosmetic/preview";

export {
  DentistFamilyTemplate,
  dentistFamilyTemplateConfig,
  getDentistFamilySeo,
  isDentistFamilySlug,
  type DentistFamilyTemplateProps
} from "./dentist-03-family/preview";
