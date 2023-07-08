/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'search-background': 'url(/world-map.png)'
      },
      colors: {
        primary: "#590BD8",
        primaryDarker: "#312A4F",
        primaryLighter: "#DDD5EA",
        grayPrimary: "#717171",
        grayLighter: "#BBBFBF"
      },
      textColor: {
        dark: "#717171",
      }
    },
  },
  plugins: [],
}
