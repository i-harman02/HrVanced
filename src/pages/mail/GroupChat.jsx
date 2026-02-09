import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import api from "../../api/axios";
import socket from "../../socket";
import dayjs from "dayjs";
import { IoSend } from "react-icons/io5";
import { FiSend, FiUser, FiSmile, FiPaperclip, FiUsers } from "react-icons/fi";
import logo from "../../assets/vanced-logo.png";

const GroupChat = ({ groupId = "GROUP_ALL", groupName = "Vanced Solution" }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.user.user);
  const scrollRef = useRef(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/message/inbox?box=group&groupId=${groupId}`);
      setMessages(res.data.reverse());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const handleNewMessage = (msg) => {
      // Only add message if it's a group message and matches our current groupId
      if (msg.isGroup && msg.receiverId === groupId) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.on("newMail", handleNewMessage);
    return () => socket.off("newMail", handleNewMessage);
  }, [groupId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    try {
      await api.post("/message/send", { 
        body: inputValue, 
        isGroup: true,
        groupId: groupId // Pass the selected group ID
      });
      setInputValue("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-full  font-outfit relative">
      <div className="px-6 py-6 border-b border-gray-300 flex items-center justify-between z-10 transition-all duration-500">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-[#2C3EA1] rounded-xl flex items-center justify-center text-white ">
            <FiUsers size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-2xl tracking-tighter uppercase ">{groupName}</h3>
            <div className="flex items-center gap-3 mt-1">
               <div className="h-1 w-6 bg-[#2C3EA1] rounded-full" />
               <p className="text-[10px] text-[#2C3EA1] font-black uppercase tracking-[0.3em]">Active Data Link</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="hidden md:flex gap-1.5">
             {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-gray-100 rounded-full" />)}
           </div>
           <div className="px-4 py-2 bg-[#f2f3fb] text-[#2C3EA1] text-[10px] font-black tracking-[0.2em] rounded-full italic uppercase border border-indigo-100">
             {messages.length} Posts
           </div>
        </div>
      </div>

 
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8  bg-white/30 max-h-[400px] no-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="w-10 h-10 border-4 border-indigo-100 border-t-[#2C3EA1] rounded-full animate-spin" />
            <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest">Accessing_Data...</p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.senderId === (currentUser?.id || currentUser?._id);
            return (
              <div key={msg._id || idx} className={`flex flex-col ${isMe ? "items-end" : "items-start"} animate-in fade-in slide-in-from-bottom-2 mb-3 duration-700`}>
                {!isMe && (
                  <div className="flex items-center gap-3 mb-2 ml-1">
                    <div className="w-4 h-4 rounded bg-[#2C3EA1] flex items-center justify-center text-[10px]  text-white ">
                      {msg.senderName?.charAt(0)}
                    </div>
                    <span className="text-[10px] font-medium text-gray-800 uppercase ">{msg.senderName}</span>
                  </div>
                )}
                
                <div className={`group relative max-w-full ${isMe ? "bg-[#2C3EA1] text-white " : "bg-white text-gray-800 border border-gray-200"} px-6 py-2 rounded-[28px] ${isMe ? "rounded-tr-none" : "rounded-tl-none"} `}>
                  <p className="text-[15px]  leading-relaxed tabular-nums break-words whitespace-pre-wrap">{msg.body}</p>
                  <div className={`text-[12px] mt-1 uppercase tracking-widest  flex items-center gap-4 ${isMe ? "text-indigo-400" : "text-gray-300"}`}>
                    {dayjs(msg.createdAt).format("HH:mm")}
                    {isMe && <div className="flex gap-1"><div className="w-3 h-[2px] bg-indigo-300" /></div>}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

   
      <div className="p-6 bg-white/50 backdrop-blur-xl border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center gap-6 max-w-6xl mx-auto">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-6 flex items-center text-gray-300"><FiSmile size={22} /></div>
            <input
              placeholder={`Send message`}
              className="w-full h-12 pl-16 pr-16 bg-white border border-gray-200 rounded text-sm fon-semibold  transition-all outline-none placeholder:text-gray-300 "
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="absolute inset-y-0 right-6 flex items-center text-gray-300"><FiPaperclip size={20} /></div>
          </div>

          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="w-12 h-12 bg-[#2C3EA1] text-white rounded-2xl flex items-center justify-center  "
          >
            <IoSend size={18} className="ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default GroupChat;
