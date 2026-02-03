import React from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import Pagination from "./Pagination";

const logs = [
  {
    date: "Tue, 30 Dec",
    status: "Present",
    effective: "7h 15m",
    gross: "9h 00m",
    arrival: "09:30 AM",
  },
  {
    date: "Mon, 29 Dec",
    status: "Present",
    effective: "8h 00m",
    gross: "9h 00m",
    arrival: "10:00 AM",
  },
  {
    date: "Sun, 28 Dec",
    status: "W-OFF",
    effective: "Full day Weekly-off",
    gross: "-",
    arrival: "-",
  },
  {
    date: "Sat, 27 Dec",
    status: "W-OFF",
    effective: "Full day Weekly-off",
    gross: "-",
    arrival: "-",
  },
  {
    date: "Fri, 26 Dec",
    status: "Present",
    effective: "8h 00m",
    gross: "8h 00m",
    arrival: "11:00 AM",
  },
];

const AttendanceLogs = () => {  
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4.5">
        <h2 className="text-base font-medium text-black">Attendance Logs</h2>

        <div className="relative w-38">
          <select className="w-full appearance-none border border-bordergray rounded px-2.5 py-1.75 text-sm text-textgray font-medium bg-[#F9FAFB] focus:outline-none focus:ring-0">
            <option>Last Week</option>
            <option>This Week</option>
            <option>Last Month</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-2.5 flex flex-col items-center justify-center text-textgray">
            <FaChevronUp size={10} />
            <FaChevronDown size={10} />
          </div>
        </div>
      </div>

 
      <div className="border border-bordergray rounded-xl overflow-auto p-6 mb-6">
        <table className="w-full text-sm">
          <thead className="bg-white border-b border-gray-200">
            <tr className="text-left text-black font-bold">
              <th className="pb-5 pe-3">Date</th>
              <th className="pb-5 pe-3">Attendance Visual</th>
              <th className="pb-5 pe-3">Effective Hours</th>
              <th className="pb-5 pe-3">Gross Hours</th>
              <th className="pb-5 pe-3">Arrival</th>
              <th className="pb-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 text-textgray"
              >
                <td className="py-4 pe-3 text-textgray leading-none min-w-29.5">
                  {log.date}
                </td>
                <td className="py-4 pe-3 text-textgray leading-none">{log.status}</td>
                <td className="py-4 pe-3 text-textgray leading-none min-w-41.5">
                  {log.effective}
                </td>
                <td className="py-4 pe-3 text-textgray leading-none">{log.gross}</td>
                <td className="py-4 pe-3 text-textgray leading-none">{log.arrival}</td>
                <td className="py-4 text-textgray leading-none text-center">
                  <button className="text-zinc-500 hover:text-indigo-800 cursor-pointer">
                    <LuPencilLine />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <Pagination />
    </div>
  );
};

export default AttendanceLogs;
