// ── THEME TOGGLE ──
(function(){
  const saved = localStorage.getItem('nsk-theme') || 'light';
  document.documentElement.classList.remove('light','dark');
  document.documentElement.classList.add(saved);
})();

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  html.classList.toggle('dark', !isDark);
  html.classList.toggle('light', isDark);
  const icon = document.getElementById('themeIcon');
  if(icon) icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('nsk-theme', isDark ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', function(){
  const saved = localStorage.getItem('nsk-theme') || 'light';
  const icon = document.getElementById('themeIcon');
  if(icon) icon.className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

// ── NAV SCROLL EFFECT ──
window.addEventListener('scroll', () => {
  document.querySelector('nav')?.classList.toggle('scrolled', window.scrollY > 20);
});

// ── MOBILE MENU ──
function toggleMobileMenu() {
  document.getElementById('mobileMenu')?.classList.toggle('open');
}

// ── ACTIVE NAV LINK ──
(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile-menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href && path.includes(href.replace('.html',''))) a.classList.add('active');
  });
})();

// ── INTERSECTION OBSERVER: fade in on scroll ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold:0.1 });
document.querySelectorAll('.reveal').forEach(el => {
  el.style.opacity='0'; el.style.transform='translateY(24px)';
  el.style.transition='opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.reveal').forEach(el => {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.style.opacity='1'; e.target.style.transform='translateY(0)';
          io.unobserve(e.target);
        }
      });
    },{threshold:0.08});
    io.observe(el);
  });
});
