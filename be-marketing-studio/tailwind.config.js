/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#1F2937',
        'midnight': '#2C3E50',
        'coral': '#FF6F61',
        'coral-dark': '#E85D50',
        'ui-subtle': '#D1D5DB',
        'vizon': '#C9B99A',
        'vizon-light': '#E8DDD1',
        'vizon-dark': '#A89880',
        'off-white': '#F4F1EC',
        'matte-black': '#1A1A1A',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
