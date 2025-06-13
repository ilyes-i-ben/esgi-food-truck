// orderModal.js - orchestrates order summary modal
import { CartManager } from '../CartManager.js';
import { OrderModalView } from './OrderModalView.js';
import { OrderModalController } from './OrderModalController.js';
import { OrderManager } from '../OrderManager.js';

const cartManager = new CartManager();
const orderManager = new OrderManager();

export function openOrderModal() {
  
  const cart = cartManager.load();
  const view = new OrderModalView(cart);
  const refs = view.render();
  new OrderModalController(refs, async (closeModal) => {
    closeModal();
    
    const latestCart = cartManager.load();
    const order = await orderManager.submit(latestCart);
    if (order) {
      window.dispatchEvent(new CustomEvent('OrderPlaced', { detail: order }));
    }
  });
}
