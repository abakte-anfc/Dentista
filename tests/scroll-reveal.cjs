const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
 const b = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try {
  for(const width of [360,768,1280]) {
   const p=await b.newPage({viewport:{width,height:900}});
   const errors=[],requests=[];p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>requests.push(r.url()));
   await p.goto('http://127.0.0.1:4173');await p.evaluate(()=>document.fonts.ready);
   const before=await p.locator('.doctor-portrait figcaption').innerHTML();
   await p.evaluate(()=>scrollTo({top:400,behavior:'instant'}));await p.waitForTimeout(950);
   assert.equal(await p.locator('.doctor-portrait figcaption').innerHTML(),before);
   assert.equal(await p.locator('.scroll-reveal-word').count(),0);
   assert.equal(await p.locator('.doctor-portrait figcaption').evaluate(e=>getComputedStyle(e).fontSize),width<768?'20px':'24px');
   const card=p.locator('.treatment-card').first();await card.scrollIntoViewIfNeeded();await p.waitForTimeout(950);
   assert.equal(await card.evaluate(e=>getComputedStyle(e).opacity),'1');
   assert.equal(await card.evaluate(e=>getComputedStyle(e).filter),'none');
   const top=await card.evaluate(e=>e.getBoundingClientRect().top+scrollY);
   await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top+400);await p.waitForTimeout(950);
   assert.equal(await card.evaluate(e=>getComputedStyle(e).opacity),'0');
   await card.scrollIntoViewIfNeeded();await p.waitForTimeout(950);
   assert.equal(await card.evaluate(e=>getComputedStyle(e).opacity),'1');
   await p.screenshot({path:'artifacts/validation/block-motion-'+width+'.png'});
   await p.locator('.faq summary').first().click();assert(await p.locator('.faq details').first().evaluate(e=>e.open));
   await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(200);assert.equal(await p.locator('.motion-block').count(),0);
   assert(!requests.some(url=>url.includes('/scroll-reveal.js')));
   assert.deepEqual(errors,[]);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await p.locator('.hero').screenshot({path:'artifacts/validation/hero-motion-fixed-'+width+'.png'});
   console.log(width+' px: HTML e fontes preservados, sem blur, entrada/saida/reversao, FAQ e movimento reduzido OK');await p.close();
  }
  const p=await b.newPage({javaScriptEnabled:false});await p.goto('http://127.0.0.1:4173');assert.equal(await p.locator('h1').evaluate(e=>getComputedStyle(e).opacity),'1');await p.close();
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});