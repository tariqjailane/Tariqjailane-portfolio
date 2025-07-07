// Timeline dot navigation
document.querySelectorAll('.timeline-dot').forEach(dot => {
  dot.addEventListener('click', function() {
    document.querySelectorAll('.timeline-dot').forEach(d => d.classList.remove('active'));
    this.classList.add('active');
    const target = document.getElementById(this.dataset.target);
    if (target) {
      document.querySelectorAll('section').forEach(s => s.classList.remove('visible'));
      target.classList.add('visible');
      target.scrollIntoView({behavior: 'smooth'});
    }
  });
});

// Right-side menu: smooth scroll and active state
document.querySelectorAll('#right-menu .menu-link').forEach(link => {
  link.addEventListener('click', function(e) {
    // Only handle internal links (anchors)
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      document.querySelectorAll('#right-menu .menu-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        document.querySelectorAll('section').forEach(s => s.classList.remove('visible'));
        target.classList.add('visible');
        target.scrollIntoView({behavior: 'smooth'});
      }
    }
  });
});

// Highlight active menu on scroll (for single-page navigation)
window.addEventListener('scroll', () => {
  const sections = ['main-section', 'about-section', 'certs-section'];
  let current = '';
  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section && window.scrollY >= section.offsetTop - 120) {
      current = id;
    }
  });
  document.querySelectorAll('#right-menu .menu-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

// Neon Data Stream Background Animation
(function(){
  const canvas = document.getElementById('datastream-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth, h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }
  window.addEventListener('resize', resize);

  // Data stream columns
  const cols = Math.floor(w / 30);
  const yPos = Array(cols).fill(0);

  function draw() {
    ctx.fillStyle = 'rgba(10,12,17,0.15)';
    ctx.fillRect(0, 0, w, h);

    ctx.font = '18px monospace';
    for (let i = 0; i < cols; i++) {
      const text = String.fromCharCode(0x30A0 + Math.random() * 96);
      ctx.fillStyle = '#38ff88';
      ctx.shadowColor = '#38ff88';
      ctx.shadowBlur = 14;
      ctx.fillText(text, i * 30, yPos[i] * 24);

      if (Math.random() > 0.975) yPos[i] = 0;
      yPos[i]++;
      if (yPos[i] * 24 > h) yPos[i] = 0;
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(draw);
  }
  draw();
})();
