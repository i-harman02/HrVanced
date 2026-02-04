import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const TodayAttendanceChart = ({ data }) => {
  const attendanceTypes = [
    {
      label: "Present",
      value: data.present,
      color: "#4338CA",
      bg: "bg-indigo-700",
    },
    {
      label: "Absent",
      value: data.absent,
      color: "#6366F1",
      bg: "bg-indigo-500",
    },
    {
      label: "Late",
      value: data.late,
      color: "#818CF8",
      bg: "bg-indigo-400",
    },
    {
      label: "On Leave",
      value: data.onLeave,
      color: "#A5B4FC",
      bg: "bg-indigo-300",
    },
    {
      label: "Not Checked In",
      value: data.notCheckedIn,
      color: "#C7D2FE",
      bg: "bg-indigo-200",
    },
  ];

  // Filter out items with 0 value for the chart
  const chartData = attendanceTypes.filter((item) => item.value > 0);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-base font-medium text-black mb-6">
        Today's Attendance Status
      </h3>

      {/* Donut Chart */}
      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48">
          <PieChart width={192} height={192}>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={60}
              outerRadius={85}
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
            >
              {chartData.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>
          </PieChart>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-gray-900">{data.total}</div>
            <div className="text-xs text-gray-500">Total</div>
            <div className="text-xs text-gray-500">Employees</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {attendanceTypes.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded ${item.bg}`} />
              <span className="text-sm text-textgray">{item.label}</span>
            </div>
            <span className="text-sm font-medium text-gray-800">
              {item.value.toString().padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayAttendanceChart;