const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:900}});
  await page.goto('http://127.0.0.1:4173');await page.waitForFunction(()=>document.querySelector('model-viewer').loaded);
  assert.equal(await page.locator('.tooth-stage__blob').count(),0,'Sem blob');
  assert.deepEqual(await page.locator('main>.scene').evaluateAll(es=>es.map(e=>e.id)),['inicio','tratamentos','diferenciais','como-funciona','sobre','localizacao','agendar']);
  const coordinates=[];
  for(const p of [0,.25,.5,.75,1]){
   await page.evaluate(p=>scrollTo({top:p*(document.documentElement.scrollHeight-innerHeight),behavior:'instant'}),p);await page.waitForTimeout(2200);
   const r=await page.locator('.tooth-stage__object').boundingBox();coordinates.push(r);
   assert(Math.abs((r.x+r.width/2)/1280*100-(72-44*p))<.2,'Trajetória x linear');
   assert(Math.abs((r.y+r.height/2)/900*100-40)<.2,'Y fixo');
   assert(Math.abs(parseFloat(await page.locator('model-viewer').evaluate(e=>e.cameraOrbit))-p*540)<.2,'1,5 volta');
   await page.screenshot({path:`artifacts/validation/linear-desktop-${p}.png`});
  }
  assert(coordinates.every(r=>Math.abs(r.width-coordinates[0].width)<.1),'Sem variação de escala');
  assert(await page.locator('.float-text,.treatment-card,.reason,details,.location__card').evaluateAll(es=>es.every(e=>getComputedStyle(e).backgroundColor==='rgba(0, 0, 0, 0)'&&getComputedStyle(e).boxShadow==='none')),'Texto sem caixas');
  console.log('PASS: trajetória linear, y/escala fixos, ordem, 1,5 volta e texto sem caixas.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
