// OrderModalView.js - handles order modal ui
import { Format } from '../utils/Format.js';
import { OrderCalc } from '../utils/OrderCalc.js';

export class OrderModalView {
  constructor(cart) {
    this.cart = cart;
    this.modalTemplate = document.getElementById('order-summary-modal-template');
    this.modalRoot = document.getElementById('order-summary-modal');
  }
  render() {
    this.modalRoot.innerHTML = '';
    const node = this.modalTemplate.content.cloneNode(true);
    const content = node.querySelector('.modal-content');
    const cartList = node.querySelector('.modal-cart-list');
    const htSpan = node.querySelector('.modal-ht');
    const vatSpan = node.querySelector('.modal-vat');
    const ttcSpan = node.querySelector('.modal-ttc');
    this.cart.forEach(item => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = item.image || 'https://placehold.co/60x60';
      img.alt = item.name;
      li.appendChild(img);
      const name = document.createElement('span');
      name.className = 'modal-cart-item-name';
      name.textContent = item.name;
      li.appendChild(name);
      const qty = document.createElement('span');
      qty.className = 'modal-cart-item-qty';
      qty.textContent = '×' + item.qty;
      li.appendChild(qty);
      const subtotal = document.createElement('span');
      subtotal.className = 'modal-cart-item-subtotal';
      subtotal.textContent = Format.price(item.price * item.qty);
      li.appendChild(subtotal);
      cartList.appendChild(li);
    });
    const ht = OrderCalc.subtotal(this.cart);
    const vat = OrderCalc.vat(ht);
    const ttc = OrderCalc.total(ht, vat);
    htSpan.textContent = Format.price(ht);
    vatSpan.textContent = Format.price(vat);
    ttcSpan.textContent = Format.price(ttc);
    this.modalRoot.appendChild(node);
    // re-query from DOM after insertion
    const modal = this.modalRoot.querySelector('.modal');
    const contentLive = this.modalRoot.querySelector('.modal-content');
    return {
      content: contentLive,
      modalRoot: this.modalRoot,
      closeBtn: this.modalRoot.querySelector('.modal-close-btn'),
      cancelBtn: this.modalRoot.querySelector('.modal-cancel-btn'),
      validateBtn: this.modalRoot.querySelector('.modal-validate-btn'),
      modal
    };
  }
}
