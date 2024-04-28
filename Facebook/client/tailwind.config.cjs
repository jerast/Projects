/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      height:{
        'screen-header-60': 'calc(100vh - 60px)',
        'header-screen-60': '60px',
        'post-form-60': 'calc(100vh - 60px - 4rem)',
        'screen-header-80': 'calc(100vh - 80px)',
        'header-screen-80': '80px',
        'post-form-80': 'calc(100vh - 80px - 4rem)',
      },
      gridTemplateColumns: {
        '2-min': 'min-content 1fr',
      },
      gridTemplateRows: {
        '2-min': 'min-content 1fr',
      },
      aspectRatio: {
        'post-xl': '13 / 9',
      },

    },
  },
  plugins: [],
}
