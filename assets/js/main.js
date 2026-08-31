/* Portfolio behaviour: theme toggle, mobile nav, active-section highlight.
   No dependencies, no network calls, no cookies. Theme preference is the only
   thing persisted, in localStorage, which is not personal data. */
(function () {
  'use strict';

  /* ---------- theme: auto → light → dark ---------- */
  var root = document.documentElement;
  var KEY = 'pa-theme';
  var stored = null;

  try { stored = localStorage.getItem(KEY); } catch (e) { /* private mode */ }
  if (stored === 'light' || stored === 'dark') root.setAttribute('data-theme', stored);

  var toggle = document.getElementById('themetoggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var current = root.getAttribute('data-theme');
      var effective = (current === 'light' || current === 'dark')
        ? current
        : (prefersDark ? 'dark' : 'light');
      var next = effective === 'dark' ? 'light' : 'dark';

      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- mobile navigation ---------- */
  var navBtn = document.querySelector('.navtoggle');
  var navList = document.getElementById('navlinks');

  if (navBtn && navList) {
    var setNav = function (open) {
      navList.classList.toggle('is-open', open);
      navBtn.setAttribute('aria-expanded', String(open));
    };

    navBtn.addEventListener('click', function () {
      setNav(navBtn.getAttribute('aria-expanded') !== 'true');
    });

    navList.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setNav(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });
  }

  /* ---------- highlight the section currently in view ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.navlinks a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var mark = function (id) {
      links.forEach(function (a) {
        var on = a.getAttribute('href') === '#' + id;
        a.style.color = on ? 'var(--ink)' : '';
        a.style.background = on ? 'var(--wash)' : '';
        if (on) { a.setAttribute('aria-current', 'true'); } else { a.removeAttribute('aria-current'); }
      });
    };

    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) mark(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { seen.observe(s); });
  }
})();
