import{j as e}from"./jsx-runtime.TgE5XOvc.js";import{r as a}from"./index.-VfdvS1U.js";import{g as f}from"./index.DjKJqAo0.js";import{m as n}from"./proxy.2pYL8GYX.js";const j=()=>{const[x,i]=a.useState({days:0,hours:0,minutes:0,seconds:0}),d=new Date("2025-03-01T00:00:00");return a.useEffect(()=>{const s=()=>{const t=d-new Date;if(t<=0){i({days:0,hours:0,minutes:0,seconds:0});return}const o=Math.floor(t/(1e3*60*60*24)),l=Math.floor(t/(1e3*60*60)%24),c=Math.floor(t/1e3/60%60),m=Math.floor(t/1e3%60);i({days:o,hours:l,minutes:c,seconds:m}),localStorage.setItem("rialTimer",JSON.stringify({days:o,hours:l,minutes:c,seconds:m}))},r=localStorage.getItem("rialTimer");r&&i(JSON.parse(r));const p=setInterval(s,1e3);return()=>clearInterval(p)},[]),a.useEffect(()=>{f.fromTo(".timer-box",{opacity:0,y:30},{opacity:1,y:0,duration:1,stagger:.2})},[]),e.jsx("section",{className:"w-screen flex justify-center items-center bg-bgDark1 mb-[12vw] md:mb-[10vw] lg:mb-[6vw] xl:mb-[4vw] 2xl:mb-30 hero-bg-gradient pb-24 sm:pb-8 md:pb-12 lg:pb-0",id:"home",children:e.jsxs("div",{className:"w-full max-w-6xl flex flex-col justify-center items-center pt-20 md:pt-28 lg:pt-32 text-center",children:[e.jsx(n.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},children:e.jsxs("h1",{className:"text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-tight mt-10",children:["Decentralize Everything ",e.jsx("br",{className:"hidden sm:block"})," with"," ",e.jsx("span",{className:"text-primaryColor",children:"SBC"})]})}),e.jsx(n.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},children:e.jsx("div",{className:"flex flex-wrap justify-center items-center mt-12 gap-4",children:Object.entries(x).map(([s,r])=>e.jsxs("div",{className:"timer-box bg-primaryColor text-white rounded-lg p-4 w-24 sm:w-28 lg:w-32 shadow-md flex flex-col items-center",children:[e.jsx("p",{className:"text-3xl sm:text-4xl font-extrabold",children:r}),e.jsx("p",{className:"text-sm sm:text-base mt-1 uppercase tracking-wide",children:s})]},s))})}),e.jsx(n.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},children:e.jsxs("div",{className:"flex flex-col items-center gap-4 mt-12 pb-12 lg:pb-40",children:[e.jsx("a",{href:"/buy",className:"contained-button bg-primaryColor hover:bg-primaryHover w-64 sm:w-52 h-12 text-white rounded-lg font-bold text-center flex justify-center items-center transition","aria-label":"Buy SBC",children:"Buy SBC"}),e.jsxs("p",{className:"text-secondaryText text-lg mt-6 text-center",children:[e.jsx("strong",{className:"text-primaryColor",children:"Limited Time Offer:"})," Buy SBC for only 0.01 USDT until 2025-03-01!"]})]})})]})})};export{j as Hero};
