document.addEventListener('partials:loaded', () => {
  const nav = document.getElementById('site-nav');
  const burger = document.getElementById('nav-burger');
  const links = document.querySelector('.site-nav__links');

  if (!nav) return;

  const closeMenu = () => {
    if (!nav.classList.contains('is-open')) return;
    nav.classList.remove('is-open');
    burger?.setAttribute('aria-expanded', 'false');
    burger?.setAttribute('aria-label', 'Open menu');
  };

  burger?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  links?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      burger?.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (nav.classList.contains('is-open') && !nav.contains(event.target)) {
      closeMenu();
    }
  });

  const setScrolled = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });
});
