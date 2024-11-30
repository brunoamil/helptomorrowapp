import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    Authorization:
      'Bearer Nw.uIxtFWCmy4hMf0FoL6N3U8Yw9YcXAh6gbYPHG1UMG7qwoK-y3-2sE4qBONdB',
  },
});
