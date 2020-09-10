import axios from 'axios';
const instance = axios.create({
    baseURL:'https://burger-shop-e2bb7.firebaseio.com/'
});

export default instance;