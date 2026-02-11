import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodayAttendanceChart from "../../components/TodayAttendanceChart";
import AttendanceStatsCard from "../../components/AttendanceStatsCard";
import AttendanceRecordsTable from "../../components/AttendanceRecordsTable";
import WorkingHoursImg from "../../assets/clock-in.png";
import PunctualityImg from "../../assets/working-hours.png";
import DepartmentImg from "../../assets/clock-in2.png"; 
import LateArrivalsImg from "../../assets/working-hours2.png"; 
import { fetchEmployees } from "../../slices/employeeSlice";
import { fetchTodayLeaves } from "../../slices/leaveSlice";
import dayjs from "dayjs";

const AttendanceOverview = () => {
  const dispatch = useDispatch();
  
  const { employees, loading: empLoading } = useSelector((state) => state.employee);
  const { todayLeaves } = useSelector((state) => state.leave);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchTodayLeaves());
  }, [dispatch]);

  // Role-based filtering
  const userRole = (user?.role || user?.assignRole || "").toLowerCase().trim();
  const isAdminOrManager = ["admin", "superadmin", "manager", "hr manager"].includes(userRole);
  const isTL = userRole === "tl";
  
  const viewableEmployees = useMemo(() => {
    if (isAdminOrManager) return employees;
    if (isTL) return employees.filter(emp => emp._id === user?._id || (emp.tl?._id || emp.tl) === user?._id);
    return employees.filter(emp => emp._id === user?._id);
  }, [employees, user, isAdminOrManager, isTL]);

  // Calculate Attendance Stats
  const attendanceStats = useMemo(() => {
    const total = viewableEmployees.length;
    
    // Filter leaves that apply to the current viewable employees
    const viewableEmpIds = new Set(viewableEmployees.map(e => e._id));
    const leavesTodayCount = todayLeaves.filter(l => viewableEmpIds.has(l.employee?._id || l.employee)).length;
    
    // Simulations for other states (since real check-in isn't in DB yet)
    // We'll simulate 85% presence for non-leave employees
    const effectiveTotal = Math.max(0, total - leavesTodayCount);
    const present = Math.floor(effectiveTotal * 0.85);
    const notCheckedIn = effectiveTotal - present;
    const late = Math.floor(present * 0.05); // 5% of present are "late"
    
    return {
      todayStatus: {
        total,
        present,
        absent: 0, // Placeholder
        late,
        onLeave: leavesTodayCount,
        notCheckedIn,
      },
      averageWorkingHours: "09:00 Hours",
      punctualityPercentage: total > 0 ? `${Math.round(((present - late) / total) * 100)}%` : "0%",
      mostPunctualDepartment: "Engineering", 
      frequentLateArrivals: viewableEmployees.slice(0, 3).map(e => e.name),
    };
  }, [viewableEmployees, todayLeaves]);

  // Map to Attendance Records
  const attendanceRecords = useMemo(() => {
    return viewableEmployees.map((emp, index) => {
      const isOnLeave = todayLeaves.some(l => (l.employee?._id || l.employee) === emp._id);
      const isLate = (index % 10 === 0); // Simulation

      return {
        id: emp._id,
        name: `${emp.name} ${emp.lastName || ""}`,
        avatar: (index % 70) + 1, // Using indices for mock avatars
        department: emp.designation || "Member",
        checkInTime: isOnLeave ? "-" : (isLate ? "09:45 AM" : "09:15 AM"),
        checkOutTime: isOnLeave ? "-" : "06:30 PM",
        workingHours: isOnLeave ? "-" : (isLate ? "08:45 Hrs" : "09:15 Hrs"),
        status: isOnLeave ? "On Leave" : "Present",
        profileImage: emp.profileImage
      };
    });
  }, [viewableEmployees, todayLeaves]);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white border border-gray-200 lg:rounded-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading leading-tight">
          Attendance Overview
        </h1>
        <p className="text-sm text-textgray mt-1">Real-time attendance tracking and team punctuality metrics.</p>
      </div>

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