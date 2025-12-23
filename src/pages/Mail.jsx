import React from "react";
import MailTabs from "../components/MailTabs";

const Mail = () => {
  return (
    <>
      <div className="bg-white p-8 border border-bordergray rounded-xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-heading leading-tight">
            Inbox
          </h1>
        </div>
        <MailTabs/>
      </div>
    </>
  );
};

export default Mail;
