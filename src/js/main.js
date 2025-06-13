// main.js - app entry-point for Mini Food Truck

import { initMenu } from './menu.js';
import { renderCart } from './components/cartView.js';

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  renderCart();
});
