import { io } from "socket.io-client";

const token = localStorage.getItem("token");

const payload = token
  ? JSON.parse(atob(token.split(".")[1]))
  : null;

const socket = io(import.meta.env.VITE_API_URL.replace("/api", ""), {
  auth: {
    userId: payload?.userId
  }
});

export default socket;
