// orderTracker.js - UI for order progress tracking
import { cancelOrder } from '../order.js';

const trackerRoot = getOrCreateTrackerRoot();

export function renderOrderTracker(order, allowCancel) {
  let tracker = document.getElementById('order-tracker-' + order.id);
  if (!tracker) {
    tracker = document.createElement('div');
    tracker.className = 'order-tracker';
    tracker.id = 'order-tracker-' + order.id;
    trackerRoot.appendChild(tracker);
  }
  tracker.innerHTML = '';
  const steps = ['Préparation', 'En livraison', 'Livré !'];
  const stepper = document.createElement('div');
  stepper.className = 'order-stepper';
  steps.forEach((label, idx) => {
    const step = document.createElement('div');
    step.className = 'order-step' + (order.state === idx ? ' active' : '') + (order.state > idx ? ' done' : '');
    step.textContent = label;
    stepper.appendChild(step);
  });
  tracker.appendChild(stepper);
  if (order.state === 0 && !order.cancelled && allowCancel) {
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'order-cancel-btn';
    cancelBtn.textContent = 'Annuler';
    cancelBtn.onclick = () => cancelOrder(order.id);
    tracker.appendChild(cancelBtn);
  }
  if (order.cancelled) {
    const cancelled = document.createElement('div');
    cancelled.className = 'order-cancelled';
    cancelled.textContent = 'Commande annulée';
    tracker.appendChild(cancelled);
  }
}

export function removeOrderTracker(id) {
  const tracker = document.getElementById('order-tracker-' + id);
  if (tracker) tracker.remove();
}

function getOrCreateTrackerRoot() {
  let root = document.getElementById('order-tracker-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'order-tracker-root';
    document.body.appendChild(root);
  }
  return root;
}
