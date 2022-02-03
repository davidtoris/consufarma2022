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
        blueConsufarma: '#062849',
        redConsufarma: '#a42127',
        greenCustom: '#5fb050',
        blueLightCustom: '#00a2e2',
        grayCustom: '#606060',
        yellowCustom: '#f2b235',
      }, 
    },
  },
  plugins: [],
}
