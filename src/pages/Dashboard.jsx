import GroupImg from "../assets/Group.png";
import Holiday from "../assets/Rectangle 56.png";
import Leave from "../assets/Group 3477.png";
import Leave1 from "../assets/Group 3478.png";
import { useState } from "react";

const Dashboard = () => {
  const tabs = [
    { id: "announcements", label: "Announcements" },
    { id: "birthdays", label: "Birthdays" },
    { id: "anniversary", label: "Work Anniversary" },
    { id: "newJoinee", label: "New Joinee" },
  ];

  const [activeTab, setActiveTab] = useState("announcements");

  return (
    <>
      <div className="p-8 border bg-white border-gray-200 rounded-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-heading leading-tight">
            Quick Access
          </h2>
        </div>
        <div className="  gap-8">
          <div className="grid grid-cols-[2fr_1fr] mb-8 gap-8 ">
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="border-r border rounded-xl border-gray-200 p-6  ">
                  <div className="flex justify-between items-start ">
                    <div>
                      <span className=" text-gray leading-none text-base font-medium">
                        Inbox
                      </span>
                      <h2 className="text-base font-bold text-heading mt-11 mb-3">
                        Good Job
                      </h2>
                      <p className="text-sm text-gray-500">
                        You have no pending actions.
                      </p>
                    </div>

                    <div>
                      <img src={GroupImg} alt="" />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 p-6 ">
                  <div className="flex justify-between items-start mb-10">
                    <span className="text-base leading-none font-medium">
                      Upcoming Holidays
                    </span>
                    <span className="text-sm leading-none text-gray-500">
                      View All
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <div>
                      <img src={Holiday} alt="" />
                    </div>
                    <div>
                      <p className="text-sm font-medium ">Christmas</p>
                      <p className="text-[12px] text-gray-500">Dec 25, 2025</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg">
                {/* Tabs Header */}
                <div className="flex border-b border-gray-200 px-6 justify-between">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 mr-8 text-sm font-medium relative
          ${
            activeTab === tab.id
              ? "text-[#2C3EA1] border-b-2 border-[#2C3EA1]"
              : "text-gray-500 hover:text-gray-700"
          }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Announcements */}
                {activeTab === "announcements" && (
                  <div className="flex flex-col items-center justify-center py-16">
                    <img src="/announcement.svg" className="w-24 mb-4" />
                    <p className="text-sm font-medium text-gray-700">
                      Aj kuch chutiyapa nhi hai
                    </p>
                  </div>
                )}

                {/* Birthdays */}
                {activeTab === "birthdays" && (
                  <div className="space-y-4 py-6 px-6">
                    <div className="flex items-center gap-4 p-4  rounded-lg">
                      <img className="w-10 h-10 rounded-full" src="/user.jpg" />
                      <div>
                        <p className="text-sm font-medium">
                          Aj is laude ka birthday hai
                        </p>
                        <p className="text-xs text-gray-500">Today 🎉</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Work Anniversary */}
                {activeTab === "anniversary" && (
                  <div className="grid grid-cols-2 gap-4 py-6 px-6">
                    <div className="p-4  rounded-lg">
                      <p className="text-sm font-medium">
                        Is bhadwe ko dekhte dekhte 5 saal ho gaye
                      </p>
                      <p className="text-xs text-gray-500">5 Years 🎊</p>
                    </div>
                  </div>
                )}

                {/* New Joinee */}
                {activeTab === "newJoinee" && (
                  <div className="space-y-4 py-6 px-6">
                    <div className="p-4  rounded-lg flex items-center gap-4">
                      <img className="w-10 h-10 rounded-full" src="/user.jpg" />
                      <div>
                        <p className="text-sm font-medium">
                          Aj ye madarchod aaya hai
                        </p>
                        <p className="text-xs text-gray-500">Joined Today</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="bg-white border border-gray-200 rounded-lg px-8 py-8 flex flex-col">
                <h3 className="text-base font-semibold text-gray-800 mb-6">
                  On Leave Today
                </h3>
                <div className="flex gap-2 items-center mb-5">
                  <div>
                    <img src={Leave} alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1 ">Meenu Thakur</p>
                    <p className="text-[12px] text-gray-500">
                      On Full Day Leave
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div>
                    <img src={Leave1} alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1 ">Anamika</p>
                    <p className="text-[12px] text-gray-500">
                      On Full Day Leave
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="bg-white border border-gray-200 rounded-lg px-8 py-8 flex flex-col"
                style={{ height: 400 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  Leads by Source
                </h3>
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 mb-6">
                    <canvas id="donutChart" />
                  </div>
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-600" />
                        <span className="text-sm text-gray-700">
                          Advertisement
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        29
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-400" />
                        <span className="text-sm text-gray-700">
                          Trade Show
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        29
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-200" />
                        <span className="text-sm text-gray-700">Partners</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        16
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
