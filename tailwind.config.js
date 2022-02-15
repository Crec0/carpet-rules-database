module.exports = {
    theme: {
        colors: {
            primary: "#11161E",
            secondary: "#282C2F",
            neutral: "#E6E3DF",
            accent: "#9adc58",
            selection: "#3498db",
        },
    },
    content: ["./index.html", "./script/**.js"],
    plugins: [
        require("tailwind-scrollbar"),
        require("prettier-plugin-tailwindcss"),
    ],
};
