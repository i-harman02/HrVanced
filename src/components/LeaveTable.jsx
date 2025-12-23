export default function LeaveTable() {
  const data = [
    {
      type: "Full Day Leave",
      from: "Jan 01, 2025",
      to: "Jan 01, 2025",
      days: "01",
      reason: "I hope you are doing well. I just wanted to inform...",
      createdAt: "Dec 21, 2024",
      updatedBy: "Deepak",
      status: "Approved",
    },
    {
      type: "Full Day Leave",
      from: "Feb 01, 2025",
      to: "Feb 01, 2025",
      days: "01",
      reason: "I hope you are doing well. I just wanted to inform...",
      createdAt: "Jan 21, 2025",
      updatedBy: "Deepak",
      status: "Approved",
    },
    {
      type: "Full Day Leave",
      from: "Apr 01, 2025",
      to: "Apr 02, 2025",
      days: "02",
      reason: "I hope you are doing well. I just wanted to inform...",
      createdAt: "Mar 21, 2025",
      updatedBy: "Deepak",
      status: "Approved",
    },
    {
      type: "Full Day Leave",
      from: "May 01, 2025",
      to: "May 01, 2025",
      days: "01",
      reason: "I hope you are doing well. I just wanted to inform...",
      createdAt: "Apr 21, 2025",
      updatedBy: "Deepak",
      status: "Approved",
    },
    {
      type: "Full Day Leave",
      from: "Aug 01, 2025",
      to: "Aug 03, 2025",
      days: "03",
      reason: "I hope you are doing well. I just wanted to inform...",
      createdAt: "Jul 21, 2025",
      updatedBy: "Deepak",
      status: "Pending",
    },
  ];

  const statusStyle = (status) =>
    status === "Approved"
      ? "bg-green-50 text-green-600 border border-green-200"
      : "bg-orange-50 text-orange-600 border border-orange-200";

  return (
    <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h3 className="text-sm font-semibold">Leave Request</h3>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-500 w-full sm:w-auto">
            🔍
            <input
              type="text"
              placeholder="Search Leaves"
              className="outline-none text-sm placeholder-gray-400 w-full sm:w-40"
            />
          </div>

          {/* Sort */}
          <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 w-full sm:w-auto">
            ⇅ Sort By Days
          </button>

          {/* CTA */}
          <button className="bg-[#2C3EA1] rounded-md px-4 py-2 text-sm text-white hover:bg-[#24338a] w-full sm:w-auto">
            Request Leaves
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="min-w-[900px] w-full text-xs">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="text-left py-4 px-4">Leave Type</th>
              <th className="text-left px-4">From</th>
              <th className="text-left px-4">To</th>
              <th className="text-left px-4">No of Days</th>
              <th className="text-left px-4">Reason</th>
              <th className="text-left px-4">Created At</th>
              <th className="text-left px-4">Updated By</th>
              <th className="text-left px-4">Status</th>
              <th className="text-left px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr
                key={i}
                className="border-b last:border-b-0 text-gray-700"
              >
                <td className="py-4 px-4">{item.type}</td>
                <td className="px-4">{item.from}</td>
                <td className="px-4">{item.to}</td>
                <td className="px-4">{item.days}</td>

                <td className="px-4 max-w-xs">
                  <div className="flex items-center gap-2">
                    <span className="truncate">{item.reason}</span>
                    <button className="text-indigo-500 hover:text-indigo-600">
                      👁
                    </button>
                  </div>
                </td>

                <td className="px-4">{item.createdAt}</td>
                <td className="px-4">{item.updatedBy}</td>

                <td className="px-4">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${statusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    ✎
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center px-2 pt-3 text-xs text-gray-500">
        <span>Showing 1 to 05 of 20 results</span>
        <div className="flex gap-2">
          <button className="border rounded px-3 py-1 hover:bg-gray-50">
            Previous
          </button>
          <button className="border rounded px-3 py-1 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
