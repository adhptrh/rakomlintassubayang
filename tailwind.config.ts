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
        'custom-blue-sky': '#00AFEA'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        comeup: 'comeup 0.3s ease-in-out'
      },
      keyframes: {
        comeup: {
          '0%': {
            marginTop: '50px',
            opacity: '0'
          },
          '100%': {
            marginTop: '0px',
            opacity: '1'
          },
        }
      }
    },
  },
  plugins: [],
};
export default config;
