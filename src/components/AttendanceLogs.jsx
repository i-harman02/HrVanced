import React from "react";

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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900">
          Attendance Logs
        </h2>

        <select className="border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-600 focus:outline-none">
          <option>Last Week</option>
          <option>This Week</option>
          <option>Last Month</option>
        </select>
      </div>

      {/* Table */}
      <div className="border  border-gray-200 rounded-xl overflow-auto">
        <table className="w-full text-sm ">
          <thead className="bg-white border-b border-gray-200">
            <tr className="text-left text-gray-900 font-semibold">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Attendance Visual</th>
              <th className="px-4 py-3">Effective Hours</th>
              <th className="px-4 py-3">Gross Hours</th>
              <th className="px-4 py-3">Arrival</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className="border-b border-gray-200  last:border-none text-gray-700"
              >
                <td className="px-4 text-gray-400 py-3 min-w-29.5">{log.date}</td>
                <td className="px-4 py-3 text-gray-400 ">{log.status}</td>
                <td className="px-4 py-3 text-gray-400  min-w-41.5">{log.effective}</td>
                <td className="px-4 py-3 text-gray-400 ">{log.gross}</td>
                <td className="px-4 py-3 text-gray-400 ">{log.arrival}</td>
                <td className="px-4 py-3 text-center text-gray-400 ">
                  <button className="text-gray-400 hover:text-indigo-600">
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <span>Showing 1 to 05 of 20 results</span>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 border rounded-md hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1.5 border rounded-md hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceLogs;
