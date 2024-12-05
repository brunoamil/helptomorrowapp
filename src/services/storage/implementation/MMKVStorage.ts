import {MMKV} from 'react-native-mmkv';

import {Storage} from '../storage';

const MMKInstance = new MMKV();
export const MMVKStorage: Storage = {
  getItem: key => {
    const item = MMKInstance.getString(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  },
  setItem: async (key, value) => {
    MMKInstance.set(key, JSON.stringify(value));
  },
  removeItem: async key => MMKInstance.delete(key),
};
