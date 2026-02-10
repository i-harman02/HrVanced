import React from "react";
import { FaUser } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const StatCard = ({ icon, title, avgHours, onTime }) => {
  return (
    <div className="rounded-xl border border-bordergray p-6 grid grid-cols-[1.2fr_1fr_1.3fr] gap-6">
      {/* Left */}
      <div>
        <div className="flex items-center gap-2.5">
          <div className="color-primary">{icon}</div>
          <span className="text-sm font-medium color-primary">{title}</span>
        </div>
      </div>

      {/* Middle */}
      <div>
        <p className="text-sm font-bold text-black mb-2">Avg Hrs / Day</p>
        <p className="text-sm text-textgray leading-none">{avgHours}</p>
      </div>

      {/* Right */}
      <div>
        <p className="text-sm font-bold text-black mb-2">On Time Arrival</p>
        <p className="text-sm text-textgray leading-none">{onTime}</p>
      </div>
    </div>
  );
};

const AttendanceStats = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-black">Attendance Stats</h2>

        <div className="relative w-38">
          <select className="w-full appearance-none border border-bordergray rounded px-2.5 py-1.75 text-sm text-textgray font-medium bg-[#F9FAFB]">
            <option>Last Week</option>
            <option>This Week</option>
            <option>Last Month</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-2.5 flex flex-col items-center justify-center text-textgray">
            <FaChevronUp size={10} />
            <FaChevronDown size={10} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <StatCard
        icon={<FaUser size={16} />}
        title="Me"
        avgHours="0 hrs"
        onTime="0%"
      />

      <StatCard
        icon={<MdPeopleAlt size={18} />}
        title="My Team"
        avgHours="0 hrs"
        onTime="2%"
      />
    </div>
  );
};

export default AttendanceStats;
