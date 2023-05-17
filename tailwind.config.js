/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.{html,js,ejs}",
    "./public/**/*.{html,js,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')({
      target: 'legacy',
    })
  ]
}

