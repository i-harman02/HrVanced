import React from "react";
import { RxCross2 } from "react-icons/rx";

const AttendancePolicyModal = ({ onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Attendance Policy
            </h2>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              <RxCross2 size={22} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-5 text-sm text-gray-700 space-y-6">
            {/* Attendance Policy */}
            <div>
              <h3 className="font-semibold mb-2">
                Attendance Policy:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">Start Time:</span>{" "}
                  All employees must report to work by 9:30 a.m. sharp.
                </li>
                <li>
                  <span className="font-medium">Lateness/Absence:</span>{" "}
                  Inform HR and TL immediately in case of delay or absence.
                </li>
                <li>
                  <span className="font-medium">Leave Approval:</span>{" "}
                  Submit planned leave requests via Portal to your TL and HR in advance.
                </li>
                <li>
                  <span className="font-medium">Documentation:</span>{" "}
                  Provide valid documents for any lateness, absences, or early departures.
                </li>
              </ul>
            </div>

            {/* Hours of Work */}
            <div>
              <h3 className="font-semibold mb-2">
                Hours of Work: (Workweek)
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">
                    Monday to Friday (Trainees/Interns:
                  </span>{" "}
                  Monday to Saturday).
                </li>
                <li>
                  <span className="font-medium">Working hours:</span>{" "}
                  9:30 a.m. to 7:00 p.m. (Rotations as per project requirement)
                </li>
              </ul>
            </div>

            {/* Breaks */}
            <div>
              <h3 className="font-semibold mb-2">
                Breaks:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">Lunch:</span>{" "}
                  30 Minutes during 1:30 p.m. to 2:30 p.m.
                </li>
                <li>
                  <span className="font-medium">Tea:</span>{" "}
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
