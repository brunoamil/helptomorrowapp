import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/',
  headers: {
    Authorization:
      'Bearer MzQ.SO4hWRQKSvFvha2dmOMnUjhz6QfVfPssQvQ3-V6hKpIg6S1sUnDmKkbNtQeO',
  },
});
