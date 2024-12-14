/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "rgb(0, 136, 204)", 
        secondaryColor: "rgb(0, 112, 188)", 
        primaryText: "rgb(255,255,255)", 
        secondaryText: "rgb(179, 179, 179)", 
        bgDark1: "rgb(21, 32, 43)", 
        bgDark2: "rgb(26, 36, 47)", 
        bgDark3: "rgb(36, 47, 58)", 
        bgDark3Hover: "rgb(41, 52, 63)", 
        bgDarkTransparent: "rgba(21, 32, 43, 0.7)", 
        bgDarkTransparentDarker: "rgba(0, 0, 0, 0.5)", 
        bgDarkTransparentLighter: "rgba(36, 47, 58, 0.7)", 
        mainBorder: "rgba(255, 255, 255, 0.15)", 
        mainBorderDarker: "rgba(255, 255, 255, 0.07)", 
        quoteIconColor: "rgb(138, 150, 169)" 
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"], 
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
    },
  },
};
