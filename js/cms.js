/* =============================================
   COMERCIAL ALEXFER — cms.js
   Aplica configurações do Admin (localStorage)
   em todas as páginas do site
   ============================================= */

'use strict';

/* Carrega config ANTES do DOM (produtos.js precisa disso) */
const ALEXFER_CONFIG = (function () {
  try {
    return JSON.parse(localStorage.getItem('alexfer_cms')) || {};
  } catch (e) { return {}; }
})();

/* Expõe produtos customizados para produtos.js usar */
if (ALEXFER_CONFIG.products && ALEXFER_CONFIG.products.length > 0) {
  window.ALEXFER_CMS_PRODUCTS = ALEXFER_CONFIG.products;
}

/* Expõe config global */
window.ALEXFER_CONFIG = ALEXFER_CONFIG;

/* ---- APLICA TUDO AO DOM ---- */
document.addEventListener('DOMContentLoaded', function () {
  applyColors();
  applyHero();
  applyStoreInfo();
  applyTestimonials();
  applyHomeProducts();
  applyCSSVariables();
});

/* ---- CORES ---- */
function applyColors() {
  const c = ALEXFER_CONFIG.colors;
  if (!c) return;
  const root = document.documentElement;
  if (c.primary)   root.style.setProperty('--color-primary',   c.primary);
  if (c.secondary) root.style.setProperty('--color-secondary', c.secondary);
  if (c.accent)    root.style.setProperty('--color-accent',    c.accent);
}

function applyCSSVariables() {
  /* Aplica qualquer variável CSS extra salva */
  const v = ALEXFER_CONFIG.cssVars;
  if (!v) return;
  const root = document.documentElement;
  Object.entries(v).forEach(([k, val]) => root.style.setProperty(k, val));
}

/* ---- HERO ---- */
function applyHero() {
  const h = ALEXFER_CONFIG.hero;
  if (!h) return;

  const heroEl = document.querySelector('.hero');
  if (!heroEl) return;

  if (h.bgImage) {
    const bg = heroEl.querySelector('.hero-bg');
    if (bg) bg.style.backgroundImage = `url('${h.bgImage}')`;
  }

  if (h.badge) {
    const badge = heroEl.querySelector('.hero-badge');
    if (badge) badge.textContent = h.badge;
  }

  if (h.title) {
    const title = heroEl.querySelector('h1');
    if (title) title.innerHTML = h.title;
  }

  if (h.subtitle) {
    const sub = heroEl.querySelector('p');
    if (sub) sub.textContent = h.subtitle;
  }

  if (h.cta1) {
    const btn = heroEl.querySelector('.btn-whatsapp');
    if (btn) {
      const svg = btn.querySelector('svg');
      btn.textContent = h.cta1;
      if (svg) btn.prepend(svg);
    }
  }

  if (h.mascotImage) {
    const mascot = heroEl.querySelector('.hero-mascot-img');
    if (mascot) {
      mascot.src = h.mascotImage;
      mascot.style.opacity = '1';
    }
  }
}

/* ---- INFO DA LOJA ---- */
function applyStoreInfo() {
  const s = ALEXFER_CONFIG.store;
  if (!s) return;

  /* Telefone — atualiza links tel: e textos */
  if (s.phone) {
    const telRaw = s.phone.replace(/\D/g, '');

    document.querySelectorAll('a[href^="tel:"]').forEach(el => {
      el.href = `tel:+55${telRaw}`;
      if (/^\(\d{2}\)/.test(el.textContent)) el.textContent = s.phone;
    });
  }

  /* WhatsApp — atualiza todos os links wa.me */
  if (s.whatsapp) {
    document.querySelectorAll('a[href*="wa.me/"]').forEach(el => {
      try {
        const url     = new URL(el.href);
        const msgText = url.searchParams.get('text');
        el.href = msgText
          ? `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(msgText)}`
          : `https://wa.me/${s.whatsapp}`;
      } catch (_) { /* href inválido, ignora */ }
    });
  }

  /* Endereço */
  if (s.address) {
    document.querySelectorAll('[data-cms="address"]').forEach(el => {
      el.textContent = s.address;
    });
    /* footer-contact-item spans de endereço */
    document.querySelectorAll('.footer-contact-item').forEach(item => {
      const icon = item.querySelector('.ci-icon');
      if (icon && icon.textContent.trim() === '📍') {
        const span = item.querySelector('span:last-child');
        if (span) span.textContent = s.address;
      }
    });
    /* Contato page */
    const contactAddr = document.querySelector('.contact-info-card p');
    if (contactAddr && s.address) {
      const lines = s.address.split(',');
      contactAddr.innerHTML = lines.map(l => l.trim()).join('<br>');
    }
  }

  /* Horários no footer */
  if (s.hoursShort) {
    document.querySelectorAll('.footer-contact-item').forEach(item => {
      const icon = item.querySelector('.ci-icon');
      if (icon && icon.textContent.trim() === '⏰') {
        const span = item.querySelector('span:last-child');
        if (span) span.textContent = s.hoursShort;
      }
    });
  }

  /* Instagram */
  if (s.instagram) {
    document.querySelectorAll('a[href*="instagram.com"]').forEach(el => {
      el.href = s.instagram;
    });
    /* topbar display */
    document.querySelectorAll('[data-cms="instagram-handle"]').forEach(el => {
      el.textContent = '@' + s.instagram.split('/').filter(Boolean).pop();
    });
  }
}

/* ---- DEPOIMENTOS ---- */
function applyTestimonials() {
  const t = ALEXFER_CONFIG.testimonials;
  if (!t || t.length === 0) return;

  const grid = document.querySelector('.testimonials-grid');
  if (!grid) return;

  grid.innerHTML = t.map(item => `
    <article class="testimonial-card animate-fadeInUp is-visible">
      <div class="testimonial-stars" aria-label="${item.rating || 5} estrelas">
        ${'★'.repeat(item.rating || 5)}${'☆'.repeat(5 - (item.rating || 5))}
      </div>
      <p>"${escapeHtml(item.text)}"</p>
      <div class="testimonial-author">
        <img src="${item.photo || 'https://randomuser.me/api/portraits/men/1.jpg'}"
             alt="Foto de ${escapeHtml(item.name)}" loading="lazy">
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <span>${escapeHtml(item.since || 'Cliente satisfeito')}</span>
        </div>
      </div>
    </article>
  `).join('');
}

/* ---- PRODUTOS NA HOME (destaques) ---- */
function applyHomeProducts() {
  /* Atualiza apenas os 4 produtos fixos da home se houver config de home-picks */
  const picks = ALEXFER_CONFIG.homePicks;
  if (!picks || picks.length === 0) return;

  const grid = document.getElementById('home-products-grid');
  if (!grid) return;

  const allProducts = window.ALEXFER_CMS_PRODUCTS || [];
  const selected    = picks.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
  if (selected.length === 0) return;

  const waNum = (ALEXFER_CONFIG.store && ALEXFER_CONFIG.store.whatsapp) || '5548352131384';

  grid.innerHTML = selected.map(p => {
    const waMsg = `Olá! Tenho interesse no produto: ${p.name}.`;
    const waLink = `https://wa.me/${waNum}?text=${encodeURIComponent(waMsg)}`;
    const oldPrice = p.oldPrice
      ? `<span class="product-price-old">R$ ${Number(p.oldPrice).toFixed(2).replace('.', ',')}</span>`
      : '';
    const badge = p.badge
      ? `<div class="product-badges"><span class="badge ${p.badgeType || 'badge-primary'}">${p.badge}</span></div>`
      : '';
    return `
      <article class="product-card animate-fadeInUp is-visible">
        <div class="product-image-wrap">
          <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy">
          ${badge}
        </div>
        <div class="product-info">
          <span class="product-category">${escapeHtml(p.category || '')}</span>
          <h3 class="product-name">${escapeHtml(p.name)}</h3>
          <div class="product-price-wrap">
            <div>${oldPrice}<span class="product-price">R$ ${Number(p.price).toFixed(2).replace('.', ',')}</span></div>
            <div class="product-price-installment">ou ${escapeHtml(p.installments || '')}</div>
          </div>
          <a href="${waLink}" class="btn btn-whatsapp btn-sm" target="_blank" rel="noopener noreferrer">
            💬 Pedir pelo WhatsApp
          </a>
        </div>
      </article>`;
  }).join('');
}

/* ---- HELPERS ---- */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
