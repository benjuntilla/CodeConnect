import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: ["dracula"],
  },
  theme: {
    extend: {
      colors: {
        primary: "#AA1155",
        secondary: "#880044",
        tertiary: "#E3DFFF",
      },
    },
  },
  plugins: [typography, forms, daisyui],
};
export default config;
