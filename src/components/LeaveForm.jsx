import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../slices/employeeSlice";
import { applyLeave, fetchLeaveStats, fetchLeaveBalance, fetchLeaveHistory } from "../slices/leaveSlice";

export default function LeaveForm({ open, onClose }) {
  const dispatch = useDispatch();

  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [reason, setReason] = useState("");
  const [notifyTL, setNotifyTL] = useState("");
  const [notifyHR, setNotifyHR] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const { user } = useSelector((state) => state.user);
  const { employees } = useSelector((state) => state.employee);

  useEffect(() => {
    if (open) {
      dispatch(fetchEmployees());
      if (user?.tl) {
        setNotifyTL(user.tl);
      }
    }
  }, [open, dispatch, user]);

  useEffect(() => {
    if (open && employees?.length > 0 && !notifyHR) {
      const firstHR = employees.find(emp => {
        const role = (emp.role || "").toUpperCase();
        const assignRole = (emp.assignRole || "").toUpperCase();
        const designation = (emp.designation || "").toUpperCase();
        return (role.includes("HR") || assignRole.includes("HR") || designation.includes("HR")) && emp._id !== user?._id;
      });
      if (firstHR) setNotifyHR(firstHR._id);
    }
  }, [open, employees, user, notifyHR]);

  useEffect(() => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);

      if (end >= start) {
        const diffDays =
          (end - start) / (1000 * 60 * 60 * 24) + 1;
        setNumberOfDays(diffDays);
      } else {
        setNumberOfDays(0);
      }
    }
  }, [fromDate, toDate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leaveType || !fromDate || !toDate || !reason.trim() || !notifyHR || !notifyTL) {
      alert("All fields are required. Please select both a TL and an HR to notify.");
      return;
    }

    const formData = new FormData();
    formData.append("employee", user?._id);
    formData.append("leaveType", leaveType);
    formData.append("startDate", fromDate);
    formData.append("endDate", toDate);
    formData.append("noOfDays", numberOfDays);
    formData.append("reason", reason);
    
    if (notifyTL) {
      formData.append("notify", notifyTL);
    }
    if (notifyHR) {
      formData.append("notify", notifyHR);
    }

    try {
      await dispatch(applyLeave(formData)).unwrap();
      dispatch(fetchLeaveStats());
      dispatch(fetchLeaveBalance());
      dispatch(fetchLeaveHistory());
      onClose();
    } catch (err) {
      alert(err || "Failed to apply leave");
    }
  };

  const tlEmployees = employees?.filter(emp => {
    const role = (emp.role || "").toUpperCase();
    const assignRole = (emp.assignRole || "").toUpperCase();
    const designation = (emp.designation || "").toUpperCase();
    const isTL = role.includes("TL") || assignRole.includes("TL") || designation.includes("TL");
    return isTL && emp._id !== user?._id;
  }) || [];

  const hrEmployees = employees?.filter(emp => {
    const role = (emp.role || "").toUpperCase();
    const assignRole = (emp.assignRole || "").toUpperCase();
    const designation = (emp.designation || "").toUpperCase();
    const isHR = role.includes("HR") || assignRole.includes("HR") || designation.includes("HR");
    return isHR && emp._id !== user?._id;
  }) || [];

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed top-0 right-0 h-screen w-[440px] bg-white z-50 p-6 overflow-y-auto">
        <div className="flex justify-between mb-6">
          <h3 className="text-lg font-semibold">Request Leave</h3>
          <button onClick={onClose}><RxCross2 /></button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Type of leave you want to apply</label>
            <div className="relative">
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full border border-gray-200 p-2.5 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">Select</option>
                <option value="SHORT_LEAVE">Short Leave</option>
                <option value="HALF_DAY_LEAVE">Half Day</option>
                <option value="FULL_DAY_LEAVE">Full Day</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <input
                type="date"
                min={today}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="flex-1">
               <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <input
                type="date"
                min={fromDate || today}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Number of Days</label>
            <input
              type="text"
              readOnly
              value={numberOfDays}
              className="w-full border border-gray-200 p-2.5 bg-gray-50 rounded-lg text-sm text-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl">
              <label className="block text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">Team Leader</label>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                  {tlEmployees.find(e => e._id === notifyTL)?.name?.[0] || "?"}
                </div>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {tlEmployees.find(e => e._id === notifyTL)?.name || "Not Assigned"}
                </p>
              </div>
            </div>

            <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl">
              <label className="block text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">HR Manager</label>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                  {hrEmployees[0]?.name?.[0] || "?"}
                </div>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {hrEmployees[0]?.name || "Not Assigned"}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden">
            {/* Keeping these in state for backend submission */}
            <input type="hidden" value={notifyTL} />
            <input type="hidden" value={notifyHR} />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
            <textarea
              placeholder="Type Your Reason Here...."
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-50 text-gray-600 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-[#3f51b5] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#303f9f] transition-colors shadow-sm"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
