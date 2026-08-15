import { io } from "socket.io-client";

export const socket = io("https://sky-kiddies-back-end.onrender.com", {
  withCredentials: true,
  auth: {
    type: "user"
  }
}); 