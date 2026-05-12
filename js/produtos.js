/* =============================================
   COMERCIAL ALEXFER — produtos.js
   Filtros, lightbox avançado, load more
   ============================================= */

'use strict';

/* ---- PRODUCTS DATA ---- */
/* Produtos vêm do Admin (localStorage via cms.js) ou dos padrões abaixo */
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Cimento CP-II Portland 50kg',
    category: 'construcao',
    price: 32.90,
    priceFrom: true,
    oldPrice: null,
    sale: false,
    badge: 'Mais Vendido',
    badgeType: 'badge-primary',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80',
    installments: '3x de R$ 10,96',
    description: 'Cimento de alta qualidade para construções residenciais e comerciais.'
  },
  {
    id: 2,
    name: 'Tijolo Cerâmico 6 Furos (100 un)',
    category: 'construcao',
    price: 89.90,
    priceFrom: true,
    oldPrice: 109.90,
    sale: true,
    badge: 'SALE',
    badgeType: 'badge-sale',
    image: 'https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=500&q=80',
    installments: '5x de R$ 17,98',
    description: 'Tijolos cerâmicos de primeira linha para construção de paredes.'
  },
  {
    id: 3,
    name: 'Tinta Acrílica Premium Branca 18L',
    category: 'construcao',
    price: 189.90,
    priceFrom: false,
    oldPrice: 229.90,
    sale: true,
    badge: '-17%',
    badgeType: 'badge-discount',
    image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=500&q=80',
    installments: '10x de R$ 18,99',
    description: 'Tinta acrílica de alta cobertura para interiores e exteriores.'
  },
  {
    id: 4,
    name: 'Jogo de Cama Queen 200 Fios',
    category: 'cama-mesa-banho',
    price: 149.90,
    priceFrom: false,
    oldPrice: null,
    sale: false,
    badge: 'Novo',
    badgeType: 'badge-new',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80',
    installments: '8x de R$ 18,74',
    description: 'Jogo de cama com 4 peças, 100% algodão, toque suave e durável.'
  },
  {
    id: 5,
    name: 'Toalha de Banho Gigante 80x150cm',
    category: 'cama-mesa-banho',
    price: 49.90,
    priceFrom: false,
    oldPrice: 69.90,
    sale: true,
    badge: 'SALE',
    badgeType: 'badge-sale',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&q=80',
    installments: '3x de R$ 16,63',
    description: 'Toalha felpuda extra-grande, 100% algodão, alta absorção.'
  },
  {
    id: 6,
    name: 'Tapete Persa Sala 200x300cm',
    category: 'tapetes-mantas',
    price: 299.90,
    priceFrom: false,
    oldPrice: 389.90,
    sale: true,
    badge: '-23%',
    badgeType: 'badge-discount',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80',
    installments: '10x de R$ 29,99',
    description: 'Tapete estilo persa com design exclusivo, ideal para salas de estar.'
  },
  {
    id: 7,
    name: 'Manta Fleece Casal Listrada',
    category: 'tapetes-mantas',
    price: 89.90,
    priceFrom: false,
    oldPrice: null,
    sale: false,
    badge: null,
    badgeType: null,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&q=80',
    installments: '5x de R$ 17,98',
    description: 'Manta de poliéster macia e quentinha para os dias frios.'
  },
  {
    id: 8,
    name: 'Vaso Decorativo Cerâmica 40cm',
    category: 'decoracao',
    price: 59.90,
    priceFrom: false,
    oldPrice: null,
    sale: false,
    badge: 'Novo',
    badgeType: 'badge-new',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80',
    installments: '3x de R$ 19,96',
    description: 'Vaso de cerâmica artesanal com acabamento fosco para decoração moderna.'
  },
  {
    id: 9,
    name: 'Quadro Decorativo Abstrato 60x80cm',
    category: 'decoracao',
    price: 89.90,
    priceFrom: false,
    oldPrice: 119.90,
    sale: true,
    badge: 'SALE',
    badgeType: 'badge-sale',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&q=80',
    installments: '5x de R$ 17,98',
    description: 'Quadro com impressão em alta definição, moldura em madeira natural.'
  },
  {
    id: 10,
    name: 'Conjunto de Panelas 5 Peças Antiaderente',
    category: 'utilidades',
    price: 249.90,
    priceFrom: false,
    oldPrice: 299.90,
    sale: true,
    badge: '-17%',
    badgeType: 'badge-discount',
    image: 'https://images.unsplash.com/photo-1584990347449-39ce25a5a5b7?w=500&q=80',
    installments: '10x de R$ 24,99',
    description: 'Conjunto com 5 panelas antiaderentes de alta durabilidade, cabo ergonômico.'
  },
  {
    id: 11,
    name: 'Porta-Retratos Dourado Kit 3 Peças',
    category: 'decoracao',
    price: 39.90,
    priceFrom: false,
    oldPrice: null,
    sale: false,
    badge: null,
    badgeType: null,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80',
    installments: '2x de R$ 19,95',
    description: 'Kit de 3 porta-retratos em metal dourado, design moderno e elegante.'
  },
  {
    id: 12,
    name: 'Cortina Blackout 2,20x1,80m',
    category: 'cama-mesa-banho',
    price: 119.90,
    priceFrom: false,
    oldPrice: 149.90,
    sale: true,
    badge: '-20%',
    badgeType: 'badge-discount',
    image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=500&q=80',
    installments: '6x de R$ 19,98',
    description: 'Cortina blackout de alta qualidade, bloqueio total da luz, ideal para quartos.'
  },
  {
    id: 13,
    name: 'Argamassa AC-II 20kg',
    category: 'construcao',
    price: 24.90,
    priceFrom: true,
    oldPrice: null,
    sale: false,
    badge: null,
    badgeType: null,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80',
    installments: '2x de R$ 12,45',
    description: 'Argamassa colante AC-II para assentamento de porcelanatos e cerâmicas.'
  },
  {
    id: 14,
    name: 'Tapete Passadeira Sala 50x150cm',
    category: 'tapetes-mantas',
    price: 79.90,
    priceFrom: false,
    oldPrice: 99.90,
    sale: true,
    badge: 'SALE',
    badgeType: 'badge-sale',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80',
    installments: '4x de R$ 19,97',
    description: 'Tapete passadeira antiderrapante, ideal para corredores e entradas.'
  },
  {
    id: 15,
    name: 'Luminária de Mesa Articulada',
    category: 'decoracao',
    price: 69.90,
    priceFrom: false,
    oldPrice: null,
    sale: false,
    badge: 'Novo',
    badgeType: 'badge-new',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
    installments: '4x de R$ 17,47',
    description: 'Luminária de mesa com braço articulado, design nórdico minimalista.'
  },
  {
    id: 16,
    name: 'Organizador de Cozinha 6 Peças',
    category: 'utilidades',
    price: 59.90,
    priceFrom: false,
    oldPrice: 79.90,
    sale: true,
    badge: '-25%',
    badgeType: 'badge-discount',
    image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=500&q=80',
    installments: '3x de R$ 19,96',
    description: 'Kit organizador de cozinha em plástico resistente, fácil de limpar.'
  },
];

/* Usa produtos do CMS (Admin) se disponíveis, senão usa padrões */
const PRODUCTS = (window.ALEXFER_CMS_PRODUCTS && window.ALEXFER_CMS_PRODUCTS.length > 0)
  ? window.ALEXFER_CMS_PRODUCTS
  : DEFAULT_PRODUCTS;

/* ---- RENDER PRODUCT CARD ---- */
function createProductCard(product) {
  const waMsg = `Olá! Tenho interesse no produto: ${product.name}. Pode me passar mais informações?`;
  /* EDITAR: Substitua pelo número real do WhatsApp */
  const waLink = `https://wa.me/5548352131384?text=${encodeURIComponent(waMsg)}`;

  const oldPriceHTML = product.oldPrice
    ? `<span class="product-price-old">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>`
    : '';

  const fromText = product.priceFrom ? '<span class="product-price-from">A partir de</span>' : '';

  const badgeHTML = product.badge
    ? `<span class="badge ${product.badgeType}">${product.badge}</span>`
    : '';

  return `
    <article class="product-card animate-fadeInUp" data-category="${product.category}" data-id="${product.id}">
      <div class="product-image-wrap" title="Clique para ampliar">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
        ${badgeHTML ? `<div class="product-badges">${badgeHTML}</div>` : ''}
        <div class="product-actions">
          <button class="product-action-btn" title="Ampliar imagem" onclick="openLightbox('${product.image}', '${product.name.replace(/'/g, "\\'")}')">🔍</button>
          <a href="${waLink}" class="product-action-btn" title="Pedir pelo WhatsApp" target="_blank" rel="noopener noreferrer">💬</a>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${getCategoryLabel(product.category)}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price-wrap">
          ${fromText}
          <div>${oldPriceHTML}<span class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span></div>
          <div class="product-price-installment">ou ${product.installments}</div>
        </div>
        <a href="${waLink}" class="btn btn-whatsapp btn-sm" target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.533 5.86L.057 23.486a.5.5 0 0 0 .611.634l5.799-1.522A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.027-1.368l-.36-.214-3.742.982.999-3.648-.235-.374A9.9 9.9 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1c5.466 0 9.9 4.433 9.9 9.9 0 5.466-4.434 9.9-9.9 9.9z"/></svg>
          Pedir pelo WhatsApp
        </a>
      </div>
    </article>
  `;
}

function getCategoryLabel(cat) {
  const labels = {
    'construcao': 'Materiais de Construção',
    'cama-mesa-banho': 'Cama, Mesa e Banho',
    'tapetes-mantas': 'Tapetes e Mantas',
    'decoracao': 'Decoração',
    'utilidades': 'Utilidades do Lar',
  };
  return labels[cat] || cat;
}

/* ---- LIGHTBOX (avançado) ---- */
let lightboxOverlay = null;

function openLightbox(src, alt = 'Produto') {
  if (!lightboxOverlay) {
    lightboxOverlay = document.querySelector('.lightbox-overlay');
    if (!lightboxOverlay) return;
  }
  const img = lightboxOverlay.querySelector('img');
  if (img) { img.src = src; img.alt = alt; }
  lightboxOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightboxOverlay) return;
  lightboxOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function initLightboxEvents() {
  lightboxOverlay = document.querySelector('.lightbox-overlay');
  if (!lightboxOverlay) {
    lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.innerHTML = `
      <div class="lightbox-inner">
        <button class="lightbox-close" aria-label="Fechar">&times;</button>
        <img src="" alt="">
      </div>`;
    document.body.appendChild(lightboxOverlay);
  }

  lightboxOverlay.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', e => { if (e.target === lightboxOverlay) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

/* ---- FILTER LOGIC ---- */
let currentCategory = 'all';
let currentPage = 1;
const PRODUCTS_PER_PAGE = 8;

function getFilteredProducts() {
  if (currentCategory === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === currentCategory);
}

function renderProducts(reset = false) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  if (reset) {
    grid.innerHTML = '';
    currentPage = 1;
  }

  const filtered   = getFilteredProducts();
  const start      = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const end        = start + PRODUCTS_PER_PAGE;
  const paginated  = filtered.slice(start, end);

  if (paginated.length === 0 && reset) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--color-gray);">
        <div style="font-size:3rem;margin-bottom:1rem;">🔍</div>
        <h3>Nenhum produto encontrado nesta categoria.</h3>
        <p>Tente outra categoria ou entre em contato conosco.</p>
      </div>`;
    return;
  }

  paginated.forEach(product => {
    grid.insertAdjacentHTML('beforeend', createProductCard(product));
  });

  /* Re-observa animações nos novos cards */
  const newCards = grid.querySelectorAll('.animate-fadeInUp:not(.is-visible)');
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); }
    }),
    { threshold: 0.1 }
  );
  newCards.forEach(card => observer.observe(card));

  /* Mostra/esconde botão load more */
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    const hasMore = end < filtered.length;
    loadMoreBtn.style.display = hasMore ? 'inline-flex' : 'none';
    loadMoreBtn.dataset.remaining = filtered.length - end;
    if (hasMore) loadMoreBtn.textContent = `Carregar mais (${filtered.length - end} produtos)`;
  }
}

function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.filter;
      renderProducts(true);
      /* Scroll suave até o grid */
      document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* Sidebar checkboxes */
  document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const checked = [...document.querySelectorAll('.filter-option input:checked')].map(c => c.value);
      if (checked.length === 0) {
        currentCategory = 'all';
      } else {
        currentCategory = checked[checked.length - 1];
      }
      /* Sync filter bar */
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === currentCategory ||
          (currentCategory === 'all' && btn.dataset.filter === 'all'));
      });
      renderProducts(true);
    });
  });
}

function initLoadMore() {
  const btn = document.getElementById('load-more-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    currentPage++;
    renderProducts(false);
  });
}

/* ---- SEARCH ---- */
function initSearch() {
  const searchInput = document.getElementById('product-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    const grid  = document.getElementById('products-grid');
    if (!grid) return;

    if (!query) {
      renderProducts(true);
      return;
    }

    const matched = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(query) ||
      getCategoryLabel(p.category).toLowerCase().includes(query)
    );

    grid.innerHTML = '';
    if (matched.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--color-gray);">
          <div style="font-size:3rem;margin-bottom:1rem;">😕</div>
          <h3>Produto não encontrado.</h3>
          <p>Tente outro termo ou <a href="https://wa.me/5548352131384" style="color:var(--color-secondary)">fale conosco</a>.</p>
        </div>`;
      return;
    }

    matched.forEach(product => grid.insertAdjacentHTML('beforeend', createProductCard(product)));
  });
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  initLightboxEvents();
  renderProducts(true);
  initFilters();
  initLoadMore();
  initSearch();
});
