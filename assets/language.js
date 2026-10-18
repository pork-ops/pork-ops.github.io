(function () {
  const supported = ['en', 'es'];
  const saved = localStorage.getItem('pork-ops-language');
  const initial = supported.includes(saved) ? saved : (document.documentElement.lang || 'en');

  function setLanguage(language) {
    if (!supported.includes(language)) return;
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
    document.querySelectorAll('[data-lang]').forEach((element) => {
      element.hidden = element.dataset.lang !== language;
    });
    document.querySelectorAll('[data-post-language]').forEach((post) => {
      post.hidden = post.dataset.postLanguage !== language;
    });
    document.querySelectorAll('[data-set-language]').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.setLanguage === language);
      button.setAttribute('aria-pressed', button.dataset.setLanguage === language);
    });
    localStorage.setItem('pork-ops-language', language);
  }

  document.querySelectorAll('[data-set-language]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.setLanguage));
  });
  document.querySelectorAll('[data-switch-language]').forEach((link) => {
    link.addEventListener('click', () => localStorage.setItem('pork-ops-language', link.dataset.switchLanguage));
  });
  setLanguage(initial);
})();
