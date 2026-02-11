import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Tabs from "../../components/Tabs";
import LeaveStats from "../../components/LeaveStats";
import LeaveHistory from "../../components/LeaveHistory";
import LeaveTable from "../../components/LeaveTable";
import Performance from "../../components/Performance";
import EmployeeAttendance from "../../components/EmployeeAttendance";
import Holidaydetails from "../../components/Holidays";
import LeaveApproval from "../../components/LeaveApproval";
const LeaveManagement = () => {
  const user = useSelector((state) => state.user.user);
  const isAdmin = user?.role === "admin" || user?.role === "superadmin";
  const isTL = user?.assignRole === "TL" || user?.assignRole === "Manager";
  const isHR = user?.assignRole === "HR" || user?.assignRole === "HR Manager";

  const [activeTab, setActiveTab] = useState(isAdmin ? "performance" : "leaves");

  useEffect(() => {
    if (isAdmin && activeTab === 'leaves') {
      setActiveTab('performance');
    }
  }, [isAdmin, activeTab]);

  const tabs = [
    ...(!isAdmin ? [{ key: "leaves", label: "Leaves" }] : []),
    { key: "performance", label: "Performance" },
    ...(!isAdmin ? [
      { key: "holidays", label: "Holidays" },
      { key: "attendance", label: "Attendance" }
    ] : []),
    ...(isAdmin || isTL || isHR ? [{ key: "leaveApproval", label: "Leave Approval" }] : []),
  ];

  const tabContent = {
    leaves: (
      <>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          <LeaveStats />
          <LeaveHistory />
        </div>  

        <div className="mt-6">
          <LeaveTable />
        </div>
      </>
    ),
    performance: (
      <div className="mt-6 ">
        
        <Performance />
      </div>
    ),
    holidays:(
        <div className="mt-6 ">
        
        <Holidaydetails />
      </div>
    ),
    attendance: (
      <div className="mt-6 ">
        <EmployeeAttendance />
        {(isTL || isAdmin || isHR) && <LeaveApproval />}
      </div>
    ),
    leaveApproval:(
        <div className="mt-6 ">
        
        <LeaveApproval />
      </div>
    )
  };

  return (
    <div className="bg-white rounded-xl  p-4 md:p-6 lg:p-8 h-full">

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {tabContent[activeTab]}
    </div>
  );
};

export default LeaveManagement;
