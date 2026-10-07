const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
async function run() {
  fs.mkdirSync('artifacts/validation', { recursive: true });
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:4173');
    assert.equal(await page.locator('.tooth-stage model-viewer').count(), 1, 'Um único viewer na camada fixa');
    await page.waitForFunction(() => document.querySelector('model-viewer').loaded);
    for (const size of [{width:360,height:800},{width:768,height:900},{width:1280,height:900},{width:800,height:360},{width:640,height:450}]) {
      await page.setViewportSize(size);
      for (const p of [0,.18,.36,.54,.72,.88,1,.54,0]) {
        await page.evaluate(p => scrollTo({top:p*(document.documentElement.scrollHeight-innerHeight),behavior:'instant'}),p);
        await page.waitForTimeout(950);
        const r = await page.locator('.tooth-stage__object').boundingBox();
        assert(r.x >= size.width*.04-1 && r.y >= size.height*.04-1 && r.x+r.width <= size.width*.96+1 && r.y+r.height <= size.height*.96+1, `Dente inteiro: ${JSON.stringify(size)} p=${p}`);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),'Sem overflow');
        assert(await page.locator('.scene.is-active').evaluate((scene,tooth)=>{
          const mode=scene.dataset.layout;
          if(mode==='mobile'||mode==='bottom')return parseFloat(scene.style.getPropertyValue('--safe-top'))>=tooth.y+tooth.height+23;
          const text=scene.querySelector('.float-text').getBoundingClientRect();
          return mode==='left'?text.right<=tooth.x-1:text.left>=tooth.x+tooth.width+1;
        },r),'Área de leitura não cobre o dente');
        if ([0,.36,1].includes(p)) await page.screenshot({path:`artifacts/validation/scroll-${size.width}-${size.height}-${p}.png`});
      }
    }
    await page.waitForFunction(()=>parseFloat(document.querySelector('model-viewer').cameraOrbit)===0);
    const orbit = await page.locator('model-viewer').evaluate(e=>e.cameraOrbit);
    await page.waitForTimeout(400);
    assert.equal(await page.locator('model-viewer').evaluate(e=>e.cameraOrbit),orbit,'Rotação parada sem scroll');
    assert.equal(await page.locator('model-viewer[auto-rotate], model-viewer[camera-controls]').count(),0);
    await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight/2,behavior:'instant'}));
    await page.waitForTimeout(1500);
    const forward = parseFloat(await page.locator('model-viewer').evaluate(e=>e.cameraOrbit));
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    await page.waitForTimeout(1500);
    assert(parseFloat(await page.locator('model-viewer').evaluate(e=>e.cameraOrbit)) < forward,'Subir inverte a rotação');
    assert(await page.locator('#inicio .eyebrow').evaluate(e=>e.classList.contains('is-in')),'Hero volta a entrar');
    const cdp=await page.context().newCDPSession(page);
    await page.setViewportSize({width:1280,height:900});
    await cdp.send('Emulation.setPageScaleFactor',{pageScaleFactor:2});
    await page.waitForTimeout(1000);
    assert(await page.locator('.tooth-stage__object').evaluate(e=>{const r=e.getBoundingClientRect(),v=visualViewport;return r.left>=v.offsetLeft+v.width*.04-1&&r.right<=v.offsetLeft+v.width*.96+1&&r.top>=v.offsetTop+v.height*.04-1&&r.bottom<=v.offsetTop+v.height*.96+1}),'Zoom real de 200% mantém dente no viewport visual');
    await page.screenshot({path:'artifacts/validation/zoom-200.png'});
    await cdp.send('Emulation.setPageScaleFactor',{pageScaleFactor:1});
    await page.locator('.header__nav a[href="#sobre"]').click();
    await page.waitForTimeout(2000);
    assert.equal(await page.evaluate(()=>location.hash),'#sobre','Âncora nativa');
    await page.locator('.header__nav a[href="#tratamentos"]').click();
    await page.waitForTimeout(2000);
    await page.screenshot({path:'artifacts/validation/treatments-1280.png'});
    await page.emulateMedia({reducedMotion:'reduce'});
    assert(await page.locator('[data-reveal]').evaluateAll(es=>es.every(e=>getComputedStyle(e).opacity==='1')),'Preferência alterada libera conteúdo');
    for (const href of await page.locator('a[href*="wa.me"]').evaluateAll(es => es.map(e=>e.href))) {
      const u = new URL(href); assert.equal(u.pathname,'/5575981220711'); assert.equal(u.searchParams.get('text'),'Olá! Vim pelo site e quero agendar uma avaliação.');
    }
    assert.equal(await page.locator('h1').count(),1);
    assert.deepEqual(errors,[]);
    for (const scenario of ['no-js','no-webgl','model-error','module-error','reduced-motion']) {
      const context = await browser.newContext({javaScriptEnabled:scenario!=='no-js',reducedMotion:scenario==='reduced-motion'?'reduce':'no-preference'});
      const p = await context.newPage();
      if(scenario==='no-webgl') await p.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/.test(type)?null:original.call(this,type,...args)};});
      if(scenario==='model-error') await p.route('**/dente.glb',r=>r.abort());
      if(scenario==='module-error') await p.route('**/vendor/model-viewer.min.js',r=>r.abort());
      await p.goto('http://127.0.0.1:4173'); await p.waitForTimeout(2000);
      assert(await p.locator('.tooth-stage__poster').isVisible(),scenario+': poster');
      assert(await p.locator('[data-reveal]').evaluateAll(es=>es.every(e=>getComputedStyle(e).opacity==='1')),scenario+': conteúdo visível');
      await context.close();
    }
    console.log('PASS: scroll, limites, parada, CTAs e cinco fallbacks.');
  } finally {await browser.close();}
}
run().catch(e=>{console.error(e);process.exitCode=1});
