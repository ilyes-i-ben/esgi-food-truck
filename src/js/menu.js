// menu.js - Handles menu loading and rendering

import { fetchMenuData } from './api.js';
import { menuCardHTML, addMenuCardEventListeners } from './components/menuCard.js';
import { loaderHTML } from './components/loader.js';
import { showToast } from './components/toast.js';
import { addToCart } from './cart.js';
import { renderCart } from './components/cartView.js';

export async function initMenu() {
  const menuSection = document.getElementById('menu-section');
  showMenuLoader(menuSection);
  try {
    const menuData = await fetchMenuData();
    renderMenu(menuData, menuSection);
    addMenuCardEventListeners(menuSection, menuData);
    menuSection.addEventListener('add-to-cart', e => {
      addToCart(e.detail);
      renderCart();
    });
  } catch (err) {
    showToast('Failed to load menu. Please try again later.');
    menuSection.innerHTML = '';
  }
  renderCart();
}

function renderMenu(menuData, container) {
  if (!Array.isArray(menuData) || menuData.length === 0) {
    container.innerHTML = '<p style="grid-column:1/-1;text-align:center;">No menu available.</p>';
    return;
  }
  container.innerHTML = menuData.map(item => menuCardHTML(item)).join('');
}

function showMenuLoader(container) {
  container.innerHTML = loaderHTML;
}
