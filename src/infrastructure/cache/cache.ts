interface Cache {
  get(key: string): any;
  set(key: string, value: any): void;
  clear(): void;
}

export default Cache;
