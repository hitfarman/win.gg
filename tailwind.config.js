/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
     colors: {
      "win-primary": "#6D67E4",
      "win-primary-hover":"#5851E0",
      "win-black": "#151515",
      "win-gray": "#272727",
      "win-slate": "#B5B5B5",
      "win-white": "#F5F5F5"
     },
     fontFamily: {
      "header": "var(--header-font)",
      "body": "var(--body-font)",
     },
    },
  },
  plugins: [],
}
