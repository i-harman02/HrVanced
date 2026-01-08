import { PieChart, Pie, Cell } from "recharts";

const OverallPerformance = () => {
  const data = [
    {
      label: "Task Completed",
      value: 96,
      color: "#2E3A9F", // dark blue
      bg: "bg-indigo-800"
    },
    {
      label: "On Time Delivery",
      value: 90,
      color: "#4F63D2",
      bg: "bg-indigo-600"
    },
    {
      label: "Attendance Rate",
      value: 98,
      color: "#6E7FE6",
      bg: "bg-indigo-400"
    },
    {
      label: "Improvement Rate",
      value: 98,
      color: "#8FA0FF",
      bg: "bg-indigo-300"
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 ">
      
      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-800 mb-4">
        Overall Performance
      </h3>

      {/* Chart */}
      <div className="flex justify-center mb-6">
        <PieChart width={160} height={160}>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={55}
            outerRadius={75}
            startAngle={90}
            endAngle={-270}
            paddingAngle={2}
          >
            {data.map((item, index) => (
              <Cell key={index} fill={item.color} />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-3 h-3 rounded ${item.bg}`}
              />
              <span className="text-gray-500">
                {item.label}
              </span>
            </div>

            <span className="text-gray-800 font-medium">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverallPerformance;
