module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'body': ['"Open Sans"'],
    },
    extend: {
      colors: {
        pinkCustom: '#db3a72',
        blueDarkCustom: '#29304d',
        greenCustom: '#5fb050',
        blueLightCustom: '#00a2e2',
        grayCustom: '#606060',
      }, 
    },
  },
  plugins: [],
}
