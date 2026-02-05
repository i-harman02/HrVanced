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
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchLeaveStats } from "../slices/leaveSlice";

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
  const dispatch = useDispatch();
  const  {stats}  = useSelector((state) => state.leave);

  /* fetch stats on load */
  useEffect(() => {
    dispatch(fetchLeaveStats());
  }, [dispatch]);

  /* transform backend → chart data */
  const chartData = useMemo(() => {
    if (!stats || stats.length === 0) return [];

    return stats.map((item) => ({
      month: item.month.slice(0, 3),   // August → Aug
      value: item.leaveDays || 0,      // 👈 THIS IS IMPORTANT
    }));
  }, [stats]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold">My Leave Stats</h3>

        <div className="relative w-38">
          <select className="w-full appearance-none border border-bordergray rounded px-2.5 py-1.75 text-sm bg-[#F9FAFB]">
            <option>This Year</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-2.5 flex flex-col items-center justify-center">
            <FaChevronUp size={10} />
            <FaChevronDown size={10} />
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 10, left: -30, bottom: 8 }}
          >
            <defs>
              <linearGradient id="leaveArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F67FF" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#4F67FF" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis domain={[0, 12]} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="value"
              fill="url(#leaveArea)"
              stroke="none"
            />

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
