import React, { useState } from "react";
import AttendancePolicyModal from "./AttendancePolicyModal";

const days = ["M", "T", "W", "T", "F", "S", "S"];

const TimingsActions = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-bordergray grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] overflow-hidden">
     
      <div className="p-6">
        <h3 className="text-base font-medium text-black mb-6">
          Timings
        </h3>

        {/* Days */}
        <div className="flex flex-wrap gap-3 mb-8">
          {days.map((day, index) => (
            <div
              key={index}
              className={`h-9 w-9 flex items-center bg-[#F9FAFB] justify-center rounded border border-bordergray text-sm font-medium
                ${
                  index === 0
                    ? "bg-primary text-white border-borderprimary"
                    : "text-textgray"
                }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Today */}
        <p className="text-sm text-black font-medium mb-6">
          <span>Today</span>{" "}
          <span className="text-textgray">
            (09:30 AM – 07:00 PM)
          </span>
        </p>

        {/* Details */}
        <ul className="text-sm font-medium text-black space-y-1 list-disc list-inside">
          <li>
            Duration: <span className="text-textgray">9h 0m</span>
          </li>
          <li>
            Break: <span className="text-textgray">45 min</span>
          </li>
        </ul>
      </div>

      {/* RIGHT — Actions */}
      <div className="bg-gray-50 p-6 border-t xl:border-l xl:border-t-0 border-bordergray rounded-xl">
        <h3 className="text-base font-medium text-black mb-6">
          Actions
        </h3>

        {/* Time */}
        <div className="flex items-center flex-wrap gap-3.5 mb-6">
          <div className="px-5 py-2.5 rounded border border-bordergray bg-white text-sm text-textgray leading-none">
            05:30 PM
          </div>
          <span className="text-sm text-textgray font-medium">
            Tue, 30 Dec
          </span>
        </div>

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="text-sm color-primary font-medium underline"
      >
        Attendance Policy
      </a>

      {open && (
        <AttendancePolicyModal onClose={() => setOpen(false)} />
      )}
      </div>
    </div>
  );
};

export default TimingsActions;
