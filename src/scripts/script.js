

/* =====================================================
   01 · MENU HAMBÚRGUER (mobile)
   Abre e fecha o menu em tela cheia. Fecha ao tocar num
   link, no X ou na tecla Esc, e trava a rolagem enquanto aberto.
   ===================================================== */
const burger = document.querySelector('.navbar__burger');
const menu = document.querySelector('.navbar__list');

// Cada link recebe um número (--i) para aparecer em sequência
menu.querySelectorAll('.navbar__link').forEach((link, i) => link.style.setProperty('--i', i));

function setMenu(open) {
  menu.classList.toggle('navbar__list--open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  document.body.style.overflow = open ? 'hidden' : '';
}

burger.addEventListener('click', () => setMenu(!menu.classList.contains('navbar__list--open')));
menu.addEventListener('click', (e) => { if (e.target.closest('.navbar__link')) setMenu(false); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });


/* =====================================================
   02 · LINK ATIVO DA NAVBAR
   Marca o link da seção que está no meio da tela.
   ===================================================== */
const links = [...document.querySelectorAll('.navbar__link')];

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => link.classList.toggle('navbar__link--active', link.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));


/* =====================================================
   03 · LINK CONTATO
   Sobe até os contatos da capa e deixa eles visíveis, a 80px
   do fim da tela, com um brilho rápido para chamar a atenção.
   ===================================================== */
const heroContacts = document.querySelector('.hero__contacts');

document.querySelectorAll('a[href="#contato"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    // Espera o menu mobile fechar (ele libera a rolagem) antes de rolar
    setTimeout(() => {
      const top = scrollY + heroContacts.getBoundingClientRect().bottom - innerHeight + 80;
      scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      heroContacts.classList.add('hero__contacts--flash');
      setTimeout(() => heroContacts.classList.remove('hero__contacts--flash'), 1400);
    }, 60);
  });
});


/* =====================================================
   04 · ABAS DOS PROJETOS
   GoDrinking e Rango: alterna entre alta fidelidade,
   wireframe e sitemap.
   ===================================================== */
document.querySelectorAll('[data-tabs]').forEach((box) => {
  const tabs = [...box.querySelectorAll('.project__tab')];
  const panels = [...box.querySelectorAll('.project__panel')];

  tabs.forEach((tab) => tab.addEventListener('click', () => {
    tabs.forEach((t) => t.setAttribute('aria-selected', t === tab));
    panels.forEach((panel) => { panel.hidden = panel.id !== tab.dataset.tab; });
  }));
});


/* =====================================================
   05 · LIGHTBOX
   Amplia a imagem clicada.
   ===================================================== */
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('.lightbox__img');

document.querySelectorAll('.project__img').forEach((img) => img.addEventListener('click', () => {
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.showModal();
}));
lightbox.addEventListener('click', () => lightbox.close());


/* =====================================================
   06 · CARROSSEL DAS MARCAS
   Duplica a lista de logos para o movimento ficar contínuo.
   (A pausa com o mouse em cima é feita no CSS.)
   ===================================================== */
const track = document.querySelector('.brands__track');

[...track.children].forEach((item) => {
  const copy = item.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  track.appendChild(copy);
});


/* =====================================================
   07 · ANIMAÇÃO DE ENTRADA
   Blocos aparecem aos poucos ao rolar a página (web e mobile).
   ===================================================== */
const revealSelectors = [
  '.project__visual', '.project__info > *:not(.button)', '.project__side',
  '.brands__marquee', '.process__steps', '.process__step', '.process__result',
  '.process__prompt', '.process__about > *', '.process__tech-item'
].join(',');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('reveal--visible');
    revealObserver.unobserve(el);
    setTimeout(() => { el.style.transitionDelay = ''; }, 1000);
  });
}, { threshold: .08 });

document.querySelectorAll(revealSelectors).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 5) * 70 + 'ms';
  revealObserver.observe(el);
});


/* =====================================================
   08 · PROTÓTIPO DO RANGO
   Alterna entre os modos claro e escuro no iframe e mantém
   os botões em sincronia com a página aberta lá dentro.
   ===================================================== */
const protoButtons = [...document.querySelectorAll('.project__proto-btn')];
const protoFrame = document.querySelector('.project__proto-frame');
const protoOpen = document.querySelector('.project__proto-open');

function setProto(mode) {
  const url = '/src/prototipos/rango-' + mode + '.html';
  if (!protoFrame.src.endsWith(url)) protoFrame.src = url;
  protoOpen.href = url;
  protoButtons.forEach((btn) => btn.setAttribute('aria-pressed', btn.dataset.proto === mode));
}

protoButtons.forEach((btn) => btn.addEventListener('click', () => setProto(btn.dataset.proto)));

// Se a pessoa clicar em "Ver modo escuro" dentro do protótipo, os botões acompanham
protoFrame.addEventListener('load', () => {
  try {
    const mode = protoFrame.contentWindow.location.pathname.match(/rango-(claro|escuro)/);
    if (mode) setProto(mode[1]);
  } catch (e) { /* protótipo aberto de outra origem: ignora */ }
});
