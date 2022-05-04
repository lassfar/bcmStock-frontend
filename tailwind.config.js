module.exports = {
  darkMode: 'class',
  content: [    
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#60a5fa",
        secondary: "#5463FF",
        special: "#DA1212",
        danger: "#DA1212",
        light: "#EEEEEE",
        dark: "#06152e",
      },
      animation: {
        'dropdown-slide': 'dropdownSlide 500ms linear forwards',
      },
    },
  },
  plugins: [],
}
