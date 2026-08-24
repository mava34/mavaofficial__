const CONTACT_COPY_ANNOUNCE = {
  en: 'Copied to clipboard',
  fi: 'Kopioitu leikepöydälle',
};

document.addEventListener('partials:loaded', () => {
  const buttons = document.querySelectorAll('[data-copy-value]');
  if (!buttons.length) return;

  const status = document.querySelector('[data-copy-status]');
  let resetTimer;

  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute('data-copy-value');

      try {
        await navigator.clipboard.writeText(value);
      } catch (err) {
        return;
      }

      clearTimeout(resetTimer);
      buttons.forEach((el) => el.classList.remove('is-copied'));
      button.classList.add('is-copied');

      if (status) {
        const lang = document.documentElement.lang;
        status.textContent = CONTACT_COPY_ANNOUNCE[lang] || CONTACT_COPY_ANNOUNCE.en;
      }

      resetTimer = setTimeout(() => {
        button.classList.remove('is-copied');
        if (status) status.textContent = '';
      }, 1800);
    });
  });
});
