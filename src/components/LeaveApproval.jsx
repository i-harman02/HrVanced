
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../slices/dashboardSlice';
import { fetchRequestedLeaves, updateLeaveStatus } from '../slices/leaveSlice';
import { FiEye } from "react-icons/fi";
import { GoCheck, GoX } from "react-icons/go";
import dayjs from 'dayjs';
import LeaveReasonModal from './LeaveReasonModal';
import User1 from "../assets/Group 3487.png";
import AdminLeavedetalcard from './AdminLeavedetalcard';
import AdminAllLeaveData from './AdminAllLeaveData';

const LeaveTimelineDashboard = () => {
  const dispatch = useDispatch();
  const { requestedLeaves = [], loading: leaveLoading } = useSelector((state) => state.leave);
  const { stats, loading: statsLoading } = useSelector((state) => state.dashboard);
  const user = useSelector((state) => state.user.user);
  
  const [selectedLeave, setSelectedLeave] = useState(null);

  useEffect(() => {
    dispatch(fetchDashboardStats());
    if (user?._id) {
       dispatch(fetchRequestedLeaves({ id: "all", params: {} }));
    }
  }, [dispatch, user]);

  const handleStatusUpdate = async (leaveId, status) => {
    if (!user?._id) return;
    await dispatch(updateLeaveStatus({ id: leaveId, employerId: user._id, status }));
    dispatch(fetchRequestedLeaves({ id: "all", params: {} }));
    dispatch(fetchDashboardStats());
  };

  const categorizedLeaves = useMemo(() => {
    const approved = requestedLeaves.filter(l => l.status === 'Approved');
    const pending = requestedLeaves.filter(l => l.status === 'Pending');
    const rejected = requestedLeaves.filter(l => l.status === 'Rejected' || l.status === 'Declined');
    return { approved, pending, rejected };
  }, [requestedLeaves]);

  const totalRequests = requestedLeaves.length;

  const StatCard = ({ label, value }) => (
    <div className="px-6 py-8 md:px-8 md:py-11.5 flex flex-col items-start justify-center transition-all hover:bg-gray-50/50">
      <p className="text-gray-500 text-xs font-medium">{label}</p>
      <h3 className="text-4xl font-bold text-gray-900">{value}</h3>
    </div>
  );

  const TimelineItem = ({ leave, type }) => (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline Line */}
      <div className="absolute left-[11px] top-3 bottom-0 w-[2px] bg-gray-100 last:hidden"></div>
      
      {/* Timeline Dot */}
      <div className={`absolute left-[7px] top-3 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm z-10 ${
         type === 'approved' ? 'bg-green-500' :
         type === 'pending' ? 'bg-orange-400' :
         'bg-red-500'
      }`}></div>

      <div className="flex flex-col gap-2 group">
         {/* Header: Avatar, Name, Status */}
         <div className="flex items-center gap-3">
             <img 
               src={leave.employee?.profileImage || User1} 
               className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
               alt="" 
             />
             <div>
                <div className="flex items-center gap-2">
                   <span className="text-sm font-semibold text-gray-700">{leave.employee?.name} {leave.employee?.lastName}</span>
                   <span className={`text-[10px] px-2 py-[2px] rounded border ${
                      leave.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-100' :
                      leave.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                      'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {leave.status}
                   </span>
                </div>
             </div>
         </div>

         {/* Date Range with Visual Line */}
         <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
             <span>{dayjs(leave.startDate).format("MMM DD, YYYY")}</span>
             <div className="flex-1 h-[1px] bg-gray-100 mx-4 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gray-200"></div>
             </div>
             <span>{dayjs(leave.endDate).format("MMM DD, YYYY")}</span>
         </div>


         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => setSelectedLeave(leave)}>
               <p className="text-xs text-gray-500 italic truncate max-w-[200px]" title={leave.reason}>
                 {leave.reason ? (leave.reason.length > 30 ? `${leave.reason.substring(0, 30)}...` : leave.reason) : "No reason provided"} 
                 <FiEye className="inline ml-1 mb-0.5 text-indigo-400" size={12} />
               </p>
            </div>
            

         </div>
      </div>
    </div>
  );
    
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Leave Management</h2>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 w-full bg-white rounded-xl border border-gray-200 mb-8">
        <StatCard label="Total Leave Requests" value={totalRequests.toString().padStart(2, '0')} />
        <StatCard label="Pending Approvals" value={(stats?.totalPending || 0).toString().padStart(2, '0')} />
        <StatCard label="Approved Leaves" value={(stats?.totalApproved || 0).toString().padStart(2, '0')} />
        <StatCard label="Rejected Leaves" value={(stats?.totalRejected || 0).toString().padStart(2, '0')} />
        <StatCard label="Employees on Leave Today" value={(stats?.totalEmployeesOnLeave || 0).toString().padStart(2, '0')} />
      </div>

      {/* Columns */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Approved Column */}
        <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 w-full">
           <h3 className="text-sm font-bold text-gray-900 mb-6">Approved Leaves</h3>
           <div className="relative">
             {/* Main Vertical Line for the entire container */}
             <div className="absolute left-[11px] top-3 bottom-0 w-[2px] bg-gray-100"></div>
             
             {categorizedLeaves.approved.map(leave => (
               <TimelineItem key={leave._id} leave={leave} type="approved" />
             ))}
             {categorizedLeaves.approved.length === 0 && <p className="text-xs text-gray-400 pl-8 py-2 italic relative z-10 bg-white">No approved leaves</p>}
           </div>
        </div>

        {/* Pending Column */}
        <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 w-full">
           <h3 className="text-sm font-bold text-gray-900 mb-6">Pending Leaves</h3>
            <div className="relative">
             <div className="absolute left-[11px] top-3 bottom-0 w-[2px] bg-gray-100"></div>
             {categorizedLeaves.pending.map(leave => (
               <TimelineItem key={leave._id} leave={leave} type="pending" />
             ))}
             {categorizedLeaves.pending.length === 0 && <p className="text-xs text-gray-400 pl-8 py-2 italic relative z-10 bg-white">No pending requests</p>}
           </div>
        </div>

        {/* Rejected Column */}
        <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 w-full">
           <h3 className="text-sm font-bold text-gray-900 mb-6">Rejected Leaves</h3>
           <div className="relative">
             <div className="absolute left-[11px] top-3 bottom-0 w-[2px] bg-gray-100"></div>
             {categorizedLeaves.rejected.map(leave => (
               <TimelineItem key={leave._id} leave={leave} type="rejected" />
             ))}
             {categorizedLeaves.rejected.length === 0 && <p className="text-xs text-gray-400 pl-8 py-2 italic relative z-10 bg-white">No rejected leaves</p>}
           </div>
        </div>
      </div>

      {selectedLeave && (
         <LeaveReasonModal reason={selectedLeave.reason} onClose={() => setSelectedLeave(null)} />
      )}
    </div>
  );
}

const LeaveApproval = () => {
    const user = useSelector((state) => state.user.user);
    const isAdmin = user?.role === "admin" || user?.role === "superadmin";

    if (isAdmin) {
        return <LeaveTimelineDashboard />;
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-1 gap-8'>
          <AdminLeavedetalcard />
          <AdminAllLeaveData />
        </div>
    )
}

export default LeaveApproval;
