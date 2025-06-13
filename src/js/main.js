// main.js - app entry-point for Mini Food Truck

import { initMenu } from './menu.js';
import { renderCart } from './components/cartView.js';
import { restoreOrders } from './order.js';

document.addEventListener('DOMContentLoaded', () => {
  restoreOrders();
  initMenu();
  renderCart();
});
