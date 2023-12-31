/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/selectmenu-cmp/**/*.{js,ts,jsx,tsx}',
    './node_modules/table-cmp/**/*.{js,ts,jsx,tsx}',
    './node_modules/datepicker-cmp/**/*.{js,ts,jsx,tsx}',
    './node_modules/notification-cmp/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      // Using modern `rgb`
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      tertiary: 'rgb(var(--color-tertiary) / <alpha-value>)',
      white: 'rgb(var(--color-white) / <alpha-value>)',
      transparent: 'rgb(var(--color-transparent) / <alpha-value>)',
      red: 'rgb(var(--color-red) / <alpha-value>)',
      black: 'rgb(var(--color-black) / <alpha-value>)',
      orange: 'rgb(var(--color-orange) / <alpha-value>)',
    },
    extend: {},
  },
  plugins: [],
}