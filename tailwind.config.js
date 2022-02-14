module.exports = {
  theme: {
    colors: {
      primary: "#11161E",
      secondary: "#282C2F",
      ternary: "#48FFFF",
      accent: "#E6E3DF",
    }
  },
  content: ["./index.html", "./script/**.js"],
  plugins: [require('tailwind-scrollbar')]
}