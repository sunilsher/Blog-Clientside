import axios from 'axios';

let axiosInstance = axios.create({
    timeout: 10000,
});

axiosInstance.interceptors.request.use(config=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error=>Promise.reject(error))

export default axiosInstance;