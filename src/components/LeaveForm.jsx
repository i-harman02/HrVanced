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
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("11:00");
  const [halfDayPeriod, setHalfDayPeriod] = useState("First Half");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [reason, setReason] = useState("");
  const [notifyTL, setNotifyTL] = useState("");
  const [notifyHR, setNotifyHR] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const { user } = useSelector((state) => state.user);
  const { employees } = useSelector((state) => state.employee);

  // Check if current user is TL
  const isUserTL = user?.assignRole === "TL" || user?.role === "tl";

  useEffect(() => {
    if (open) {
      dispatch(fetchEmployees());
      // If user is TL, they notify their Manager. Otherwise, they notify their TL.
      if (isUserTL) {
        if (user?.manager) {
          setNotifyTL(user.manager);
        }
      } else if (user?.tl) {
        setNotifyTL(user.tl);
      }
    }
  }, [open, dispatch, user, isUserTL]);

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

  // Handle number of days calculation
  useEffect(() => {
    if (leaveType === "SHORT_LEAVE" || leaveType === "HALF_DAY_LEAVE") {
      setNumberOfDays(leaveType === "HALF_DAY_LEAVE" ? 0.5 : 0.25);
      setToDate(fromDate);
    } else if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);

      if (end >= start) {
        const diffDays = (end - start) / (1000 * 60 * 60 * 24) + 1;
        setNumberOfDays(diffDays);
      } else {
        setNumberOfDays(0);
      }
    }
  }, [fromDate, toDate, leaveType]);

  // Handle short leave time calculation
  useEffect(() => {
    if (leaveType === "SHORT_LEAVE" && startTime) {
      const [hours, minutes] = startTime.split(":").map(Number);
      let endHours = hours + 2;
      let endMinutes = minutes;
      
      // Format back to HH:mm
      const formattedEndTime = `${String(endHours % 24).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
      setEndTime(formattedEndTime);
    }
  }, [startTime, leaveType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leaveType || !fromDate || (!toDate && leaveType === "FULL_DAY_LEAVE") || !reason.trim() || !notifyHR || !notifyTL) {
      alert("All fields are required. Please select both a Superior and an HR to notify.");
      return;
    }

    const formData = new FormData();
    formData.append("employee", user?._id);
    formData.append("leaveType", leaveType);
    formData.append("startDate", fromDate);
    formData.append("endDate", leaveType === "FULL_DAY_LEAVE" ? toDate : fromDate);
    formData.append("noOfDays", numberOfDays);
    formData.append("reason", reason);
    
    // Add specific details for half day/short leave if needed by backend
    if (leaveType === "HALF_DAY_LEAVE") {
      formData.append("halfDayPeriod", halfDayPeriod);
    }
    if (leaveType === "SHORT_LEAVE") {
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);
    }

    if (notifyTL) formData.append("notify", notifyTL);
    if (notifyHR) formData.append("notify", notifyHR);

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

  const getSuperiorName = () => {
    if (!notifyTL) return "Not Assigned";
    const found = employees?.find(e => e._id === notifyTL);
    return found ? found.name : "Not Assigned";
  };

  const getHRName = () => {
    if (!notifyHR) return "Not Assigned";
    const found = employees?.find(e => e._id === notifyHR);
    return found ? found.name : "Not Assigned";
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed top-0 right-0 h-screen w-[440px] bg-white z-50 p-6 overflow-y-auto shadow-2xl transition-all">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">Request Leave</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><RxCross2 size={20} /></button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Leave Type Select */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Type of leave you want to apply</label>
            <div className="relative">
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
              >
                {/* <option value="">Select</option> */}
                <option value="SHORT_LEAVE">Short Leave</option>
                <option value="HALF_DAY_LEAVE">Half Day</option>
                <option value="FULL_DAY_LEAVE">Full Day</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Date Range or Single Day Select */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {leaveType === "FULL_DAY_LEAVE" ? "From" : "Select Day"}
                </label>
                <input
                  type="date"
                  min={today}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>
              
              {leaveType === "FULL_DAY_LEAVE" && (
                <div className="flex-1 animate-in slide-in-from-right-2 duration-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                  <input
                    type="date"
                    min={fromDate || today}
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  />
                </div>
              )}
            </div>

            {/* Conditional Fields for Half Day */}
            {leaveType === "HALF_DAY_LEAVE" && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Half</label>
                <div className="grid grid-cols-2 gap-3">
                  {["First Half", "Second Half"].map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => setHalfDayPeriod(period)}
                      className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        halfDayPeriod === period 
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" 
                        : "bg-white text-gray-600 border-gray-200 hover:border-indigo-200"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Conditional Fields for Short Leave */}
            {leaveType === "SHORT_LEAVE" && (
              <div className="flex gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">End Time (Auto)</label>
                  <input
                    type="time"
                    readOnly
                    value={endTime}
                    className="w-full border border-gray-200 p-3 bg-gray-50 rounded-xl text-sm text-gray-500 font-medium"
                  />
                  <p className="text-[10px] text-gray-400 mt-1 font-medium ml-1">Fixed 2-hour window</p>
                </div>
              </div>
            )}
          </div>

          {/* Days Display */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Total Days</label>
            <div className="w-full border border-gray-200 p-3 bg-gray-50 rounded-xl text-sm text-gray-900 font-bold flex items-center">
              <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded mr-2 text-xs">
                {numberOfDays}
              </span> 
              {numberOfDays === 1 ? 'Day' : 'Days'}
            </div>
          </div>

          {/* Supervisors Group */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50/40 border border-indigo-100 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-1">
                <div className="w-8 h-8 bg-indigo-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
              </div>
              <label className="block text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2">
                {isUserTL ? "MANAGER" : "TEAM LEADER"}
              </label>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                  {getSuperiorName()?.[0] || "?"}
                </div>
                <p className="text-sm font-bold text-gray-900 truncate pr-4">
                  {getSuperiorName()}
                </p>
              </div>
            </div>

            <div className="p-4 bg-indigo-50/40 border border-indigo-100 rounded-2xl relative overflow-hidden group">
              <label className="block text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2">HR MANAGER</label>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                  {getHRName()?.[0] || "?"}
                </div>
                <p className="text-sm font-bold text-gray-900 truncate pr-4">
                  {getHRName()}
                </p>
              </div>
            </div>
          </div>

          {/* Reason Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Reason</label>
            <textarea
              placeholder="Explain the reason for your leave..."
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium resize-none min-h-[100px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-white text-gray-600 px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all border border-gray-200"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-[1.5] bg-[#3f51b5] text-white px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-[#303f9f] transition-all shadow-md shadow-indigo-500/20 active:scale-95"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
