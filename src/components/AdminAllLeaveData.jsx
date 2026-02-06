import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestedLeaves, updateLeaveStatus } from "../slices/leaveSlice";
import Pagination from "./Pagination";
import LeaveReasonModal from "./LeaveReasonModal";
import { GoCheck, GoX } from "react-icons/go";
import { FiEye } from "react-icons/fi";
import dayjs from "dayjs";

const AvatarWithName = ({ name, profileImage }) => (
  <div className="flex items-center gap-2.5">
    <img
      className="w-7.5 h-7.5 rounded-md object-cover"
      src={profileImage || `https://i.pravatar.cc/150?u=${name}`}
      alt={name}
    />
    <span>{name}</span>
  </div>
);

const LeaveRequestRow = ({ leave, onStatusUpdate, user }) => {
  const [showReason, setShowReason] = useState(false);
  
  return (
    <tr className="hover:bg-gray-50 border-b border-gray-200">
    <td className="py-3 text-sm text-textgray font-medium">
      <AvatarWithName 
        profileImage={leave.employee?.profileImage} 
        name={`${leave.employee?.name}`} 
      />
    </td>
    <td className="py-3 text-sm text-textgray">
      <div className="flex flex-col">
        <span>{leave.employee?.designation || "---"}</span>
        {(user?.assignRole === "HR" || user?.assignRole === "HR Manager" || user?.assignRole === "Manager" || user?.role === "admin" || user?.role === "superadmin") && (
          <span className="text-[11px] text-gray-400">
            TL: {leave.employee?.tl?.name || leave.employee?.manager?.name || "---"}
          </span>
        )}
      </div>
    </td>
    <td className="py-3 text-sm text-textgray">
      {dayjs(leave.startDate).format("MMM DD, YYYY")}
    </td>
    <td className="py-3 text-sm text-textgray">
      {dayjs(leave.endDate).format("MMM DD, YYYY")}
    </td>
    <td className="py-3 text-sm text-textgray font-medium text-center">
      {leave.noOfDays}
    </td>
    <td className="py-3 text-sm text-textgray">
      <div className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => setShowReason(true)}>
        <span className="truncate max-w-[100px]">{leave.reason || "test"}</span>
        <FiEye className="text-indigo-600 shrink-0" size={16} />
      </div>
      {showReason && (
        <LeaveReasonModal 
          reason={leave.reason} 
          onClose={() => setShowReason(false)} 
        />
      )}
    </td>
    <td className="py-3 text-sm text-textgray text-center">
      {dayjs(leave.createdAt).format("MMM DD, YYYY")}
    </td>
    <td className="py-3 text-sm">
      <div className="flex items-center gap-3">
        {leave.status === "Pending" ? (
          <>
            <button 
              onClick={() => onStatusUpdate(leave._id, "Approved")}
              className="p-1.5 rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
              title="Approve"
            >
              <GoCheck size={18} />
            </button>
            <button 
              onClick={() => onStatusUpdate(leave._id, "Declined")}
              className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              title="Decline"
            >
              <GoX size={18} />
            </button>
          </>
        ) : (
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            leave.status === "Approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {leave.status}
          </span>
        )}
      </div>
    </td>
  </tr>
  );
};

const AdminAllLeaveData = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { requestedLeaves = [], loading } = useSelector((state) => state.leave);

  const isPrivileged = user?.role === "admin" || user?.role === "superadmin" || user?.assignRole === "HR" || user?.assignRole === "HR Manager" || user?.assignRole === "Manager";

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchRequestedLeaves({ 
        id: isPrivileged ? "all" : user._id,
        params: {} 
      }));
    }
  }, [dispatch, user, isPrivileged]);

  const handleStatusUpdate = async (leaveId, status) => {
    if (!user?._id) return;
    
    // The API expects { id: leaveId, employerId: user._id, status, reason }
    const res = await dispatch(updateLeaveStatus({
      id: leaveId,
      employerId: user._id,
      status: status
    }));

    if (res.meta.requestStatus === "fulfilled") {
        // Refetch after success
        dispatch(fetchRequestedLeaves({ 
            id: isPrivileged ? "all" : user._id,
            params: {} 
        }));
    }
  };

  const headers = [
    "Employee Name",
    (user?.assignRole === "HR" || user?.assignRole === "HR Manager" || user?.assignRole === "Manager" || user?.role === "admin" || user?.role === "superadmin") ? "Designation & TL" : "Designation",
    "Start date",
    "End date",
    "Days",
    "Reason",
    "Applied on",
    "Actions",
  ];

  return (
    <div className="bg-white border border-bordergray rounded-lg p-6 overflow-x-auto shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-base text-black font-semibold">Leave Requests</h4>
        {loading && <span className="text-sm text-gray-400">Loading...</span>}
      </div>

      <table className="w-full min-w-[800px] mb-6">
        <thead>
          <tr className="border-b border-bordergray">
            {headers.map((h, i) => (
              <th
                key={h}
                className={`pb-4 text-sm font-bold text-heading ${
                  i === 4 || i === 6 ? "text-center" : "text-left"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {!loading && requestedLeaves.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="py-10 text-center text-gray-500">
                No leave requests found.
              </td>
            </tr>
          ) : (
            [...requestedLeaves]
              .sort((a, b) => {
                if (a.status === "Pending" && b.status !== "Pending") return -1;
                if (a.status !== "Pending" && b.status === "Pending") return 1;
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
              .map((leave) => (
                <LeaveRequestRow 
                  key={leave._id} 
                  leave={leave} 
                  onStatusUpdate={handleStatusUpdate}
                  user={user}
                />
              ))
          )}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default AdminAllLeaveData;