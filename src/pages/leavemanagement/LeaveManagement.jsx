import React, { useState } from "react";
import Tabs from "../../components/Tabs";
import LeaveStats from "../../components/LeaveStats";
import LeaveHistory from "../../components/LeaveHistory";
import LeaveTable from "../../components/LeaveTable";
import Performance from "../../components/Performance";
import EmployeeAttendance from "../../components/EmployeeAttendance";
import Holidaydetails from "../../components/Holidays";
const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState("leaves");

  const tabs = [
    { key: "leaves", label: "Leaves" },
    { key: "performance", label: "Performance" },
      { key: "holidays", label: "Holidays" },
    { key: "attendance", label: "Attendance" },
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
    attendance:(
        <div className="mt-6 ">
        
        <EmployeeAttendance />
      </div>
    )
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 lg:p-8 h-full">

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
