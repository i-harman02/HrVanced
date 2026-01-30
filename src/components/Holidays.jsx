import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHolidays } from "../slices/holidaySlice";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Holidays = () => {
  const dispatch = useDispatch();
  const { holidays = [], loading } = useSelector(
    (state) => state.holiday
  );

  // ✅ Only years that actually have data
  const AVAILABLE_YEARS = [2026];

  const [year, setYear] = useState(2026);

  const hasPrevYear = AVAILABLE_YEARS.includes(year - 1);
  const hasNextYear = AVAILABLE_YEARS.includes(year + 1);

  useEffect(() => {
    dispatch(fetchHolidays(year));
  }, [dispatch, year]);

  return (
    <>
    <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-heading">Holidays</h1>
      </div>
    <div className="bg-[#2F353B] flex justify-center p-6 sm:p-10 rounded-xl">
      <div className="w-full max-w-169.5 bg-white rounded-xl shadow-lg px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {/* Left Arrow */}
          <button
            disabled={!hasPrevYear}
            onClick={() => hasPrevYear && setYear(year - 1)}
            className={`transition ${
              hasPrevYear
                ? "text-gray-500 hover:text-black"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <FaAngleLeft size={16} />
          </button>

          <h1 className="text-lg font-bold">
            Holidays {year}
          </h1>

          {/* Right Arrow */}
          <button
            disabled={!hasNextYear}
            onClick={() => hasNextYear && setYear(year + 1)}
            className={`transition ${
              hasNextYear
                ? "text-gray-500 hover:text-black"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <FaAngleRight size={16} />
          </button>
        </div>

        {/* Table */}
        <div className="border border-bordergray rounded-xl overflow-hidden mb-8 p-6">
          <div className="grid grid-cols-2 pb-5 text-sm font-bold border-b border-bordergray">
            <div>Name</div>
            <div>Date</div>
          </div>

          {loading ? (
            <p className="text-center py-6 text-sm text-gray-500">
              Loading...
            </p>
          ) : holidays.length === 0 ? (
            <p className="text-center py-6 text-sm text-gray-500">
              No holidays found
            </p>
          ) : (
            holidays.map((h) => (
              <div
                key={h._id}
                className="grid grid-cols-2 py-5.5 text-sm leading-none border-b border-bordergray last:border-none last:pb-2"
              >
                <div className="text-textgray">
                  {h.holidayName}
                </div>
                <div className="text-textgray">
                  {new Date(h.startDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  {h.endDate &&
                    ` To ${new Date(h.endDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}`}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Floater Leave */}
        <div className="bg-gray-50 rounded-xl p-6 text-sm">
          <h2 className="font-bold mb-3">
            FLOATER LEAVE (OPTIONAL HOLIDAY LIST – {year})
          </h2>

          <p className="text-textgray mb-4">
            Employees may choose one holiday from the following optional holiday list:
          </p>

          <ol className="list-decimal pl-5 text-textgray mb-6 space-y-1">
            <li>Ramzan / Eid-ul-Fitr: Monday, March 31, {year}</li>
            <li>Guru Nanak’s Jayanti: Wednesday, November 5, {year}</li>
          </ol>

          <h3 className="font-bold mb-2">Points to Remember</h3>

          <ul className="list-disc pl-5 text-textgray space-y-1">
            <li>Employees may avail only ONE Optional Holiday.</li>
            <li>Requests must be submitted at least 10 days in advance.</li>
            <li>Optional Holiday cannot be adjusted with other leave.</li>
            <li>Manager/Team Lead approval is mandatory.</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default Holidays;
