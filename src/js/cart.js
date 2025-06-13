// cart.js - Cart state management and persistence
import { showToast } from './components/toast.js';
import { renderCart } from './components/cartView.js';

const STORAGE_KEY = 'mini-food-truck-cart';
let cart = loadCart();

export function getCart() {
  return cart;
}

export function addToCart(item) {
  const existing = cart.find(ci => ci.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart();
  showToast(`${item.name} added to cart!`);
}

export function removeFromCart(id) {
  cart = cart.filter(ci => ci.id !== id);
  saveCart();
}

export function updateCartQty(id, qty) {
  const ci = cart.find(ci => ci.id === id);
  if (ci) {
    ci.qty = Math.max(1, qty);
    saveCart();
  }
}

export function clearCart() {
  cart = [];
  saveCart();
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

window.addEventListener('CartCleared', () => {
  clearCart();
  renderCart();
});
