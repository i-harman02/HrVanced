import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../slices/dashboardSlice';

const HrStatsCard = () => {
  const dispatch = useDispatch();
  
  const { stats, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const statItems = [
    {
      label: 'Total Employees',
      value: (stats?.totalEmployees|| 0).toString().padStart(2, '0'),
    },
    {
      label: 'Scheduled Interviews',
      value: '02',
    },
    {
      label: 'Total Projects',
      value: (stats?.totalProjects || 0).toString().padStart(2, '0'),
    },
    {
      label: 'Total Clients',
      value: (stats?.totalClients || 0).toString().padStart(2, '0'),
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 ">
      <div className="grid grid-cols-1 sm:grid- cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className="px-6 py-8 md:px-8 md:py-11.5 flex flex-col items-start justify-center transition-all hover:bg-gray-50/50"
          >
            <p className="text-sm text-textgray mb-3.5 font-medium">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-black tabular-nums">
              {loading ? '...' : stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HrStatsCard;