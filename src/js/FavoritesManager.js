// FavoritesManager.js - manages favorite menu items
export class FavoritesManager {
  static STORAGE_KEY = 'mini-food-truck-favorites';
  constructor() {
    this.favorites = this.load();
  }
  get() {
    return this.favorites;
  }
  isFavorite(id) {
    return this.favorites.includes(id);
  }
  add(id) {
    if (!this.favorites.includes(id)) {
      this.favorites.push(id);
      this.save();
    }
  }
  remove(id) {
    this.favorites = this.favorites.filter(fid => fid !== id);
    this.save();
  }
  toggle(id) {
    if (this.isFavorite(id)) {
      this.remove(id);
    } else {
      this.add(id);
    }
  }
  save() {
    localStorage.setItem(FavoritesManager.STORAGE_KEY, JSON.stringify(this.favorites));
  }
  load() {
    try {
      return JSON.parse(localStorage.getItem(FavoritesManager.STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }
}
