import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import { setNotification } from "../slices/notification";

const SocketListener = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification);
  const hasNotifications = Object.values(notifications).some(Boolean);

  useEffect(() => {
    socket.on("newMail", (mail) => {
      dispatch(setNotification("mail"));
      if (mail.isGroup) {
        dispatch(setNotification("mailGroups"));
      } else {
        dispatch(setNotification("mailInbox"));
      }
    });
    socket.on("newMessage", () => dispatch(setNotification("message")));
    socket.on("newEmployee", () => dispatch(setNotification("team")));

    return () => {
      socket.off("newMail");
      socket.off("newMessage");
      socket.off("newEmployee");
    };
  }, [dispatch]);

  useEffect(() => {
    if (hasNotifications) {
      document.title = `● Vanced Solutions`;
    } else {
      document.title = "Vanced Solutions";
    }
  }, [hasNotifications]);

  return null;
};

export default SocketListener;

