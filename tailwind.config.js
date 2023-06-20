/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          900: "#000"
        },
        light: {
          100: "#000",
          200: "#000"
        }
      }
    },
  },
  plugins: [],
}
