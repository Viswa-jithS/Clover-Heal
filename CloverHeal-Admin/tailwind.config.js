/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          "color-dark-100": "var(--color-dark-100)",
          "color-dark-1000": "var(--color-dark-1000)",
          "color-dark-250": "var(--color-dark-250)",
          "color-dark-50": "var(--color-dark-50)",
          "color-dark-500": "var(--color-dark-500)",
          "color-dark-750": "var(--color-dark-750)",
          "color-light-100": "var(--color-light-100)",
          "color-light-1000": "var(--color-light-1000)",
          "color-light-250": "var(--color-light-250)",
          "color-light-50": "var(--color-light-50)",
          "color-light-500": "var(--color-light-500)",
          "color-light-750": "var(--color-light-750)",
          "color-primary-100": "var(--color-primary-100)",
          "color-primary-1000": "var(--color-primary-1000)",
          "color-primary-500": "var(--color-primary-500)",
        },
        fontFamily: {
          "body-LG": "var(--body-LG-font-family)",
          "body-MD": "var(--body-MD-font-family)",
          "body-SM": "var(--body-SM-font-family)",
          "body-XL": "var(--body-XL-font-family)",
          "body-XS": "var(--body-XS-font-family)",
          "body-XXL": "var(--body-XXL-font-family)",
          "headline-h1": "var(--headline-h1-font-family)",
          "headline-h2": "var(--headline-h2-font-family)",
          "headline-h3": "var(--headline-h3-font-family)",
          "headline-h4": "var(--headline-h4-font-family)",
          "headline-h5": "var(--headline-h5-font-family)",
          "headline-h6": "var(--headline-h6-font-family)",
          "headline-h7": "var(--headline-h7-font-family)",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
    variants: {
      extend: {
        backdropBlur: ['responsive'],
      },
    },
  };
  