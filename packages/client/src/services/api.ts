import axios from 'axios';

const api = axios.create({
  baseURL: 'http://df214814c77b.ngrok.io',
});

export default api;
