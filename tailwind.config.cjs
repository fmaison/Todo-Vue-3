/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        sm: '360px'
      },
      fontFamily: ['Inter var', ...defaultTheme.fontFamily.sans]
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}