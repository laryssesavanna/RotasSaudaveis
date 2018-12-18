import axios from 'axios';

export const http = axios.create({
  // baseURL: 'http://localhost:1026/v1/'
  headers: { 'Accept': 'application/json' }
});