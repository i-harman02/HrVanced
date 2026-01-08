import React from "react";

const StatCard = ({ icon, title, avgHours, onTime }) => {
  return (
    <div className="rounded border border-gray-200 p-5 grid grid-cols-[1.2fr_1fr_1.3fr] gap-6 items-center">
      {/* Left */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          {icon}
        </div>
        <span className="text-sm font-medium text-indigo-600">
          {title}
        </span>
      </div>

      {/* Middle */}
      <div>
        <p className="text-xs font-semibold text-gray-900">
          Avg Hrs / Day
        </p>
        <p className="text-sm text-gray-500">{avgHours}</p>
      </div>

      {/* Right */}
      <div>
        <p className="text-xs font-semibold text-gray-900">
          On Time Arrival
        </p>
        <p className="text-sm text-gray-500">{onTime}</p>
      </div>
    </div>
  );
};

const AttendanceStats = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">
          Attendance Stats
        </h2>

        <select className="border border-gray-400 rounded-md px-3 py-1.5 text-sm text-gray-600 focus:outline-none">
          <option>Last Week</option>
          <option>This Week</option>
          <option>Last Month</option>
        </select>
      </div>

      {/* Stats */}
      <StatCard
        icon="👤"
        title="Me"
        avgHours="0 hrs"
        onTime="0%"
      />

      <StatCard
        icon="👥"
        title="My Team"
        avgHours="0 hrs"
        onTime="2%"
      />
    </div>
  );
};

export default AttendanceStats;
