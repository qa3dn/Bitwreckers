/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9f5fa',
          100: '#f3e8f5',
          200: '#e6d1ea',
          300: '#d4aad9',
          400: '#b376bf',
          500: '#6B2D73',
          600: '#5c2663',
          700: '#4d1f53',
          800: '#3e1943',
          900: '#2f1433',
        },
        secondary: {
          50: '#faf5fb',
          100: '#f5eaf7',
          200: '#ebd5ef',
          300: '#d9b0e0',
          400: '#c084cd',
          500: '#9347a0',
          600: '#7b3985',
          700: '#6B2D73',
          800: '#5a2461',
          900: '#491c4e',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#2D7363',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        }
      },
      fontFamily: {
        'english': ['Inter', 'sans-serif'],
        'arabic': ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
