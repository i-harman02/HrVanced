import React from "react";
import AttendanceStats from "./Attendancestate";
import MyTimeing from "../components/MyTimeing";
import AttendanceLogs from "../components/AttendanceLogs";
const EmployeeAttendance = () => {
  return (
    <>
    <div className="mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AttendanceStats />

        <MyTimeing />
      </div>
      <div>
        <AttendanceLogs />
      </div>
      </div>
    </>
  );
};

export default EmployeeAttendance;
