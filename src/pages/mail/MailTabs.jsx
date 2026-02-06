import React, { useEffect, useState } from "react";
import MailList from "./MailList";
import MailView from "./MailView";
import ComposeModal from "./ComposeModal";
import api from "../../api/axios";
import socket from "../../socket";

const MailTabs = () => {
  const [mails, setMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [openCompose, setOpenCompose] = useState(false);

  useEffect(() => {
  api.get("/message/inbox")
    .then(res => setMails(res.data))
    .catch(() => setMails([]));

  socket.on("newMail", mail => {
    setMails(prev => [mail, ...prev]);
  });

  return () => socket.off("newMail");
}, []);


  return (
    <>
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setOpenCompose(true)}
          className="bg-primary text-white px-5 py-3 rounded-sm text-sm"
        >
          Compose
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_2fr] gap-8">
        <MailList mails={mails} onSelect={setSelectedMail} />
        <MailView mail={selectedMail} />
      </div>

      {openCompose && (
        <ComposeModal
          onClose={() => setOpenCompose(false)}
          onSent={(newMail) =>
            setMails((prev) => [newMail, ...prev])
          }
        />
      )}
    </>
  );
};

export default MailTabs;
