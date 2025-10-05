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
      },
      fontFamily: {
        'arabic': ['IBM Plex Sans Arabic', 'Cairo', 'Tajawal', 'sans-serif'],
        'english': ['Inter', 'Poppins', 'sans-serif'],
        'ibm-arabic': ['IBM Plex Sans Arabic', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
