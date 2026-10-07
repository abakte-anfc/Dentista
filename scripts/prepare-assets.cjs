const fs = require('node:fs');
const sharp = require('sharp');
async function prepare() {
  for (const dir of ['assets/img', 'assets/fonts', 'assets/js/vendor']) fs.mkdirSync(dir, { recursive: true });
  const cropped = await sharp('logo.jpeg').extract({ left: 224, top: 399, width: 1485, height: 1040 }).toBuffer();
  await sharp(cropped).resize({ width: 240 }).webp({ quality: 88 }).toFile('assets/img/logo.webp');
  await sharp(cropped).resize({ width: 480 }).webp({ quality: 88 }).toFile('assets/img/logo@2x.webp');
  await sharp(cropped).resize(180, 180, { fit: 'contain', background: '#FFFAF8' }).png().toFile('assets/img/apple-touch-icon.png');
  await sharp(cropped).resize(48, 48, { fit: 'contain', background: '#FFFAF8' }).png().toFile('assets/img/favicon.png');
  fs.copyFileSync('node_modules/@google/model-viewer/dist/model-viewer.min.js', 'assets/js/vendor/model-viewer.min.js');
  fs.copyFileSync('node_modules/@google/model-viewer/LICENSE', 'assets/js/vendor/MODEL-VIEWER-LICENSE.txt');
  fs.copyFileSync('node_modules/meshoptimizer/meshopt_decoder.cjs', 'assets/js/vendor/meshopt_decoder.js');
  fs.copyFileSync('node_modules/meshoptimizer/LICENSE.md', 'assets/js/vendor/MESHOPT-LICENSE.txt');
  for (const [family, weights] of [['poppins', [400, 500, 600]], ['playfair-display', [600]]]) {
    for (const weight of weights) fs.copyFileSync(`node_modules/@fontsource/${family}/files/${family}-latin-${weight}-normal.woff2`, `assets/fonts/${family}-${weight}.woff2`);
    fs.copyFileSync(`node_modules/@fontsource/${family}/LICENSE`, `assets/fonts/${family}-LICENSE.txt`);
  }
  if (!fs.existsSync('assets/img/dente-poster.webp')) { console.log('Ativos base preparados. Gere o poster e execute novamente para criar a imagem de compartilhamento.'); return; }
  const backdrop = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#FFFAF8"/><circle cx="930" cy="295" r="235" fill="#F4DEDB"/><text x="72" y="340" font-family="Georgia,serif" font-size="54" fill="#3B2A29">Seu sorriso merece</text><text x="72" y="410" font-family="Georgia,serif" font-size="54" fill="#9A524E">cuidado, atenção e respeito.</text><text x="72" y="516" font-family="sans-serif" font-size="24" fill="#7A6361">Beliza Odontologia · Dra. Marcella Beliza</text></svg>`);
  const logo = await sharp(cropped).resize({ width: 190 }).png().toBuffer();
  const tooth = await sharp('assets/img/dente-poster.webp').resize(440, 440).png().toBuffer();
  await sharp(backdrop).composite([{ input: tooth, left: 710, top: 62 }, { input: logo, left: 72, top: 56 }]).webp({ quality: 90 }).toFile('assets/img/compartilhamento.webp');
}
prepare().catch(error => { console.error(error); process.exitCode = 1; });
