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
        midnight: "#050505",
        champagne: "#D6B56D",
        ivory: "#F7F1E5",
        rose: "#E8B7C8",
        silver: "#C9CDD3",
        emerald: "#0E6B5C",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D6B56D 0%, #F7F1E5 50%, #D6B56D 100%)",
        "dark-gradient": "linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)",
        "glow-radial": "radial-gradient(ellipse at center, rgba(214,181,109,0.15) 0%, transparent 70%)",
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { backgroundPosition: "200% center" },
          "50%": { backgroundPosition: "-200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
