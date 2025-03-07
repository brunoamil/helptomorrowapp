// import {asyncStorage} from './implementation/asyncStorage';
import {MMVKStorage} from './implementation/MMKVStorage';

export interface Storage {
  getItem: <T = unknown>(name: string) => Promise<T | null>;
  setItem: <T>(name: string, value: T) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

export let storage: Storage = MMVKStorage;

export function initializeStorage(storageImpl: Storage) {
  storage = storageImpl;
}
