const AttendanceTimeManagement = () => {
  const stats = [
    {
      label: "Total Time Complete",
      value: "98%"
    },
    {
      label: "Leave Taken",
      value: "2 days"
    },
    {
      label: "Late Arrivals",
      value: "02"
    },
    {
      label: "Today Attendance",
      value: "09 hrs"
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl  ">
      
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800">
          Attendance & Time Management
        </h3>
      </div>

      {/* Stats Grid */}
      <div className="p-4 md:p-6 grid grid-cols-2 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4"
          >
            <p className="text-xs text-gray-500 mb-2">
              {item.label}
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceTimeManagement;
