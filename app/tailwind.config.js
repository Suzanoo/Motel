/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js, jsx, ts, tsx}'],
  theme: {
    screens: {
      sm: '460px',
      md: '768px',
      lg: '960px',
      xl: '1140px',
    },
    fontFamily: {},
    extend: {
      colors: {
        aries: '#0D0D0B',
        taurus: '#403B23',
        gemini: '#595334',
        cancer: '#733917',
        leo: '#401C0F',
      },
    },
  },
  plugins: [],
};
