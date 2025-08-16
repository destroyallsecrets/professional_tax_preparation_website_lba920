const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", "Inter", ...fontFamily.sans],
        display: ["Inter Variable", "Inter", ...fontFamily.sans],
        mono: ["JetBrains Mono", "Fira Code", ...fontFamily.mono],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
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
          DEFAULT: "#0F0F0F", // Deeper black for better contrast
          light: "#1A1A1A",   // Slightly lighter for cards
          lighter: "#2A2A2A", // For hover states
        },
        gold: {
          DEFAULT: "#FFD700",
          dark: "#B8860B",
          light: "#FFF8DC",
          50: "#FFFEF7",
          100: "#FFFACD", 
          200: "#FFF8DC",
          300: "#FFE55C",
          400: "#FFD700",
          500: "#FFC107",
          600: "#B8860B",
          700: "#996F00",
          800: "#7A5900",
          900: "#5C4300",
        },
        primary: {
          DEFAULT: "#FFD700",
          50: "#FFFEF7",
          100: "#FFFACD",
          500: "#FFD700",
          600: "#B8860B",
          700: "#996F00",
          foreground: "#0F0F0F",
        },
        secondary: {
          DEFAULT: "#1A1A1A",
          foreground: "#FFF8DC",
        },
        muted: {
          DEFAULT: "#2A2A2A",
          foreground: "#A1A1AA",
        },
        accent: {
          DEFAULT: "#FFF8DC",
          foreground: "#0F0F0F",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FEFEFE",
        },
        border: "#374151",
        input: "#1A1A1A",
        ring: "#FFD700",
        background: "#0F0F0F",
        foreground: "#FFF8DC",
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
