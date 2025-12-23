import React from 'react';

const LeaveBalances = () => {
  const leaveData = [
    { label: 'Total Leaves', value: 12, color: 'bg-indigo-700' },
    { label: 'Remaining Leaves', value: 5, color: 'bg-indigo-500' },
    { label: 'Paid Leaves', value: 7, color: 'bg-indigo-400' },
    { label: 'Unpaid Leaves', value: 0, color: 'bg-indigo-300' },
    { label: 'Monthly Leaves', value: 5, color: 'bg-indigo-200' },
    { label: 'Remaining Short Leaves', value: 2, color: 'bg-indigo-100' },
    { label: 'Floater Leaves', value: 0, color: 'bg-gray-100' }
  ];


  const total = 12;
  const remaining = 5;
  const used = total - remaining;
  const remainingPercent = (remaining / total) * 100;
  const usedPercent = (used / total) * 100;

  return (
    <div className=" bg-white border border-gray-200 rounded-lg p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Leave Balances</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
          Request Leaves
        </button>
      </div>

      {/* Donut Chart */}
      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#E0E7FF"
              strokeWidth="12"
            />
            {/* Remaining leaves arc */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#818CF8"
              strokeWidth="12"
              strokeDasharray={`${remainingPercent * 2.513} ${100 * 2.513}`}
              strokeLinecap="round"
            />
            {/* Used leaves arc */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#3730A3"
              strokeWidth="12"
              strokeDasharray={`${usedPercent * 2.513} ${100 * 2.513}`}
              strokeDashoffset={`-${remainingPercent * 2.513}`}
              strokeLinecap="round"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-gray-800">{total}</div>
            <div className="text-sm text-gray-500">Total Leaves</div>
          </div>
        </div>
      </div>

      {/* Leave Details List */}
      <div className="space-y-3">
        {leaveData.map((item, index) => (
          <div key={index} className="flex items-center justify-between ">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded ${item.color}`}></div>
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
            <span className="text-sm font-medium text-gray-800">
              {item.value.toString().padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveBalances;