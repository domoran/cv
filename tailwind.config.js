/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  screens: {
    print: { raw: 'print' },
    screen: { raw: 'screen' },
  },  
};
