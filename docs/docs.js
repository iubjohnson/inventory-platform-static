// Stockwik docs — client-side search + mobile sidebar toggle.
(function () {
  var idx = window.DOCS_SEARCH || [];
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  document.querySelectorAll('[data-docs-search]').forEach(function (box) {
    var input = box.querySelector('input');
    var out = box.querySelector('[data-results]');
    if (!input || !out) return;

    function render(q) {
      q = q.trim().toLowerCase();
      if (!q) { out.innerHTML = ''; out.classList.remove('show'); return; }
      var terms = q.split(/\s+/);
      var hits = idx.map(function (p) {
        var hay = (p.t + ' ' + p.s + ' ' + p.d + ' ' + (p.k || '')).toLowerCase();
        var titleHas = p.t.toLowerCase().indexOf(q) >= 0;
        var all = terms.every(function (t) { return hay.indexOf(t) >= 0; });
        return { p: p, ok: all, score: (titleHas ? 2 : 0) + (all ? 1 : 0) };
      }).filter(function (x) { return x.ok; })
        .sort(function (a, b) { return b.score - a.score; })
        .slice(0, 8);

      if (!hits.length) {
        out.innerHTML = '<div class="docs-noresult">No matches</div>';
        out.classList.add('show'); return;
      }
      out.innerHTML = hits.map(function (h) {
        return '<a href="' + h.p.u + '"><span class="r-t">' + esc(h.p.t) +
          '</span><span class="r-s">' + esc(h.p.s) + '</span></a>';
      }).join('');
      out.classList.add('show');
    }

    input.addEventListener('input', function () { render(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { var f = out.querySelector('a'); if (f) location.href = f.getAttribute('href'); }
      if (e.key === 'Escape') { out.classList.remove('show'); input.blur(); }
    });
    document.addEventListener('click', function (e) {
      if (!box.contains(e.target)) out.classList.remove('show');
    });
  });

  var toggle = document.querySelector('[data-sidebar-toggle]');
  var sidebar = document.querySelector('.docs-sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', function () { sidebar.classList.toggle('open'); });
  }
})();
