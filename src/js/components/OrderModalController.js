// OrderModalController.js - handles modal events and accessibility
export class OrderModalController {
  constructor(refs, onValidate, onClose) {
    this.refs = refs;
    this.onValidate = onValidate;
    this.onClose = onClose;
    this.lastFocused = document.activeElement;
    this.setup();
  }
  setup() {
    const { content, modalRoot, closeBtn, cancelBtn, validateBtn, modal } = this.refs;
    const closeModal = () => {
      modalRoot.classList.add('hidden');
      modalRoot.innerHTML = '';
      if (this.lastFocused) this.lastFocused.focus();
      document.removeEventListener('keydown', this.escListener);
      content.removeEventListener('keydown', this.trapFocus);
      if (this.onClose) this.onClose();
    };
    this.escListener = e => { if (e.key === 'Escape') closeModal(); };
    this.trapFocus = e => {
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
    };
    closeBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;
    modal.onclick = e => { if (e.target === modal) closeModal(); };
    document.addEventListener('keydown', this.escListener);
    content.addEventListener('keydown', this.trapFocus);
    validateBtn.onclick = () => { if (this.onValidate) this.onValidate(closeModal); };
    setTimeout(() => content.focus(), 0);
    modalRoot.classList.remove('hidden');
  }
}
