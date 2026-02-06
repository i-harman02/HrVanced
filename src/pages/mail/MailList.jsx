import React from "react";
import { FaStar } from "react-icons/fa6";

const MailList = ({ mails, onSelect }) => {
  if (!mails.length) {
    return <p className="text-gray-400">No messages</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {mails.map((mail) => (
        <div
          key={mail._id}
          onClick={() => onSelect(mail)}
          className={`p-6 border rounded-xl cursor-pointer hover:bg-gray-50 ${
            !mail.isRead ? "bg-blue-50" : ""
          }`}
        >
          <h3 className="font-bold text-sm">
            {mail.senderName}
          </h3>

          <p className="text-sm text-gray-500">
            {mail.body.slice(0, 60)}...
          </p>

          <span className="text-xs text-gray-400">
            {new Date(mail.createdAt).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MailList;
