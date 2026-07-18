export const templateFamily = {
  category: "hotel",
  plannedTemplates: 3,
  status: "planned"
} as const;

export {
  HotelLuxuryTemplate,
  getHotelLuxurySeo,
  hotelLuxuryTemplateConfig,
  isHotelLuxurySlug,
  type HotelLuxuryTemplateProps
} from "./hotel-01-luxury/preview";

export {
  HotelBoutiqueTemplate,
  getHotelBoutiqueSeo,
  hotelBoutiqueTemplateConfig,
  isHotelBoutiqueSlug,
  type HotelBoutiqueTemplateProps
} from "./hotel-02-boutique/preview";

export {
  HotelResortTemplate,
  getHotelResortSeo,
  hotelResortTemplateConfig,
  isHotelResortSlug,
  type HotelResortTemplateProps
} from "./hotel-03-resort/preview";
