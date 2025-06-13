// orderModal.js - Order summary modal logic and rendering
import { getCart } from '../cart.js';
import { formatPrice } from '../utils/formatPrice.js';
import { submitOrder } from '../order.js';

const modalRoot = document.getElementById('order-summary-modal');
const modalTemplate = document.getElementById('order-summary-modal-template');

let lastFocused = null;

export function openOrderModal() {
  if (!modalTemplate) return;
  lastFocused = document.activeElement;
  modalRoot.innerHTML = '';
  const node = modalTemplate.content.cloneNode(true);
  const modal = node.querySelector('.modal');
  const content = node.querySelector('.modal-content');
  const closeBtn = node.querySelector('.modal-close-btn');
  const cancelBtn = node.querySelector('.modal-cancel-btn');
  const validateBtn = node.querySelector('.modal-validate-btn');
  const cartList = node.querySelector('.modal-cart-list');
  const htSpan = node.querySelector('.modal-ht');
  const vatSpan = node.querySelector('.modal-vat');
  const ttcSpan = node.querySelector('.modal-ttc');

  // Fill cart items
  const cart = getCart();
  let ht = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = item.image || 'https://placehold.co/60x60';
    img.alt = item.name;
    li.appendChild(img);
    const name = document.createElement('span');
    name.className = 'modal-cart-item-name';
    name.textContent = item.name;
    li.appendChild(name);
    const qty = document.createElement('span');
    qty.className = 'modal-cart-item-qty';
    qty.textContent = '×' + item.qty;
    li.appendChild(qty);
    const subtotal = document.createElement('span');
    subtotal.className = 'modal-cart-item-subtotal';
    subtotal.textContent = formatPrice(item.price * item.qty);
    li.appendChild(subtotal);
    cartList.appendChild(li);
    ht += item.price * item.qty;
  });
  const vat = Math.round(ht * 0.10 * 100) / 100;
  const ttc = ht + vat;
  htSpan.textContent = formatPrice(ht);
  vatSpan.textContent = formatPrice(vat);
  ttcSpan.textContent = formatPrice(ttc);

  // Show modal
  modalRoot.classList.remove('hidden');
  modalRoot.appendChild(node);
  setTimeout(() => content.focus(), 0);

  // Close logic
  function closeModal() {
    modalRoot.classList.add('hidden');
    modalRoot.innerHTML = '';
    if (lastFocused) lastFocused.focus();
    document.removeEventListener('keydown', escListener);
    content.removeEventListener('keydown', trapFocus);
  }
  closeBtn.onclick = closeModal;
  cancelBtn.onclick = closeModal;
  modal.onclick = e => { if (e.target === modal) closeModal(); };
  function escListener(e) { if (e.key === 'Escape') closeModal(); }
  document.addEventListener('keydown', escListener);
 
  function trapFocus(e) {
    const focusable = content.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  }
  content.addEventListener('keydown', trapFocus);
  // Validate (next stage)
  validateBtn.onclick = async () => {
    const cart = getCart();
    const ok = await submitOrder(cart, () => {});
    if (ok) closeModal();
  };
}
