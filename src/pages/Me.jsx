import React, { useState } from "react";
import Tabs from "../components/Tabs";
import ProfileTab from "../components/ProfileTab";
import PersonalInfoTab from "../components/PersonalInfoTab";

const tabs = [
  {
    key: "profile",
    label: "Profile",
    component: ProfileTab,
  },
  {
    key: "personal-info",
    label: "Personal Information",
    component: PersonalInfoTab,
  },
];

const Me = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const ActiveComponent = tabs.find(
    (tab) => tab.key === activeTab
  )?.component;

  return (
    <>
      <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl h-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-heading leading-tight">
            Setting
          </h1>
        </div>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div className="pt-8">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </>
  );
};

export default Me;
