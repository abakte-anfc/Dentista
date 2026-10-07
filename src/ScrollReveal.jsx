import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

export function animateScrollText(el, { blurStrength = 3 } = {}) {
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const words = el.querySelectorAll('.scroll-reveal-word');
    // No fim da página não há rolagem extra para completar uma saída.
    if (el.closest('footer')) {
      gsap.fromTo(words, { opacity: 0, y: 18, filter: `blur(${blurStrength}px)` }, { opacity: 1, y: 0, filter: 'blur(0px)', stagger: { amount: .1 }, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'clamp(bottom bottom-=10%)', scrub: true } });
      return;
    }
    const timeline = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top bottom-=5%', end: 'bottom top+=72', scrub: true, invalidateOnRefresh: true } });
    timeline.fromTo(words, { opacity: 0, y: 18, filter: `blur(${blurStrength}px)` }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .25, stagger: { amount: .1 }, ease: 'none' }, 0);
    timeline.to(words, { opacity: 0, y: -16, duration: .12, stagger: { amount: .06 }, ease: 'none' }, .82);
  }, el);
  return () => media.revert();
}

export function animateScrollVisual(el) {
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const timeline = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top+=72', scrub: true } });
    timeline.fromTo(el, { opacity: 0, y: 24, scale: .97 }, { opacity: 1, y: 0, scale: 1, duration: .3, ease: 'none' }, 0);
    timeline.to(el, { opacity: 0, y: -18, duration: .15, ease: 'none' }, .85);
  }, el);
  el.addEventListener('focusin', () => el.classList.add('motion-focused'));
  el.addEventListener('focusout', () => el.classList.remove('motion-focused'));
  return () => media.revert();
}

// Adaptado do ScrollReveal enviado pelo cliente, mantendo o h2 original do HTML.
function splitWords(children) {
  return React.Children.map(children, child => {
    if (typeof child === 'string') return child.split(/(\s+)/).map((word, index) => /^\s+$/.test(word) ? word : <span className="scroll-reveal-word" key={index}>{word}</span>);
    if (React.isValidElement(child) && child.props.children) return React.cloneElement(child, {}, splitWords(child.props.children));
    return child;
  });
}

export default function ScrollReveal({ children, scrollContainerRef, enableBlur = true, baseOpacity = 0, baseRotation = 0, blurStrength = 5, containerClassName = '', textClassName = '', rotationEnd = 'top 55%', wordAnimationEnd = 'top 55%' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const scroller = scrollContainerRef?.current || window;
      const words = el.querySelectorAll('.scroll-reveal-word');
      if (baseRotation) gsap.fromTo(el, { transformOrigin: '0% 50%', rotate: baseRotation }, { rotate: 0, ease: 'none', scrollTrigger: { trigger: el, scroller, start: 'top bottom', end: rotationEnd, scrub: true } });
      gsap.fromTo(words, { opacity: baseOpacity, ...(enableBlur ? { filter: `blur(${blurStrength}px)` } : {}) }, {
        opacity: 1, ...(enableBlur ? { filter: 'blur(0px)' } : {}), stagger: .05, ease: 'none',
        scrollTrigger: { trigger: el, scroller, start: 'top bottom-=15%', end: wordAnimationEnd, scrub: true }
      });
    }, el);
    // Limpeza restrita a este componente: não remove os outros efeitos da página.
    return () => media.revert();
  }, [scrollContainerRef, enableBlur, baseOpacity, baseRotation, blurStrength, rotationEnd, wordAnimationEnd]);
  return <span ref={ref} className={`scroll-reveal ${containerClassName}`} aria-hidden="true"><span className={`scroll-reveal-text ${textClassName}`}>{splitWords(children)}</span></span>;
}
