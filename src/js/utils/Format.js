// Format.js - static helpers for formatting
export class Format {
  
  static price(val) {
    if (typeof val === 'number') {
      return val.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    return '$--';
  }
}
