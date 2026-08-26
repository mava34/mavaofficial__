function initHeroCarousel() {
  const track = document.getElementById('hero-track');
  const indexEl = document.getElementById('hero-index');
  if (!track) return;

  const slides = Array.from(track.children);
  const total = slides.length;
  if (total < 2) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let timer = null;

  function setIndex(i) {
    if (indexEl) {
      indexEl.textContent = `${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    }
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === i);
    });
  }

  function goTo(i) {
    current = (i + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    setIndex(current);
  }

  function next() {
    goTo(current + 1);
  }

  function start() {
    if (prefersReducedMotion || timer) return;
    timer = setInterval(next, 5000);
  }

  function stop() {
    clearTimeout(timer);
    clearInterval(timer);
    timer = null;
  }

  goTo(0);
  start();

  track.querySelectorAll('.hero__view-work').forEach((button) => {
    button.addEventListener('mouseenter', stop);
    button.addEventListener('mouseleave', start);
    button.addEventListener('focus', stop);
    button.addEventListener('blur', start);
  });
}

document.addEventListener('partials:loaded', initHeroCarousel);
