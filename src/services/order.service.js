import { api } from "../api/axios.js";

export const placeOrder = async(formData)=> {
  const response = await api.post("user/order/place-order", formData);
  return response.data;
}

export const fetchUserOrder = async () => {
  const response = await api.get("user/order/fetch-user-order");
  return response.data;
}