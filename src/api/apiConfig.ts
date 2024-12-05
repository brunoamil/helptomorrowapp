import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  // headers: {
  //   Authorization:
  //     'Bearer MQ.1QdZ5zs-bM6ctmN9wHDQzr74zuD6E8qrWlCNoBaKsgpX3S6NjTJawj2bEzFc',
  // },
});
