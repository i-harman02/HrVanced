import React from "react";
import { FaStar } from "react-icons/fa6";

const MailList = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="p-6 border border-bordergray rounded-xl flex items-start gap-4">
          <div>
            <button className="text-[#ED8A19]">
              <FaStar />
            </button>
          </div>
          <div>
            <h3 className="text-heading text-sm font-bold mb-3">Aastha</h3>
            <p className="text-textgray text-sm mb-5 leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore m...
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-textgray">Dec 1, 2025</span>
              <span className="text-xs color-primary bg-[#4F39F6]/5 leading-none border-[0.5px] rounded-sm border-[#2C3EA1] py-0.75 px-2">
                New
              </span>
            </div>
          </div>
        </div>
        <div className="p-6 border border-bordergray rounded-xl flex items-start gap-4">
          <div>
            <button className="text-[#ED8A19]">
              <FaStar />
            </button>
          </div>
          <div>
            <h3 className="text-heading text-sm font-bold mb-3">Spam</h3>
            <p className="text-textgray text-sm mb-5 leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore m...
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-textgray">Dec 1, 2025</span>
              <span className="text-xs color-primary bg-[#4F39F6]/5 leading-none border-[0.5px] rounded-sm border-[#2C3EA1] py-0.75 px-2">
                New
              </span>
            </div>
          </div>
        </div>
        <div className="p-6 border border-bordergray rounded-xl flex items-start gap-4">
          <div>
            <button className="text-[#ED8A19]">
              <FaStar />
            </button>
          </div>
          <div>
            <h3 className="text-heading text-sm font-bold mb-3">
              John Martinez
            </h3>
            <p className="text-textgray text-sm mb-5 leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore m...
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-textgray">Dec 1, 2025</span>
              <span className="text-xs text-[#75B51D] bg-[#75B51D]/5 leading-none border-[0.5px] rounded-sm border-[#75B51D] py-0.75 px-2">
                Replied
              </span>
            </div>
          </div>
        </div>
        <div className="p-6 border border-bordergray rounded-xl flex items-start gap-4">
          <div>
            <button className="text-[#ED8A19]">
              <FaStar />
            </button>
          </div>
          <div>
            <h3 className="text-heading text-sm font-bold mb-3">Anna Park</h3>
            <p className="text-textgray text-sm mb-5 leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore m...
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-textgray">Dec 1, 2025</span>
              <span className="text-xs color-primary bg-[#4F39F6]/5 leading-none border-[0.5px] rounded-sm border-[#2C3EA1] py-0.75 px-2">
                New
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MailList;
