import React from "react";
import { RxCross2 } from "react-icons/rx";

const LeaveReasonModal = ({ onClose, reason }) => {
  return (
    <>
          <div
            className="fixed inset-0 bg-black/20 z-[60]"
            onClick={onClose}
          />
    
          <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-140 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/30">
                <h2 className="text-base font-bold text-gray-900 leading-tight">
                  Leave Reason
                </h2>
    
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <RxCross2 size={20} />
                </button>
              </div>
    
              <div className="p-8 text-sm text-gray-700 leading-relaxed bg-white">
                <p className="whitespace-pre-wrap">{reason || "No reason provided."}</p>
              </div>
            </div>
          </div>
        </>
  )
}

export default LeaveReasonModal;