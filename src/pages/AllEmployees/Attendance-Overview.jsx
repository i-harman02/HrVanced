import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import TodayAttendanceChart from "../../components/TodayAttendanceChart";
// import AttendanceStatsCard from "../../components/AttendanceStatsCard";
// import AttendanceRecordsTable from "../../components/AttendanceRecordsTable";
// import { fetchAttendanceData } from "../slices/attendanceSlice"; // Uncomment when slice is ready

// Import images
// import WorkingHoursImg from "../assets/working-hours.png"; // Add your working hours image
// import PunctualityImg from "../assets/punctuality.png"; // Add your punctuality image
// import DepartmentImg from "../assets/department.png"; // Add your department image
// import LateArrivalsImg from "../assets/late-arrivals.png"; // Add your late arrivals image

const AttendanceOverview = () => {
  const dispatch = useDispatch();

  // Uncomment when your attendance slice is ready
  // const { attendanceData, loading } = useSelector((state) => state.attendance);

  // useEffect(() => {
  //   dispatch(fetchAttendanceData());
  // }, [dispatch]);

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
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-heading leading-tight mb-8">
        Attendance Overview
      </h1>

      {/* Stats Grid - Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Today's Attendance Status */}
        {/* <TodayAttendanceChart data={attendanceStats.todayStatus} /> */}

        {/* Average Working Hours */}
        {/* <AttendanceStatsCard
          title="Average Working Hours Today"
          value={attendanceStats.averageWorkingHours}
          image={WorkingHoursImg}
        /> */}

        {/* Punctuality Percentage */}
        {/* <AttendanceStatsCard
          title="Punctuality Percentage"
          value={attendanceStats.punctualityPercentage}
        //   image={PunctualityImg}
        /> */}

        {/* Most Punctual Department - Spans 2 columns on large screens */}
        <div className="md:col-span-2 lg:col-span-1">
          {/* <AttendanceStatsCard
            title="Most Punctual Department"
            value={attendanceStats.mostPunctualDepartment}
            // image={DepartmentImg}
          /> */}
        </div>

        {/* Employees With Frequent Late Arrivals - Spans 2 columns on large screens */}
        <div className="md:col-span-2 lg:col-span-1">
          {/* <AttendanceStatsCard
            title="Employees With Frequent Late Arrivals"
            value={attendanceStats.frequentLateArrivals}
            // image={LateArrivalsImg}
            isList
          /> */}
        </div>
      </div>

      {/* Attendance Records Table */}
      {/* <AttendanceRecordsTable records={attendanceRecords} /> */}
    </div>
  );
};

export default AttendanceOverview;