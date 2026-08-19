import { api } from "../api/axios.js"

export const addToCart = async({productId}) => {
  const response = await api.post("cart/add", {productId});
  return response.data;
};

export const fetchCart = async ()=> {
  const response = await api.get("cart/fetch-cart");
  return response.data;
};

export const removeItem = async (id) => {
  const response = await api.delete(`cart/remove/${id}`);
  return response.data;
};

export const updateItemQuantity = async (id, quantity) => {
  const response = await api.patch(`cart/update/${id}`, { quantity });
  return response.data;
}