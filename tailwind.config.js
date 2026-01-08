/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          light: '#f4e4bc',
          DEFAULT: '#e4d5b7',
          dark: '#c5b38d',
        },
        pirate: {
          gold: '#d4af37',
          blood: '#8b0000',
          ink: '#1a1a1a',
          ocean: '#1e3d59',
        }
      },
      fontFamily: {
        pirate: ['"Pirata One"', 'serif'],
        map: ['"IM Fell English"', 'serif'],
        body: ['"IM Fell English"', 'serif'],
      },
      backgroundImage: {
        'old-map': "url('/old-map.svg')",
      }
    },
  },
  plugins: [],
}
