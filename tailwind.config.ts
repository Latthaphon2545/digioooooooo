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
          primary: "#3b82f6",
          "primary-content": "#f3f4f6",
          secondary: "#74b4ea",
          "secondary-content": "#f3f4f6",
          accent: "#1e3a8a",
          "accent-content": "#f3f4f6",
          neutral: "#e5e7eb",
          "neutral-content": "#090a0b",
          "base-100": "#ffffff",
          "base-200": "#d5ded9",
          "base-300": "#b6beba",
          "base-content": "#151615",
          info: "#fde791",
          "info-content": "#040615",
          success: "#10b981",
          "success-content": "#f3f4f6",
          warning: "#f59e0b",
          "warning-content": "#f3f4f6",
          error: "#ef4444",
          "error-content": "#f3f4f6",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
