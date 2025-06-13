// OrderHistory.js - order history panel, event-driven
export class OrderHistory {
  static STORAGE_KEY = 'mini-food-truck-history';
  constructor() {
    this.history = this.load();
    this.root = this.getOrCreateRoot();
    window.addEventListener('OrderShipped', e => {
      this.add(e.detail);
      this.render();
    });
    window.addEventListener('OrderCancelled', e => {
      // just re-render to remove cancelled from history if needed (optional, safe)
      this.render();
    });
    this.render();
  }
  add(order) {
    // prevent duplicate history entries and skip cancelled
    if (this.history.some(o => o.id === order.id) || order.cancelled) return;
    this.history.push({
      id: order.id,
      date: new Date(order.created).toLocaleString(),
      items: order.cart,
      total: order.cart.reduce((sum, i) => sum + i.price * i.qty, 0)
    });
    this.save();
  }
  render() {
    this.root.innerHTML = '<h2 class="order-history-title">Order History</h2>';
    if (!this.history.length) {
      this.root.innerHTML += '<div class="order-history-empty">No Orders Yet</div>';
      return;
    }
    const list = document.createElement('ul');
    list.className = 'order-history-list';
    this.history.slice().reverse().forEach(order => {
      const li = document.createElement('li');
      li.className = 'order-history-item';
      li.innerHTML = `<div class="order-history-meta">#${order.id} <span>${order.date}</span></div>`;
      const items = document.createElement('ul');
      items.className = 'order-history-items';
      order.items.forEach(i => {
        const itemLi = document.createElement('li');
        itemLi.textContent = `${i.name} ×${i.qty}`;
        items.appendChild(itemLi);
      });
      li.appendChild(items);
      li.innerHTML += `<div class="order-history-total">total: $${order.total.toFixed(2)}</div>`;
      list.appendChild(li);
    });
    this.root.appendChild(list);
  }
  save() {
    localStorage.setItem(OrderHistory.STORAGE_KEY, JSON.stringify(this.history));
  }
  load() {
    try {
      return JSON.parse(localStorage.getItem(OrderHistory.STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }
  getOrCreateRoot() {
    let root = document.getElementById('order-history-section');
    if (!root) {
      root = document.createElement('section');
      root.id = 'order-history-section';
      root.className = 'order-history-section';
      document.body.appendChild(root);
    }
    return root;
  }
}
