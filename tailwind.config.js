/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     
        colors: {
          primary: "#ef4935",
          'primary-light': "#d14c3c",
          
        }
      }
    
  },
  plugins: [],
}
// #ef4935