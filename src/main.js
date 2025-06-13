// main.js - Entry point for Mini Food Truck app
// ---------------------------------------------
// This file initializes the app and will later contain all main JS logic.
// For now, it only confirms JS is loaded and ready.

document.addEventListener('DOMContentLoaded', () => {
  console.log('Mini Food Truck JS loaded and ready!');
  // Future: Initialize app, load menu, set up event listeners, etc.
});

// Containers to hook into later:
// - #menu-section: for menu items
// - #cart-area: for cart items
// - #order-summary-modal: for order summary modal
// - #toaster-container: for notifications

document.addEventListener('DOMContentLoaded', () => {
  // Entry point: initialize menu loading
  initMenu();
});

/**
 * Fetches menu data and renders menu items
 */
async function initMenu() {
  const menuSection = document.getElementById('menu-section');
  showMenuLoader(menuSection);
  try {
    const menuData = await fetchMenuData();
    renderMenu(menuData, menuSection);
  } catch (err) {
    showToast('Failed to load menu. Please try again later.');
    menuSection.innerHTML = '';
  }
}

/**
 * Fetch menu data from external endpoint
 * @returns {Promise<Array>} menu items array
 */
async function fetchMenuData() {
  const endpoint = 'https://keligmartin.github.io/api/menu.json';
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error('Network error');
  return res.json();
}

/**
 * Render menu items as cards
 * @param {Array} menuData
 * @param {HTMLElement} container
 */
function renderMenu(menuData, container) {
  if (!Array.isArray(menuData) || menuData.length === 0) {
    container.innerHTML = '<p style="grid-column:1/-1;text-align:center;">No menu available.</p>';
    return;
  }
  container.innerHTML = menuData.map(item => menuCardHTML(item)).join('');
}

/**
 * Returns HTML for a single menu card
 * @param {Object} item
 */
function menuCardHTML(item) {
  const imgSrc = item.image || 'https://placehold.co/400x300?text=No+Image';
  const desc = item.description || 'Delicious meal, freshly prepared!';
  return `
    <article class="menu-card" tabindex="0">
      <img class="menu-card__img" src="${imgSrc}" alt="${item.name}" loading="lazy" onerror="this.src='https://placehold.co/400x300?text=No+Image'">
      <div class="menu-card__body">
        <h2 class="menu-card__title">${item.name}</h2>
        <p class="menu-card__desc">${desc}</p>
        <div class="menu-card__footer">
          <span class="menu-card__price">${formatPrice(item.price)}</span>
          <button class="menu-card__btn" type="button" disabled title="Cart coming soon">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Show a loader/spinner in the menu section
 */
function showMenuLoader(container) {
  container.innerHTML = `
    <div class="menu-loader">
      <div class="loader" aria-label="Loading menu..."></div>
    </div>
  `;
}

/**
 * Format price as currency
 */
function formatPrice(price) {
  if (typeof price === 'number') {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
  return '$--';
}

/**
 * Show a toast notification (for errors, etc.)
 * @param {string} msg
 */
function showToast(msg) {
  const toaster = document.getElementById('toaster-container');
  if (!toaster) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toaster.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3500);
}
