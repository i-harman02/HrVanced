import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const DATA = [
  { month: "Jan", value: 8 },
  { month: "Feb", value: 6 },
  { month: "Mar", value: 5 },
  { month: "Apr", value: 7 },
  { month: "May", value: 4 },
  { month: "Jun", value: 2 },
  { month: "Jul", value: 1 },
  { month: "Aug", value: 3 },
  { month: "Sep", value: 1 },
  { month: "Oct", value: 3 },
  { month: "Nov", value: 2 },
  { month: "Dec", value: 5 },
];


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border shadow text-[11px] px-2 py-1 rounded">
        {payload[0].value.toString().padStart(2, "0")}
      </div>
    );
  }
  return null;
};

export default function MyLeaveStats() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
     
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold">My Leave Stats</h3>
        <select className="text-xs border border-gray-200 rounded-md px-4 py-1 text-gray-600 bg-[#F9FAFB]">
          <option>This Year</option>
        </select>
      </div>

    
      <div className="h-64">
        <ResponsiveContainer   width="100%" minHeight="330px" height="100%" >
          <ComposedChart
         
            data={DATA}
            margin={{ top: 20, right: 10, left: -30, bottom: 8 }}
          >
            {/* Gradient for area */}
            <defs>
              <linearGradient id="leaveArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F67FF" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#4F67FF" stopOpacity={0.05} />
              </linearGradient>
            </defs>

     
            <CartesianGrid
              vertical={false}
              stroke="#E5E7EB"
              strokeDasharray="0"
            />

           
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#6B7280" }}
            />

        
            <YAxis
              domain={[0, 12]}
              ticks={[0,1,2,3,4,5,6,7,8,9,10,11,12]}
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#6B7280" }}
            />

         
            <Tooltip content={<CustomTooltip />} cursor={false} />

            <Area
              type="monotone"
              dataKey="value"
              fill="url(#leaveArea)"
              stroke="none"
            />

            {/* Bars */}
            <Bar
              dataKey="value"
              barSize={6}
              fill="#2C3EA1"
              radius={[4, 4, 0, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
