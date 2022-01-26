const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "0.9375rem",
      },
      fontFamily: {
        sans: ["Noto Sans TC", ...fontFamily.sans],
      },
      colors: {
        primary: {
          100: "#C9ECFB",
          200: "#94D5F8",
          300: "#5DB2EA",
          400: "#358DD5",
          500: "#005DB9",
          600: "#00479F",
          700: "#003585",
          800: "#00256B",
          900: "#001A58",
        },
        secondary: {
          100: "#D5FBFA",
          200: "#ACF5F8",
          300: "#80E0EC",
          400: "#5DC3D9",
          500: "#2e9cc1",
          600: "#217BA5",
          700: "#175D8A",
          800: "#0E426F",
          900: "#082F5C",
        },
        accent: {
          100: "#CBF9C8",
          200: "#94F399",
          300: "#5BDC6F",
          400: "#32BA53",
          500: "#048c33",
          600: "#027837",
          700: "#026437",
          800: "#015134",
          900: "#004331",
        },
        warning: {
          100: "#FEF4DE",
          200: "#FEE7BD",
          300: "#FED69D",
          400: "#FDC584",
          500: "#FDAA5C",
          600: "#D98443",
          700: "#B6622E",
          800: "#92441D",
          900: "#792E11",
        },
        danger: {
          100: "#FDDCD2",
          200: "#FCB1A6",
          300: "#F67D78",
          400: "#EC565E",
          500: "#e1223e",
          600: "#C11841",
          700: "#A21141",
          800: "#820A3D",
          900: "#6C063B",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "540px",
          },
          "@screen md": {
            maxWidth: "720px",
          },
          "@screen lg": {
            maxWidth: "960px",
          },
          "@screen xl": {
            maxWidth: "1366px",
          },
        },
      });
    },
  ],
};
