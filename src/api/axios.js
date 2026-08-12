import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL; 
console.log("API_URL:", API_URL);

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

api.interceptors.response.use((response)=> response, (error)=> {
  console.log(error);
  if (error.response && error.response.status === 401) {
    localStorage.removeItem("userData");
  }

  return Promise.reject(error);
});