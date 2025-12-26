import React from "react";

const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex gap-6 text-sm font-medium">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`pb-2 border-b-2 transition-all
            ${
              activeTab === tab.key
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-indigo-600"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
                                