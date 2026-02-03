import React from "react";
import { RxCross2 } from "react-icons/rx";

const LeaveReasonModal = ({ onClose }) => {
  return (
    <>
          <div
            className="fixed inset-0 bg-black/20 z-50"
            onClick={onClose}
          />
    
          <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-173.5">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-bordergray">
                <h2 className="text-sm font-bold text-black leading-tight">
                  Employee Reason
                </h2>
    
                <button
                  onClick={onClose}
                  className="text-black cursor-pointer"
                >
                  <RxCross2 size={22} />
                </button>
              </div>
    
              <div className="p-4 text-sm text-textgray space-y-6">
                <p className="text-textgray text-sm">I will be going home to attend my brother’s wedding function. Kindly grant me leave for this period.</p>
              </div>
            </div>
          </div>
        </>
  )
}

export default LeaveReasonModal;