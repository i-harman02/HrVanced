import React, { useState } from "react";
import Tabs from "../../components/Tabs";
import Profile from "./Profile";
import PersonalInfo from "./PersonalInfo";
import EmergencyContact from "./EmergencyContact";
import BankInfo from "./BankInfo";
import IdentityInfo from "./IdentityInfo";
import Education from "./Education";
import Experience from "./Experience"
import Projects from "./Projects";

const tabs = [
  {
    key: "profile",
    label: "Profile",
    component: Profile,
  },
  {
    key: "personal-info",
    label: "Personal Information",
    component: PersonalInfo,
  },
  {
    key: "emergency-contact",
    label: "Emergency Contact",
    component: EmergencyContact,
  },
  {
    key: "bank-info",
    label: "Bank Information",
    component: BankInfo,
  },
  {
    key: "identity-info",
    label: "Identity Information",
    component: IdentityInfo,
  },
  {
    key: "education",
    label: "Education",
    component: Education,
  },
  {
    key: "experience",
    label: "Experience",
    component: Experience,
  },
  {
    key: "projects",
    label: "Projects",
    component: Projects,
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
