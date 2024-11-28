// import colors from 'tailwindcss/colors'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        lorem:'green'
      },
      backgroundImage:{
        img:"url('./src/assets/img.jpg')"
      }
    },
    // colors:{
    //   ...colors,
    //   primary:'red',
    //   secondary:'white'
    // }
  },
  plugins: [],
}