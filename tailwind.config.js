/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgMain: "rgba(13, 7, 20, 1)",
        bgContainer: "rgba(29, 24, 37, 1)",
        bgLi: "rgba(21, 16, 28, 1)",
      },
      fontFamily: {
        inter: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
