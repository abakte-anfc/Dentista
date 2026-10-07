import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateScrollText, animateScrollVisual } from './ScrollReveal';

export function mountScrollReveal(host) {
  if (host.dataset.scrollEnhanced) return;
  host.dataset.scrollEnhanced = 'true';
  // Preservar o DOM original, inclusive links, ícones, negritos e FAQ nativo.
  const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT, { acceptNode(node) {
    return !node.textContent.trim() || node.parentElement.closest('svg,.scroll-reveal-word,button,a') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
  } });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const fragment = document.createDocumentFragment();
    for (const word of node.textContent.split(/(\s+)/)) {
      if (!word || /^\s+$/.test(word)) fragment.append(document.createTextNode(word));
      else { const span = document.createElement('span'); span.className = 'scroll-reveal-word'; span.textContent = word; fragment.append(span); }
    }
    node.replaceWith(fragment);
  }
  host.classList.add('scroll-text');
  animateScrollText(host, { blurStrength: /^H[1-3]$/.test(host.tagName) ? 5 : 2 });
}
export function mountVisualReveal(host) { animateScrollVisual(host); }
export function refreshMotion() { ScrollTrigger.refresh(); }
