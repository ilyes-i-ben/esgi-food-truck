// toast.js - Toast notification component
// -----------------------------------------------
// Exports: showToast(msg)

/**
 * Show a toast notification (for errors, etc.)
 * @param {string} msg
 */
export function showToast(msg) {
  const toaster = document.getElementById('toaster-container');
  if (!toaster) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toaster.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3500);
}
