// order.js - Order simulation and management
import { showToast } from './components/toast.js';
import { renderOrderTracker, removeOrderTracker } from './components/orderTracker.js';

const STORAGE_KEY = 'mini-food-truck-orders';
const MAX_ORDERS = 5;

export function getOrders() {
  return loadOrders();
}

export async function submitOrder(cart, onDone) {
  let orders = loadOrders();
  if (orders.length >= MAX_ORDERS) {
    showToast('Maximum 5 orders in progress. Please wait.');
    return false;
  }
  const order = {
    id: Date.now(),
    cart,
    state: 0, // 0: prep, 1: delivery, 2: delivered
    created: Date.now(),
    cancelled: false
  };
  orders.push(order);
  saveOrders(orders);
  showToast('Order placed!');
  renderOrderTracker(order, true);
  await simulateOrderProgress(order, onDone);
  return true;
}

export function cancelOrder(id) {
  let orders = loadOrders();
  const idx = orders.findIndex(o => o.id === id);
  if (idx !== -1 && orders[idx].state === 0) {
    orders[idx].cancelled = true;
    saveOrders(orders);
    removeOrderTracker(id);
    showToast('Order cancelled.');
  }
}

export function restoreOrders(onDone) {
  let orders = loadOrders();
  orders.forEach(order => {
    if (!order.cancelled && order.state < 2) {
      renderOrderTracker(order, false);
      simulateOrderProgress(order, onDone, true);
    }
    // do NOT render tracker or fire events for shipped/completed orders
  });
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

async function simulateOrderProgress(order, onDone, restoring = false) {
  let orders = loadOrders();
  let idx = orders.findIndex(o => o.id === order.id);
  if (order.cancelled) return;
  // If restoring, skip delays for already-completed states
  if (!restoring || order.state === 0) {
    await delay(2200);
    orders = loadOrders();
    idx = orders.findIndex(o => o.id === order.id);
    if (orders[idx] && !orders[idx].cancelled && orders[idx].state === 0) {
      orders[idx].state = 1;
      saveOrders(orders);
      renderOrderTracker(orders[idx], false);
    } else return;
  }
  if (!restoring || order.state <= 1) {
    await delay(2500);
    orders = loadOrders();
    idx = orders.findIndex(o => o.id === order.id);
    if (orders[idx] && !orders[idx].cancelled && orders[idx].state === 1) {
      orders[idx].state = 2;
      saveOrders(orders);
      renderOrderTracker({ ...orders[idx], _restoring: restoring ? true : false }, false);
      if (onDone) onDone(orders[idx]);
    }
  }
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}
