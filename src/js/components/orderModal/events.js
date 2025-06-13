// events.js - handles modal events and accessibility

// sets up modal event listeners and focus trap
export function setupOrderModalEvents({ content, modalRoot, closeBtn, cancelBtn, validateBtn, modal }, onValidate, onClose) {
  let lastFocused = document.activeElement;
  function closeModal() {
    modalRoot.classList.add('hidden');
    modalRoot.innerHTML = '';
    if (lastFocused) lastFocused.focus();
    document.removeEventListener('keydown', escListener);
    content.removeEventListener('keydown', trapFocus);
    if (onClose) onClose();
  }
  closeBtn.onclick = closeModal;
  cancelBtn.onclick = closeModal;
  modal.onclick = e => { if (e.target === modal) closeModal(); };
  function escListener(e) { if (e.key === 'Escape') closeModal(); }
  document.addEventListener('keydown', escListener);
  function trapFocus(e) {
    const focusable = content.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  }
  content.addEventListener('keydown', trapFocus);
  validateBtn.onclick = () => { if (onValidate) onValidate(closeModal); };
  setTimeout(() => content.focus(), 0);
  modalRoot.classList.remove('hidden');
}
