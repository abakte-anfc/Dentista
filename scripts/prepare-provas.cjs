const sharp = require('sharp');
const fs = require('node:fs');
(async () => {
  fs.mkdirSync('assets/img/provas', { recursive: true });
  for (let n = 1; n <= 5; n++) {
    for (const width of [480, 960]) {
      await sharp(`provas/prova${n}.jpg`).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`assets/img/provas/prova${n}-${width}.webp`);
    }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
