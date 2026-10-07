const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:720}});
 await page.goto('http://127.0.0.1:4173');await page.waitForFunction(()=>document.querySelector('model-viewer').loaded);
 await page.locator('#inicio .button').focus();await page.evaluate(()=>scrollTo({top:4000,behavior:'instant'}));await page.waitForTimeout(2500);
 assert.equal(await page.locator('#inicio .button').evaluate(e=>getComputedStyle(e).opacity),'1','CTA focado permanece visível');
 await page.emulateMedia({reducedMotion:'reduce'});
 const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setPageScaleFactor',{pageScaleFactor:2});await page.waitForTimeout(300);
 assert(await page.locator('.tooth-stage__object').evaluate(e=>{const r=e.getBoundingClientRect(),v=visualViewport;return r.left>=v.offsetLeft+v.width*.04-1&&r.right<=v.offsetLeft+v.width*.96+1&&r.top>=v.offsetTop+v.height*.04-1&&r.bottom<=v.offsetTop+v.height*.96+1}),'Poster reduzido inteiro no zoom 200%');
 console.log('PASS: foco e fallback com zoom 200%.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
