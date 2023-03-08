/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        autoFit: "repeat(auto-fit, minmax(50px, 1fr))",
      },
    },
  },
  plugins: [],
};
