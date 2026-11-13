/* =====================================================
   PORTFÓLIO — JAVASCRIPT PRINCIPAL
   ===================================================== */

/* =====================================================
   01. ABAS DOS PROJETOS (GODRINKING E RANGO)
   ===================================================== */
document.querySelectorAll('[data-tabs]').forEach(box => {
   const tabs = [...box.querySelectorAll('[role=tab]')], panels = [...box.querySelectorAll('[role=tabpanel]')];
   tabs.forEach(t => t.addEventListener('click', () => {
      tabs.forEach(x => x.setAttribute('aria-selected', x === t));
      panels.forEach(p => p.hidden = p.id !== t.dataset.tab);
   }));
});
/* =====================================================
   02. AMPLIAÇÃO DE IMAGENS (LIGHTBOX)
   ===================================================== */
const lb = document.getElementById('lb'), lbImg = lb.querySelector('img');
document.querySelectorAll('[data-zoom]').forEach(i => i.addEventListener('click', () => { lbImg.src = i.src; lbImg.alt = i.alt; lb.showModal(); }));
lb.addEventListener('click', () => lb.close());
/* =====================================================
   03. CARROSSEL CONTÍNUO DE MARCAS
   ===================================================== */
const tr = document.getElementById('track');
if (tr && !matchMedia('(prefers-reduced-motion:reduce)').matches) [...tr.children].forEach(li => { const c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); tr.appendChild(c); });
/* =====================================================
   04. ANIMAÇÃO DE ENTRADA DAS SEÇÕES
   ===================================================== */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 });
document.querySelectorAll('.portfolio__rv').forEach(el => io.observe(el));
/* =====================================================
   05. NAVEGAÇÃO E LINK ATIVO
   ===================================================== */
const links = [...document.querySelectorAll('.portfolio__top .portfolio__l a')];
const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => so.observe(s));
