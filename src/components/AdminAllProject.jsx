import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProjects } from '../slices/projectSlice';

const AdminAllProject = () => {
  const dispatch = useDispatch();
  
  const { projects, loading } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  
  const totalProjects = projects?.length || 0;
  
  const completedProjectsCount = projects?.filter(
    (p) => p.currentStatus === 'Completed'
  ).length || 0;
  
  const ongoingProjectsCount = projects?.filter(
    (p) => p.currentStatus !== 'Completed'
  ).length || 0;

  const averageProgress = totalProjects > 0 
    ? Math.round(projects.reduce((acc, p) => acc + (p.progress || 0), 0) / totalProjects)
    : 0;

  const statItems = [
    {
      label: 'Total Project',
      value: totalProjects.toString().padStart(2, '0'),
    },
    {
      label: 'Overall progress',
      value: `${averageProgress}%`,
    },
    {
      label: 'Completed Project',
      value: completedProjectsCount.toString().padStart(2, '0'),
    },
    {
      label: 'Ongoing Project',
      value: ongoingProjectsCount.toString().padStart(2, '0'),
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className="px-6 py-8 md:px-8 md:py-10 flex flex-col items-start justify-center transition-all hover:bg-gray-50/50"
          >
            <p className="text-sm text-textgray mb-3 font-medium">
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

export default AdminAllProject;