const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const base = 'http://127.0.0.1:4173';
async function run() {
  const browser = await chromium.launch({ executablePath: chrome, headless: true });
  try {
    const page = await browser.newPage();
    const pageErrors = [];
    const remoteRequests = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    page.on('request', request => { if (!request.url().startsWith(base) && !request.url().startsWith('data:') && !request.url().startsWith('blob:')) remoteRequests.push(request.url()); });
    await page.goto(base);
    assert.equal(await page.locator('h1').count(), 1, 'Página deve ter um título principal');
    await page.waitForFunction(() => document.querySelector('model-viewer')?.loaded);
    await page.keyboard.press('Tab');
    assert(await page.locator('.skip-link').evaluate(link => link === document.activeElement), 'Primeiro foco oferece pular para o conteúdo');
    await page.locator('.skip-link').evaluate(link => link.blur());
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => !document.querySelector('model-viewer').hasAttribute('auto-rotate'));
    assert.equal(await page.locator('model-viewer').getAttribute('auto-rotate'), null, 'Mudança de preferência interrompe a rotação');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForFunction(() => document.querySelector('model-viewer').hasAttribute('auto-rotate'));
    await page.evaluate(async () => {
      for (const img of document.querySelectorAll('img[loading="lazy"]')) { img.loading = 'eager'; await img.decode(); }
    });
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Sem overflow em ${width}px`);
      const tops = await page.locator('.treatment-card').evaluateAll(cards => cards.map(card => card.getBoundingClientRect().top));
      const columns = width >= 1024 ? 3 : width >= 768 ? 2 : 1;
      assert.equal(tops.filter(top => Math.abs(top - tops[0]) < 1).length, columns, `Grid tem ${columns} colunas em ${width}px`);
      await page.locator('.about__brand-panel').scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(150);
      await page.screenshot({ path: `artifacts/validation/layout-${width}.png`, fullPage: true });
      await page.screenshot({ path: `artifacts/validation/hero-${width}.png` });
    }
    const whatsapp = await page.locator('a[href*="wa.me"]').evaluateAll(links => links.map(link => link.href));
    assert(whatsapp.length >= 5, 'CTAs de agendamento disponíveis');
    for (const href of whatsapp) {
      const url = new URL(href);
      assert.equal(url.pathname, '/5575981220711');
      assert.equal(url.searchParams.get('text'), 'Olá! Vim pelo site e quero agendar uma avaliação.');
    }
    await page.locator('details summary').first().click();
    assert(await page.locator('details').first().evaluate(e => e.open), 'FAQ abre pelo elemento nativo');
    assert(!(await page.locator('body').innerText()).includes('[PREENCHER]'), 'Sem placeholders visíveis');
    assert(await page.locator('.hero-3d').evaluate(frame => frame.inert), '3D decorativo não recebe foco interno');
    assert.deepEqual(pageErrors, [], 'Sem erros de JavaScript');
    assert.deepEqual(remoteRequests, [], 'Sem pedidos a serviços externos');
    await page.close();
    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const mobileRequests = [];
    mobile.on('request', request => mobileRequests.push(request.url()));
    await mobile.goto(base);
    await mobile.waitForTimeout(1500);
    assert(!mobileRequests.some(url => url.includes('vendor/model-viewer')), 'Mobile prioriza poster antes da interação');
    await mobile.touchscreen.tap(180, 500);
    await mobile.waitForFunction(() => document.querySelector('model-viewer')?.loaded);
    assert(await mobile.locator('.hero-3d').evaluate(frame => frame.classList.contains('is-loaded')), 'Primeira interação carrega 3D');
    await mobile.close();
    for (const scenario of ['no-js', 'no-webgl', 'model-error', 'module-error', 'reduced-motion']) {
      const context = await browser.newContext({ javaScriptEnabled: scenario !== 'no-js', reducedMotion: scenario === 'reduced-motion' ? 'reduce' : 'no-preference' });
      const p = await context.newPage();
      if (scenario === 'no-webgl') await p.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function(type, ...args) { return /webgl/.test(type) ? null : original.call(this, type, ...args); };
      });
      if (scenario === 'model-error') await p.route('**/dente.glb', route => route.abort());
      if (scenario === 'module-error') await p.route('**/vendor/model-viewer.min.js', route => route.abort());
      await p.goto(base);
      const poster = p.locator('.hero-3d__poster');
      await poster.waitFor({ state: 'visible' });
      assert(await poster.evaluate(img => img.complete && img.naturalWidth > 0), `${scenario}: poster carregado`);
      if (scenario === 'reduced-motion') {
        assert.equal(await p.locator('model-viewer').getAttribute('auto-rotate'), null, 'Movimento reduzido sem rotação');
        assert.equal(await p.locator('model-viewer').getAttribute('src'), null, 'Movimento reduzido conserva o poster');
      } else {
        await p.waitForTimeout(2500);
        assert(await poster.isVisible(), `${scenario}: fallback permanece visível`);
      }
      await context.close();
    }
    console.log('PASS: layouts, WhatsApp, FAQ, placeholders e cinco estados de fallback/movimento.');
  } finally { await browser.close(); }
}
run().catch(error => { console.error(error); process.exitCode = 1; });
