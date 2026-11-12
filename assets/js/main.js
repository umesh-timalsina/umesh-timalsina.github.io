// Site behaviour: lazy-loaded responsive images, theme toggle, mobile nav.
import 'lazysizes';

const root = document.documentElement;

// Theme toggle — cycles light/dark and remembers the choice.
const themeBtn = document.querySelector('.theme-toggle');
if (themeBtn) {
  const current = () =>
    root.dataset.theme ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  themeBtn.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* storage unavailable */
    }
  });
}

// Mobile navigation.
const navBtn = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (navBtn && nav) {
  const setOpen = (open) => {
    navBtn.setAttribute('aria-expanded', String(open));
    navBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-open', open);
  };
  navBtn.addEventListener('click', () => setOpen(navBtn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });
}
