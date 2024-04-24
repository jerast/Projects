import axios from 'axios';

const shopApi = axios.create({
	baseURL: import.meta.env.VITE_AURAB_APIURL || 'http://192.168.0.1:1000/',
});

shopApi.interceptors.request.use( config => {
   config.headers = {
      ...config.headers,
      'x-token': localStorage.getItem('sessionToken')
   };

   return config;
});

export { shopApi };
