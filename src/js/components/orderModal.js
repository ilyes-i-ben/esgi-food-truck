// orderModal.js - orchestrates order summary modal
import { CartManager } from '../CartManager.js';
import { OrderModalView } from './OrderModalView.js';
import { OrderModalController } from './OrderModalController.js';
import { OrderManager } from '../OrderManager.js';

const cartManager = new CartManager();
const orderManager = new OrderManager();

export function openOrderModal() {
  const cart = cartManager.get();
  const view = new OrderModalView(cart);
  const refs = view.render();
  new OrderModalController(refs, async (closeModal) => {
    closeModal();
    const order = await orderManager.submit(cart);
    if (order) {
      window.dispatchEvent(new CustomEvent('OrderPlaced', { detail: order }));
    }
  });
}
