import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://'
});

export default instance;