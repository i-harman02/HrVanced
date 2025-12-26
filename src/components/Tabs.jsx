import React from "react";

const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex items-center gap-8 border-t border-b border-bordergray whitespace-nowrap -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 overflow-auto">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`text-sm font-medium py-5 border-b-2 cursor-pointer
            ${
              activeTab === tab.key
                ? "color-primary border-[#2C3EA1]"
                : "text-heading border-transparent"
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
                                