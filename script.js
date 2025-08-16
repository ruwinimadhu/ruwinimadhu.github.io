// Light/Dark toggle + year + dynamic projects
(function() {
  const root = document.documentElement;
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const key = 'pref-theme';
  const btn = document.getElementById('themeToggle');
  const stored = localStorage.getItem(key);
  if (stored) root.classList.toggle('light', stored === 'light');
  if (btn) {
    btn.addEventListener('click', () => {
      const light = !root.classList.contains('light');
      root.classList.toggle('light', light);
      localStorage.setItem(key, light ? 'light' : 'dark');
    });
  }
  // Load projects
  fetch('projects.json')
    .then(r => r.json())
    .then(items => {
      const tpl = document.getElementById('projectCardTpl');
      const grid = document.getElementById('projectGrid');
      items.forEach(p => {
        const node = tpl.content.cloneNode(true);
        node.querySelector('.card-title').textContent = p.title;
        node.querySelector('.card-desc').textContent = p.description;
        const badges = node.querySelector('.card-badges');
        p.tags.forEach(t => {
          const span = document.createElement('span');
          span.textContent = t;
          span.className = 'badge';
          badges.appendChild(span);
        });
        const links = node.querySelector('.card-links');
        p.links.forEach(l => {
          const a = document.createElement('a');
          a.href = l.href; a.textContent = l.label; a.target = '_blank'; a.rel='noopener';
          links.appendChild(a);
        });
        grid.appendChild(node);
      });
    })
    .catch(() => {});
})();