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
      "win-primary": "#171717",
      "win-primary-hover":"#757575",
      "win-black": "#FAF9F6",
      "win-gray": "#E3E3E3",
      "win-slate": "#3A4149",
      "win-white": "#F5F5F5"
     },
     fontFamily: {
      "header": "var(--header-font)",
      "body": "var(--body-font)",
     },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
