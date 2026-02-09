import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaveHistory } from "../slices/leaveSlice";
import dayjs from "dayjs";

export default function LeaveHistory() {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.leave.history);

  useEffect(() => {
    dispatch(fetchLeaveHistory());
  }, [dispatch]);

  if (!history.length) {
    return (
      <div className="bg-white border border-bordergray rounded-xl p-5">
        <h3 className="text-sm font-semibold mb-4">Leave History</h3>
        <p className="text-sm text-gray-400">No leave history found</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-bordergray rounded-xl max-h-[420px] overflow-y-auto vscode-scroll">
      <h3 className="text-sm font-semibold mb-4 sticky top-0 z-10 bg-white px-5 pt-5 pb-3">Leave History</h3>

      <div className="relative px-5 pb-5">
        {history.map((item, i) => (
          <div key={item._id} className="flex gap-3 pb-6 last:pb-0">
            {i !== history.length - 1 && (
              <span className="absolute left-[25px] top-4 h-full w-px bg-gray-200" />
            )}

            <span className="mt-1.5 h-3 w-3 rounded-full border bg-white" />

            <div className="flex-1">
              <div className="flex justify-between">
                <p className="text-sm font-medium">
                  {item.leaveType.replaceAll("_", " ")}
                </p>
                <span className="text-xs text-gray-400">
                  {dayjs(item.startDate).format("DD MMM")}
                  {item.endDate && !dayjs(item.startDate).isSame(dayjs(item.endDate), 'day')
                    ? ` - ${dayjs(item.endDate).format("DD MMM, YYYY")}`
                    : `, ${dayjs(item.startDate).format("YYYY")}`}
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {item.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
