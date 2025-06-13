import { formatPrice } from '../utils/formatPrice.js';

export function menuCardHTML(item) {
  const imgSrc = item.image || 'https://placehold.co/400x300?text=No+Image';
  const desc = item.description || 'Delicious meal, freshly prepared!';
  return `
    <article class="menu-card" tabindex="0" data-id="${item.id}">
      <img class="menu-card__img" src="${imgSrc}" alt="${item.name}" loading="lazy" onerror="this.src='https://placehold.co/400x300?text=No+Image'">
      <div class="menu-card__body">
        <h2 class="menu-card__title">${item.name}</h2>
        <p class="menu-card__desc">${desc}</p>
        <div class="menu-card__footer">
          <span class="menu-card__price">${formatPrice(item.price)}</span>
          <button class="menu-card__btn" type="button" data-addcart> Add to Cart </button>
        </div>
      </div>
    </article>
  `;
}

export function addMenuCardEventListeners(container, menuData) {
  container.querySelectorAll('[data-addcart]').forEach((btn, idx) => {
    btn.onclick = () => {
      const card = btn.closest('.menu-card');
      const id = card.dataset.id;
      const item = menuData.find(i => String(i.id) === String(id));
      if (item) {
        const event = new CustomEvent('add-to-cart', { detail: item });
        container.dispatchEvent(event);
      }
    };
  });
}
