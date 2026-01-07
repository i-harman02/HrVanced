// BirthdayFeed.jsx
import React from "react";
import BirthdayPost from "./BirthdayPost";
import User1 from "../assets/Group 3487.png";

const BirthdayFeed = ({ employee, onSendWishes, posts = [] }) => {
  return (
    <div className="bg-white">
      <p className="text-sm font-medium text-textgray mb-6">Today</p>
      {/* Employee Header */}
      <div className="flex items-end justify-between mb-6">
        <div className="flex items-center gap-4">
          <img src={User1} className="h-16 w-16 rounded-md" alt="" />
          <div>
            <p className="font-medium text-sm text-heading leading-none mb-2">{employee.name}</p>
            <p className="text-xs text-textgray">{employee.date}</p>
          </div>
        </div>
        <button
          onClick={onSendWishes}
          className="text-sm color-primary font-medium leading-none cursor-pointer underline"
        >
          Send Wishes
        </button>
      </div>

      {/* Posts Section - Only show if there are posts */}
      {posts.length > 0 && (
        <div className="mb-6">
          {/* Posts */}
          {posts.map((post) => (
            <BirthdayPost key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BirthdayFeed;
