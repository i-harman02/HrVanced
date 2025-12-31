import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
export default function LeaveForm({ open, onClose }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  useEffect(() => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);

      if (end >= start) {
        const diffTime = end - start;
        const diffDays = diffTime / (1000 * 60 * 60 * 24) + 1;
        
        setNumberOfDays(diffDays);
      } else {
        setNumberOfDays(0);
      }
    }
  }, [fromDate, toDate]);

  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-999" onClick={onClose} />

      <div className="fixed top-0 right-0 h-screen w-137.5 bg-white z-1000 shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-[24px]">Request Leave</h3>
          <button onClick={onClose}>
            <RxCross2 />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-[14px] text-black">
              Select Type of Leave you want to apply
            </label>
            <select className="w-full border border-gray-200 rounded p-2 mt-2.5 text-[14px] text-[#71717B]">
              <option>Select</option>
              <option>Short Leave</option>
              <option>Half Day</option>
              <option>Full Day</option>
            </select>
          </div>
          <div className="flex gap-10">
            <div className="w-60">
              <label className="text-[14px] text-black">From</label>
              <input
                type="date"
                min={today}
                value={fromDate}
                onChange={(e) => {
                  const selectedFrom = e.target.value;
                  setFromDate(selectedFrom);

                  if (toDate && toDate < selectedFrom) {
                    setToDate("");
                  }
                }}
                className="w-full border border-gray-200 rounded p-2 mt-2.5 text-[14px] text-[#71717B]"
              />
            </div>
            <div className="w-60">
              <label className="text-[14px] text-black">To</label>
              <input
                type="date"
                min={fromDate || today}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                disabled={!fromDate}
                className="w-full border border-gray-200 rounded p-2 mt-2.5 text-[14px] text-[#71717B] disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="text-[14px] text-black">Number of Days</label>
            <textarea
              className="w-full border border-gray-200 rounded p-2 mt-2.5 text-[14px] text-[#71717B]"
              rows={1}
              value={numberOfDays}
              readOnly
            />
          </div>
          <div>
            <label className="text-[14px] text-black">Notify</label>
            <select className="w-full border border-gray-200 rounded p-2 mt-2.5 text-[14px] text-[#71717B]">
              <option>Select</option>
              <option>Deepak</option>
              <option>Aastha</option>
            </select>
          </div>
          <div>
            <label className="text-[14px] text-black">Reason</label>
            <textarea
              className="w-full border border-gray-200 rounded p-2 mt-2.5 text-[14px] text-[#71717B]"
              placeholder="Type Your Reason Here....."
              rows={6}
            />
          </div>

          <div className="flex justify- gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-200 px-4 py-2 rounded bg-[#F9FAFB]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#2C3EA1] text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
