/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      colors: {
        magic: {
          rose: '#f472b6',
          blush: '#fdf2f8',
          violet: '#7c3aed',
          plum: '#2e1065',
          gold: '#f59e0b',
          champagne: '#fef3c7',
        },
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(244, 114, 182, 0.45)',
        'glow-gold': '0 0 35px -8px rgba(245, 158, 11, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
