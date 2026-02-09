import { useEffect } from "react";
import { useDispatch } from "react-redux";
import socket from "../socket";
import { setNotification } from "../slices/notification";

const SocketListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("newMail", () => dispatch(setNotification("mail")));
    socket.on("newMessage", () => dispatch(setNotification("message")));


    return () => {
      socket.off("newMail");
      socket.off("newMessage");
      
    };
  }, [dispatch]);

  return null;
};

export default SocketListener;
