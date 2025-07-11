// Page navigation
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'block';
}
// Show Home page by default
showPage('home');

// Matrix background animation
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
const fontSize = 18;
let width, height, columns, drops;

function resizeCanvas() {
  canvas.width = width = window.innerWidth;
  canvas.height = height = window.innerHeight;
  columns = Math.floor(width / fontSize);
  drops = Array(columns).fill(1);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawMatrix() {
  ctx.fillStyle = 'rgba(20, 20, 30, 0.15)';
  ctx.fillRect(0, 0, width, height);
  ctx.font = fontSize + "px 'Fira Mono', monospace";
  ctx.fillStyle = '#00ffea';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()';

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 40);
