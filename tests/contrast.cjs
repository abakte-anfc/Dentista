const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const luminance=rgb=>rgb.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
(async()=>{
 const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{const p=await b.newPage();await p.goto('http://127.0.0.1:4173');
 const colors=await p.evaluate(()=>{const root=getComputedStyle(document.documentElement),body=getComputedStyle(document.body);return {top:root.getPropertyValue('--color-stage-top').trim(),bottom:root.getPropertyValue('--color-stage-bottom').trim(),text:getComputedStyle(document.querySelector('.hero__description')).color,background:body.backgroundImage}});
 const overlay=colors.background.match(/rgba\(([^)]+)\)/)[1].split(',').map(Number);
 const text=colors.text.match(/\d+/g).map(Number);
 const results={};for(const key of ['top','bottom']){const bg=colors[key].slice(1).match(/../g).map(v=>parseInt(v,16)).map((v,i)=>v*(1-overlay[3])+overlay[i]*overlay[3]);const ratio=(luminance(text)+.05)/(luminance(bg)+.05);assert(ratio>=4.5,`Texto pequeno AA no ${key}: ${ratio}`);results[key]=ratio;}
 fs.writeFileSync('artifacts/validation/linear-contrast.json',JSON.stringify(results,null,2));console.log('PASS: contraste mínimo',Math.min(...Object.values(results)).toFixed(2)+':1');
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
