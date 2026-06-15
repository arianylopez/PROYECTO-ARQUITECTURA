/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B2B5E",
        accent: "#F59E0B",
        secondary: "#3B82F6",
        background: "#FAFAFA",
        surface: "#FFFFFF",
        surfaceDark: "#0F172A",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}