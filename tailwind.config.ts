import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * Tailwind CSS configuration.
 *
 * Since this project uses Tailwind v4 with `@theme inline` in globals.css,
 * the color/radius mappings are handled there via CSS custom properties.
 * This config only provides plugin registration and dark mode strategy.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          "serene-coral": "#D4A5A5",
          "serene-coral-darken": "#8A4F4F",
          "sage-green": "#8DA699",
          "sage-green-darken": "#4F675B",
          charcoal: "#2D2D2D",
          cream: "#F8F5F2",
          "gray-100": "#F5F5F5",
          "gray-200": "#EEEEEE",
          "gray-300": "#E0E0E0",
          "gray-500": "#757575",
          "gray-600": "#686868",
        },
      },
      fontSize: {
        h1: ["1.75rem", { lineHeight: "1.2", fontWeight: "600" }],
        h2: ["1.5rem", { lineHeight: "1.25", fontWeight: "600" }],
        h3: ["1.25rem", { lineHeight: "1.35", fontWeight: "600" }],
        h4: ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        caption: ["0.875rem", { lineHeight: "1.4", fontWeight: "400" }],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
