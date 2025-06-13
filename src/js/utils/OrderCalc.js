// OrderCalc.js - static helpers for cart/order calculations
export class OrderCalc {
  
  static subtotal(cart) {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
  
  static vat(subtotal) {
    return Math.round(subtotal * 0.10 * 100) / 100;
  }
  
  static total(subtotal, vat) {
    return subtotal + vat;
  }
}
