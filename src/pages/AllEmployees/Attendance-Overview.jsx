import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodayAttendanceChart from "../../components/TodayAttendanceChart";
import AttendanceStatsCard from "../../components/AttendanceStatsCard";
import AttendanceRecordsTable from "../../components/AttendanceRecordsTable";
import WorkingHoursImg from "../../assets/clock-in.png";
import PunctualityImg from "../../assets/working-hours.png";
import DepartmentImg from "../../assets/clock-in2.png"; 
import LateArrivalsImg from "../../assets/working-hours2.png"; 

const AttendanceOverview = () => {
  const dispatch = useDispatch();

  // Mock data for demonstration (replace with actual data from Redux)
  const attendanceStats = {
    todayStatus: {
      total: 48,
      present: 40,
      absent: 3,
      late: 2,
      onLeave: 2,
      notCheckedIn: 1,
    },
    averageWorkingHours: "09:00 Hours",
    punctualityPercentage: "95%",
    mostPunctualDepartment: "BDE Department",
    frequentLateArrivals: ["Rishabh", "Rohit", "John"],
  };

  const attendanceRecords = [
    {
      id: 1,
      name: "Rishabh Kumar",
      avatar: 1,
      department: "Angular Team",
      checkInTime: "09:30 AM",
      checkOutTime: "07:00 PM",
      workingHours: "09:00Hours",
      status: "Present",
    },
    {
      id: 2,
      name: "Rishabh Kumar",
      avatar: 2,
      department: "Angular Team",
      checkInTime: "09:30 AM",
      checkOutTime: "07:00 PM",
      workingHours: "09:00Hours",
      status: "Present",
    },
    {
      id: 3,
      name: "Rishabh Kumar",
      avatar: 3,
      department: "Angular Team",
      checkInTime: "09:30 AM",
      checkOutTime: "07:00 PM",
      workingHours: "09:00Hours",
      status: "Present",
    },
    {
      id: 4,
      name: "Rishabh Kumar",
      avatar: 4,
      department: "Angular Team",
      checkInTime: "09:30 AM",
      checkOutTime: "07:00 PM",
      workingHours: "09:00Hours",
      status: "Present",
    },
    {
      id: 5,
      name: "Rishabh Kumar",
      avatar: 5,
      department: "Angular Team",
      checkInTime: "09:30 AM",
      checkOutTime: "07:00 PM",
      workingHours: "09:00Hours",
      status: "Present",
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white border border-gray-200 lg:rounded-xl">
      <h1 className="text-2xl font-bold text-heading leading-tight mb-8">
        Attendance Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <div className="md:row-span-2 sm:col-span-2 md:col-span-1">
          <TodayAttendanceChart data={attendanceStats.todayStatus} />
        </div>

        <AttendanceStatsCard
          title="Average Working Hours Today"
          value={attendanceStats.averageWorkingHours}
          image={WorkingHoursImg}
        />

        <AttendanceStatsCard
          title="Punctuality Percentage"
          value={attendanceStats.punctualityPercentage}
          image={PunctualityImg}
        />

          <AttendanceStatsCard
            title="Most Punctual Department"
            value={attendanceStats.mostPunctualDepartment}
            image={DepartmentImg}
          />

          <AttendanceStatsCard
            title="Employees With Frequent Late Arrivals"
            value={attendanceStats.frequentLateArrivals}
            image={LateArrivalsImg}
            isList
          />
      </div>

      <AttendanceRecordsTable records={attendanceRecords} />
    </div>
  );
};

export default AttendanceOverview;