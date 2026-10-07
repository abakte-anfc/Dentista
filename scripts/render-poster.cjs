const { chromium } = require('playwright');
const sharp = require('sharp');
const fs = require('node:fs');
async function render() {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 600, height: 600 } });
    page.on('pageerror', error => console.error(error.message));
    await page.goto('http://127.0.0.1:4173/artifacts/render-model.html');
    await page.waitForFunction(() => document.querySelector('model-viewer').dataset.materialReady === 'true', { timeout: 60000 });
    await page.waitForTimeout(1200);
    const data = await page.locator('model-viewer').evaluate(e => e.toDataURL('image/png'));
    const png = Buffer.from(data.split(',')[1], 'base64');
    fs.writeFileSync('artifacts/validation/model-render.png', png);
    await sharp(png).resize(600, 600).webp({ quality: 88 }).toFile('assets/img/dente-poster.webp');
    console.log('Poster gerado:', fs.statSync('assets/img/dente-poster.webp').size, 'bytes');
  } finally { await browser.close(); }
}
render().catch(error => { console.error(error); process.exitCode = 1; });
