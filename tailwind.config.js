module.exports = {
  content: [    
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e293b"
      },
      animation: {
        'dropdown-slide': 'dropdownSlide 500ms linear forwards',
      },
    },
  },
  plugins: [],
}
