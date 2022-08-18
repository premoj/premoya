module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      courier: ["Courier", "sans-serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      xlg: "896px",
      lg: "1024px",
      xxl: "1152px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "3000px",
    },
    extend: {
      colors: {
        primary: "#006655",
        secondary: "#0ea0e1",
        "indigo-950": "#030318",
        "indigo-940": "#040423",
        "indigo-930": "#001540",
        "indigo-920": "#161655",
      },
      keyframes: {
        open: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
