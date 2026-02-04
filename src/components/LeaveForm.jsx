import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { applyLeave, fetchLeaveStats } from "../slices/leaveSlice";

export default function LeaveForm({ open, onClose }) {
  const dispatch = useDispatch();

  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [reason, setReason] = useState("");

  const today = new Date().toISOString().split("T")[0];

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

    if (!leaveType || !fromDate || !toDate || !reason.trim()) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("leaveType", leaveType);
    formData.append("startDate", fromDate);
    formData.append("endDate", toDate);
    formData.append("noOfDays", numberOfDays);
    formData.append("reason", reason);
    formData.append("notify[]", "");

    try {
      await dispatch(applyLeave(formData)).unwrap();

      // ✅ THIS LINE FIXES LEAVE STATS
      dispatch(fetchLeaveStats());

      onClose();
    } catch (err) {
      alert(err || "Failed to apply leave");
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed top-0 right-0 h-screen w-[440px] bg-white z-50 p-6">
        <div className="flex justify-between mb-6">
          <h3 className="text-lg font-semibold">Request Leave</h3>
          <button onClick={onClose}><RxCross2 /></button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="w-full border p-2"
          >
            <option value="">Select Leave Type</option>
            <option value="SHORT_LEAVE">Short Leave</option>
            <option value="HALF_DAY_LEAVE">Half Day</option>
            <option value="FULL_DAY_LEAVE">Full Day</option>
          </select>

          <input
            type="date"
            min={today}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border p-2"
          />

          <input
            type="date"
            min={fromDate || today}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border p-2"
          />

          <input
            type="text"
            readOnly
            value={numberOfDays}
            className="w-full border p-2 bg-gray-100"
          />

          <textarea
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border p-2"
          />

          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="border px-4 py-2">
              Cancel
            </button>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2">
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
