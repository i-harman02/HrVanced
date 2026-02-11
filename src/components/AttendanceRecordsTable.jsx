import React from "react";
import { useNavigate } from "react-router-dom";

const AvatarWithName = ({ profileImage, name, avatar, employeeId }) => {
  const navigate = useNavigate();
  return (
    <div 
      className="flex items-center gap-2.5 cursor-pointer group/name"
      onClick={(e) => {
        e.stopPropagation();
        if (employeeId) navigate(`/all-employees/detail/${employeeId}`);
      }}
    >
      <img
        className="w-8 h-8 rounded-md object-cover border border-gray-100 group-hover/name:ring-2 group-hover/name:ring-[#2C3EA1] transition-all"
        src={profileImage || `https://i.pravatar.cc/150?img=${avatar || 1}`}
        alt={name}
      />
      <span className="text-sm text-heading font-medium group-hover/name:text-[#2C3EA1] transition-colors decoration-[#2C3EA1] hover:underline whitespace-nowrap">
        {name}
      </span>
    </div>
  );
};

const AttendanceRecordsTable = ({ records }) => {
  const navigate = useNavigate();
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

      <table className="w-full min-w-[1000px]">
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
              className="hover:bg-gray-50/80 transition-colors cursor-pointer border-b border-gray-100"
              onClick={() => navigate(`/all-employees/detail/${record.id}`)}
            >
              <td className="py-4 pe-3">
                <AvatarWithName 
                  profileImage={record.profileImage} 
                  name={record.name} 
                  avatar={record.avatar} 
                  employeeId={record.id}
                />
              </td>
              <td className="py-4 pe-3 text-sm text-textgray">
                {record.department}
              </td>
              <td className="py-4 pe-3 text-sm text-textgray">
                {record.checkInTime}
              </td>
              <td className="py-4 pe-3 text-sm text-textgray">
                {record.checkOutTime}
              </td>
              <td className="py-4 pe-3 text-sm text-textgray">
                {record.workingHours}
              </td>
              <td className="py-4">
                <span className="inline-block px-2.5 py-1 text-xs font-semibold text-[#75B51D] leading-none bg-[#75B51D0D] border-[0.5px] border-[#75B51D] rounded">
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