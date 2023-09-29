/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    fontFamily: {
      oufit: ["Outfit", "sans-serif"],
      roboto: ["Roboto", "sans-serif"]
    },
    screens: {
      'xs': '320px',
      'sm': '420px', 
      'md': '640px',
      'lg': '768px',
      'xl': '1024px',
      '2xl': '1280px',
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography')],
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#ff8c05",
          "primary-content": "#a1a1aa",
          "secondary": "#d926a9",
          "accent": "#1fb2a6",
          "neutral": "#2a323c",
          "base-100": "#212121",
          "base-200": "#262626",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
        light: {
          "primary": "#ff8c05",
          "primary-content": "#71717a",
          "secondary": "#f000b8",
          "secondary-content": "#FFD1F4",
          "accent": "#1ECEBC",
          "accent-content": "#07312D",
          "neutral": "#2B3440",
          "neutral-content": "#D7DDE4",
          "base-100": "#ffffff",
          "base-200": "#E7E9EB",
          "base-300": "#E5E6E6",
          "base-content": "#1f2937",
        },
      },
    ],
  },
}

