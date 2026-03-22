import { io } from "socket.io-client";

const token = localStorage.getItem("userToken")

export const socket = io("https://sky-kiddies-back-end.onrender.com", {
  auth: {token}
});