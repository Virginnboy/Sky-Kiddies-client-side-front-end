import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:5000/user",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});
