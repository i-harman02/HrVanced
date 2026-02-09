import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import dayjs from "dayjs";

const MailList = ({ box = "inbox", mails, onSelect, selectedMail, currentUser }) => {
  if (!mails || mails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50/10 rounded-3xl border border-dashed border-gray-00">
        <h3 className="text-gray-400 font-black uppercase tracking-widest text-[11px] italic">No active nodes in this directory</h3>
      </div>
    );
  }

  const userId = currentUser?._id || currentUser?.id;

  return (
    <div className="flex flex-col gap-4 max-h-full overflow-y-auto pr-2 ">
      {mails.map((mail) => {
        const isSentByMe = mail.senderId === userId;
        const displayName = isSentByMe ? mail.receiverName : mail.senderName;
        const isUnread = !isSentByMe && !mail.isRead;

        return (
          <div
            key={mail._id}
            onClick={() => onSelect(mail)}
            className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300  border border-gray-200${
              selectedMail?._id === mail._id 
                ? "bg-[#F9FAFF] border-indigo-200 " 
                : "bg-white border-gray-200 "
            }`}
          >
            <div className="flex items-start gap-4 mb-3">
               <div className="mt-1">
                  <FaStar size={14} className={mail.isStarred ? "text-orange-400" : "text-gray-600 group-hover:text-orange-200"} />
               </div>
               <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                     <h3 className={`text-[15px] ${selectedMail?._id === mail._id || isUnread ? "font-black text-gray-900" : "font-bold text-gray-600"}`}>
                       {displayName}
                     </h3>
                     {isSentByMe && (
                       <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-50 px-1.5 py-0.5 rounded-md">Sent</span>
                     )}
                  </div>
                  <p className={`text-[12px] leading-relaxed line-clamp-2 ${isUnread ? "text-gray-700 font-semibold" : "text-gray-400 font-medium"}`}>
                     {mail.body}
                  </p>
               </div>
            </div>

            <div className="flex items-center justify-between mt-4">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ">
                  {dayjs(mail.createdAt).format("MMM DD, YYYY")}
               </span>
               {isUnread && (
                 <span className="px-2.5 py-1 bg-[#2C3EA1] text-white text-[9px] font-semibold uppercase tracking-widest rounded-md  ">
                   New
                 </span>
               )}
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default MailList;
