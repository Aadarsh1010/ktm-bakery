/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        chocolate: '#3B1F0E',
        caramel: '#7B4A1E',
        cream: '#F5D79E',
        ivory: '#FDF6EC',
        gold: '#C9882C',
        dark: '#1A0A00',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        dancing: ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
};
