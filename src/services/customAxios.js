import axios from 'axios';
import { AsyncStorage } from 'react-native'

const axi = axios.create({
    baseURL: 'http://192.168.1.30:8080/api/v1/'
});

axi.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = "Bearer " + JSON.parse(token).access_token
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
);

export default axi;