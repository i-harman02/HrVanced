import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
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
    remaining: balance?.remainingLeave || 0,
    paid: balance?.paidLeave || 0,
    unpaid: balance?.unPaidLeave || 0,
    monthly: balance?.remainingPaidLeaveInCurrentMonth || 0,
    shortRemaining: balance?.shortLeave || 0,
    floater: balance?.floaterLeave || 0,
  };

  const leaveTypes = [
    {
      label: "Total Leaves",
      key: "total",
      value: leaves.total,
      color: "#4338CA",
      bg: "bg-indigo-700",
    },
    {
      label: "Remaining Leaves",
      key: "remaining",
      value: leaves.remaining,
      color: "#6366F1",
      bg: "bg-indigo-500",
    },
    {
      label: "Paid Leaves",
      key: "paid",
      value: leaves.paid,
      color: "#818CF8",
      bg: "bg-indigo-400",
    },
    {
      label: "Unpaid Leaves",
      key: "unpaid",
      value: leaves.unpaid,
      color: "#C7D2FE",
      bg: "bg-indigo-200",
    },
    {
      label: "Monthly Leaves",
      key: "monthly",
      value: leaves.monthly,
      color: "#A5B4FC",
      bg: "bg-indigo-300",
    },
    {
      label: "Remaining Short Leaves",
      key: "shortRemaining",
      value: leaves.shortRemaining,
      color: "#DDD6FE",
      bg: "bg-indigo-100",
    },
    {
      label: "Floater Leaves",
      key: "floater",
      value: leaves.floater,
      color: "#E5E7EB",
      bg: "bg-gray-200",
    },
  ];

  const chartData = leaveTypes.filter((item) => item.value > 0);

  const handleApplyLeave = () => {
    dispatch(fetchLeaveBalance());
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="md:text-xl text-sm font-semibold text-gray-800">
          Leave Balances
        </h2>

        <button
          onClick={() => setOpenLeaveForm(true)}
          className="bg-[#2C3EA1] text-white font-bold text-sm leading-[0.86] px-6 py-3 rounded-sm cursor-pointer hover:bg-[#172677] transition-colors"
          disabled={leaves.remaining === 0}
        >
          Request Leaves
        </button>

        <LeaveForm
          open={openLeaveForm}
          onClose={() => setOpenLeaveForm(false)}
          onSubmitLeave={handleApplyLeave}
        />
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative w-56 h-56">
          <PieChart width={220} height={220}>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={75}
              outerRadius={100}
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
            >
              {chartData.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>
          </PieChart>

          {/* Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-semibold text-gray-900">
              {leaves.total}
            </div>
            <div className="text-sm text-gray-500">Total Leaves</div>
          </div>
        </div>
      </div>


      <div className="space-y-3">
        {leaveTypes.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded ${item.bg}`} />
              <span className="text-sm text-gray-700">{item.label}</span>
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

export default LeaveBalances;
