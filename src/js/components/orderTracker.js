// orderTracker.js - UI for order progress tracking

const trackerRoot = getOrCreateTrackerRoot();

export function renderOrderTracker(order) {
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
  
  if (order.state === 2) {
    if (!order._restoring) {
      setTimeout(() => {
        tracker.remove();
        window.dispatchEvent(new CustomEvent('OrderShipped', { detail: order }));
      }, 1200);
    } else {
      setTimeout(() => tracker.remove(), 1200);
    }
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
