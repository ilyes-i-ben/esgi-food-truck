// Format.js - static helpers for formatting
export class Format {
  // formats price as currency
  static price(val) {
    if (typeof val === 'number') {
      return val.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    return '$--';
  }
}
