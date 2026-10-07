const assert = require('node:assert/strict');
(async () => {
  const {advanceProgress} = await import('../assets/js/scroll-motion.mjs');
  const simulate = fps => {
    let p = 0;
    for (let i = 0; i < fps; i++) p = advanceProgress(p, .1, 1/fps, 6, 1.5, 360);
    return p;
  };
  assert(Math.abs(simulate(30)-simulate(60)) < 1e-9, 'Mesma suavização em 30 e 60 fps');
  assert(Math.abs(simulate(60)-simulate(120)) < 1e-9, 'Mesma suavização em 60 e 120 fps');
  for (const dt of [1/120, 1/60, 1/30]) {
    const next = advanceProgress(0, 1, dt, 6, 1.5, 360);
    assert(next*540/dt <= 360+1e-6, 'Limite angular respeitado');
    assert(advanceProgress(.5, 0, dt, 6, 1.5, 360) < .5, 'Sentido inverso');
  }
  assert.equal(advanceProgress(.5,.5,1/60,6,1.5,360),.5,'Sem deslocamento quando parado');
  console.log('PASS: suavização por tempo, limite angular e direção.');
})().catch(e=>{console.error(e);process.exitCode=1});
