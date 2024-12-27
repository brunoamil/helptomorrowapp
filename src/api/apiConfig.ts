import axios from 'axios';

export const BASE_URL = 'http://localhost:3333/';
export const api = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   Authorization:
  //     'Bearer MQ.1QdZ5zs-bM6ctmN9wHDQzr74zuD6E8qrWlCNoBaKsgpX3S6NjTJawj2bEzFc',
  // },
});
