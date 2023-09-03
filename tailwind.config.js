/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // Using modern `rgb`
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      tertiary: 'rgb(var(--color-tertiary) / <alpha-value>)',
      white: 'rgb(var(--color-white) / <alpha-value>)',
      transparent: 'rgb(var(--color-transparent) / <alpha-value>)',
    },
    extend: {},
  },
  plugins: [],
}