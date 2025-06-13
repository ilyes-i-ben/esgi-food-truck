// main.js - app entry-point for Mini Food Truck

import { initMenu } from './menu.js';
import { renderCart } from './components/cartView.js';
import { restoreOrders } from './order.js';
import { renderOrderTracker } from './components/orderTracker.js';
import { OrderManager } from './OrderManager.js';
import { OrderHistory } from './components/OrderHistory.js';

const orderManager = new OrderManager();
const orderHistory = new OrderHistory();

document.addEventListener('DOMContentLoaded', () => {
  restoreOrders();
  initMenu();
  renderCart();
});

window.addEventListener('OrderPlaced', (e) => {
  const order = e.detail;
  renderOrderTracker(order, true);
});

window.addEventListener('OrderUpdated', (e) => {
  const order = e.detail;
  renderOrderTracker(order, true);
});
