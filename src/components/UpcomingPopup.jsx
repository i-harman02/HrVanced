import React from "react";

const UpcomingPopup = ({ onClose }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[999]" onClick={onClose} />

      <div className="fixed top-0 right-0 h-screen w-[550px] bg-white z-[1000] shadow-xl p-6">
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <h3 className="font-bold text-2xl"> Holidays 2026</h3>
          <button className="font-bold text-2xl" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="p-4  border-0 lg:border bg-white border-gray-200 lg:rounded-xl">
          <div className="grid grid-cols-3 pb-2 border-b border-gray-300">
            <div>Name</div>
            <div>Date</div>
            <div></div>
          </div>
          <div className="grid grid-cols-3 pb-2 border-b border-gray-300">
            <div className="text-sm text-gray-200 ">Name</div>
            <div className="text-sm text-gray-200">Date</div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingPopup;
