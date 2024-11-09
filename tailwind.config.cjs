/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "rgb(0, 136, 204)", 
        secondaryColor: "rgb(48, 105, 152)", 
        primaryText: "rgb(255, 255, 255)", 
        secondaryText: "rgb(136, 153, 166)", 
        bgDark1: "rgb(29, 34, 39)", 
        bgDark2: "rgb(33, 43, 54)", 
        bgDark3: "rgb(38, 50, 61)", 
        bgDark3Hover: "rgb(45, 55, 70)", 
        bgDarkTransparent: "rgba(29, 34, 39, 0.7)", 
        bgDarkTransparentDarker: "rgba(0, 0, 0, 0.5)", 
        bgDarkTransparentLighter: "rgba(38, 50, 61, 0.7)", 
        mainBorder: "rgba(255, 255, 255, 0.15)", 
        mainBorderDarker: "rgba(255, 255, 255, 0.07)", 
        quoteIconColor: "rgb(153, 170, 181)" 
      },
      fontFamily: {
        Inter: "Inter",
      },
      screens: {
        xs: "530px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",      
        "2xl": "1536px",
      },
    },
  },
};
