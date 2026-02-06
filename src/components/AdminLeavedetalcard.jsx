import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../slices/dashboardSlice';
import { fetchRequestedLeaves } from '../slices/leaveSlice';


const AdminLeavedetalcard = () => {
  const dispatch = useDispatch();
  
  const { requestedLeaves, loading: leaveLoading } = useSelector((state) => state.leave);
  const { stats, loading: statsLoading } = useSelector((state) => state.dashboard);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchDashboardStats());
    if (user?._id) {
      const isPrivileged = user.role === "admin" || user.role === "superadmin" || user.assignRole === "HR" || user.assignRole === "HR Manager" || user.assignRole === "Manager";
      dispatch(fetchRequestedLeaves({ 
        id: isPrivileged ? "all" : user._id,
        params: {} 
      }));
    }
  }, [dispatch, user]);

  const statItems = [
    {
      label: 'Pending Request',
      value: (stats?.totalPending ?? 0).toString().padStart(2, '0'),
    },
    {
      label: 'Approved Request',
      value: (stats?.totalApproved ?? 0).toString().padStart(2, '0'),
    },
    {
      label: 'Rejected Request',
      value: (stats?.totalRejected ?? 0).toString().padStart(2, '0'),
    },
    {
      label: 'On Leave Today',
      value: (stats?.totalEmployeesOnLeave ?? 0).toString().padStart(2, '0'),
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className="px-6 py-8 md:px-8 md:py-11.5 flex flex-col items-start justify-center transition-all hover:bg-gray-50/50"
          >
            <p className="text-sm text-textgray mb-3.5 font-medium">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-black tabular-nums">
              {statsLoading || leaveLoading ? '...' : stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLeavedetalcard;