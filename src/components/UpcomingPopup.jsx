import React from "react";
import { RxCross2 } from "react-icons/rx";
const UpcomingPopup = ({ onClose }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[999]" onClick={onClose} />

      <div className="fixed top-0 right-0 h-screen w-[700px] bg-white z-[1000] shadow-xl p-6">
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <h3 className="font-bold text-2xl"> Holidays 2026</h3>
          <button className="font-bold text-2xl" onClick={onClose}>
            <RxCross2 />
          </button>
        </div>

        <div className="  border-0 lg:border bg-white border-gray-200 lg:rounded-xl">
          <div className="p-4">
            <div className="grid grid-cols-2 pb-2 pt-2 border-b border-gray-300">
              <div className="font-bold text-sm">Name</div>
              <div className="font-bold text-sm">Date</div>
            </div>
            <div className="grid grid-cols-2 pb-2 pt-2 border-b border-gray-300">
              <div className="text-sm text-gray-400  ">Republic Day</div>
              <div className="text-sm text-gray-400">26 Jan 2026</div>
            </div>
            <div className="grid grid-cols-2 pb-2 pt-2 border-b border-gray-300">
              <div className="text-sm text-gray-400 ">Holi</div>
              <div className="text-sm text-gray-400">24 March 2026</div>
            </div>
            <div className="grid grid-cols-2 pb-2 pt-2 border-b border-gray-300">
              <div className="text-sm text-gray-400 ">Independence Day</div>
              <div className="text-sm text-gray-400">15-Aug-2026</div>
            </div>
            <div className="grid grid-cols-2 pb-2 pt-2 border-b border-gray-300">
              <div className="text-sm text-gray-400 ">
                Mahatma Gandhi Jayanti
              </div>
              <div className="text-sm text-gray-400">02-Oct-2026</div>
            </div>
            <div className="grid grid-cols-2 pb-2 pt-2 border-b border-gray-300">
              <div className="text-sm text-gray-400 ">Dushhera</div>
              <div className="text-sm text-gray-400">12-Oct-2026</div>
            </div>
            <div className="grid grid-cols-2 pb-2 pt-2 border-b border-gray-300">
              <div className="text-sm text-gray-400 ">Diwali</div>
              <div className="text-sm text-gray-400">
                31-Oct-2026 To 01-Nov-2026
              </div>
            </div>
            <div className="grid grid-cols-2 pb-2 pt-2 border-b border-gray-300">
              <div className="text-sm text-gray-400 ">Christmas</div>
              <div className="text-sm text-gray-400">25-Dec-2026</div>
            </div>
            <div className="grid grid-cols-2 pb-2 pt-2  ">
              <div className="text-sm text-gray-400 ">New Year 2027</div>
              <div className="text-sm text-gray-400">01-Jan-2027</div>
            </div>
          </div>
          <div className="p-6 bg-gray-50">
            <h2 className="text-sm font-bold mb-4">
              FLOATER LEAVE (OPTIONAL HOLIDAY LIST – 2026)
            </h2>
            <p className="text-gray-600 mb-4">
              Employees may choose one holiday from the following optional
              holiday list:
            </p>

            <p className="text-gray-600 mb-1">
              Ramzan / Eid-ul-Fitr: Monday, March 31, 2026
            </p>
            <p className="text-gray-600 mb-1">
              Guru Nanak’s Jayanti: Wednesday, November 5, 2026
            </p>

            <h2 className="text-sm font-bold mb-4 mt-4">Points to Remember</h2>

            <p className="text-gray-600 mb-1">
              • Employees may avail of only ONE Optional Holiday from the above
              list.
            </p>
            <p className="text-gray-600 mb-1">
              • Optional Holiday requests must be submitted at least 10 days in
              advance.
            </p>
            <p className="text-gray-600 mb-1">
              • Optional Holiday cannot be adjusted with other leave.
            </p>
            <p className="text-gray-600 mb-1">
              • Approval from the respective Manager/Team Lead is mandatory
              before availing of an Optional Holiday.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingPopup;
