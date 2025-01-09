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
        "text-tertiary": "#8d8d8d",
        borders: "#DBDBDB",
        "focused-input-background": "rgba(219, 219, 219, 0.5)",
        "page-button-hovered": "#B5B7C0",
        "disabled-button": "rgb(238, 161, 169)",
        valid: "#69d12d",
      },
      boxShadow: {
        first: "0px 0px 20px rgba(0, 0, 0, 0.05)",
        second: "0px 4px 4px rgba(0, 0, 0, 0.15);",
      },
      dropShadow: {
        first: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      width: {
        88: "22rem",
        92: "23rem",
        "content-width": "1280px",
      },
    },
  },
  plugins: [],
};
