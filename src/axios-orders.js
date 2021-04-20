import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://lern-react-burger.firebaseio.com/',
});

export default instance;
