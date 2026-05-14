import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        linear: {
          black: "#08090a",
          panel: "#0f1011",
          surface: "#191a1b",
          indigo: "#5e6ad2",
          violet: "#7170ff",
          hover: "#828fff",
          "text-primary": "#f7f8f8",
          "text-secondary": "#d0d6e0",
          "text-tertiary": "#8a8f98",
          border: "rgba(255,255,255,0.08)",
          "border-subtle": "rgba(255,255,255,0.05)",
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
