// FAQ nativo com entrada/saída interrompível, sem alterar a tipografia.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const states = new Map();
const readToken = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

document.querySelectorAll('.faq details').forEach(details => {
  const summary = details.querySelector('summary');
  const panel = details.querySelector('p');
  const state = { animation: null, expanded: details.open };
  states.set(details, state);
  summary.addEventListener('click', event => {
    if (event.detail === 0 || reduced.matches) {
      state.animation?.cancel();
      state.animation = null;
      // O teclado mantém o comportamento imediato do details nativo.
      state.expanded = !details.open;
      return;
    }
    event.preventDefault();
    const expanded = state.animation ? !state.expanded : !details.open;
    const wasOpen = details.open;
    const style = getComputedStyle(panel);
    const from = wasOpen ? { opacity: style.opacity, transform: style.transform } : { opacity: 0, transform: `scale(${readToken('--faq-motion-scale')})` };
    state.animation?.cancel();
    state.expanded = expanded;
    details.open = true;
    const animation = panel.animate([from, expanded ? { opacity: 1, transform: 'scale(1)' } : { opacity: 0, transform: `scale(${readToken('--faq-motion-scale')})` }], {
      duration: parseFloat(readToken(expanded ? '--faq-motion-enter' : '--faq-motion-exit')),
      easing: readToken('--faq-motion-ease'), fill: 'both'
    });
    state.animation = animation;
    animation.finished.then(() => {
      if (state.animation !== animation) return;
      details.open = state.expanded;
      animation.cancel();
      state.animation = null;
    }).catch(() => {});
  });
});

reduced.addEventListener('change', () => {
  if (!reduced.matches) return;
  for (const [details, state] of states) {
    if (!state.animation) continue;
    details.open = state.expanded;
    state.animation.cancel();
    state.animation = null;
  }
});
