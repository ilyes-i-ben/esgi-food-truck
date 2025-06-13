// CartManager.js - manages cart state and persistence
export class CartManager {
  static STORAGE_KEY = 'mini-food-truck-cart';
  constructor() {
    this.cart = this.load();
  }
  get() {
    return this.cart;
  }
  add(item) {
    const existing = this.cart.find(ci => ci.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({ ...item, qty: 1 });
    }
    this.save();
  }
  remove(id) {
    this.cart = this.cart.filter(ci => ci.id !== id);
    this.save();
  }
  updateQty(id, qty) {
    const ci = this.cart.find(ci => ci.id === id);
    if (ci) {
      ci.qty = Math.max(1, qty);
      this.save();
    }
  }
  clear() {
    this.cart = [];
    this.save();
  }
  save() {
    localStorage.setItem(CartManager.STORAGE_KEY, JSON.stringify(this.cart));
  }
  load() {
    try {
      return JSON.parse(localStorage.getItem(CartManager.STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }
}
