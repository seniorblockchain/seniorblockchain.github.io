import{j as e}from"./jsx-runtime.TgE5XOvc.js";import{m as o}from"./proxy.2pYL8GYX.js";import"./index.-VfdvS1U.js";const l=[{category:"Team & Founders",allocation:"15%",tokens:"38,400,000 SBC",details:"Locked for 2 years; gradually unlocked over 4 semi-annual periods"},{category:"Initial & Public Sale",allocation:"35%",tokens:"89,600,000 SBC",details:"Includes 15% private sale and 20% public sale"},{category:"Marketing & Development",allocation:"20%",tokens:"51,200,000 SBC",details:"For advertising campaigns and strategic partnerships"},{category:"Network Rewards",allocation:"20%",tokens:"51,200,000 SBC",details:"Staking and user activity rewards to boost engagement"},{category:"Strategic Reserve",allocation:"10%",tokens:"25,600,000 SBC",details:"Reserved for emergencies and long-term development"}],a={name:"Senior Blockchain Company",symbol:"SBC",supply:"256,000,000",decimals:"8",address:"EQBIQe_KkVxaJmga7LVgwvB8lcXbbfsqdziGgDXfD-zW4KU9"},p=()=>{const n=100/Math.max(...l.map(t=>parseInt(t.allocation)));return e.jsx("section",{className:"w-screen bg-bgDark2 py-16",children:e.jsx("div",{className:"container mx-auto px-4",children:e.jsxs(o.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.5,delay:.2},children:[e.jsxs("div",{className:"text-center max-w-3xl mx-auto mb-12",children:[e.jsx("span",{className:"text-primaryColor font-medium text-lg",children:"SBC Tokenomics"}),e.jsx("h2",{className:"text-4xl font-bold text-primaryText mt-4",children:"Strategic Token Distribution"}),e.jsxs("div",{className:"text-secondaryText mt-4 space-y-2",children:[e.jsxs("p",{children:["Total Supply: ",a.supply," ",a.symbol]}),e.jsxs("p",{children:["Smart Contract: ",e.jsx("span",{className:"text-primaryColor",children:a.address})]}),e.jsx("p",{className:"mt-4",children:'SBC token powers our ecosystem of Programming, Blockchain, and AI services, built on the TON network with a vision to "Decentralize Everything"'})]})]}),e.jsx("div",{className:"space-y-4 max-w-5xl mx-auto",children:l.map((t,s)=>{const i=parseInt(t.allocation)*n;return e.jsxs(o.div,{initial:{width:0},whileInView:{width:`${i}%`},viewport:{once:!0},transition:{duration:.8,delay:s*.2},className:"relative bg-bgDark3 rounded-lg shadow-lg p-6 w-full md:max-w-[calc(var(--scaled-width))]",style:{minWidth:"280px","--scaled-width":`${i}%`},children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"text-xl font-semibold text-primaryText",children:t.category}),e.jsx("p",{className:"text-gray-400 mt-1",children:t.tokens}),e.jsx("p",{className:"text-sm text-gray-500 mt-1",children:t.details})]}),e.jsx("div",{className:"text-primaryColor text-2xl font-bold ml-4",children:t.allocation})]}),e.jsx("div",{className:"absolute bottom-0 left-0 h-1 bg-primaryColor rounded-b-lg",style:{width:"100%",opacity:.3}})]},s)})})]})})})};export{p as Tokenomics};
