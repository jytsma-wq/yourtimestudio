export const templateFamily = {
  category: "restaurant",
  plannedTemplates: 3,
  status: "planned"
} as const;

export {
  RestaurantFineDiningTemplate,
  getRestaurantFineDiningSeo,
  isRestaurantFineDiningSlug,
  restaurantFineDiningTemplateConfig,
  type RestaurantFineDiningTemplateProps
} from "./restaurant-01-fine-dining/preview";

export {
  RestaurantBistroTemplate,
  getRestaurantBistroSeo,
  isRestaurantBistroSlug,
  restaurantBistroTemplateConfig,
  type RestaurantBistroTemplateProps
} from "./restaurant-02-bistro/preview";

export {
  RestaurantFastCasualTemplate,
  getRestaurantFastCasualSeo,
  isRestaurantFastCasualSlug,
  restaurantFastCasualTemplateConfig,
  type RestaurantFastCasualTemplateProps
} from "./restaurant-03-fast-casual/preview";
