import { api } from "../api/axios.js"

export const fetchAllProducts = async () => {
  const response = await api.get("user/product/products/");
  return response.data;
};

export const searchProducts = async (search)=> {
  const response = await api.get(`user/product/products?search=${search}`);
  return response.data;
};