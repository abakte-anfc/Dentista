const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{const p=await b.newPage();await p.goto('http://127.0.0.1:4173');await p.waitForFunction(()=>document.querySelector('model-viewer').loaded);
 for(const width of [360,1280]){
  await p.setViewportSize({width,height:900});
  for(const selector of ['#inicio .button','#tratamentos .treatment-card:last-child a','#sobre summary:last-of-type','#agendar .button']){
   await p.locator('.header__nav a').first().focus();await p.locator(selector).first().focus();await p.waitForTimeout(1700);
   assert(await p.locator(selector).first().evaluate(e=>{const r=e.getBoundingClientRect(),s=e.closest('.scene'),top=parseFloat(s.style.getPropertyValue('--safe-top'));return r.top>=top-1&&r.bottom<=innerHeight-23&&s.classList.contains('is-active')}),`Foco legível sem recorte: ${width} ${selector}`);
  }
 }
 console.log('PASS: foco traz CTAs e FAQ para a área legível em mobile/desktop.');
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
