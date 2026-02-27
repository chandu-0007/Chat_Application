/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        floatUp: {
          '0%': {
            transform: 'translateY(0)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(-100vh)',
            opacity: '1',
          },
        },
      },
      animation: {
        floatUp: 'floatUp 8s linear infinite',
      },
    },
  },
  plugins: [],
};