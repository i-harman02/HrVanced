  import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination";
import ResignationModal from "./AddResignationModal";
import { fetchResignations, updateResignationStatus, deleteResignation } from "../../slices/resignationSlice";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

const Resignation = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { resignations, loading } = useSelector((state) => state.resignation);

  const isPrivileged = user?.role === "admin" || user?.role === "superadmin" || user?.assignRole === "HR" || user?.assignRole === "HR Manager" || user?.assignRole === "Manager";

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchResignations(isPrivileged ? null : user._id));
    }
  }, [dispatch, user, isPrivileged]);

  const handleStatusUpdate = (id, status) => {
    if (window.confirm(`Are you sure you want to set this resignation to ${status}?`)) {
      dispatch(updateResignationStatus({ id, status }));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this resignation entry?")) {
      dispatch(deleteResignation(id));
    }
  };

  const calculateRemainingDays = (startDate, totalNoticePeriod = 45) => {
    if (!startDate) return totalNoticePeriod;
    const start = new Date(startDate);
    const today = new Date();
    
    // Reset time to midnight to calculate difference in calendar days
    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // If resignation date is in the future, return total notice period (don't show > 45)
    if (diffDays < 0) return totalNoticePeriod;

    const remaining = totalNoticePeriod - diffDays;
    
    return remaining > 0 ? remaining : 0;
  };

  const getLastWorkingDay = (startDate, noticePeriod) => {
    if (!startDate) return "---";
    const date = new Date(startDate);
    // Notice period starts on the resignation date, so we add the period and subtract 1 day to get the last working day inclusive.
    date.setDate(date.getDate() + parseInt(noticePeriod || 45) - 1);
    return date.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "rejected": 
      case "declined": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl min-h-full flex flex-col">
        <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-heading leading-tight">
            Resignation
          </h1>
          {(!isPrivileged && (!resignations || resignations.length === 0)) && (
            <button
              type="button" onClick={() => setOpen(true)}
              className="bg-primary text-white text-sm font-medium cursor-pointer p-3 rounded-sm leading-[0.86]"
            >
              Add Resignation
            </button>
          )}
          {open && <ResignationModal onClose={() => setOpen(false)} />}
        </div>

        {isPrivileged ? (
          <>
            <div className="bg-white border border-bordergray rounded-lg px-6 pt-6 pb-3.5 mb-8 overflow-x-auto flex-1 relative">
              <table className="w-full min-w-250">
                <thead>
                  <tr className="border-b border-bordergray">
                    <th className="pb-4 text-left text-sm font-bold text-heading">
                      Employee Name
                    </th>
                    <th className="pb-4 text-left text-sm font-bold text-heading">
                      Designation
                    </th>
                    <th className="pb-4 text-left text-sm font-bold text-heading">
                      Reason
                    </th>
                    <th className="pb-4 text-left text-sm font-bold text-heading">
                      Resigned Date
                    </th>
                    <th className="pb-4 text-left text-sm font-bold text-heading">
                      Notice Period
                    </th>
                    <th className="pb-4 text-left text-sm font-bold text-heading">
                      Status
                    </th>
                    <th className="pb-4 text-left text-sm font-bold text-heading">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {resignations && resignations.length > 0 ? (
                    resignations.map((res) => (
                      <tr key={res._id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 text-sm text-textgray">
                          <div className="flex items-center gap-3">
                            <img 
                              src={res.resignationEmployee?.profileImage || `https://i.pravatar.cc/150?u=${res.resignationEmployee?.name}`} 
                              className="w-10 h-10 rounded-full object-cover border border-gray-200"
                              alt="" 
                            />
                            <span className="font-medium text-heading">{res.resignationEmployee?.name} {res.resignationEmployee?.lastName}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-textgray">
                          {res.resignationEmployee?.designation || "---"}
                        </td>
                        <td className="py-4 text-sm text-textgray max-w-xs truncate" title={res.reason}>
                          {res.reason}
                        </td>
                        <td className="py-4 text-sm text-textgray">
                          {res.resignedDate ? new Date(res.resignedDate).toLocaleDateString() : "---"}
                        </td>
                        <td className="py-4 text-sm text-textgray">
                          {res.status === "Approved" ? (
                            <div className="flex flex-col">
                              <span className="font-bold text-primary">{calculateRemainingDays(res.resignedDate, res.noticePeriod)} Days</span>
                              <span className="text-[10px] text-textgray">Remaining of {res.noticePeriod || 45}</span>
                            </div>
                          ) : (
                            <span className="text-textgray">{res.noticePeriod || 45} Days</span>
                          )}
                        </td>
                        <td className="py-4 text-sm">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(res.status)}`}>
                            {res.status}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-textgray">
                          <div className="flex items-center gap-3">
                            {res.status === "Pending" && (
                              <>
                                <button 
                                  onClick={() => handleStatusUpdate(res._id, "Approved")}
                                  className="text-green-600 hover:text-green-800 font-medium transition-colors"
                                >
                                  Approve
                                </button>
                                <button 
                                  onClick={() => handleStatusUpdate(res._id, "Rejected")}
                                  className="text-red-600 hover:text-red-800 font-medium transition-colors"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            <button 
                              onClick={() => handleDelete(res._id)}
                              className="text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <RiDeleteBin6Line size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : null}
                </tbody>
              </table>
              {(!resignations || resignations.length === 0) && !loading && (
                <p className="text-sm text-heading font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-8">No Row</p>
              )}
              {loading && (
                 <p className="text-sm text-heading font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-8 animate-pulse">Loading...</p>
              )}
            </div>
            <Pagination/>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200 p-12 text-center">
             {resignations && resignations.length > 0 ? (
               <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold text-heading mb-4 text-left">My Resignation Status</h2>
                  <div className="space-y-4 text-left">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                      <span className="text-sm text-textgray">Status</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(resignations[0].status)}`}>
                        {resignations[0].status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                       <span className="text-sm text-textgray">Notice Period Duration</span>
                       <span className="text-sm font-medium text-heading">
                         {resignations[0].noticePeriod || 45} Days
                       </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                       <span className="text-sm text-textgray">Last Working Day</span>
                       <span className="text-sm font-medium text-heading">
                          {getLastWorkingDay(resignations[0].resignedDate, resignations[0].noticePeriod)}
                       </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                      <span className="text-sm text-textgray">Days Remaining</span>
                      <span className="text-sm font-medium text-heading">
                        {resignations[0].status === "Approved" ? (
                          <span className="text-primary font-bold">{calculateRemainingDays(resignations[0].resignedDate, resignations[0].noticePeriod)} Days</span>
                        ) : (
                           <span className="text-textgray">Pending Approval</span>
                        )}
                      </span>
                    </div>
                    <div className="pt-2">
                       <span className="text-sm text-textgray block mb-1">Reason</span>
                       <p className="text-sm text-heading bg-gray-50 p-3 rounded-md italic">"{resignations[0].reason}"</p>
                    </div>
                  </div>
               </div>
             ) : (
               <div className="max-w-sm">
                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                   <LuPencilLine size={32} className="text-gray-400" />
                 </div>
                 <h2 className="text-xl font-bold text-heading mb-2">No Active Resignation</h2>
                 <p className="text-sm text-textgray mb-6">
                   You have not submitted any resignation requests. If you wish to proceed, click the button below.
                 </p>
                 <button
                   type="button" onClick={() => setOpen(true)}
                   className="bg-primary text-white text-sm font-medium cursor-pointer px-6 py-3 rounded-sm"
                 >
                   Apply for Resignation
                 </button>
               </div>
             )}
          </div>
        )}
      </div>
    </>
  );
};

export default Resignation;
