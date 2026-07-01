// Stockwik — mobile header menu.
// Powers the hamburger (.menu-btn) on every page. Builds the mobile menu by
// cloning the existing desktop nav links + CTAs, so no per-page markup changes
// are needed. Shared by the marketing pages and the generated docs pages.
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var btn = header.querySelector('.menu-btn');
  if (!btn) return;

  var navLinks = header.querySelector('.nav-links');
  var navCta = header.querySelector('.nav-cta');

  // Build the panel from the existing links so it always mirrors the desktop nav.
  var menu = document.createElement('nav');
  menu.className = 'mobile-menu';
  menu.id = 'mobile-menu';
  menu.setAttribute('aria-label', 'Menu');

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (a) {
      var link = a.cloneNode(true);
      link.className = 'mm-link';
      menu.appendChild(link);
    });
  }
  if (navCta) {
    navCta.querySelectorAll('a').forEach(function (a) {
      var link = a.cloneNode(true);
      // Keep the Install button styled as a button; Log in becomes a plain row.
      link.className = link.classList.contains('btn') ? 'btn btn-primary mm-cta' : 'mm-link mm-login';
      menu.appendChild(link);
    });
  }
  header.appendChild(menu);

  var OPEN = 'nav-open';
  function setOpen(open) {
    header.classList.toggle(OPEN, open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.innerHTML = open ? '✕' : '☰'; // ✕ / ☰
    document.body.style.overflow = open ? 'hidden' : '';
  }

  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'mobile-menu');

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!header.classList.contains(OPEN));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains(OPEN)) setOpen(false);
  });
  document.addEventListener('click', function (e) {
    if (header.classList.contains(OPEN) && !header.contains(e.target)) setOpen(false);
  });
})();
