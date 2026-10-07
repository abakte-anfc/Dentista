// Animação por blocos: preserva o HTML, as fontes e a leitura original.
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const selector = '.section__heading > div,.section__heading > p,.section__heading--center,.treatment-card,.benefits__copy > .eyebrow,.benefits__copy > h2,.benefits__intro,.benefits__list > li,.benefits__copy > .section__footnote,.reasons__grid > div:first-child,.reason,.steps__grid > li,.about__copy > *,.faq__grid > div:first-child,.faq details,.results__copy > *,.location__copy > *,.location__card,.map-section__heading,.map-section__address,.footer__grid > div,.footer__bottom';
const candidates = [...document.querySelectorAll(selector)];
const blocks = candidates.filter(el => !candidates.some(parent => parent !== el && parent.contains(el)));
let observer;
let started = false;
function clear() {
  observer?.disconnect();
  blocks.forEach(el => el.classList.remove('motion-block', 'motion-visible', 'motion-before', 'motion-after'));
}
function start() {
  started = true;
  clear();
  if (preference.matches) return;
  observer = new IntersectionObserver(entries => {
    for (const { target, isIntersecting, boundingClientRect } of entries) {
      target.classList.toggle('motion-visible', isIntersecting);
      target.classList.toggle('motion-before', !isIntersecting && boundingClientRect.top >= innerHeight);
      target.classList.toggle('motion-after', !isIntersecting && boundingClientRect.bottom <= 72);
    }
  }, { rootMargin: '-72px 0px 0px 0px', threshold: 0 });
  blocks.forEach(el => { el.classList.add('motion-block'); observer.observe(el); });
}
addEventListener('scroll', start, { passive: true, once: true });
if (location.hash && location.hash !== '#inicio') addEventListener('load', start, { once: true });
preference.addEventListener('change', () => { if (started) start(); });