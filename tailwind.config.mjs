/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        lightHover:'#fcf4ff',
      darkHover:'#2a004a',
      darkTheme: '#11001f',
      }

    },
    fontFamily:{
      Outfit: ['Outfit', 'sans-serif'],
      Ovo: ['Ovo', 'serif'],
    },
boxShadow:{
  'black':'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
  'white':'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
}

  },
  darkMode: "selector",
  plugins: [],
};
