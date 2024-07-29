/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F9F9F9",
        foreground: "#ffffff",
        Accent: "#DD4255",
        "text-primary": "#222222",
        "text-secondary": "rgba(34, 34, 34, 0.5)",
        borders: "#DBDBDB",
      },
    },
  },
  plugins: [],
};
