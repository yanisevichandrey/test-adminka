import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://test-adminka.firebaseio.com/'
});

export default instance;