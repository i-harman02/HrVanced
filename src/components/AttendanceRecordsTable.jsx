import React from "react";

const AvatarWithName = ({ avatar, name }) => (
  <div className="flex items-center gap-2.5">
    <img
      className="w-7.5 h-7.5 rounded-md"
      src={`https://i.pravatar.cc/150?img=${avatar || 1}`}
      alt={name}
    />
    <span className="text-sm text-textgray">{name}</span>
  </div>
);

const AttendanceRecordsTable = ({ records }) => {
  const headers = [
    "Employee Name",
    "Department",
    "Check-In Time",
    "Check-Out Time",
    "Working Hours",
    "Status",
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 overflow-x-auto">
      <h3 className="text-base font-medium text-black mb-6">
        Employee Attendance Records
      </h3>

      <table className="w-full min-w-150">
        <thead>
          <tr className="border-b border-gray-200">
            {headers.map((header) => (
              <th
                key={header}
                className="pb-4 pe-3 text-left text-sm font-bold text-heading"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr
              key={record.id}
              className="hover:bg-gray-50 border-b border-gray-200"
            >
              <td className="py-3 pe-3">
                <AvatarWithName avatar={record.avatar} name={record.name} />
              </td>
              <td className="py-3 pe-3 text-sm text-textgray">
                {record.department}
              </td>
              <td className="py-3 pe-3 text-sm text-textgray">
                {record.checkInTime}
              </td>
              <td className="py-3 pe-3 text-sm text-textgray">
                {record.checkOutTime}
              </td>
              <td className="py-3 pe-3 text-sm text-textgray">
                {record.workingHours}
              </td>
              <td className="py-3">
                <span className="inline-block px-2 py-1 text-xs font-medium text-[#75B51D] leading-none bg-[#75B51D0D] border-[0.5px] border-[#75B51D] rounded">
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceRecordsTable;