/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A6B3C",
        secondary: "#2ECC71",
        accent: "#A8E063",
        bgLight: "#F0FAF4",
        textMain: "#0D2B1A",
        textMuted: "#4A6B57",
        borderSoft: "#C3E6D0",
        emergency: "#E74C3C",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px rgba(26, 107, 60, 0.10)",
      },
      borderRadius: {
        card: "16px",
      }
    },
  },
  plugins: [],
}
