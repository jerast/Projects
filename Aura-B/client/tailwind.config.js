/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'main': 'calc(100vh - 6.5rem)'
      },
      fontFamily: {
        'inter': ['Inter', 'sans']
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}

