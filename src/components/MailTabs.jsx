import React, { useState } from "react";
import MailList from "./MailList";
import MailView from "./MailView";
import SearchFilter from "./Search";

const MailTabs = () => {
  const [activeTab, setActiveTab] = useState("all");
  return (
    <>
      <div className="flex items-center gap-8 border-t-1 border-b-1 border-bordergray -mx-8 px-8">
        <button
          onClick={() => setActiveTab("all")}
          className={`text-sm font-medium py-5 border-b-2 flex items-center gap-2 ${
            activeTab === "all"
              ? "color-primary border-[#2C3EA1]"
              : "text-heading border-transparent"
          }`}
        >
          All Mails
          <span
            className={`bg-[#4F39F6]/8 w-5 h-5 rounded-sm flex items-center justify-center text-xs font-medium ${
              activeTab === "all" ? "bg-[#4F39F6]/8" : "bg-gray-200"
            }`}
          >
            4
          </span>
        </button>
        <button
          onClick={() => setActiveTab("unread")}
          className={`text-sm font-medium py-5 flex items-center gap-2 border-b-2 ${
            activeTab === "unread"
              ? "color-primary border-[#2C3EA1]"
              : "text-heading border-transparent"
          }`}
        >
          Unread
          <span
            className={`bg-[#4F39F6]/8 w-5 h-5 rounded-sm flex items-center justify-center text-xs font-medium ${
              activeTab === "unread" ? "bg-[#4F39F6]/8" : "bg-gray-200"
            }`}
          >
            3
          </span>
        </button>
        <button
          onClick={() => setActiveTab("starred")}
          className={`text-sm font-medium py-5 flex items-center gap-2 border-b-2 ${
            activeTab === "starred"
              ? "color-primary border-[#2C3EA1]"
              : "text-heading border-transparent"
          }`}
        >
          Starred
          <span
            className={`bg-[#4F39F6]/8 w-5 h-5 rounded-sm flex items-center justify-center text-xs font-medium ${
              activeTab === "starred" ? "bg-[#4F39F6]/8" : "bg-gray-200"
            }`}
          >
            4
          </span>
        </button>
        <button
          onClick={() => setActiveTab("replied")}
          className={`text-sm font-medium py-5 flex items-center gap-2 border-b-2 ${
            activeTab === "replied"
              ? "color-primary border-[#2C3EA1]"
              : "text-heading border-transparent"
          }`}
        >
          Replied
          <span
            className={`bg-[#4F39F6]/8 w-5 h-5 rounded-sm flex items-center justify-center text-xs font-medium ${
              activeTab === "replied" ? "bg-[#4F39F6]/8" : "bg-gray-200"
            }`}
          >
            1
          </span>
        </button>
      </div>

      <div className="pt-8">
        <div className="flex gap-3 mb-8">
          <SearchFilter />
          <button
            type="button"
            className="bg-primary text-white text-sm font-medium cursor-pointer px-5 py-3 rounded-sm leading-[0.86]"
          >
            Compose
          </button>
        </div>

        {activeTab === "all" && (
          <div className="grid grid-cols-[1fr_2fr] items-start gap-8">
            <MailList/>
            <MailView/>
          </div>
        )}
        {activeTab === "unread" && (
          <p className="text-sm text-textgray">Unread mails content</p>
        )}

        {activeTab === "starred" && (
          <p className="text-sm text-textgray">Starred mails</p>
        )}

        {activeTab === "replied" && (
          <p className="text-sm text-textgray">Replied mails</p>
        )}
      </div>
    </>
  );
};

export default MailTabs;
