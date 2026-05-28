/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080808",
        charcoal: "#111111",
        graphite: "#1B1B1B",
        ivory: "#F8F5EF",
        champagne: "#D6B46A",
        gold: "#B99445",
        mist: "#E8E2D8"
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        luxe: "0 24px 80px rgba(0, 0, 0, 0.22)"
      }
    }
  },
  plugins: []
};