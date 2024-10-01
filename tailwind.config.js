/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // Using modern `rgb`
        first: 'rgb(var(--color-first))',
        second: 'rgb(var(--color-second))',
        third: 'rgb(var(--color-third))',
        fourth: 'rgb(var(--color-fourth))',
        fifth: 'rgb(var(--color-fifth))',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
],
}