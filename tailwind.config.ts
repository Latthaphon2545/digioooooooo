import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#00BBEB",

          "secondary": "#ABD9FF",

          "accent": "#004AF5",

          "neutral": "#3C3F4D",

          "base-100": "#f5fffa",

          "info": "#6887F5",

          "success": "#01A950",

          "warning": "#ffa600",

          "error": "#ED1A2D",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
