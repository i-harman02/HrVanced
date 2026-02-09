import React from "react";
import MailTabs from "./MailTabs";
import { FiMail } from "react-icons/fi";

const Mail = () => {
  return (
    <div className=" border-0 lg:border bg-white border-gray-200 lg:rounded-xl min-h-full flex flex-col">
      <MailTabs />
    </div>
  );
};

export default Mail;
