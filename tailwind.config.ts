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
          "serene-coral": "#D6A21E",
          "serene-coral-darken": "#5C4307",
          "sage-green": "#A7B4BA",
          "sage-green-darken": "#18324A",
          charcoal: "#1F211E",
          cream: "#F7F4EC",
          "gray-100": "#EFECE4",
          "gray-200": "#E6E1D6",
          "gray-300": "#D7D1C4",
          "gray-500": "#76746D",
          "gray-600": "#5E625B",
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
