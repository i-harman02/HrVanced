import React, { useState } from "react";
import Tabs from "../../components/Tabs";
import LeaveStats from "../../components/LeaveStats";
import LeaveHistory from "../../components/LeaveHistory";
import LeaveTable from "../../components/LeaveTable";
import Performance from "../../components/Performance";

const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState("leaves");

  const tabs = [
    { key: "leaves", label: "Leaves" },
    { key: "performance", label: "Performance" },
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
      <div className="mt-6 h-[80vh]">
        
        <Performance />
      </div>
    ),
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-full">

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
