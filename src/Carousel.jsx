import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'motion/react';
import './Carousel.css';

// Adaptado do Carousel JavaScript + CSS fornecido pelo cliente (React Bits).
const GAP = 16;
const SPRING = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, width, offset, x, active, round, reduced }) {
  const rotateY = useTransform(x, [-(index + 1) * offset, -index * offset, -(index - 1) * offset], reduced ? [0, 0, 0] : [90, 0, -90]);
  return <motion.figure className={`carousel-item${round ? ' round' : ''}`} style={{ width, rotateY }} aria-hidden={!active}>
    <img src={item.src} srcSet={item.srcSet} sizes="(min-width:768px) 480px, 90vw" width={item.width} height={item.height} alt={item.description} loading="lazy" decoding="async" draggable="false" />
  </motion.figure>;
}

export default function Carousel({ items = [], baseWidth = 330, autoplay = false, autoplayDelay = 3000, pauseOnHover = true, loop = true, round = false }) {
  const reduced = useReducedMotion();
  const rendered = useMemo(() => loop && items.length > 1 ? [items.at(-1), ...items, items[0]] : items, [items, loop]);
  const looping = loop && items.length > 1;
  const [position, setPosition] = useState(looping ? 1 : 0);
  const [width, setWidth] = useState(baseWidth);
  const [paused, setPaused] = useState(false);
  const [jumping, setJumping] = useState(false);
  const [animating, setAnimating] = useState(false);
  const ref = useRef(null);
  const x = useMotionValue(0);
  const itemWidth = Math.max(1, width - 32);
  const offset = itemWidth + GAP;
  const activeIndex = looping ? (position - 1 + items.length) % items.length : position;

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width + 32));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => { x.set(-position * offset); }, [offset]);
  useEffect(() => {
    if (!autoplay || paused || reduced || items.length < 2 || document.hidden) return;
    const timer = setInterval(() => setPosition(p => Math.min(p + 1, rendered.length - 1)), autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, paused, reduced, rendered.length, items.length]);
  const go = next => {
    if (animating) return;
    const target = Math.max(0, Math.min(next, rendered.length - 1));
    if (target === position) x.set(-position * offset);
    else setPosition(target);
  };
  const complete = () => {
    const target = looping && position === 0 ? items.length : looping && position === rendered.length - 1 ? 1 : null;
    if (target !== null) {
      setJumping(true); setPosition(target); x.set(-target * offset);
      requestAnimationFrame(() => { setJumping(false); setAnimating(false); });
    } else setAnimating(false);
  };
  if (!items.length) return null;
  return <div ref={ref} className={`carousel-container${round ? ' round' : ''}`} role="region" aria-roledescription="carrossel" aria-label="Fotos de cuidados realizados"
    onMouseEnter={() => pauseOnHover && setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
    onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); go(position + (event.key === 'ArrowRight' ? 1 : -1)); } }}>
    <div className="carousel-viewport">
      <motion.div className="carousel-track" drag={animating ? false : 'x'} dragMomentum={false} style={{ width: itemWidth, gap: GAP, x, perspective: 1000, perspectiveOrigin: `${position * offset + itemWidth / 2}px 50%` }}
        dragConstraints={looping ? undefined : { left: -offset * (items.length - 1), right: 0 }}
        animate={{ x: -position * offset }} transition={jumping || reduced ? { duration: 0 } : SPRING}
        onAnimationStart={() => setAnimating(true)} onAnimationComplete={complete}
        onDragEnd={(_, info) => {
          const direction = info.offset.x < -30 || info.velocity.x < -500 ? 1 : info.offset.x > 30 || info.velocity.x > 500 ? -1 : 0;
          if (direction) go(position + direction);
          else { setJumping(true); x.set(-position * offset); requestAnimationFrame(() => setJumping(false)); }
        }}>
        {rendered.map((item, index) => <CarouselItem key={`${item.id}-${index}`} item={item} index={index} width={itemWidth} offset={offset} x={x} round={round} reduced={reduced} active={index === position} />)}
      </motion.div>
    </div>
    <div className="carousel-controls">
      <button type="button" className="carousel-arrow" aria-label="Foto anterior" disabled={!looping && position === 0} onClick={() => go(position - 1)}>←</button>
      <div className="carousel-indicators">{items.map((item, index) => <button type="button" key={item.id} className={`carousel-indicator ${activeIndex === index ? 'active' : 'inactive'}`} aria-label={`Ir para foto ${index + 1}`} aria-current={activeIndex === index} onClick={() => go(looping ? index + 1 : index)}><span /></button>)}</div>
      <button type="button" className="carousel-arrow" aria-label="Próxima foto" disabled={!looping && position === items.length - 1} onClick={() => go(position + 1)}>→</button>
    </div>
    <p className="carousel-status" aria-live="polite" aria-atomic="true">Foto {activeIndex + 1} de {items.length}</p>
  </div>;
}
