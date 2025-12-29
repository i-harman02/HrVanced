import React, { useState } from "react";

const ResignationModal = ({ onClose }) => {
  const [resignationDate, setResignationDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { resignationDate, reason });
    alert("Resignation submitted successfully!");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setResignationDate("");
    setReason("");
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-999" onClick={onClose} />

      <div className="fixed top-0 right-0 h-screen w-[36%] min-w-[320px] bg-white z-1000 shadow-xl p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 px-6 pb-6 lg:px-8 lg:pb-8 -mx-6 lg:-mx-8">
          <h3 className="font-bold text-2xl text-heading leading-tight">
            Add Resignation
          </h3>
          <button
            className="font-bold text-2xl cursor-pointer"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="block text-sm text-heading font-medium mb-2.5">
              Resignation Date
            </label>
            <div className="relative">
              <input
                type="date"
                placeholder="Dec 1, 2025"
                onChange={(e) => setResignationDate(e.target.value)}
                className="w-full px-2.5 py-2 border border-bordergray rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2C3EA1]/15 text-sm leading-none"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm text-heading font-medium mb-2.5">
              Reason
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Type Your Reason Here....."
              rows={6}
              className="w-full px-2.5 py-2 border border-bordergray rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2C3EA1]/15 text-sm leading-none resize-none placeholder-[#71717B]"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-50 text-textgray text-sm font-medium cursor-pointer px-3.5 py-2.5 border border-bordergray rounded-sm leading-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white text-sm font-medium cursor-pointer px-3.5 py-2.5 border border-borderprimary rounded-sm leading-none"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResignationModal;
