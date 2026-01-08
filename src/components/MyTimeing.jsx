import React from "react";

const days = ["M", "T", "W", "T", "F", "S", "S"];

const TimingsActions = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] overflow-hidden">
     
      <div className="p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Timings
        </h3>

        {/* Days */}
        <div className="flex gap-2 mb-4">
          {days.map((day, index) => (
            <div
              key={index}
              className={`h-8 w-8 flex items-center bg-gray-100 justify-center rounded-md border text-xs font-medium
                ${
                  index === 0
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "text-gray-500"
                }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Today */}
        <p className="text-sm text-gray-900 mb-3">
          <span className="font-semibold">Today</span>{" "}
          <span className="text-gray-500">
            (09:30 AM – 07:00 PM)
          </span>
        </p>

        {/* Details */}
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>
            Duration: <span className="text-gray-900">9h 0m</span>
          </li>
          <li>
            Break: <span className="text-gray-900">45 min</span>
          </li>
        </ul>
      </div>

      {/* RIGHT — Actions */}
      <div className="bg-gray-50 p-6 border-l border-gray-200 rounded-tl-xl rounded-bl-xl   ">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Actions
        </h3>

        {/* Time */}
        <div className="flex items-center gap-3 mb-3">
          <div className="px-3 py-1.5 rounded-md border border-gray-400 bg-white text-sm text-gray-700">
            05:30 PM
          </div>
          <span className="text-sm text-gray-500">
            Tue, 30 Dec
          </span>
        </div>

      
        <a
          href="#"
          className="text-sm text-indigo-600 font-medium hover:underline"
        >
          Attendance Policy
        </a>
      </div>
    </div>
  );
};

export default TimingsActions;
