import axios from "axios";
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const restApi = axios.create({
  baseURL: BASE_URL,
    withCredentials:true
});
restApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
export { restApi };
