import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: "#FDFCF8",
          100: "#F7F3ED",
          200: "#EDE6DA",
          300: "#E0D5C4",
          400: "#A69882",
          500: "#7A6B5A",
          600: "#5C4D3C",
          700: "#3D2E1C",
          800: "#2A1F10",
          900: "#1A1208",
        },
        accent: {
          DEFAULT: "#8B6914",
          light: "#D4A853",
          muted: "#B8860B",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Lora", "Georgia", "serif"],
      },
      fontSize: {
        body: ["1.125rem", { lineHeight: "1.75" }],
      },
    },
  },
  plugins: [],
};

export default config;
