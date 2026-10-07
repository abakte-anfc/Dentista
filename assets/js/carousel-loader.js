const host = document.querySelector('#results-carousel');
if (host) {
  const observer = new IntersectionObserver(async entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    try {
      const { mountCarousel } = await import('./vendor/carousel.js');
      mountCarousel(host);
    } catch {
      // A galeria em HTML continua disponível se o módulo não carregar.
    }
  }, { rootMargin: '400px' });
  observer.observe(host);
}
