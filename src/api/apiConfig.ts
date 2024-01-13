import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/',
  headers: {
    Authorization:
      'Bearer NA.CMkqhtq4HzA46IcpF4JHahU0hGQz-MdoUmyEJJY-8PvFep4WBFnBRpt8fXHH',
  },
});
