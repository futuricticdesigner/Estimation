/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        az: {
          navy:    '#0041C7',  // Crayola Absolute Zero
          blue:    '#0160C9',  // True Blue
          mid:     '#0D85D8',  // Blue Cola
          bright:  '#1CA3DE',  // Battery Charged Blue
          sky:     '#3ACBE8',  // Picton Blue
          light:   '#D0EEF8',  // Picton Blue tint ~20%
          lightest:'#EDF7FB',  // Picton Blue tint ~5% (page bg)
        },
      },
      animation: {
        'fade-in': 'fadeIn .2s ease',
        'slide-up': 'slideUp .3s ease',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
