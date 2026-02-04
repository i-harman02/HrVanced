import LeaveForm from "./LeaveForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyLeaves } from "../slices/leaveSlice";

import SearchFilter from "./Search";
import Pagination from "./Pagination";
import LeaveReasonModal from "./LeaveReasonModal";
import { FiEye } from "react-icons/fi";
import { LuPencilLine } from "react-icons/lu";
import dayjs from "dayjs";

export default function LeaveTable() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // ✅ Redux state
  const { list = [], loading } = useSelector((state) => state.leave);

  // ✅ Fetch leaves on mount
  useEffect(() => {
    dispatch(fetchMyLeaves({ page: 1, limit: 5 }));
  }, [dispatch]);

  const statusStyle = (status) =>
    status === "Approved"
      ? "bg-green-50 text-green-600 border border-green-200"
      : "bg-orange-50 text-orange-600 border border-orange-200";

  return (
    <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h3 className="text-sm font-semibold">Leave Request</h3>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <SearchFilter />

          <button
            className="bg-[#2C3EA1] rounded px-4 py-2 text-sm text-white hover:bg-[#24338a]"
            onClick={() => setShowForm(true)}
          >
            Request Leaves
          </button>
        </div>
      </div>

      {/* Leave Form */}
      <LeaveForm
        open={showForm}
        onClose={() => setShowForm(false)}
      />

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-md mb-6">
        <table className="min-w-225 w-full text-[14px]">
          <thead className="border-b border-gray-200 text-gray-500">
            <tr>
              <th className="px-4 py-4">Leave Type</th>
              <th className="px-4">From</th>
              <th className="px-4">To</th>
              <th className="px-4">No of Days</th>
              <th className="px-4">Reason</th>
              <th className="px-4">Created At</th>
              <th className="px-4">Updated By</th>
              <th className="px-4">Status</th>
              <th className="px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {!loading && list.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  No leave requests found
                </td>
              </tr>
            )}

            {Array.isArray(list) &&
              list.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 text-gray-700"
                >
                  <td className="px-4 py-4">
                    {item.leaveType.replace(/_/g, " ")}
                  </td>

                  <td className="px-4">
                    {dayjs(item.startDate).format("MMM DD, YYYY")}
                  </td>

                  <td className="px-4">
                    {dayjs(item.endDate).format("MMM DD, YYYY")}
                  </td>

                  <td className="px-4">{item.noOfDays}</td>

                  <td className="px-4 max-w-xs">
                    <div className="flex items-center gap-2">
                      <span className="truncate">{item.reason}</span>
                      <button
                        onClick={() => setOpen(true)}
                        className="text-[#2C3EA1]"
                      >
                        <FiEye />
                      </button>
                      {open && (
                        <LeaveReasonModal
                          reason={item.reason}
                          onClose={() => setOpen(false)}
                        />
                      )}
                    </div>
                  </td>

                  <td className="px-4">
                    {dayjs(item.createdAt).format("MMM DD, YYYY")}
                  </td>

                  <td className="px-4">
                    {item.approvedBy?.name || "-"}
                  </td>

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
                    <LuPencilLine className="text-gray-400 cursor-pointer" />
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
