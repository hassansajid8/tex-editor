/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    colors: {
      'black': '#000',
      'white': '#fff',
      'blue': '#1A73E8',
      'grey': '#a3a9b2',
      'dblue': '#155dbc',
      'green': '#5cb85c',
      'red': '#ff3333',
      'note': '#E9C874'
    },
    extend: {},
  },
  plugins: [],
}

