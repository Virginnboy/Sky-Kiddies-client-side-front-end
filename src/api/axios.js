import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL; 
console.log("API_URL:", API_URL);

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use((response)=> response, (error)=> {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem("userData");
    localStorage.removeItem("userToken");

    // window.location.href = "/login";
  }

  return Promise.reject(error);
})