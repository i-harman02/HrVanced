import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHolidays } from "../slices/holidaySlice";
import { RxCross2 } from "react-icons/rx";

const UpcomingPopup = ({ onClose, year = 2026 }) => {
  const dispatch = useDispatch();
  const { holidays, loading } = useSelector((state) => state?.holiday);


  useEffect(() => {
    dispatch(fetchHolidays(year));
  }, [dispatch, year]);

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-999" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-screen w-175 bg-white z-1000 shadow-xl p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h3 className="font-bold text-2xl">Holidays {year}</h3>
          <button className="text-2xl" onClick={onClose}>
            <RxCross2 />
          </button>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : holidays.length === 0 ? (
          <p className="text-center text-gray-500  border-b border-gray-300 mb-4 pb-4">
            No holidays found
          </p>
        ) : (
          <div className="mb-4">
            {/* Header */}
            <div className="grid grid-cols-2 p-4 font-bold text-sm border-b border-gray-300">
              <div>Holiday</div>
              <div>Date</div>
            </div>

            {holidays.map((h) => (
              <div
                key={h._id}
                className="grid grid-cols-2 p-4  text-sm border-b border-gray-300 "
              >
                <div className="text-gray-700">{h.holidayName}</div>
                <div className="text-gray-500">
                  {new Date(h.startDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  {h.endDate &&
                    ` → ${new Date(h.endDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}`}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="p-6 bg-gray-50">
          <h2 className="text-sm font-bold mb-4">
            FLOATER LEAVE (OPTIONAL HOLIDAY LIST – 2026)
          </h2>
          <p className="text-gray-600 mb-4">
            Employees may choose one holiday from the following optional holiday
            list:
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
            • Approval from the respective Manager/Team Lead is mandatory before
            availing of an Optional Holiday.
          </p>
        </div>
      </div>
    </>
  );
};

export default UpcomingPopup;
