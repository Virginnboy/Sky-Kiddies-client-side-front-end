import { api } from "../api/axios.js"

export const fetchAllProducts = async () => {
  const response = await api.get("/products");

  return response.data
};

export const searchProducts = async (search)=> {
  const response = await api.get(`/products?search=${search}`);

  return response.data
};

export const formattedCurrency = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN"
  });