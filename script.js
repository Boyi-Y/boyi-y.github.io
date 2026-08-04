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

// ---------- Hover media preview ----------
const preview = document.querySelector('.media-preview');
const previewImg = preview.querySelector('img');

document.querySelectorAll('.entry[data-media]').forEach((entry) => {
  entry.addEventListener('mouseenter', () => {
    previewImg.src = entry.dataset.media;
    preview.classList.add('visible');
  });
  entry.addEventListener('mouseleave', () => {
    preview.classList.remove('visible');
  });
});
