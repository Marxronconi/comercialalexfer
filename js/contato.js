/* =============================================
   COMERCIAL ALEXFER — contato.js
   Validação de formulário de contato
   ============================================= */

'use strict';

/* ---- VALIDATORS ---- */
const validators = {
  required: (v) => v.trim().length > 0,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  phone: (v) => {
    const digits = v.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 11;
  },
  minLength: (v, min) => v.trim().length >= min,
};

const errorMessages = {
  nome:      'Por favor, informe seu nome completo.',
  email:     'Por favor, informe um e-mail válido.',
  telefone:  'Por favor, informe um telefone válido (com DDD).',
  assunto:   'Por favor, selecione um assunto.',
  mensagem:  'A mensagem deve ter pelo menos 20 caracteres.',
};

/* ---- FIELD VALIDATION ---- */
function validateField(field) {
  const id    = field.id;
  const value = field.value;
  let isValid = true;
  let message = '';

  switch (id) {
    case 'nome':
      isValid = validators.required(value) && validators.minLength(value, 3);
      message = errorMessages.nome;
      break;
    case 'email':
      isValid = validators.required(value) && validators.email(value);
      message = errorMessages.email;
      break;
    case 'telefone':
      isValid = validators.required(value) && validators.phone(value);
      message = errorMessages.telefone;
      break;
    case 'assunto':
      isValid = validators.required(value);
      message = errorMessages.assunto;
      break;
    case 'mensagem':
      isValid = validators.required(value) && validators.minLength(value, 20);
      message = errorMessages.mensagem;
      break;
    default:
      isValid = true;
  }

  const errorEl = document.getElementById(`${id}-error`);

  if (!isValid) {
    field.classList.add('error');
    field.classList.remove('success');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  } else {
    field.classList.remove('error');
    field.classList.add('success');
    if (errorEl) {
      errorEl.classList.remove('visible');
    }
  }

  return isValid;
}

/* ---- PHONE MASK ---- */
function applyPhoneMask(field) {
  field.addEventListener('input', () => {
    let value = field.value.replace(/\D/g, '');

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }

    field.value = value;
  });
}

/* ---- CHAR COUNTER for textarea ---- */
function initCharCounter() {
  const textarea = document.getElementById('mensagem');
  const counter  = document.getElementById('mensagem-counter');

  if (!textarea || !counter) return;

  const MAX = 1000;
  textarea.maxLength = MAX;

  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    counter.textContent = `${len}/${MAX}`;
    counter.style.color = len > MAX * 0.9 ? '#e74c3c' : 'var(--color-gray)';
  });
}

/* ---- FORM SUBMIT ---- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = ['nome', 'email', 'telefone', 'assunto', 'mensagem'];

  /* Real-time validation on blur */
  fields.forEach(id => {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });

  /* Phone mask */
  const phoneField = document.getElementById('telefone');
  if (phoneField) applyPhoneMask(phoneField);

  /* Submit */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    /* Validate all fields */
    let allValid = true;
    fields.forEach(id => {
      const field = document.getElementById(id);
      if (field && !validateField(field)) allValid = false;
    });

    if (!allValid) {
      /* Scroll to first error */
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      showFormMessage('error', 'Por favor, corrija os campos destacados antes de enviar.');
      return;
    }

    /* Get form data */
    const nome     = document.getElementById('nome').value.trim();
    const email    = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const assunto  = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    /* Build WhatsApp message */
    /* EDITAR: Substitua pelo número real do WhatsApp */
    const waNumber = '5548352131384';
    const waText   = [
      `*Nova mensagem do site - Comercial Alexfer*`,
      ``,
      `*Nome:* ${nome}`,
      `*E-mail:* ${email}`,
      `*Telefone:* ${telefone}`,
      `*Assunto:* ${assunto}`,
      ``,
      `*Mensagem:*`,
      mensagem,
    ].join('\n');

    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

    /* Show success state */
    showFormMessage('success',
      `Obrigado, ${nome}! Redirecionando para o WhatsApp para finalizar o contato...`
    );

    /* Animate submit button */
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
    }

    /* Open WhatsApp after short delay */
    setTimeout(() => {
      window.open(waLink, '_blank', 'noopener,noreferrer');

      /* Reset form */
      form.reset();
      fields.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
          field.classList.remove('error', 'success');
        }
        const errorEl = document.getElementById(`${id}-error`);
        if (errorEl) errorEl.classList.remove('visible');
      });

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Mensagem';
      }
    }, 1500);
  });
}

/* ---- MESSAGE DISPLAY ---- */
function showFormMessage(type, text) {
  let msgEl = document.getElementById('form-message');

  if (!msgEl) {
    msgEl = document.createElement('div');
    msgEl.id = 'form-message';
    msgEl.style.cssText = `
      padding: 14px 20px;
      border-radius: var(--border-radius);
      font-size: var(--font-size-sm);
      font-weight: 500;
      margin-top: 1rem;
      border-left: 4px solid;
      animation: fadeIn 0.3s ease;
    `;
    const form = document.getElementById('contact-form');
    form?.appendChild(msgEl);
  }

  if (type === 'success') {
    msgEl.style.background = '#edfbf3';
    msgEl.style.borderColor = '#25D366';
    msgEl.style.color = '#167a3a';
    msgEl.innerHTML = `✅ ${text}`;
  } else {
    msgEl.style.background = '#fef0f0';
    msgEl.style.borderColor = '#e74c3c';
    msgEl.style.color = '#c0392b';
    msgEl.innerHTML = `❌ ${text}`;
  }

  msgEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  /* Auto-remove after 6 seconds */
  setTimeout(() => {
    if (msgEl.parentNode) msgEl.remove();
  }, 6000);
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initCharCounter();
});
