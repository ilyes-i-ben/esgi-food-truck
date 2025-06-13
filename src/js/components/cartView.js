// cartView.js - Cart UI rendering and event handling
import { getCart, removeFromCart, updateCartQty } from '../cart.js';
import { formatPrice } from '../utils/formatPrice.js';
import { showToast } from './toast.js';
import { openOrderModal } from './orderModal.js';

const cartArea = document.getElementById('cart-area');
const cartList = cartArea.querySelector('.cart-list');
const cartTotalRow = cartArea.querySelector('.cart-total-row');
const cartTotal = cartArea.querySelector('.cart-total');
const cartOrderBtn = cartArea.querySelector('.cart-order-btn');
const cartEmpty = cartArea.querySelector('.cart-empty');
const cartItemTemplate = document.getElementById('cart-item-template');

// add clear cart button
let clearBtn = cartArea.querySelector('.cart-clear-btn');
if (!clearBtn) {
  clearBtn = document.createElement('button');
  clearBtn.className = 'cart-clear-btn';
  clearBtn.textContent = 'Clear Cart';
  clearBtn.onclick = () => {
    const event = new CustomEvent('CartCleared');
    window.dispatchEvent(event);
  };
  cartArea.appendChild(clearBtn);
}

export function renderCart() {
  const cart = getCart();
  cartList.innerHTML = '';
  if (!cart.length) {
    cartTotalRow.classList.add('hidden');
    cartOrderBtn.classList.add('hidden');
    cartEmpty.classList.remove('hidden');
    clearBtn.classList.add('hidden');
    return;
  }
  cartEmpty.classList.add('hidden');
  cartTotalRow.classList.remove('hidden');
  cartOrderBtn.classList.remove('hidden');
  clearBtn.classList.remove('hidden');
  let total = 0;
  cart.forEach(item => {
    const node = cartItemTemplate.content.cloneNode(true);
    const li = node.querySelector('.cart-item');
    li.dataset.id = item.id;
    const img = li.querySelector('.cart-item-img');
    img.src = item.image || 'https://placehold.co/60x60';
    img.alt = item.name;
    li.querySelector('.cart-item-name').textContent = item.name;
    li.querySelector('.cart-item-price').textContent = formatPrice(item.price);
    const qtyInput = li.querySelector('.cart-qty-input');
    qtyInput.value = item.qty;
    li.querySelector('.cart-item-subtotal').textContent = formatPrice(item.price * item.qty);
    li.querySelector('.cart-qty-minus').onclick = () => {
      updateCartQty(item.id, Math.max(1, item.qty - 1));
      renderCart();
    };
    li.querySelector('.cart-qty-plus').onclick = () => {
      updateCartQty(item.id, item.qty + 1);
      renderCart();
    };
    qtyInput.onchange = () => {
      let val = Math.max(1, parseInt(qtyInput.value, 10) || 1);
      updateCartQty(item.id, val);
      renderCart();
    };
    li.querySelector('.cart-remove-btn').onclick = () => {
      removeFromCart(item.id);
      showToast('Removed from cart');
      renderCart();
    };
    cartList.appendChild(node);
    total += item.price * item.qty;
  });
  cartTotal.textContent = formatPrice(total);
  cartOrderBtn.onclick = () => openOrderModal();
}
