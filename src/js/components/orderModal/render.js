// render.js - renders order summary modal ui
import { formatPrice } from '../../utils/formatPrice.js';
import { calcSubtotal, calcVat, calcTotal } from '../../utils/orderCalc.js';

// renders the modal and returns references to key elements
export function renderOrderModal(cart) {
  const modalTemplate = document.getElementById('order-summary-modal-template');
  const modalRoot = document.getElementById('order-summary-modal');
  modalRoot.innerHTML = '';
  const node = modalTemplate.content.cloneNode(true);
  const content = node.querySelector('.modal-content');
  const cartList = node.querySelector('.modal-cart-list');
  const htSpan = node.querySelector('.modal-ht');
  const vatSpan = node.querySelector('.modal-vat');
  const ttcSpan = node.querySelector('.modal-ttc');

  // fill cart items
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
  });
  // calculate totals
  const ht = calcSubtotal(cart);
  const vat = calcVat(ht);
  const ttc = calcTotal(ht, vat);
  htSpan.textContent = formatPrice(ht);
  vatSpan.textContent = formatPrice(vat);
  ttcSpan.textContent = formatPrice(ttc);
  modalRoot.appendChild(node);
  return {
    content,
    modalRoot,
    closeBtn: node.querySelector('.modal-close-btn'),
    cancelBtn: node.querySelector('.modal-cancel-btn'),
    validateBtn: node.querySelector('.modal-validate-btn'),
    modal: node.querySelector('.modal')
  };
}
