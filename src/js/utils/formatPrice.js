
export function formatPrice(price) {
  if (typeof price === 'number') {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
  return '$--';
}
