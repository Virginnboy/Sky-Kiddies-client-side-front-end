import axios from "axios"

export const api = axios.create({
  baseURL: "https://sky-kiddies-back-end.onrender.com",
  withCredentials: true
});


api.interceptors.response.use((response)=> response, 
(error)=> {
  return Promise.reject(error)
})