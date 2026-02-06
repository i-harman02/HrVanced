import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodayLeaves } from '../slices/leaveSlice';

const TodayLeave = () => {
  const dispatch = useDispatch();
  const { todayLeaves, loading } = useSelector((state) => state.leave);

  useEffect(() => {
    dispatch(fetchTodayLeaves());
  }, [dispatch]);

  // Helper to format leave type display
  const formatLeaveLabel = (type) => {
    if (type === "FULL_DAY_LEAVE") return "On Full Day Leave";
    if (type === "HALF_DAY_LEAVE") return "On Half Day Leave";
    if (type === "SHORT_LEAVE") return "On Short Leave";
    return "On Leave";
  };

  // Helper to get initial for avatar if no image
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 flex flex-col h-full ">
      <h3 className=" text-gray leading-none text-base font-medium mb-4">
        On Leave Today
      </h3>
      
      <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
        {todayLeaves.length === 0 ? (
          <div className="py-10 text-center text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-sm font-medium ">No one is on leave today</p>
          </div>
        ) : (
          todayLeaves.map((leave, index) => (
            <div key={leave._id || index} className="flex gap-4 items-center group transition-all">
              <div className="relative">
                {leave.employee?.profileImage ? (
                  <img 
                    src={leave.employee.profileImage} 
                    alt={leave.employee.name} 
                    className="w-14 h-14 object-cover rounded-2xl "
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl ">
                    {getInitial(leave.employee?.name)}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              
              <div className="flex flex-col">
                <p className="text-[17px] font-semibold text-gray-900 ">
                  {leave.employee?.name || "Unknown"}
                </p>
                <p className="text-sm font-medium text-gray-500 mt-0.5">
                  {formatLeaveLabel(leave.leaveType)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TodayLeave