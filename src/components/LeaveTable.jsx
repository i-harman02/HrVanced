import LeaveForm from "./LeaveForm";
import { useState } from "react";
import SearchFilter from "./Search";
import Pagination from "./Pagination";
import LeaveReasonModal from "./LeaveReasonModal";
import { FiEye } from "react-icons/fi";
import { LuPencilLine } from "react-icons/lu";

export default function LeaveTable() {
  const [open, setOpen] = useState(false);
  const data = [
    {
      type: "Full Day Leave",
      from: "Jan 01, 2025",
      to: "Jan 01, 2025",
      days: "01",
      reason: "I hope you are doing well. I just wanted to inform...",
      createdAt: "Dec 21, 2024",
      updatedBy: "Deepak",
      status: "Approved",
    },
    {
      type: "Full Day Leave",
      from: "Feb 01, 2025",
      to: "Feb 01, 2025",
      days: "01",
      reason: "I hope you are doing well. I just wanted to inform...",
      createdAt: "Jan 21, 2025",
      updatedBy: "Deepak",
      status: "Approved",
    },
    {
      type: "Full Day Leave",
      from: "Apr 01, 2025",
      to: "Apr 02, 2025",
      days: "02",
      reason: "I hope you are doing well. I just wanted to inform...",
      createdAt: "Mar 21, 2025",
      updatedBy: "Deepak",
      status: "Approved",
    },
    {
      type: "Full Day Leave",
      from: "May 01, 2025",
      to: "May 01, 2025",
      days: "01",
      reason: "I hope you are doing well. I just wanted to inform...",
      createdAt: "Apr 21, 2025",
      updatedBy: "Deepak",
      status: "Approved",
    },
    {
      type: "Full Day Leave",
      from: "Aug 01, 2025",
      to: "Aug 03, 2025",
      days: "03",
      reason: "I hope you are doing well. I just wanted to inform...",
      createdAt: "Jul 21, 2025",
      updatedBy: "Deepak",
      status: "Pending",
    },
  ];

  const statusStyle = (status) =>
    status === "Approved"
      ? "bg-green-50 text-green-600 border border-green-200"
      : "bg-orange-50 text-orange-600 border border-orange-200";

  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };
  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h3 className="text-sm font-semibold">Leave Request</h3>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <SearchFilter />

          <button
            className="bg-[#2C3EA1] rounded px-4 py-2 text-sm text-white hover:bg-[#24338a] w-full sm:w-auto"
            onClick={handleClick}
          >
            Request Leaves
          </button>
        </div>
      </div>
      <LeaveForm open={showForm} onClose={handleClose} />

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-md mb-6">
        <table className="min-w-225 w-full text-[14px]">
          <thead className="border-b border-gray-200  text-gray-500">
            <tr>
              <th className="text-left py-4 px-4 text-gray-800">Leave Type</th>
              <th className="text-left px-4 text-gray-800">From</th>
              <th className="text-left px-4 text-gray-800">To</th>
              <th className="text-left px-4 text-gray-800">No of Days</th>
              <th className="text-left px-4 text-gray-800">Reason</th>
              <th className="text-left px-4 text-gray-800">Created At</th>
              <th className="text-left px-4 text-gray-800">Updated By</th>
              <th className="text-left px-4 text-gray-800">Status</th>
              <th className="text-left px-4 text-gray-800">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr
                key={i}
                className="border-b border-gray-200  last:border-b-0 text-gray-700"
              >
                <td className="py-4 px-4 min-w-30">{item.type}</td>
                <td className="px-4 min-w-30">{item.from}</td>
                <td className="px-4 min-w-30">{item.to}</td>
                <td className="px-4 min-w-26">{item.days}</td>

                <td className="px-4 max-w-xs">
                  <div className="flex items-center gap-2">
                    <span className="truncate">{item.reason}</span>
                    <button onClick={(e) => {
                      e.preventDefault();
                      setOpen(true);
                    }}
                     className="text-[#2C3EA1] hover:text-indigo-600 cursor-pointer">
                      <FiEye />
                    </button>

                    {open && (
                      <LeaveReasonModal onClose={() => setOpen(false)} />
                    )}

                  </div>
                </td>

                <td className="px-4 min-w-30">{item.createdAt}</td>
                <td className="px-4 min-w-26">{item.updatedBy}</td>

                <td className="px-4">
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${statusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-4">
                  <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                    <LuPencilLine />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  );
}
