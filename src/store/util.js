import { api } from "../api/axios.js"

export const fetchAllProducts = async () => {
  try {
    const response = await api.get("user/products/");
    return response.data
  }catch (err) {
    console.log(err)
    throw err
  }
};

export const searchProducts = async (search)=> {
  const response = await api.get(`user/products?searc=${search}`);

  return response.data
};

  export const addToCart = async({productId}) => {
    const response = await api.post("cart/add", {productId});
    return response.data
  };

  export const fetchCart = async ()=> {
    try {
      const response = await api.get("cart/fetch-cart");
      return response.data
    }catch (err) {
      console.log(err)
      throw err
    }
  };

  export const removeItem = async (id) => {
    try {
      const response = await api.delete(`cart/remove/${id}`)
      return response.data
    }catch (err) {
      console.log(err)
      throw err
    }
  };

  export const updateItemQuantity = async (id, quantity) => {
    try {
      const response = await api.patch(`cart/update/${id}`, { quantity });
      return response.data
    }catch (err) {
      console.log(err)
      throw err
    }
  }

  export const fetchBankDetails = async ()=> {
  try {
    const response = await api.get("user/fetch-account");

    return response.data

  } catch(err) {
    console.log(err)
    throw err
  }
}