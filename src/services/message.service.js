import { api } from "../api/axios.js";

export const fetchMessages = async (adminId) => {
  const response = await api.get(`user/fetch_messages/${adminId}`);
  return response.data;
}