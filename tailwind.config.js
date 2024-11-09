/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ist: "#F15941",
        "ist-dark": "#E8472E",
        "ist-pale": "#F15941",
      },
      fontSize: {
        "xxs": "0.85rem",
      }
    },
  },
  plugins: [],
}

