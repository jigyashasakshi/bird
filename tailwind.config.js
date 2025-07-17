/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
    "./*.html",
    "./blog/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#1C3FAA',
        'gold': '#FBBF24',
        'light-gray': '#F3F4F6'
      },
      fontFamily: {
        'sans': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}