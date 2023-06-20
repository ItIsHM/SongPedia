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
          900: "#222222"
        },
        light: {
          100: "#222222",
          200: "#fff"
        }
      }
    },
  },
  plugins: [],
}
