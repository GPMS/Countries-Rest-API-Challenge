/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-bg-front': '#2A3642',
        'dark-bg-back': '#202C35',
        'dark-fg': '#FBFCFC',
        'light-bg-front': '#FDFCFC',
        'light-bg-back': '#F7F7F7',
        'light-fg': '#484749',
      },
    },
  },
  plugins: [],
};
