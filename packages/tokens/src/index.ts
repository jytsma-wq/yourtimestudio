type ColorTokens = {
  background: string;
  foreground: string;
  surface: string;
  surfaceMuted: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  button: string;
  buttonForeground: string;
  success: string;
  warning: string;
  error: string;
};

type TypographyTokens = {
  heading: string;
  body: string;
  headingDirection: string;
  bodyDirection: string;
};

type ThemePreset = {
  name: string;
  category: "hotel" | "dentist" | "beauty" | "restaurant" | "bar" | "shop";
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: {
    page: string;
    section: string;
    stack: string;
    mood: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    mood: string;
  };
  shadows: {
    soft: string;
    elevated: string;
    overlay: string;
    mood: string;
  };
  borders: {
    default: string;
    strong: string;
  };
  layout: {
    maxWidth: string;
    contentWidth: string;
    gridGap: string;
  };
  motion: {
    duration: string;
    easing: string;
    mood: string;
  };
  zIndex: {
    header: number;
    overlay: number;
    modal: number;
  };
};

export const templateThemeIds = [
  "hotel-01-luxury",
  "hotel-02-boutique",
  "hotel-03-resort",
  "dentist-01-clinical",
  "dentist-02-premium-cosmetic",
  "dentist-03-family",
  "beauty-01-salon",
  "beauty-02-spa",
  "beauty-03-aesthetic-clinic",
  "restaurant-01-fine-dining",
  "restaurant-02-bistro",
  "restaurant-03-fast-casual",
  "bar-01-cocktail",
  "bar-02-pub",
  "bar-03-rooftop",
  "shop-01-fashion",
  "shop-02-lifestyle",
  "shop-03-specialty"
] as const;

export type TemplateThemeId = (typeof templateThemeIds)[number];
export type { ColorTokens, ThemePreset, TypographyTokens };

const baseLayout = {
  maxWidth: "72rem",
  contentWidth: "42rem",
  gridGap: "clamp(1rem, 2vw, 1.5rem)"
} as const;

const baseZIndex = {
  header: 40,
  overlay: 50,
  modal: 60
} as const;

const createThemePreset = (preset: ThemePreset) => preset;

export const themePresets = {
  "hotel-01-luxury": createThemePreset({
    name: "Hotel Luxury",
    category: "hotel",
    colors: {
      background: "#f7f2ea",
      foreground: "#211813",
      surface: "#fffaf2",
      surfaceMuted: "#eee2d2",
      accent: "#8a6433",
      accentForeground: "#fff8ec",
      muted: "#d9c8b4",
      mutedForeground: "#6f5a47",
      border: "#cdb89e",
      button: "#211813",
      buttonForeground: "#fff8ec",
      success: "#2f6f4e",
      warning: "#b7791f",
      error: "#9f2d2d"
    },
    typography: {
      heading: "Georgia, 'Times New Roman', serif",
      body: "Inter, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "editorial serif, refined contrast, generous line height",
      bodyDirection: "quiet luxury sans, calm and service-led"
    },
    spacing: {
      page: "clamp(1.25rem, 4vw, 4rem)",
      section: "clamp(4rem, 10vw, 8rem)",
      stack: "clamp(1rem, 2vw, 1.5rem)",
      mood: "spacious"
    },
    radius: {
      sm: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      mood: "tailored"
    },
    shadows: {
      soft: "0 18px 48px rgba(55, 39, 25, 0.12)",
      elevated: "0 28px 80px rgba(55, 39, 25, 0.18)",
      overlay: "0 24px 64px rgba(0, 0, 0, 0.28)",
      mood: "soft editorial depth"
    },
    borders: {
      default: "1px solid #cdb89e",
      strong: "1px solid #8a6433"
    },
    layout: baseLayout,
    motion: {
      duration: "240ms",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      mood: "slow and composed"
    },
    zIndex: baseZIndex
  }),
  "hotel-02-boutique": createThemePreset({
    name: "Hotel Boutique",
    category: "hotel",
    colors: {
      background: "#fff7ed",
      foreground: "#251714",
      surface: "#ffffff",
      surfaceMuted: "#f3ddc8",
      accent: "#b4532a",
      accentForeground: "#fff7ed",
      muted: "#e7c7a8",
      mutedForeground: "#705141",
      border: "#d8a985",
      button: "#b4532a",
      buttonForeground: "#fff7ed",
      success: "#28745a",
      warning: "#b87516",
      error: "#b13a2f"
    },
    typography: {
      heading: "'Trebuchet MS', ui-sans-serif, system-ui, sans-serif",
      body: "Inter, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "warm editorial sans with local personality",
      bodyDirection: "clear boutique travel copy"
    },
    spacing: {
      page: "clamp(1rem, 3.5vw, 3rem)",
      section: "clamp(3rem, 8vw, 6rem)",
      stack: "clamp(0.875rem, 2vw, 1.25rem)",
      mood: "layered and intimate"
    },
    radius: {
      sm: "0.375rem",
      md: "0.625rem",
      lg: "0.875rem",
      xl: "1.25rem",
      mood: "soft modern"
    },
    shadows: {
      soft: "0 14px 40px rgba(180, 83, 42, 0.12)",
      elevated: "0 26px 70px rgba(90, 52, 36, 0.18)",
      overlay: "0 24px 64px rgba(37, 23, 20, 0.24)",
      mood: "warm lifestyle"
    },
    borders: {
      default: "1px solid #d8a985",
      strong: "1px solid #b4532a"
    },
    layout: {
      ...baseLayout,
      maxWidth: "74rem"
    },
    motion: {
      duration: "200ms",
      easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      mood: "lively but polished"
    },
    zIndex: baseZIndex
  }),
  "hotel-03-resort": createThemePreset({
    name: "Hotel Resort",
    category: "hotel",
    colors: {
      background: "#f0fbf7",
      foreground: "#15342f",
      surface: "#ffffff",
      surfaceMuted: "#d9f1e9",
      accent: "#16876f",
      accentForeground: "#ffffff",
      muted: "#bfddd3",
      mutedForeground: "#4c7168",
      border: "#9bcbbd",
      button: "#0f5f64",
      buttonForeground: "#ffffff",
      success: "#16876f",
      warning: "#d18a21",
      error: "#b33131"
    },
    typography: {
      heading: "Aptos Display, ui-sans-serif, system-ui, sans-serif",
      body: "Aptos, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "bright scenic sans, relaxed and open",
      bodyDirection: "family-friendly resort clarity"
    },
    spacing: {
      page: "clamp(1rem, 4vw, 3.5rem)",
      section: "clamp(3.5rem, 9vw, 7rem)",
      stack: "clamp(1rem, 2vw, 1.375rem)",
      mood: "airy leisure"
    },
    radius: {
      sm: "0.5rem",
      md: "0.875rem",
      lg: "1.25rem",
      xl: "1.75rem",
      mood: "rounded resort"
    },
    shadows: {
      soft: "0 16px 42px rgba(22, 135, 111, 0.12)",
      elevated: "0 26px 76px rgba(15, 95, 100, 0.18)",
      overlay: "0 24px 64px rgba(21, 52, 47, 0.24)",
      mood: "sunlit depth"
    },
    borders: {
      default: "1px solid #9bcbbd",
      strong: "1px solid #16876f"
    },
    layout: {
      ...baseLayout,
      maxWidth: "76rem"
    },
    motion: {
      duration: "220ms",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      mood: "relaxed"
    },
    zIndex: baseZIndex
  }),
  "dentist-01-clinical": createThemePreset({
    name: "Dentist Clinical",
    category: "dentist",
    colors: {
      background: "#f7fbff",
      foreground: "#112033",
      surface: "#ffffff",
      surfaceMuted: "#e8f2fb",
      accent: "#1d75bd",
      accentForeground: "#ffffff",
      muted: "#cde0ef",
      mutedForeground: "#546b80",
      border: "#b7d0e6",
      button: "#155f9e",
      buttonForeground: "#ffffff",
      success: "#1f7a5b",
      warning: "#b98516",
      error: "#b83232"
    },
    typography: {
      heading: "Inter, ui-sans-serif, system-ui, sans-serif",
      body: "Inter, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "clean clinical hierarchy",
      bodyDirection: "plain-language reassurance"
    },
    spacing: {
      page: "clamp(1rem, 3vw, 2.5rem)",
      section: "clamp(3rem, 7vw, 5.5rem)",
      stack: "1rem",
      mood: "clear and efficient"
    },
    radius: {
      sm: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      mood: "precise"
    },
    shadows: {
      soft: "0 12px 32px rgba(29, 117, 189, 0.1)",
      elevated: "0 20px 56px rgba(17, 32, 51, 0.14)",
      overlay: "0 24px 64px rgba(17, 32, 51, 0.2)",
      mood: "light clinical"
    },
    borders: {
      default: "1px solid #b7d0e6",
      strong: "1px solid #1d75bd"
    },
    layout: baseLayout,
    motion: {
      duration: "160ms",
      easing: "ease-out",
      mood: "direct"
    },
    zIndex: baseZIndex
  }),
  "dentist-02-premium-cosmetic": createThemePreset({
    name: "Dentist Cosmetic",
    category: "dentist",
    colors: {
      background: "#f9f6f3",
      foreground: "#1f2528",
      surface: "#ffffff",
      surfaceMuted: "#eee5de",
      accent: "#a67c52",
      accentForeground: "#ffffff",
      muted: "#d8c8bb",
      mutedForeground: "#65584e",
      border: "#cdb7a5",
      button: "#1f2528",
      buttonForeground: "#ffffff",
      success: "#32755b",
      warning: "#ad7a23",
      error: "#a53535"
    },
    typography: {
      heading: "Georgia, 'Times New Roman', serif",
      body: "Inter, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "premium cosmetic editorial",
      bodyDirection: "precise treatment education"
    },
    spacing: {
      page: "clamp(1.25rem, 3.5vw, 3.5rem)",
      section: "clamp(3.5rem, 8vw, 6.5rem)",
      stack: "clamp(1rem, 2vw, 1.375rem)",
      mood: "polished"
    },
    radius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.875rem",
      xl: "1rem",
      mood: "refined"
    },
    shadows: {
      soft: "0 16px 44px rgba(31, 37, 40, 0.1)",
      elevated: "0 26px 72px rgba(31, 37, 40, 0.16)",
      overlay: "0 24px 64px rgba(31, 37, 40, 0.26)",
      mood: "premium polish"
    },
    borders: {
      default: "1px solid #cdb7a5",
      strong: "1px solid #a67c52"
    },
    layout: baseLayout,
    motion: {
      duration: "220ms",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      mood: "smooth precision"
    },
    zIndex: baseZIndex
  }),
  "dentist-03-family": createThemePreset({
    name: "Dentist Family",
    category: "dentist",
    colors: {
      background: "#fffaf0",
      foreground: "#22313f",
      surface: "#ffffff",
      surfaceMuted: "#edf7fb",
      accent: "#2f8ccf",
      accentForeground: "#ffffff",
      muted: "#dbeef2",
      mutedForeground: "#5b7180",
      border: "#bfd9df",
      button: "#287a68",
      buttonForeground: "#ffffff",
      success: "#287a68",
      warning: "#d89019",
      error: "#b43a3a"
    },
    typography: {
      heading: "Aptos Display, ui-sans-serif, system-ui, sans-serif",
      body: "Aptos, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "warm professional sans",
      bodyDirection: "parent-friendly and plain"
    },
    spacing: {
      page: "clamp(1rem, 3vw, 2.75rem)",
      section: "clamp(3rem, 8vw, 6rem)",
      stack: "clamp(0.875rem, 2vw, 1.25rem)",
      mood: "comfortable"
    },
    radius: {
      sm: "0.5rem",
      md: "0.875rem",
      lg: "1.25rem",
      xl: "1.5rem",
      mood: "friendly"
    },
    shadows: {
      soft: "0 14px 36px rgba(47, 140, 207, 0.1)",
      elevated: "0 24px 64px rgba(34, 49, 63, 0.15)",
      overlay: "0 24px 64px rgba(34, 49, 63, 0.22)",
      mood: "soft reassurance"
    },
    borders: {
      default: "1px solid #bfd9df",
      strong: "1px solid #2f8ccf"
    },
    layout: baseLayout,
    motion: {
      duration: "180ms",
      easing: "ease-out",
      mood: "friendly feedback"
    },
    zIndex: baseZIndex
  }),
  "beauty-01-salon": createThemePreset({
    name: "Beauty Salon",
    category: "beauty",
    colors: {
      background: "#fff5f7",
      foreground: "#221923",
      surface: "#ffffff",
      surfaceMuted: "#f5e0e6",
      accent: "#c84a74",
      accentForeground: "#ffffff",
      muted: "#e8c5d0",
      mutedForeground: "#6e4d5a",
      border: "#dca8ba",
      button: "#221923",
      buttonForeground: "#ffffff",
      success: "#31785f",
      warning: "#b77c1c",
      error: "#b33854"
    },
    typography: {
      heading: "Georgia, 'Times New Roman', serif",
      body: "Inter, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "fashion editorial, confident and polished",
      bodyDirection: "clear service and pricing copy"
    },
    spacing: {
      page: "clamp(1rem, 3.5vw, 3rem)",
      section: "clamp(3.25rem, 8vw, 6.25rem)",
      stack: "clamp(1rem, 2vw, 1.375rem)",
      mood: "stylish rhythm"
    },
    radius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      mood: "editorial"
    },
    shadows: {
      soft: "0 16px 44px rgba(200, 74, 116, 0.12)",
      elevated: "0 26px 72px rgba(34, 25, 35, 0.16)",
      overlay: "0 24px 64px rgba(34, 25, 35, 0.24)",
      mood: "glossy editorial"
    },
    borders: {
      default: "1px solid #dca8ba",
      strong: "1px solid #c84a74"
    },
    layout: {
      ...baseLayout,
      maxWidth: "74rem"
    },
    motion: {
      duration: "210ms",
      easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      mood: "polished"
    },
    zIndex: baseZIndex
  }),
  "beauty-02-spa": createThemePreset({
    name: "Beauty Spa",
    category: "beauty",
    colors: {
      background: "#f6f1e8",
      foreground: "#26312a",
      surface: "#fffaf1",
      surfaceMuted: "#e8dfcf",
      accent: "#7d8b5d",
      accentForeground: "#ffffff",
      muted: "#d4c7b1",
      mutedForeground: "#625946",
      border: "#c2b39d",
      button: "#4d5f45",
      buttonForeground: "#ffffff",
      success: "#4d7a55",
      warning: "#b98124",
      error: "#a43b3b"
    },
    typography: {
      heading: "Georgia, 'Times New Roman', serif",
      body: "Inter, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "soft wellness serif",
      bodyDirection: "calm ritual guidance"
    },
    spacing: {
      page: "clamp(1.25rem, 4vw, 4rem)",
      section: "clamp(4rem, 10vw, 8rem)",
      stack: "clamp(1.125rem, 2vw, 1.5rem)",
      mood: "slow and restorative"
    },
    radius: {
      sm: "0.5rem",
      md: "0.875rem",
      lg: "1.25rem",
      xl: "1.75rem",
      mood: "organic"
    },
    shadows: {
      soft: "0 18px 48px rgba(77, 95, 69, 0.1)",
      elevated: "0 28px 80px rgba(38, 49, 42, 0.15)",
      overlay: "0 24px 64px rgba(38, 49, 42, 0.24)",
      mood: "soft natural"
    },
    borders: {
      default: "1px solid #c2b39d",
      strong: "1px solid #7d8b5d"
    },
    layout: baseLayout,
    motion: {
      duration: "260ms",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      mood: "slow"
    },
    zIndex: baseZIndex
  }),
  "beauty-03-aesthetic-clinic": createThemePreset({
    name: "Beauty Aesthetic Clinic",
    category: "beauty",
    colors: {
      background: "#f8faf9",
      foreground: "#17212b",
      surface: "#ffffff",
      surfaceMuted: "#eef2f1",
      accent: "#8d7a9f",
      accentForeground: "#ffffff",
      muted: "#d5dcde",
      mutedForeground: "#596570",
      border: "#bec8cb",
      button: "#17212b",
      buttonForeground: "#ffffff",
      success: "#2f735d",
      warning: "#b57d1b",
      error: "#a9313f"
    },
    typography: {
      heading: "Inter, ui-sans-serif, system-ui, sans-serif",
      body: "Inter, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "minimal clinical luxury",
      bodyDirection: "precise treatment education"
    },
    spacing: {
      page: "clamp(1rem, 3vw, 3rem)",
      section: "clamp(3.5rem, 8vw, 6.5rem)",
      stack: "1rem",
      mood: "measured"
    },
    radius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      mood: "precise"
    },
    shadows: {
      soft: "0 14px 40px rgba(23, 33, 43, 0.09)",
      elevated: "0 24px 68px rgba(23, 33, 43, 0.15)",
      overlay: "0 24px 64px rgba(23, 33, 43, 0.24)",
      mood: "minimal clinical"
    },
    borders: {
      default: "1px solid #bec8cb",
      strong: "1px solid #8d7a9f"
    },
    layout: baseLayout,
    motion: {
      duration: "180ms",
      easing: "ease-out",
      mood: "precise"
    },
    zIndex: baseZIndex
  }),
  "restaurant-01-fine-dining": createThemePreset({
    name: "Restaurant Fine Dining",
    category: "restaurant",
    colors: {
      background: "#16110d",
      foreground: "#f7ead7",
      surface: "#211913",
      surfaceMuted: "#302318",
      accent: "#c7a45a",
      accentForeground: "#16110d",
      muted: "#4b392b",
      mutedForeground: "#cbb9a0",
      border: "#5f472f",
      button: "#c7a45a",
      buttonForeground: "#16110d",
      success: "#7fa37a",
      warning: "#d19a3a",
      error: "#d16b62"
    },
    typography: {
      heading: "Georgia, 'Times New Roman', serif",
      body: "Inter, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "cinematic serif, restrained and premium",
      bodyDirection: "quiet reservation-first clarity"
    },
    spacing: {
      page: "clamp(1.25rem, 4vw, 4rem)",
      section: "clamp(4rem, 10vw, 8rem)",
      stack: "clamp(1rem, 2vw, 1.5rem)",
      mood: "spacious and calm"
    },
    radius: {
      sm: "0.125rem",
      md: "0.25rem",
      lg: "0.375rem",
      xl: "0.5rem",
      mood: "sharp editorial"
    },
    shadows: {
      soft: "0 18px 52px rgba(0, 0, 0, 0.22)",
      elevated: "0 32px 90px rgba(0, 0, 0, 0.32)",
      overlay: "0 28px 80px rgba(0, 0, 0, 0.42)",
      mood: "cinematic"
    },
    borders: {
      default: "1px solid #5f472f",
      strong: "1px solid #c7a45a"
    },
    layout: {
      ...baseLayout,
      maxWidth: "76rem"
    },
    motion: {
      duration: "260ms",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      mood: "subtle cinematic"
    },
    zIndex: baseZIndex
  }),
  "restaurant-02-bistro": createThemePreset({
    name: "Restaurant Bistro",
    category: "restaurant",
    colors: {
      background: "#fff8ed",
      foreground: "#2a1d16",
      surface: "#ffffff",
      surfaceMuted: "#f0dfc9",
      accent: "#9c5b2c",
      accentForeground: "#fff8ed",
      muted: "#dcc2a3",
      mutedForeground: "#6d513b",
      border: "#caab86",
      button: "#2f5f45",
      buttonForeground: "#ffffff",
      success: "#2f5f45",
      warning: "#ba7b1a",
      error: "#ae3b35"
    },
    typography: {
      heading: "Georgia, 'Times New Roman', serif",
      body: "Inter, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "warm neighborhood editorial",
      bodyDirection: "inviting menu and events copy"
    },
    spacing: {
      page: "clamp(1rem, 3.5vw, 3rem)",
      section: "clamp(3.25rem, 8vw, 6rem)",
      stack: "clamp(0.875rem, 2vw, 1.25rem)",
      mood: "comfortable"
    },
    radius: {
      sm: "0.375rem",
      md: "0.625rem",
      lg: "0.875rem",
      xl: "1.25rem",
      mood: "welcoming"
    },
    shadows: {
      soft: "0 14px 38px rgba(156, 91, 44, 0.12)",
      elevated: "0 24px 68px rgba(42, 29, 22, 0.16)",
      overlay: "0 24px 64px rgba(42, 29, 22, 0.24)",
      mood: "warm"
    },
    borders: {
      default: "1px solid #caab86",
      strong: "1px solid #9c5b2c"
    },
    layout: baseLayout,
    motion: {
      duration: "200ms",
      easing: "ease-out",
      mood: "natural"
    },
    zIndex: baseZIndex
  }),
  "restaurant-03-fast-casual": createThemePreset({
    name: "Restaurant Fast Casual",
    category: "restaurant",
    colors: {
      background: "#fffdf4",
      foreground: "#1f2420",
      surface: "#ffffff",
      surfaceMuted: "#f1f5dd",
      accent: "#d9481e",
      accentForeground: "#ffffff",
      muted: "#e6e9c6",
      mutedForeground: "#58604c",
      border: "#cbd389",
      button: "#157a4f",
      buttonForeground: "#ffffff",
      success: "#157a4f",
      warning: "#d89a18",
      error: "#b6352b"
    },
    typography: {
      heading: "Aptos Display, ui-sans-serif, system-ui, sans-serif",
      body: "Aptos, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "bold menu-first sans",
      bodyDirection: "fast ordering clarity"
    },
    spacing: {
      page: "clamp(1rem, 3vw, 2.5rem)",
      section: "clamp(2.75rem, 7vw, 5rem)",
      stack: "0.875rem",
      mood: "efficient"
    },
    radius: {
      sm: "0.5rem",
      md: "0.875rem",
      lg: "1.25rem",
      xl: "1.5rem",
      mood: "friendly bold"
    },
    shadows: {
      soft: "0 12px 32px rgba(21, 122, 79, 0.12)",
      elevated: "0 20px 60px rgba(31, 36, 32, 0.16)",
      overlay: "0 24px 64px rgba(31, 36, 32, 0.22)",
      mood: "snappy"
    },
    borders: {
      default: "1px solid #cbd389",
      strong: "1px solid #d9481e"
    },
    layout: {
      ...baseLayout,
      maxWidth: "70rem"
    },
    motion: {
      duration: "150ms",
      easing: "ease-out",
      mood: "quick"
    },
    zIndex: baseZIndex
  }),
  "bar-01-cocktail": createThemePreset({
    name: "Bar Cocktail",
    category: "bar",
    colors: {
      background: "#120f12",
      foreground: "#f4e9d8",
      surface: "#1f171a",
      surfaceMuted: "#2d2023",
      accent: "#b78a47",
      accentForeground: "#120f12",
      muted: "#49343a",
      mutedForeground: "#ccb8a1",
      border: "#60414a",
      button: "#b78a47",
      buttonForeground: "#120f12",
      success: "#6c926c",
      warning: "#c88b33",
      error: "#c65b5b"
    },
    typography: {
      heading: "Georgia, 'Times New Roman', serif",
      body: "Inter, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "dark cocktail editorial",
      bodyDirection: "policy and reservation clarity"
    },
    spacing: {
      page: "clamp(1.25rem, 4vw, 4rem)",
      section: "clamp(4rem, 9vw, 7.5rem)",
      stack: "clamp(1rem, 2vw, 1.375rem)",
      mood: "atmospheric"
    },
    radius: {
      sm: "0.25rem",
      md: "0.375rem",
      lg: "0.625rem",
      xl: "0.875rem",
      mood: "crafted"
    },
    shadows: {
      soft: "0 18px 54px rgba(0, 0, 0, 0.25)",
      elevated: "0 32px 90px rgba(0, 0, 0, 0.36)",
      overlay: "0 28px 80px rgba(0, 0, 0, 0.44)",
      mood: "moody"
    },
    borders: {
      default: "1px solid #60414a",
      strong: "1px solid #b78a47"
    },
    layout: {
      ...baseLayout,
      maxWidth: "74rem"
    },
    motion: {
      duration: "240ms",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      mood: "slow reveal"
    },
    zIndex: baseZIndex
  }),
  "bar-02-pub": createThemePreset({
    name: "Bar Pub",
    category: "bar",
    colors: {
      background: "#fff8ec",
      foreground: "#251b14",
      surface: "#ffffff",
      surfaceMuted: "#ead7bf",
      accent: "#af4f24",
      accentForeground: "#ffffff",
      muted: "#d9bb98",
      mutedForeground: "#67513c",
      border: "#c69b72",
      button: "#1f6a56",
      buttonForeground: "#ffffff",
      success: "#1f6a56",
      warning: "#ba7b1a",
      error: "#a83c2f"
    },
    typography: {
      heading: "Aptos Display, ui-sans-serif, system-ui, sans-serif",
      body: "Aptos, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "friendly social sans",
      bodyDirection: "event and booking utility"
    },
    spacing: {
      page: "clamp(1rem, 3vw, 2.75rem)",
      section: "clamp(3rem, 8vw, 6rem)",
      stack: "0.875rem",
      mood: "social"
    },
    radius: {
      sm: "0.5rem",
      md: "0.75rem",
      lg: "1rem",
      xl: "1.25rem",
      mood: "approachable"
    },
    shadows: {
      soft: "0 14px 36px rgba(175, 79, 36, 0.12)",
      elevated: "0 24px 66px rgba(37, 27, 20, 0.16)",
      overlay: "0 24px 64px rgba(37, 27, 20, 0.24)",
      mood: "warm social"
    },
    borders: {
      default: "1px solid #c69b72",
      strong: "1px solid #af4f24"
    },
    layout: baseLayout,
    motion: {
      duration: "180ms",
      easing: "ease-out",
      mood: "energetic"
    },
    zIndex: baseZIndex
  }),
  "bar-03-rooftop": createThemePreset({
    name: "Bar Rooftop",
    category: "bar",
    colors: {
      background: "#141821",
      foreground: "#f5efe5",
      surface: "#202638",
      surfaceMuted: "#2d344c",
      accent: "#e79d4d",
      accentForeground: "#141821",
      muted: "#46506a",
      mutedForeground: "#d5cfca",
      border: "#59627c",
      button: "#e79d4d",
      buttonForeground: "#141821",
      success: "#76a878",
      warning: "#e0a13d",
      error: "#d46a6a"
    },
    typography: {
      heading: "Aptos Display, ui-sans-serif, system-ui, sans-serif",
      body: "Inter, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "urban premium sans",
      bodyDirection: "nightlife booking clarity"
    },
    spacing: {
      page: "clamp(1rem, 3.5vw, 3.5rem)",
      section: "clamp(3.5rem, 9vw, 7rem)",
      stack: "clamp(1rem, 2vw, 1.375rem)",
      mood: "skyline spacious"
    },
    radius: {
      sm: "0.375rem",
      md: "0.625rem",
      lg: "0.875rem",
      xl: "1.25rem",
      mood: "sleek"
    },
    shadows: {
      soft: "0 18px 50px rgba(20, 24, 33, 0.24)",
      elevated: "0 30px 86px rgba(20, 24, 33, 0.34)",
      overlay: "0 28px 80px rgba(20, 24, 33, 0.44)",
      mood: "night skyline"
    },
    borders: {
      default: "1px solid #59627c",
      strong: "1px solid #e79d4d"
    },
    layout: {
      ...baseLayout,
      maxWidth: "76rem"
    },
    motion: {
      duration: "220ms",
      easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      mood: "smooth urban"
    },
    zIndex: baseZIndex
  }),
  "shop-01-fashion": createThemePreset({
    name: "Shop Fashion",
    category: "shop",
    colors: {
      background: "#fbfbf8",
      foreground: "#111111",
      surface: "#ffffff",
      surfaceMuted: "#efefea",
      accent: "#2546a0",
      accentForeground: "#ffffff",
      muted: "#d9d9d2",
      mutedForeground: "#5f5f5a",
      border: "#c6c6bf",
      button: "#111111",
      buttonForeground: "#ffffff",
      success: "#2b7152",
      warning: "#b7831b",
      error: "#a62f3d"
    },
    typography: {
      heading: "Inter, ui-sans-serif, system-ui, sans-serif",
      body: "Inter, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "minimal high-fashion sans",
      bodyDirection: "precise product storytelling"
    },
    spacing: {
      page: "clamp(1rem, 3.5vw, 3.5rem)",
      section: "clamp(3.5rem, 8vw, 6.5rem)",
      stack: "1rem",
      mood: "minimal editorial"
    },
    radius: {
      sm: "0.125rem",
      md: "0.25rem",
      lg: "0.375rem",
      xl: "0.5rem",
      mood: "sharp"
    },
    shadows: {
      soft: "0 14px 40px rgba(17, 17, 17, 0.08)",
      elevated: "0 24px 70px rgba(17, 17, 17, 0.14)",
      overlay: "0 24px 64px rgba(17, 17, 17, 0.24)",
      mood: "minimal"
    },
    borders: {
      default: "1px solid #c6c6bf",
      strong: "1px solid #111111"
    },
    layout: {
      ...baseLayout,
      maxWidth: "78rem"
    },
    motion: {
      duration: "180ms",
      easing: "ease-out",
      mood: "precise"
    },
    zIndex: baseZIndex
  }),
  "shop-02-lifestyle": createThemePreset({
    name: "Shop Lifestyle",
    category: "shop",
    colors: {
      background: "#fff8f0",
      foreground: "#242018",
      surface: "#ffffff",
      surfaceMuted: "#ede0cc",
      accent: "#c05f3c",
      accentForeground: "#ffffff",
      muted: "#dac5aa",
      mutedForeground: "#665644",
      border: "#c8aa82",
      button: "#2f6d58",
      buttonForeground: "#ffffff",
      success: "#2f6d58",
      warning: "#bd821f",
      error: "#a83d35"
    },
    typography: {
      heading: "Georgia, 'Times New Roman', serif",
      body: "Inter, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "warm curated serif",
      bodyDirection: "tactile product clarity"
    },
    spacing: {
      page: "clamp(1rem, 3.5vw, 3rem)",
      section: "clamp(3.25rem, 8vw, 6rem)",
      stack: "clamp(1rem, 2vw, 1.375rem)",
      mood: "curated"
    },
    radius: {
      sm: "0.375rem",
      md: "0.625rem",
      lg: "0.875rem",
      xl: "1.25rem",
      mood: "tactile"
    },
    shadows: {
      soft: "0 14px 40px rgba(192, 95, 60, 0.12)",
      elevated: "0 24px 68px rgba(36, 32, 24, 0.16)",
      overlay: "0 24px 64px rgba(36, 32, 24, 0.24)",
      mood: "warm tactile"
    },
    borders: {
      default: "1px solid #c8aa82",
      strong: "1px solid #c05f3c"
    },
    layout: {
      ...baseLayout,
      maxWidth: "76rem"
    },
    motion: {
      duration: "200ms",
      easing: "ease-out",
      mood: "calm browse"
    },
    zIndex: baseZIndex
  }),
  "shop-03-specialty": createThemePreset({
    name: "Shop Specialty",
    category: "shop",
    colors: {
      background: "#f7fafc",
      foreground: "#14212d",
      surface: "#ffffff",
      surfaceMuted: "#e7eff4",
      accent: "#2b6f91",
      accentForeground: "#ffffff",
      muted: "#cbdce5",
      mutedForeground: "#566b78",
      border: "#aec7d5",
      button: "#14212d",
      buttonForeground: "#ffffff",
      success: "#2e7758",
      warning: "#b8831b",
      error: "#a8323a"
    },
    typography: {
      heading: "Inter, ui-sans-serif, system-ui, sans-serif",
      body: "Inter, ui-sans-serif, system-ui, sans-serif",
      headingDirection: "expert utility sans",
      bodyDirection: "spec-led product guidance"
    },
    spacing: {
      page: "clamp(1rem, 3vw, 2.75rem)",
      section: "clamp(3rem, 7vw, 5.5rem)",
      stack: "0.875rem",
      mood: "structured"
    },
    radius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      mood: "practical"
    },
    shadows: {
      soft: "0 12px 34px rgba(43, 111, 145, 0.1)",
      elevated: "0 22px 64px rgba(20, 33, 45, 0.15)",
      overlay: "0 24px 64px rgba(20, 33, 45, 0.24)",
      mood: "clean utility"
    },
    borders: {
      default: "1px solid #aec7d5",
      strong: "1px solid #2b6f91"
    },
    layout: baseLayout,
    motion: {
      duration: "160ms",
      easing: "ease-out",
      mood: "functional"
    },
    zIndex: baseZIndex
  })
} satisfies Record<TemplateThemeId, ThemePreset>;

export type ThemeCssVariables = Record<`--wtf-${string}`, string> & {
  fontFamily: string;
};

export function getThemePreset(themeId: TemplateThemeId): ThemePreset {
  return themePresets[themeId];
}

export function createThemeCssVariables(theme: TemplateThemeId | ThemePreset): ThemeCssVariables {
  const preset = typeof theme === "string" ? getThemePreset(theme) : theme;

  return {
    fontFamily: "var(--wtf-font-body)",
    "--wtf-color-background": preset.colors.background,
    "--wtf-color-foreground": preset.colors.foreground,
    "--wtf-color-surface": preset.colors.surface,
    "--wtf-color-surface-muted": preset.colors.surfaceMuted,
    "--wtf-color-accent": preset.colors.accent,
    "--wtf-color-accent-foreground": preset.colors.accentForeground,
    "--wtf-color-muted": preset.colors.muted,
    "--wtf-color-muted-foreground": preset.colors.mutedForeground,
    "--wtf-color-border": preset.colors.border,
    "--wtf-color-button": preset.colors.button,
    "--wtf-color-button-foreground": preset.colors.buttonForeground,
    "--wtf-color-success": preset.colors.success,
    "--wtf-color-warning": preset.colors.warning,
    "--wtf-color-error": preset.colors.error,
    "--wtf-font-heading": preset.typography.heading,
    "--wtf-font-body": preset.typography.body,
    "--wtf-spacing-page": preset.spacing.page,
    "--wtf-spacing-section": preset.spacing.section,
    "--wtf-spacing-stack": preset.spacing.stack,
    "--wtf-radius-sm": preset.radius.sm,
    "--wtf-radius-md": preset.radius.md,
    "--wtf-radius-lg": preset.radius.lg,
    "--wtf-radius-xl": preset.radius.xl,
    "--wtf-shadow-soft": preset.shadows.soft,
    "--wtf-shadow-elevated": preset.shadows.elevated,
    "--wtf-shadow-overlay": preset.shadows.overlay,
    "--wtf-border-default": preset.borders.default,
    "--wtf-border-strong": preset.borders.strong,
    "--wtf-layout-max-width": preset.layout.maxWidth,
    "--wtf-layout-content-width": preset.layout.contentWidth,
    "--wtf-layout-grid-gap": preset.layout.gridGap,
    "--wtf-motion-duration": preset.motion.duration,
    "--wtf-motion-easing": preset.motion.easing,
    "--wtf-z-header": String(preset.zIndex.header),
    "--wtf-z-overlay": String(preset.zIndex.overlay),
    "--wtf-z-modal": String(preset.zIndex.modal)
  };
}

export const defaultThemeId = "hotel-01-luxury" satisfies TemplateThemeId;

const defaultTheme = getThemePreset(defaultThemeId);

export const tokens = {
  colors: {
    background: defaultTheme.colors.background,
    foreground: defaultTheme.colors.foreground,
    muted: defaultTheme.colors.muted,
    border: defaultTheme.colors.border,
    primary: defaultTheme.colors.accent,
    primaryForeground: defaultTheme.colors.accentForeground,
    surface: defaultTheme.colors.surface
  },
  radii: {
    sm: defaultTheme.radius.sm,
    md: defaultTheme.radius.md,
    lg: defaultTheme.radius.lg
  },
  spacing: {
    page: defaultTheme.spacing.page,
    section: defaultTheme.spacing.section
  }
} as const;

export type Tokens = typeof tokens;
