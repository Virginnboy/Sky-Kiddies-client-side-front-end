  import { api } from "../api/axios";
  
  export const forgotPassword = async (email) => {
    try {
      const response = await api.post("user/forgot-password", {email})

    return response.data
    }catch (err) {
      console.log(err)
      throw err
    }
  }

  export const resetPassword = async () => {
    try {
      const response = await api.post(`user/reset-password/${resetToken}`) 

    return response.data
    } catch (err) {
      console.log(err)
      throw err 
    }
  }

  export const getUser = async () => {
    try {
      const response = await api.get("/user/me");
      
      return response.data
      
    }catch (err) {
      console.log(err)
      throw err
    }
  }

  export const logOut = async() => {
    try {
      const response = await api.post( "user/logout", {}, {withCredentials: true} );
    
      return response.data;
    }catch (err) {
      console.log(err)
      throw err
    }
  };