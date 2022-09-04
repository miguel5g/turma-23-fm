const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {},
    fontFamily: {
      title: ['Rajdhani', ...fontFamily.sans],
      body: ['Inter', ...fontFamily.sans],
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
