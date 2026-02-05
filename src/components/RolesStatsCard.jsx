import React from "react";

const RolesStatsCard = ({ stats }) => {
  const statItems = [
    {
      label: "Total Roles",
      value: stats?.totalRoles || 0,
    },
    {
      label: "Total Designation",
      value: stats?.totalDesignation || 0,
    },
    {
      label: "Active Employees",
      value: stats?.activeEmployees || 0,
    },
    {
      label: "Unassigned Roles",
      value: stats?.unassignedRoles || 0,
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className="px-6 py-8 md:px-8 md:py-11.5 flex flex-col items-center sm:items-start"
          >
            <p className="text-sm text-textgray mb-3.5 font-medium">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-black tabular-nums">
              {stat.value.toString().padStart(2, "0")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolesStatsCard;