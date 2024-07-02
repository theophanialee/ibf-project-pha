/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        c1: {
          light: "#efbd40",
          DEFAULT: "#efbd40",
          dark: "#efbd40",
        },
        c2: {
          light: "#087d4b",
          DEFAULT: "#087d4b",
          dark: "#087d4b",
        },
        c3: {
          light: "#d04937",
          DEFAULT: "#d04937",
          dark: "#d04937",
        },
        c4: {
          light: "#004fad",
          DEFAULT: "#004fad",
          dark: "#004fad",
        },
        bg1: {
          light: "#f2ead1",
          DEFAULT: "#f2ead1",
          dark: "#f2ead1",
        },
        backgroundImage: (theme) => ({
          "bg-pic1": "url('/assets/formkakis.png')",
        }),
        // You can add more custom colors here
      },
    },
  },
  plugins: [],
};
