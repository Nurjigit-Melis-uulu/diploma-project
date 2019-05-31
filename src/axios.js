import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kyz-kuumay.firebaseio.com/'
});

export default instance;