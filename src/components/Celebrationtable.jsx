import React from "react";

import Birthday from "../assets/Group 3486.png";
import User1 from "../assets/Group 3487.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User3 from "../assets/Group 3489.png";
import Announcement from "../assets/Group 3486 (1).png";
import Year from "../assets/WWW.png";
import NewJoin from "../assets/OBJECTS (1).png";

import { fetchBirthdayDetails } from "../slices/birthdaySlice";

const Celebrationtable = () => {
  const dispatch = useDispatch();
  const { todayBirthdays, upcomingBirthDays } = useSelector(
    (state) => state.birthday
  );
  console.log("Upcoming birthdays:", upcomingBirthDays);

  const tabs = [
    { id: "announcements", label: "Announcements" },
    { id: "birthdays", label: "Birthdays" },
    { id: "anniversary", label: "Work Anniversary" },
    { id: "newJoinee", label: "New Joinee" },
  ];
  const [activeTab, setActiveTab] = useState("announcements");

  useEffect(() => {
    dispatch(fetchBirthdayDetails());
  }, [dispatch]);
  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Tabs Header */}
        <div className="flex border-b overflow-x-auto whitespace-nowrap scrollbar-none border-gray-200 px-6 justify-between">
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

        <div
          className="
        
  
        "
        >
          {/* Announcements */}
          {activeTab === "announcements" && (
            <div className="space-y-4 py-6 px-6">
              <div className="">
                <img className="m-auto" src={Announcement} />
              </div>
            </div>
          )}

        {activeTab === "birthdays" && (
  <div className="space-y-4 py-6 px-6">
    <div className="">
      <img className="m-auto" src={Birthday} />
    </div>

    <div className="pt-6 border-t border-gray-200">
      <p className="text-sm leading-none text-gray-500 mb-6">
        Next seven days
      </p>

      {upcomingBirthDays?.map((emp, index) => (
        <div key={emp._id} className="flex gap-2 items-center mb-6">
          <div>
            <img className="h-12 w-12" src={User1} alt="" />
          </div>
          <div>
            <p className="text-sm font-medium">
              {emp.firstName} {emp.lastName}
            </p>
            <p className="text-[12px] text-gray-500">
              {new Date(emp.birthday.thisYear).toDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


          {/* Work Anniversary */}
          {activeTab === "anniversary" && (
            <div className="space-y-4 py-6 px-6">
              <div className="">
                <img className="m-auto" src={Year} />
                <p className="text-[10px] md:text-base font-bold text-center mt-4">
                  No one is having work anniversary today
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm leading-none text-gray-500 mb-6">
                  Next seven days
                </p>

                <div className="flex gap-2 items-center mb-6">
                  <div>
                    <img className="h-12 w-12 " src={User3} alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-medium ">Abhilash Verma</p>
                    <p className="text-[12px] text-gray-500">Dec 05, 2025</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center mb-3">
                  <div>
                    <img className="h-12 w-12 " src={User1} alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-medium ">Sahil Garg</p>
                    <p className="text-[12px] text-gray-500">Dec 06, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* New Joinee */}
          {activeTab === "newJoinee" && (
            <div className="space-y-4 py-6 px-6">
              <div className="">
                <img className="m-auto" src={NewJoin} />
                <p className="text-[10px] md:text-base  font-bold text-center mt-4">
                  No one join this week
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Celebrationtable;
