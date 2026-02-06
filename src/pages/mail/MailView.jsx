import React, { useEffect } from "react";
import api from "../../api/axios";

const MailView = ({ mail }) => {
  useEffect(() => {
    if (mail?._id && !mail.isRead) {
      api.patch(`/message/read/${mail._id}`);
    }
  }, [mail]);

  if (!mail) {
    return <p className="text-gray-400">Select a mail to read</p>;
  }

  return (
    <div className="border rounded-xl p-8">
      <h2 className="text-xl font-bold mb-2">{mail.subject}</h2>

      <p className="text-sm text-gray-500 mb-6">
        {mail.senderName} ({mail.senderEmail || "N/A"})
      </p>

      <p className="text-gray-700 whitespace-pre-line">
        {mail.body}
      </p>
    </div>
  );
};

export default MailView;
