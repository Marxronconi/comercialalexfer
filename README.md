# Comercial Alexfer — Site Oficial

Site completo para a Comercial Alexfer, loja de materiais de construção e produtos para o lar.

---

## Estrutura de Arquivos

```
comercial-alexfer/
├── index.html          → Página inicial (Home)
├── produtos.html       → Catálogo de produtos com filtros
├── sobre.html          → Sobre a empresa
├── contato.html        → Formulário de contato e mapa
├── ofertas.html        → Produtos em promoção com countdown
├── css/
│   ├── style.css       → Variáveis CSS, reset, estilos base
│   ├── components.css  → Botões, cards, formulários, filtros
│   └── responsive.css  → Media queries (mobile-first)
├── js/
│   ├── main.js         → Scroll, animações, menu mobile, lightbox
│   ├── produtos.js     → Filtros de produto, dados dos produtos
│   └── contato.js      → Validação do formulário de contato
└── assets/             → Pasta para imagens locais
```

---

## Como editar — Guia rápido

### 1. Trocar o número do WhatsApp

Pesquise e substitua em **TODOS** os arquivos HTML e JS:
```
55XXXXXXXXXXX
```
Pelo número real (somente dígitos, com DDI e DDD):
```
5511999998888
```

Arquivos a editar:
- `index.html` (várias ocorrências)
- `produtos.html`
- `sobre.html`
- `contato.html`
- `ofertas.html`
- `js/main.js` — linha com `const WA_NUMBER`
- `js/produtos.js` — linha com `const waNumber`
- `js/contato.js` — linha com `const waNumber`

---

### 2. Trocar as cores no CSS

Abra `css/style.css` e edite as variáveis no bloco `:root`:

```css
:root {
  --color-primary: #1a2a6c;       /* Azul escuro da logo */
  --color-secondary: #0099e6;     /* Azul celeste dos ícones */
  --color-accent: #ff6b00;        /* Laranja para botões de destaque */
  --color-whatsapp: #25D366;      /* Verde WhatsApp (não altere) */
  /* ... demais variáveis */
}
```

---

### 3. Adicionar ou editar produtos

Abra `js/produtos.js` e edite o array `PRODUCTS`:

```js
const PRODUCTS = [
  {
    id: 1,
    name: 'Nome do Produto',
    category: 'construcao',      // construcao | cama-mesa-banho | tapetes-mantas | decoracao | utilidades
    price: 99.90,
    priceFrom: false,            // true para "a partir de"
    oldPrice: 129.90,            // null se não houver preço antigo
    sale: true,                  // true para mostrar badge de oferta
    badge: 'SALE',               // Texto do badge ou null
    badgeType: 'badge-sale',     // badge-sale | badge-new | badge-discount | badge-primary | null
    image: 'https://...',        // URL da imagem (Unsplash ou local)
    installments: '5x de R$ 19,98',
    description: 'Descrição breve do produto.'
  },
  // ... mais produtos
];
```

---

### 4. Inserir o mapa do Google Maps

1. Acesse [maps.google.com](https://maps.google.com)
2. Pesquise o endereço da loja
3. Clique em **Compartilhar** → **Incorporar um mapa**
4. Copie o código `<iframe>` gerado
5. Abra `contato.html` e localize o comentário:
   ```html
   <!-- EDITAR: Para ativar o mapa... -->
   ```
6. Substitua o bloco `.map-placeholder` pelo `<iframe>` copiado

---

### 5. Substituir imagens placeholder por imagens reais

As imagens atuais são do Unsplash (via URL). Para usar imagens locais:

1. Salve as imagens na pasta `assets/`
2. Substitua as URLs do Unsplash pelo caminho local:
   ```html
   <!-- Antes -->
   <img src="https://images.unsplash.com/photo-...">

   <!-- Depois -->
   <img src="assets/nome-da-imagem.jpg">
   ```

---

### 6. Editar textos e informações da loja

Procure os comentários `<!-- EDITAR: ... -->` em todos os arquivos HTML. Eles indicam exatamente onde substituir:

- Endereço da loja
- Telefone
- E-mail
- Links das redes sociais
- Textos institucionais (sobre.html)
- Depoimentos de clientes (index.html)
- Membros da equipe (sobre.html)

---

### 7. Ativar/desativar a Top Bar

A barra superior com telefone e horários está no topo de todos os HTMLs:
```html
<div class="topbar">...</div>
```
Para ocultá-la, adicione `display: none` ou remova o bloco.

---

## Funcionalidades incluídas

- Header fixo (sticky) com efeito ao rolar
- Menu hamburger responsivo com animação
- Hero com animação de elementos flutuantes
- Filtros de produtos por categoria (tab e sidebar)
- Busca de produtos em tempo real (`produtos.html`)
- Lightbox ao clicar em imagem de produto
- Countdown regressivo (`ofertas.html`)
- Formulário de contato com validação completa
- Envio de mensagem via WhatsApp (contato.js)
- Animações ao entrar no viewport (Intersection Observer)
- Botão flutuante do WhatsApp com tooltip
- Botão "Voltar ao topo"
- Lazy loading para imagens
- SEO meta tags em todas as páginas
- 100% responsivo (mobile, tablet, desktop)

---

## Personalização avançada

Para alterar a tipografia, troque a fonte no topo de `css/style.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=NOME_DA_FONTE:wght@300;400;500;600;700;800;900&display=swap');
```
E atualize a variável:
```css
--font-main: 'NOME_DA_FONTE', sans-serif;
```

---

© 2025 Comercial Alexfer. Todos os direitos reservados.
