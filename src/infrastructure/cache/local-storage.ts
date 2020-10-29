import Cache from './cache';

export default class LocalStorage implements Cache {
  clear(): void {
    localStorage.clear();
  }

  get(key: string): any {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }

    return JSON.parse(value);
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
