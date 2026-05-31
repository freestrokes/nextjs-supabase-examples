import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        linear: {
          black: "var(--background)",
          panel: "var(--panel)",
          surface: "var(--background)",
          indigo: "#5e6ad2",
          violet: "#7170ff",
          hover: "#828fff",
          "text-primary": "var(--text-primary)",
          "text-secondary": "var(--text-secondary)",
          "text-tertiary": "var(--text-tertiary)",
          border: "var(--border)",
          "border-subtle": "var(--border)",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        "display-xl": "-1.584px",
        "display-lg": "-1.408px",
        display: "-1.056px",
      },
    },
  },
  plugins: [],
};
export default config;
