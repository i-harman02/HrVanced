import React, { useEffect, useState } from "react";
import Birthday from "../assets/Group 3486.png";
import User1 from "../assets/Group 3487.png";
import { useDispatch, useSelector } from "react-redux";
import User3 from "../assets/Group 3489.png";
import Announcement from "../assets/Group 3486 (1).png";
import Year from "../assets/WWW.png";
import NewJoin from "../assets/OBJECTS (1).png";
import { fetchBirthdayDetails } from "../slices/birthdaySlice";
import WishModal from "./WishModal";
import BirthdayFeed from "./BirthdayFeed";

const Celebrationtable = () => {
  const dispatch = useDispatch();
  const { todayBirthdays, upcomingBirthDays } = useSelector(
    (state) => state.birthday
  );

  const tabs = [
    { id: "announcements", label: "Announcements" },
    { id: "birthdays", label: "Birthdays" },
    { id: "anniversary", label: "Work Anniversary" },
    { id: "newJoinee", label: "New Joinee" },
  ];

  const [activeTab, setActiveTab] = useState("announcements");
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [wishType, setWishType] = useState("Birthday");
  const [birthdayPosts, setBirthdayPosts] = useState([]);

  useEffect(() => {
    dispatch(fetchBirthdayDetails());
  }, [dispatch]);

  const handleWishSent = (wishData) => {
    setBirthdayPosts([
      {
        id: Date.now(),
        author: "You",
        authorAvatar: User1,
        date: new Date().toDateString(),
        message: wishData.message,
        image: wishData.image,
        comments: []
      },
      ...birthdayPosts
    ]);
  };

  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex border-b overflow-x-auto whitespace-nowrap scrollbar-none border-gray-200 px-6 justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 mr-8 text-sm font-medium relative ${
                activeTab === tab.id
                  ? "text-[#2C3EA1] border-b-2 border-[#2C3EA1]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "announcements" && (
            <div className="space-y-4 py-6 px-6">
              <img className="m-auto" src={Announcement} />
            </div>
          )}

          {activeTab === "birthdays" && (
            <div className="space-y-4 py-6 px-6">
              {/* <img className="m-auto" src={Birthday} /> */}
              <BirthdayFeed
                employee={{ name: "Arundeep Singh", date: "Jan 9, 2026" }}
                posts={birthdayPosts}
                onSendWishes={() => {
                  setWishType("Birthday");
                  setIsWishModalOpen(true);
                }}
              />

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-textgray mb-6">
                  Next seven days
                </p>

                {upcomingBirthDays?.map((emp) => (
                  <div key={emp._id} className="flex gap-2 items-center mb-6">
                    <img className="h-12 w-12" src={User1} alt="" />
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

          {activeTab === "anniversary" && (
            <div className="space-y-4 py-6 px-6">
              <img className="m-auto" src={Year} />
            </div>
          )}


          {activeTab === "newJoinee" && (
            <div className="space-y-4 py-6 px-6">
              <img className="m-auto" src={NewJoin} />
            </div>
          )}
        </div>
      </div>

      <WishModal
        isOpen={isWishModalOpen}
        onClose={() => setIsWishModalOpen(false)}
        title={`Send ${wishType} Wishes`}
        employeeName="Arundeep Singh"
        onWishSent={handleWishSent}
      />
    </div>
  );
};

export default Celebrationtable;
