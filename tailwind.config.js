/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        12: '12px',
      },
      colors: {
        'purple-site': '#FF4433',
        'blue-site': '#000000',
      },
      keyframes: {
        fade: {
          '0%': { opacity: 0 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fade 3s ease-in-out',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
