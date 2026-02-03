import React from 'react';

const HrStatsCard = () => {
  const stats = [
    {
      label: 'Total Employees',
      value: '45',
    },
    {
      label: 'Scheduled Interviews',
      value: '02',
    },
    {
      label: 'Total Projects',
      value: '200+',
    },
    {
      label: 'Total Clients',
      value: '07',
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="px-6 py-8 md:px-8 md:py-11.5 flex flex-col items-start justify-center"
          >
            <p className="text-sm text-textgray mb-3.5">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-black">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HrStatsCard;