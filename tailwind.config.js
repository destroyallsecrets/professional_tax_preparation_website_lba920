const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...fontFamily.sans],
      },
      borderRadius: {
        DEFAULT: "8px",
        secondary: "4px",
        container: "12px",
      },
      boxShadow: {
        DEFAULT: "0 1px 4px rgba(0, 0, 0, 0.1)",
        hover: "0 2px 8px rgba(0, 0, 0, 0.12)",
      },
      colors: {
        black: {
          DEFAULT: "#181818",
          light: "#222222",
        },
        gold: {
          DEFAULT: "#FFD700",
          dark: "#B8860B",
          light: "#FFF8DC",
        },
        primary: {
          DEFAULT: "#FFD700",
          hover: "#B8860B",
        },
        secondary: {
          DEFAULT: "#181818",
          hover: "#222222",
        },
        accent: {
          DEFAULT: "#FFF8DC",
          hover: "#FFD700",
        },
        text: {
          DEFAULT: "#FFF8DC",
          dark: "#181818",
        },
      },
      spacing: {
        "form-field": "16px",
        section: "32px",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["hover", "active"],
    },
  },
};
