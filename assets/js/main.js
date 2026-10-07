/* O dente decorativo é carregado depois do conteúdo e mantém um fallback estático. */
(() => {
  const frame = document.querySelector('.hero-3d');
  const viewer = frame?.querySelector('model-viewer');
  if (!viewer) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let nearViewport = false;
  let readyFor3D = window.matchMedia('(min-width: 768px)').matches;
  let observer;
  let started = false;
  const updateMotion = () => viewer.toggleAttribute('auto-rotate', !reducedMotion.matches);
  updateMotion();
  const load = async () => {
    if (started || !nearViewport || !readyFor3D || reducedMotion.matches) return;
    started = true;
    observer?.disconnect();
    try {
      const canvas = document.createElement('canvas');
      const options = { failIfMajorPerformanceCaveat: true };
      const gl = canvas.getContext('webgl2', options) || canvas.getContext('webgl', options);
      if (!gl) return;
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      const { ModelViewerElement } = await import('./vendor/model-viewer.min.js');
      ModelViewerElement.meshoptDecoderLocation = new URL('assets/js/vendor/meshopt_decoder.js', document.baseURI).href;
      viewer.addEventListener('load', () => frame.classList.add('is-loaded'), { once: true });
      viewer.addEventListener('error', () => frame.classList.remove('is-loaded'));
      viewer.setAttribute('src', viewer.dataset.src);
    } catch {
      frame.classList.remove('is-loaded');
    }
  };
  reducedMotion.addEventListener('change', () => { updateMotion(); load(); });
  /* No celular, a primeira interação libera o 3D sem bloquear o agendamento. */
  const interactionEvents = ['pointerdown', 'touchstart', 'keydown', 'wheel', 'scroll'];
  const onInteraction = () => {
    readyFor3D = true;
    interactionEvents.forEach(event => window.removeEventListener(event, onInteraction));
    load();
  };
  if (!readyFor3D) interactionEvents.forEach(event => window.addEventListener(event, onInteraction, { passive: true }));
  const observe = () => {
    if (!('IntersectionObserver' in window)) { nearViewport = true; load(); return; }
    observer = new IntersectionObserver(entries => {
      nearViewport = entries.some(entry => entry.isIntersecting);
      load();
    }, { rootMargin: '200px' });
    observer.observe(frame);
  };
  if (document.readyState === 'complete') observe();
  else window.addEventListener('load', observe, { once: true });
})();
