/* =============================================
   COMERCIAL ALEXFER — main.js
   Scroll, animações, menu mobile, floats
   ============================================= */

'use strict';

/* ---- WHATSAPP NUMBER ---- */
/* EDITAR: Substitua pelo número real do WhatsApp (somente números) */
const WA_NUMBER = '5548352131384';
const WA_BASE   = `https://wa.me/${WA_NUMBER}`;

/* Atualiza todos os links do WhatsApp na página */
function initWhatsAppLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    const msg = el.dataset.whatsapp || '';
    const url = msg ? `${WA_BASE}?text=${encodeURIComponent(msg)}` : WA_BASE;
    el.href = url;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });
}

/* ---- STICKY HEADER ---- */
function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- MOBILE MENU ---- */
function initMobileMenu() {
  const hamburger   = document.querySelector('.hamburger');
  const mobileMenu  = document.querySelector('.mobile-menu');
  const body        = document.body;

  if (!hamburger || !mobileMenu) return;

  const toggle = (open) => {
    hamburger.classList.toggle('active', open);
    mobileMenu.classList.toggle('open', open);
    body.style.overflow = open ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', String(open));
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    toggle(!isOpen);
  });

  /* Fecha ao clicar em um link do menu */
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });

  /* Fecha ao pressionar Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggle(false);
  });
}

/* ---- ACTIVE NAV LINK ---- */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('nav a, .mobile-menu nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ---- SCROLL ANIMATIONS (Intersection Observer) ---- */
function initScrollAnimations() {
  const animateEls = document.querySelectorAll(
    '.animate-fadeInUp, .animate-fadeInLeft, .animate-fadeIn'
  );

  if (!animateEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  animateEls.forEach(el => observer.observe(el));
}

/* ---- BACK TO TOP BUTTON ---- */
function initBackToTop() {
  const btn = document.querySelector('.float-top');
  if (!btn) return;

  const onScroll = () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  };

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- SMOOTH SCROLL for anchors ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = document.querySelector('header')?.offsetHeight ?? 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
};

/* ---- LAZY LOADING for images ---- */
function initLazyLoad() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (!lazyImages.length) return;

  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.onload = () => img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    },
    { rootMargin: '200px 0px' }
  );

  lazyImages.forEach(img => imageObserver.observe(img));
}

/* ---- TOAST NOTIFICATION ---- */
function showToast(message, type = '') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${type}`.trim();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ---- LIGHTBOX (básico, usado em index e ofertas) ---- */
function initLightbox() {
  /* Cria overlay se não existir */
  let overlay = document.querySelector('.lightbox-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <div class="lightbox-inner">
        <button class="lightbox-close" aria-label="Fechar">&times;</button>
        <img src="" alt="Imagem ampliada">
      </div>`;
    document.body.appendChild(overlay);
  }

  const img = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  document.querySelectorAll('.product-image-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
      const src = wrap.querySelector('img')?.src;
      if (!src) return;
      img.src = src;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const close = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    img.src = '';
  };

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ---- HERO PARTICLES (decorativo) ---- */
function initHeroDecoration() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  /* Adiciona elementos decorativos flutuantes */
  const deco = document.createElement('div');
  deco.style.cssText = `
    position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden;
  `;

  for (let i = 0; i < 6; i++) {
    const el = document.createElement('div');
    const size = 60 + Math.random() * 120;
    el.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: heroFloat ${6 + Math.random() * 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
    `;
    deco.appendChild(el);
  }

  hero.appendChild(deco);

  /* Injeta keyframes se ainda não existir */
  if (!document.getElementById('hero-float-style')) {
    const style = document.createElement('style');
    style.id = 'hero-float-style';
    style.textContent = `
      @keyframes heroFloat {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-20px) scale(1.05); }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ---- COUNTDOWN TIMER ---- */
function initCountdown() {
  const countdowns = document.querySelectorAll('[data-countdown]');
  if (!countdowns.length) return;

  countdowns.forEach(container => {
    const endStr = container.dataset.countdown;
    let endTime;

    if (endStr === 'auto') {
      /* 24 horas a partir de agora */
      endTime = Date.now() + 24 * 60 * 60 * 1000;
    } else {
      endTime = new Date(endStr).getTime();
    }

    const hoursEl  = container.querySelector('[data-hours]');
    const minsEl   = container.querySelector('[data-minutes]');
    const secsEl   = container.querySelector('[data-seconds]');
    const daysEl   = container.querySelector('[data-days]');

    const update = () => {
      const diff = Math.max(0, endTime - Date.now());
      const days    = Math.floor(diff / 86400000);
      const hours   = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      const pad = n => String(n).padStart(2, '0');

      if (daysEl)  daysEl.textContent  = pad(days);
      if (hoursEl) hoursEl.textContent = pad(hours);
      if (minsEl)  minsEl.textContent  = pad(minutes);
      if (secsEl)  secsEl.textContent  = pad(seconds);

      if (diff <= 0) clearInterval(timer);
    };

    update();
    const timer = setInterval(update, 1000);
  });
}

/* ---- TOPBAR MARQUEE effect (opcional) ---- */
function initTopBar() {
  /* Nada extra necessário, apenas referência */
}

/* ---- INIT ALL ---- */
document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppLinks();
  initStickyHeader();
  initMobileMenu();
  initActiveNav();
  initScrollAnimations();
  initBackToTop();
  initSmoothScroll();
  initLazyLoad();
  initLightbox();
  initHeroDecoration();
  initCountdown();
});
