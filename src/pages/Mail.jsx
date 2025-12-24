import React from "react";
import MailTabs from "../components/MailTabs";

const Mail = () => {
  return (
    <>
      <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl">
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
