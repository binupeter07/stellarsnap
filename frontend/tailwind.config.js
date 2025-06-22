/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        spinCube: {
          "0%": {
            transform: "rotate(45deg) rotateX(-25deg) rotateY(25deg)",
          },
          "50%": {
            transform: "rotate(45deg) rotateX(-385deg) rotateY(25deg)",
          },
          "100%": {
            transform: "rotate(45deg) rotateX(-385deg) rotateY(385deg)",
          },
        },
      },
      animation: {
        spinCube: "spinCube 2s ease infinite",
      },
    },
  },
  plugins: [],
};
