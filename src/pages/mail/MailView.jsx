import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import dayjs from "dayjs";
import {
  FiTrash2,
//   FiStar,
//   FiCornerUpLeft,
//   FiMoreVertical,
  FiMail,
//   FiSend,
} from "react-icons/fi";

const MailView = ({ box = "inbox", mail, onUpdate, onDelete, currentUser }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const [sending, setSending] = useState(false);
  const [replies, setReplies] = useState([]);


  useEffect(() => {
    if (mail?._id && !mail.isRead && box === "inbox") {
      api.patch(`/message/read/${mail._id}`).then(() => {
        if (onUpdate) onUpdate(mail._id, { isRead: true });
      });
    }
  }, [mail, onUpdate, box]);

  const handleDelete = async () => {
    if (!mail?._id) return;
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await api.delete(`/message/delete/${mail._id}`);
        if (onDelete) onDelete(mail._id);
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  if (!mail) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white p-8 text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <FiMail className="w-10 h-10 text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 uppercase tracking-widest ">
          Node Not Selected
        </h3>
      </div>
    );
  }

  const userId = currentUser?._id || currentUser?.id;
  const isSentByMe = mail.senderId === userId;
  const displayName = isSentByMe ? mail.receiverName : mail.senderName;
  const displayEmail = isSentByMe ? mail.receiverEmail : mail.senderEmail;

  const handleSendReply = async () => {
    if (!replyBody.trim()) return;

    const receiverId =
      mail.senderId === userId ? mail.receiverId : mail.senderId;
      const optimisticReply = {
    _id: Date.now(), // temp id
    senderName: currentUser?.name || "You",
    senderEmail: currentUser?.email || "",
    body: replyBody,
    createdAt: new Date(),
  };

  setReplies((prev) => [...prev, optimisticReply]);

    try {
      setSending(true);

      await api.post("/message/send", {
        receiverId,
        subject: mail.subject ? `Re: ${mail.subject}` : "Re: No Subject",
        body: replyBody,
        isGroup: false,
      });

      setReplyBody("");
      setIsReplying(false);

      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("Reply failed:", err);
      alert("Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-full bg-white flex flex-col relative overflow-hidden p-6">
      <div className="mb-10 flex items-start justify-between">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center text-xl font-black text-indigo-600 ">
            {displayName?.charAt(0)}
          </div>
          <div>
            <h4 className="text-lg text-gray-900 leading-tight">
              {displayName}
            </h4>
            <p className="text-[12px] text-gray-800 mt-0.5">
              {displayEmail} , Miami, FL
            </p>
          </div>
        </div>
        <div className="text-right flex items-center gap-4">
          <span className="text-[10px] font-semibold text-gray-800 uppercase tracking-widest tabular-nums">
            {dayjs(mail.createdAt).format("M/D/YYYY, hh:mm:ss A")}
          </span>
          <button
            onClick={handleDelete}
            className="h-8 w-8 bg-white border border-gray-200 rounded flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-100 transition-all"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto  pr-4">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tighter leading-tight mb-8">
          {mail.subject || "No Subject Defined"}
        </h1>

        <div className="text-[16px] leading-relaxed text-gray-600  whitespace-pre-line">
          {mail.body}
        </div>
        {replies.length > 0 && (
  <div className="mt-10 space-y-6">
   

    {replies.map((reply) => (
      <div
        key={reply._id}
        className="border-l-4 border-indigo-500 pl-4"
      >
        <div className="text-sm font-semibold text-gray-800">
          {reply.senderName}(Me)
        </div>

        <div className="text-xs text-gray-400 mb-1">
          {dayjs(reply.createdAt).format("MMM D, YYYY h:mm A")}
        </div>

        <div className="text-gray-700 whitespace-pre-wrap break-words">
          {reply.body}
        </div>
      </div>
    ))}
  </div>
)}

      </div>

      <textarea
        value={replyBody}
        onChange={(e) => setReplyBody(e.target.value)}
        placeholder="Type your reply..."
        className="w-full min-h-[120px] resize-none rounded border mt-3 border-gray-200 p-3 text-sm text-gray-700 focus:outline-none  break-words"
      />

      <div className="mt-4 flex justify-end gap-3">
        <div>
          <button
            onClick={handleSendReply}
            disabled={!replyBody.trim() || sending}
            className="px-5 py-2 bg-[#2C3EA1] text-white text-sm rounded hover:bg-[#2C3EA1] disabled:opacity-50"
          >
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailView;
