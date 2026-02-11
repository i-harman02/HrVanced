import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerformances } from "../slices/performanceSlice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ManagerComments = ({ filteredEmployeeId }) => {
  const dispatch = useDispatch();
  const { performances, loading } = useSelector((state) => state.performance || {});
  const userState = useSelector((state) => state.user || {});
  const user = userState.user || null;

  useEffect(() => {
    dispatch(fetchPerformances());
  }, [dispatch]);

  // Combined Filtering Logic
  const displayComments = [...performances]
    .filter(perf => {
      // 1. If filteredEmployeeId is provided (expanded row), filter by that
      if (filteredEmployeeId) {
        return (perf.employee?._id || perf.employee) === filteredEmployeeId;
      }
      // 2. Otherwise, use role-based visibility
      const userRole = (user?.role || user?.assignRole || "").toLowerCase();
      const isAdminOrManager = ["admin", "superadmin", "manager", "hr manager", "tl"].includes(userRole);
      
      if (isAdminOrManager) return true;
      return (perf.employee?._id || perf.employee) === user?._id;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const isEmbedded = !!filteredEmployeeId;

  return (
    <div className={`${isEmbedded ? "" : "bg-white border border-gray-200 rounded-2xl"} h-full flex flex-col`}>
      {/* Header - Only show if not embedded */}
      {!isEmbedded && (
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800">
            Recent Manager Comments
          </h3>
        </div>
      )}

      <div className={`${isEmbedded ? "p-0" : "p-4 md:p-6"} space-y-5 overflow-y-auto flex-1 custom-scrollbar`}>
        {loading && performances.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-6 h-6 border-2 border-[#2C3EA1] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Updating...</p>
          </div>
        ) : displayComments.length === 0 ? (
          <div className="text-center py-10">
             <p className="text-xs text-gray-400 font-bold uppercase tracking-widest italic opacity-60">No recent logs</p>
          </div>
        ) : (
          displayComments.map((item) => (
            <div key={item._id} className="flex items-start gap-3 group">
              {/* Indicator */}
              <div className="mt-1">
                <span className="w-3 h-3 rounded-full border-2 border-[#2C3EA1] block group-hover:bg-[#2C3EA1] transition-all" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-medium leading-relaxed italic">
                  "{item.comments}"
                </p>
                <p className="text-[10px] text-[#2C3EA1] font-bold uppercase mt-1">
                  By {item.addedBy?.name || "Manager"} • {item.employee?.name}
                </p>
              </div>

              {/* Time */}
              <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap pt-0.5">
                {dayjs(item.date).fromNow(true).replace('a ', '1').replace('an ', '1')}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManagerComments;
