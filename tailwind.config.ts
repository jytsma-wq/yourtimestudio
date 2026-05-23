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
  plugins: [tailwindcssAnimate],
};
export default config;
