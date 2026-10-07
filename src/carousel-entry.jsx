import React from 'react';
import { createRoot } from 'react-dom/client';
import Carousel from './Carousel';

export function mountCarousel(host) {
  const items = Array.from(host.querySelectorAll('img'), (img, index) => ({ id: index + 1, title: `Foto ${index + 1}`, description: img.alt, src: img.getAttribute('src'), srcSet: img.getAttribute('srcset'), width: img.width, height: img.height }));
  createRoot(host).render(<Carousel items={items} baseWidth={520} autoplay={false} pauseOnHover loop />);
  host.classList.add('is-enhanced');
}
