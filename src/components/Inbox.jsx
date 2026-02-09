import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import socket from '../socket';
import GroupImg from "../assets/Group.png";

const Inbox = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    // Fetch unread count
    api.get("/message/inbox")
      .then(res => {
        const unread = res.data.filter(m => !m.isRead).length;
        setUnreadCount(unread);
      })
      .catch(() => setUnreadCount(0));

    // Listen for new mail
    const handleNewMail = () => {
      setUnreadCount(prev => prev + 1);
    };

    socket.on("newMail", handleNewMail);

    return () => {
      socket.off("newMail", handleNewMail);
    };
  }, []);

  return (
    <Link to="/mail" className="">
      <div className="border border-gray-200 rounded-2xl p-6 md:p-8 bg-white transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-gray-500 font-semibold text-sm tracking-tight">
                Messages
              </span>
              {unreadCount > 0 && (
                <span className="flex h-5 px-1.5 items-center justify-center bg-red-500 text-white  rounded-full animate-bounce">
                  {unreadCount}
                </span >
              )}
            </div>
            
            <h2 className="text-gray font-bold text-gray-900 mb-2 mt-auto ">
              {unreadCount > 0 ? `You have ${unreadCount} new messages` : "Your inbox is clear"}
            </h2>
            <p className="text-sm text-gray-400 font-medium">
              {unreadCount > 0 
                ? "Click here to read your latest communications." 
                : "Good job! You have no pending actions."}
            </p>
          </div>

          <div className="shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            <img src={GroupImg} alt="Inbox" className="w-24 md:w-32" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Inbox;