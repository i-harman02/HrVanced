import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Birthday from "../assets/Group 3486.png";
import User1 from "../assets/Group 3487.png";
import Announcement from "../assets/Group 3486 (1).png";
import Year from "../assets/WWW.png";
import NewJoin from "../assets/OBJECTS (1).png";

import { fetchBirthdayDetails } from "../slices/birthdaySlice";
import { fetchWorkAnniversary } from "../slices/anniversarySlice";

import WishModal from "./WishModal";
import BirthdayPost from "./BirthdayPost";
import AnnouncementComposer from "./AnnouncementComposer";

const Celebrationtable = () => {
  const dispatch = useDispatch();

  const { todayBirthdays, upcomingBirthDays } = useSelector(
    (state) => state.birthday
  );
const { todayWorkAnniversary, upcomingWorkAnniversary } = useSelector(
    (state) => state.anniversary
  );

  const actualTodayAnniversaries = todayWorkAnniversary?.filter(emp => emp.yearsCompleted > 0) || [];
  const actualUpcomingAnniversaries = upcomingWorkAnniversary?.filter(emp => emp.yearsCompleted > 0) || [];
  const todayNewJoinees = todayWorkAnniversary?.filter(emp => emp.yearsCompleted === 0) || [];
  const upcomingNewJoinees = upcomingWorkAnniversary?.filter(emp => emp.yearsCompleted === 0) || [];

  const tabs = [
    { id: "announcements", label: "Announcements" },
    { id: "birthdays", label: "Birthdays" },
    { id: "anniversary", label: "Work Anniversary" },
    { id: "newJoinee", label: "New Joinee" }
  ];

  const [activeTab, setActiveTab] = useState("announcements");
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
const [birthdayPosts, setBirthdayPosts] = useState([]);
const [anniversaryPosts, setAnniversaryPosts] = useState([]);
const [announcements, setAnnouncements] = useState([]);
const [wishType, setWishType] = useState(null); 

  useEffect(() => {
    dispatch(fetchBirthdayDetails());
    dispatch(fetchWorkAnniversary());
  }, [dispatch]);

 const handleWishSent = (wishData) => {
  const newPost = {
    id: Date.now(),
    author: "You",
    authorAvatar: User1,
    date: new Date().toDateString(),
    message: wishData.message,
    image: wishData.image,
    employeeId: selectedEmployee?._id,
    comments: []
  };

  if (wishType === "birthday") {
    setBirthdayPosts((prev) => [newPost, ...prev]);
  }

  if (wishType === "anniversary") {
    setAnniversaryPosts((prev) => [newPost, ...prev]);
  }
};

const handleAnnouncementCreate = (announcement) => {
    setAnnouncements((prev) => [announcement, ...prev]);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
   
      <div className="flex border-b border-bordergray px-6 justify-between">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 mr-8 text-sm font-medium ${
              activeTab === tab.id
                ? "text-[#2C3EA1] border-b-2 border-[#2C3EA1]"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>


      {activeTab === "announcements" && (
        <div className="py-6 px-6">
          {/* Empty State or Posts */}
          {announcements.length === 0 ? (
              <img className="m-auto mb-2" src={Announcement} alt="No announcements" />
          ) : (
            <div className="pt-8 space-y-6">
              {announcements.map((announcement) => (
                <BirthdayPost key={announcement.id} post={announcement} />
              ))}
            </div>
          )}

          {/* Announcement Composer */}
          <AnnouncementComposer onAnnouncementCreate={handleAnnouncementCreate} />
        </div>
      )}

  
      {activeTab === "birthdays" && (
        <div className="py-6 px-6 space-y-6">
          {todayBirthdays?.length === 0 && (
            <img className="m-auto mb-2" src={Birthday} alt="" />
          )}

          {todayBirthdays?.map((emp) => (
            <div key={emp._id}>
              {/* Header */}
              <div className="flex items-end justify-between mb-4">
                <div className="flex gap-4 items-center">
                  <img src={User1} className="h-16 w-16 rounded-md" alt="" />
                  <div>
                    <p className="font-medium text-sm">
                      {emp.name} {emp.lastName}
                    </p>
                    <p className="text-xs text-gray-500">🎂 Today</p>
                  </div>
                </div>

            <button
  onClick={() => {
    setSelectedEmployee(emp);
    setWishType("birthday");
    setIsWishModalOpen(true);
  }}
  className="text-sm text-[#2C3EA1] underline"
>
  Send Wishes
</button>

              </div>

             
              {birthdayPosts
                .filter((p) => p.employeeId === emp._id)
                .map((post) => (
                  <BirthdayPost key={post.id} post={post} />
                ))}
            </div>
          ))}

      
          <div className="pt-6 border-t border-bordergray">
            <p className="text-sm text-gray-500 mb-4">Next seven days</p>

            {upcomingBirthDays?.length > 0 ? (
              upcomingBirthDays.map((emp) => (
                <div key={emp._id} className="flex gap-3 mb-4 items-center">
                  <img src={User1} className="h-12 w-12" alt="" />
                  <div>
                    <p className="text-sm font-medium">
                      {emp.name} {emp.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(emp.birthday.thisYear).toLocaleDateString(
                        "en-GB",
                        { day: "2-digit", month: "short" }
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center">
                No birthdays in next 7 days
              </p>
            )}
          </div>
        </div>
      )}

     
      {activeTab === "anniversary" && (
  <div className="py-6 px-6 space-y-6">

    {/* Today */}
    {actualTodayAnniversaries.length === 0 && (
      <img className="m-auto mb-2" src={Year} alt="" />
    )}

    {actualTodayAnniversaries.map((emp) => (
  <div key={emp._id}>
    {/* Header */}
    <div className="flex items-end justify-between mb-4">
      <div className="flex gap-3 items-center">
        <img src={User1} className="h-12 w-12" alt="" />
        <div>
          <p className="text-sm font-medium">
            {emp.name} {emp.lastName}
          </p>
          <p className="text-xs text-gray-500">
            🎊 {emp.yearsCompleted} Years Completed
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          setSelectedEmployee(emp);
          setWishType("anniversary");
          setIsWishModalOpen(true);
        }}
        className="text-sm text-[#2C3EA1] underline"
      >
        Send Wishes
      </button>
    </div>

    {/* Anniversary Posts */}
    {anniversaryPosts
      .filter((p) => p.employeeId === emp._id)
      .map((post) => (
        <BirthdayPost key={post.id} post={post} />
      ))}
  </div>
))}


    <div className="pt-6 border-t border-bordergray">
      <p className="text-sm text-gray-500 mb-4">Next Seven Days</p>

      {actualUpcomingAnniversaries.length > 0 ? (
        actualUpcomingAnniversaries.map((emp) => (
          <div key={emp._id} className="flex gap-3 items-center mb-4">
            <img src={User1} className="h-12 w-12" alt="" />
            <div>
              <p className="text-sm font-medium">
                {emp.name} {emp.lastName}
              </p>
              <p className="text-xs text-gray-500">
                 📅 {new Date(emp.dateOfJoining).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short"
  })}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500 text-center">
          No upcoming work anniversaries
        </p>
      )}
    </div>
  </div>
)}

     
      {activeTab === "newJoinee" && (
        <div className="py-6 px-6 space-y-6">
          {todayNewJoinees.length === 0 && upcomingNewJoinees.length === 0 ? (
            <div className="text-center">
              <img className="m-auto" src={NewJoin} alt="" />
              <p className="text-sm font-bold mt-4">No one joined this week</p>
            </div>
          ) : (
            <>
              {todayNewJoinees.map((emp) => (
                <div key={emp._id} className="flex items-end justify-between mb-4">
                  <div className="flex gap-3 items-center">
                    <img src={User1} className="h-12 w-12" alt="" />
                    <div>
                      <p className="text-sm font-medium">
                        {emp.name} {emp.lastName}
                      </p>
                      <p className="text-xs text-gray-500">
                        🆕 Joined Today
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {upcomingNewJoinees.length > 0 && (
                <div className="pt-6 border-t border-bordergray">
                  <p className="text-sm text-gray-500 mb-4">Upcoming Joiners</p>
                  {upcomingNewJoinees.map((emp) => (
                    <div key={emp._id} className="flex gap-3 items-center mb-4">
                      <img src={User1} className="h-12 w-12" alt="" />
                      <div>
                        <p className="text-sm font-medium">
                          {emp.name} {emp.lastName}
                        </p>
                        <p className="text-xs text-gray-500">
                          📅 Joining on {new Date(emp.dateOfJoining).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short"
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

 
    <WishModal
  isOpen={isWishModalOpen}
  onClose={() => setIsWishModalOpen(false)}
  title={
    wishType === "birthday"
      ? "Send Birthday Wishes"
      : "Send Work Anniversary Wishes"
  }
  employeeName={`${selectedEmployee?.name || ""}`}
  onWishSent={handleWishSent}
/>

    </div>
  );
};

export default Celebrationtable;
