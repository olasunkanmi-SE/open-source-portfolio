/* eslint-disable @typescript-eslint/no-explicit-any */
export class Index {
  private memory: Map<string, any>;

  constructor() {
    this.memory = new Map();
  }

  allocate(key: string, value: any): void {
    this.memory.set(key, value);
  }

  update(key: string, value: any): void {
    this.memory.set(key, value);
  }

  get(key: string): any {
    return this.memory.get(key);
  }

  has(key: string): boolean {
    return this.memory.has(key);
  }

  delete(key: string): boolean {
    return this.memory.delete(key);
  }
}
