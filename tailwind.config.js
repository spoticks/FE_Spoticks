/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F9F9F9",
        foreground: "#ffffff",
        Accent: "#DD4255",
        "button-hovered": "#A50115",
        "text-primary": "#222222",
        "text-secondary": "rgba(34, 34, 34, 0.5)",
        borders: "#DBDBDB",
        "focused-input-background": "rgba(219, 219, 219, 0.5)",
        "disabled-button": "rgb(238, 161, 169)",
      },
    },
  },
  plugins: [],
};
