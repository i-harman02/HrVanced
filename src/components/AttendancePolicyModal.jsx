import React from "react";
import { RxCross2 } from "react-icons/rx";

const AttendancePolicyModal = ({ onClose }) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-50"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-173.5">
          {/* Header */}
          <div className="flex items-center justify-between p-6 md:p-8 border-b border-bordergray">
            <h2 className="text-2xl font-bold text-black leading-tight">
              Attendance Policy
            </h2>

            <button
              onClick={onClose}
              className="text-black cursor-pointer"
            >
              <RxCross2 size={22} />
            </button>
          </div>

          <div className="p-6 md:px-8 md:pt-6 md:pb-8 text-sm text-textgray space-y-6">
            <div>
              <h3 className="font-semibold text-black text-base mb-3">
                Attendance Policy:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium text-black">Start Time:</span>{" "}
                  All employees must report to work by 9:30 a.m. sharp.
                </li>
                <li>
                  <span className="font-medium text-black">Lateness/Absence:</span>{" "}
                  Inform HR and TL immediately in case of delay or absence.
                </li>
                <li>
                  <span className="font-medium text-black">Leave Approval:</span>{" "}
                  Submit planned leave requests via Portal to your TL and HR in advance.
                </li>
                <li>
                  <span className="font-medium text-black">Documentation:</span>{" "}
                  Provide valid documents for any lateness, absences, or early departures.
                </li>
              </ul>
            </div>

            {/* Hours of Work */}
            <div>
              <h3 className="font-semibold text-black text-base mb-3">
                Hours of Work: (Workweek)
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium text-black">
                    Monday to Friday (Trainees/Interns:
                  </span>{" "}
                  Monday to Saturday).
                </li>
                <li>
                  <span className="font-medium text-black">Working hours:</span>{" "}
                  9:30 a.m. to 7:00 p.m. (Rotations as per project requirement)
                </li>
              </ul>
            </div>

            {/* Breaks */}
            <div>
              <h3 className="font-semibold text-black text-base mb-3">
                Breaks:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium text-black">Lunch:</span>{" "}
                  30 Minutes during 1:30 p.m. to 2:30 p.m.
                </li>
                <li>
                  <span className="font-medium text-black">Tea:</span>{" "}
                  15–15 Minutes during 10:30 a.m.–11:00 a.m. and 4:00 p.m.–4:30 p.m.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendancePolicyModal;
