const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  try {
    for (const width of [360, 768, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://127.0.0.1:4173');
      assert.equal(await page.locator('#resultados').count(), 1, 'Seção de fotos deve existir');
      await page.locator('#resultados').scrollIntoViewIfNeeded();
      await page.waitForSelector('.carousel-container');
      assert.equal(await page.locator('.carousel-indicator').count(), 5);
      await page.getByRole('button', { name: 'Próxima foto', exact: true }).click();
      await page.waitForTimeout(800);
      assert.equal(await page.locator('.carousel-indicator[aria-current="true"]').getAttribute('aria-label'), 'Ir para foto 2');
      await page.getByRole('button', { name: 'Ir para foto 5', exact: true }).click();
      await page.waitForTimeout(800);
      await page.getByRole('button', { name: 'Próxima foto', exact: true }).click();
      await page.waitForTimeout(1100);
      assert.equal(await page.locator('.carousel-indicator[aria-current="true"]').getAttribute('aria-label'), 'Ir para foto 1');
      const viewport = await page.locator('.carousel-viewport').boundingBox();
      const startX = viewport.x + viewport.width * .8;
      const y = viewport.y + Math.min(viewport.height / 2, 150);
      await page.mouse.move(startX, y);
      await page.mouse.down();
      await page.mouse.move(startX - 110, y, { steps: 12 });
      await page.mouse.up();
      await page.waitForTimeout(1000);
      assert.equal(await page.locator('.carousel-indicator[aria-current="true"]').getAttribute('aria-label'), 'Ir para foto 2', 'Arrasto deve avançar a foto');
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      assert.deepEqual(errors, []);
      await page.screenshot({ path: `artifacts/validation/carousel-${width}.png` });
      await page.close();
    }
    const fallback = await browser.newPage({ javaScriptEnabled: false });
    await fallback.goto('http://127.0.0.1:4173');
    assert.equal(await fallback.locator('#results-carousel img').count(), 5);
    await fallback.close();
    const reduced = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 360, height: 800 } });
    await reduced.goto('http://127.0.0.1:4173');
    await reduced.locator('#resultados').scrollIntoViewIfNeeded();
    await reduced.waitForSelector('.carousel-container');
    await reduced.getByRole('button', { name: 'Próxima foto', exact: true }).click();
    await reduced.waitForTimeout(300);
    assert.equal(await reduced.locator('.carousel-indicator[aria-current="true"]').getAttribute('aria-label'), 'Ir para foto 2');
    await reduced.close();
    console.log('Carrossel: 360/768/1280 px, navegação, loop e fallback sem JS: OK');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
