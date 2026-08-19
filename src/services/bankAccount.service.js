import { api } from "../api/axios.js";

  export const fetchBankDetails = async ()=> {
  const response = await api.get("user/fetch-account");
  return response.data;
}