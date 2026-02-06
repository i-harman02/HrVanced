import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import LeaveForm from "../components/LeaveForm";
import { fetchLeaveBalance } from "../slices/leaveSlice";

const LeaveBalances = () => {
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.leave);
  const [openLeaveForm, setOpenLeaveForm] = useState(false);

  useEffect(() => {
    dispatch(fetchLeaveBalance());
  }, [dispatch]);

  const leaves = {
    total: balance?.totalLeave ?? 12,
    remaining: balance?.remainingLeave ?? 12,
    paid: balance?.paidLeave ?? 0,
    unpaid: balance?.unPaidLeave ?? 0,
    monthly: balance?.remainingPaidLeaveInCurrentMonth ?? 2,
    shortRemaining: balance?.shortLeave ?? 2,
    floater: balance?.floaterLeave ?? 0,
  };

  const leaveTypes = [
    {
      label: "Total Leaves",
      value: leaves.total,
      color: "#4338CA",
      bg: "bg-[#4338CA]",
    },
    {
      label: "Remaining Leaves",
      value: leaves.remaining,
      color: "#6366F1",
      bg: "bg-[#6366F1]",
    },
    {
      label: "Paid Leaves",
      value: leaves.paid,
      color: "#818CF8",
      bg: "bg-[#818CF8]",
    },
    {
      label: "Unpaid Leaves",
      value: leaves.unpaid,
      color: "#C7D2FE",
      bg: "bg-[#C7D2FE]",
    },
    {
      label: "Monthly Leaves",
      value: leaves.monthly,
      color: "#6366F1",
      bg: "bg-[#6366F1]",
      opacity: 0.6
    },
    {
      label: "Remaining Short Leaves",
      value: leaves.shortRemaining,
      color: "#A5B4FC",
      bg: "bg-[#A5B4FC]",
    },
    {
      label: "Floater Leaves",
      value: leaves.floater,
      color: "#E5E7EB",
      bg: "bg-[#E5E7EB]",
    },
  ];

  // Logic for the chart: We show used leaves (paid) and remaining leaves.
  // If we have unpaid, we might show them too?
  // Let's try to make it look like the image which has 3-4 segments.
  const chartData = [
    { name: "Remaining", value: leaves.remaining, color: "#4338CA" },
    { name: "Paid", value: leaves.paid, color: "#818CF8" },
    { name: "Unpaid", value: leaves.unpaid, color: "#C7D2FE" },
    { name: "Short", value: 2 - leaves.shortRemaining, color: "#DDD6FE" },
  ].filter(d => d.value > 0);

  // If everything is 0 (unlikely since remaining starts at 12), show a full circle of remaining
  if (chartData.length === 0) {
    chartData.push({ name: "Total", value: leaves.total, color: "#4338CA" });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 ">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-900">
          Leave Balances
        </h2>

        <button
          onClick={() => setOpenLeaveForm(true)}
          className="bg-[#2C3EA1] text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-[#172677] transition-all transform hover:scale-105"
        >
          Request Leaves
        </button>

        <LeaveForm
          open={openLeaveForm}
          onClose={() => setOpenLeaveForm(false)}
          onSubmitLeave={() => dispatch(fetchLeaveBalance())}
        />
      </div>

      <div className="flex justify-center relative mb-10">
        <div className="w-[240px] h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={10} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-bold text-gray-900 leading-none">{leaves.total}</span>
            <span className="text-sm font-medium text-gray-500 mt-1">Total Leaves</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {leaveTypes.map((item, index) => (
          <div key={index} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-md ${item.bg} ${item.opacity ? 'opacity-60' : ''} transition-transform group-hover:scale-110`} />
              <span className="text-[15px] font-medium text-gray-700">{item.label}</span>
            </div>
            <span className="text-[15px] font-bold text-gray-900 tabular-nums">
              {item.value.toString().padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveBalances;
