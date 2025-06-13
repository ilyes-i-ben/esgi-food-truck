// OrderCalc.js - static helpers for cart/order calculations
export class OrderCalc {
  // returns subtotal (ht) for a cart
  static subtotal(cart) {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
  // returns vat (10% of subtotal)
  static vat(subtotal) {
    return Math.round(subtotal * 0.10 * 100) / 100;
  }
  // returns total (ttc)
  static total(subtotal, vat) {
    return subtotal + vat;
  }
}
