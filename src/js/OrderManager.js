// OrderManager.js - manages order utate, simulation, and persistence
export class OrderManager {
  static STORAGE_KEY = 'mini-food-truck-orders';
  static MAX_ORDERS = 5;
  constructor() {
    this.orders = this.load();
  }
  getAll() {
    return this.orders;
  }
  canSubmit() {
    return this.orders.length < OrderManager.MAX_ORDERS;
  }
  async submit(cart, onDone) {
    if (!this.canSubmit()) return false;
    const order = {
      id: Date.now(),
      cart,
      state: 0,
      created: Date.now(),
      cancelled: false
    };
    this.orders.push(order);
    this.save();
    await this.simulate(order, onDone);
    return true;
  }
  cancel(id) {
    const idx = this.orders.findIndex(o => o.id === id);
    if (idx !== -1 && this.orders[idx].state === 0) {
      this.orders[idx].cancelled = true;
      this.save();
    }
  }
  restore(onDone) {
    this.orders.forEach(order => {
      if (!order.cancelled && order.state < 2) {
        this.simulate(order, onDone, true);
      }
    });
  }
  save() {
    localStorage.setItem(OrderManager.STORAGE_KEY, JSON.stringify(this.orders));
  }
  load() {
    try {
      return JSON.parse(localStorage.getItem(OrderManager.STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }
  async simulate(order, onDone, restoring = false) {
    let idx = this.orders.findIndex(o => o.id === order.id);
    if (order.cancelled) return;
    if (!restoring || order.state === 0) {
      await this.delay(2200);
      idx = this.orders.findIndex(o => o.id === order.id);
      if (this.orders[idx] && !this.orders[idx].cancelled && this.orders[idx].state === 0) {
        this.orders[idx].state = 1;
        this.save();
      } else return;
    }
    if (!restoring || order.state <= 1) {
      await this.delay(2500);
      idx = this.orders.findIndex(o => o.id === order.id);
      if (this.orders[idx] && !this.orders[idx].cancelled && this.orders[idx].state === 1) {
        this.orders[idx].state = 2;
        this.save();
        if (onDone) onDone(this.orders[idx]);
      }
    }
  }
  delay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
}
