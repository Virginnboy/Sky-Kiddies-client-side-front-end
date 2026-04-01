import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:5000",
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