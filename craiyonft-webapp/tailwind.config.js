/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#36F599',
        'secondary': '#4C67F4',
        'error': '#F08D93',
        'blue-dark': '#1C2541',
        'green-dark': '#284B54',
        'gray-dark': '#485470',
        'gray': '#7D8CAC',
        'gray-light': '#99A7C7',
        'gray-pale': '#C7D0E4',
        'white-dark': '#F1F4FB',
        'white-light': '#F8F9FB',
        'white-pale': '#FCFBFB',
        'white': '#FFFFFF'
      },
      animation: {
        'spin-once': 'spin 1s ease-in-out',
        'pulse-1.75': 'pulse 1.75s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-1.5': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-2.25': 'pulse 2.25s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    },
    fontFamily: {
      'primary': ['Manrope', 'sans-serif'],
      'secondary': ['DM Sans', 'sans-serif'],
      'logo': ['Lato', 'sans-serif']
    },
  },
  plugins: [],
}
