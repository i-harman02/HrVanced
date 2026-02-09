import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import socket from "../socket";
import { toast } from "react-toastify";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    const handleNewMail = (mail) => {
      // Only show toast if not already on the mail page
      if (location.pathname !== "/mail") {
        toast.info(`New message from ${mail.senderName}: ${mail.subject}`, {
          icon: "✉️",
          style: { borderRadius: "12px", fontWeight: "bold" }
        });
      }
    };

    socket.on("newMail", handleNewMail);

    return () => {
      socket.off("newMail", handleNewMail);
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="w-full flex-1 overflow-auto pt-14 p-0 lg:p-8 ms-0 lg:ms-65">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
