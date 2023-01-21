module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'body': ['Open Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        pinkCustom: '#db3a72',
        blueDarkCustom: '#29304d',
        blueConsufarma: '#173452',
        // blueConsufarma: '#042A57',
        redConsufarma: '#D1001F',
        // redConsufarma: '#e52307',
        greenCustom: '#5fb050',
        blueLightCustom: '#00A2E2',
        grayCustom: '#606060',
        grayLightCustom: '#e3e2e2',
        grayCustomTwo: '#6F7070',
        yellowCustom: '#f2b235',
        orangeCustom: '#e94b32',
      }, 
    },
  },
  plugins: [],
}
