// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Theme toggle ----------
const toggle = document.querySelector('.theme-toggle');

function currentTheme() {
  const set = document.documentElement.dataset.theme;
  if (set) return set;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

toggle.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
});

// ---------- Lightbox for zoomable figures ----------
document.querySelectorAll('.figure.zoom img, .figure.wide img, .screens img, .stage img').forEach((img) => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    const full = document.createElement('img');
    full.src = img.src;
    full.alt = img.alt;
    overlay.appendChild(full);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    function close() {
      overlay.remove();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) {
      if (e.key === 'Escape') close();
    }
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
  });
});

// ---------- Lazy, in-view looping videos ----------
// Clips marked with data-src load only when they scroll near the viewport and
// pause when they leave it, so a page with several recordings stays light.
(function () {
  var vids = document.querySelectorAll('video[data-src]');
  if (!vids.length) return;
  function load(v) { if (!v.getAttribute('src')) { v.src = v.getAttribute('data-src'); v.load(); } }
  function play(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  if (!('IntersectionObserver' in window)) {
    vids.forEach(function (v) { load(v); play(v); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) { load(v); play(v); }
      else if (v.getAttribute('src')) { v.pause(); }
    });
  }, { rootMargin: '300px 0px' });
  vids.forEach(function (v) { io.observe(v); });
})();
