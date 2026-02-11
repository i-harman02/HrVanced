import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPerformances } from "../slices/performanceSlice";
import OverallPerformanceChart from "../components/PerfomanceChart";
import ManagerComments from "../components/ManagerComments";
import AttendanceTimeManagement from "../components/AttendanceTimeManagement";
import Pagination from "./Pagination";
import { GoEye } from "react-icons/go";
import User1 from "../assets/Group 3487.png";
import dayjs from "dayjs";

export default function Performance() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { performances, loading } = useSelector((state) => state.performance || {});
  const userState = useSelector((state) => state.user || {});
  const user = userState.user || null;

  const [selectedRecord, setSelectedRecord] = React.useState(null);

  useEffect(() => {
    dispatch(fetchPerformances());
  }, [dispatch]);

  // Set initial selected record once performances/user are loaded
  useEffect(() => {
    if (viewablePerformances.length > 0 && !selectedRecord) {
      setSelectedRecord(viewablePerformances[0]);
    }
  }, [performances, user, selectedRecord]); // Depend on stable objects, not the calculated viewablePerformances array

  // Role-based filtering
  // Role-based filtering
  const userRole = (user?.role || user?.assignRole || "").toLowerCase().trim();
  const isAdminOrManager = ["admin", "superadmin", "manager", "hr manager"].includes(userRole);
  const isTL = userRole === "tl";

  const viewablePerformances = performances.filter(perf => {
    if (isAdminOrManager) return true;
    
    const empData = perf.employee;
    const empId = empData?._id || empData;
    
    if (isTL) {
      // TLs see their own record + their team members
      return empId === user?._id || (empData?.tl?._id || empData?.tl) === user?._id;
    }
    
    // Regular employees see only their own
    return empId === user?._id;
  });

  // No longer needed: selectedRecord is now state-managed

  return (
    <div className="border border-gray-200 rounded-xl p-4 sm:p-6 ">
      <h2 className="text-lg font-semibold mb-4">Performance </h2>
      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-md mb-6">
        <table className="min-w-225 w-full text-sm p-2 text-center">
          <thead className="border-b border-gray-200  text-gray-500">
            <tr>
              <th className="text-left py-4 px-4 text-gray-800">
                Employee Name
              </th>
              <th className="text-left px-4 text-gray-800">Project Name</th>
              <th className="text-left px-4 text-gray-800">Comments</th>
              <th className="text-left px-4 text-gray-800">Date</th>
              <th className="text-left px-4 text-gray-800">Added By</th>
              <th className="text-left px-4 text-gray-800 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && viewablePerformances.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-400">Loading assessments...</td>
              </tr>
            ) : viewablePerformances.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-400 font-medium">No performance records found</td>
              </tr>
            ) : (
              viewablePerformances.map((item, i) => (
                <tr 
                  key={item._id || i} 
                  className={`border-b border-gray-100 text-textgray hover:bg-indigo-50/30 transition-all cursor-pointer ${selectedRecord?._id === item._id ? "bg-indigo-50/50" : ""}`}
                  onClick={() => setSelectedRecord(item)}
                >
                  <td className="py-4 px-4 text-left font-medium text-heading">
                    {item.employee?.name} {item.employee?.lastName}
                  </td>
                  <td className="px-4 text-left">{item.projectName?.projectName || item.projectName || "N/A"}</td>
                  <td className="px-4 text-left max-w-xs truncate" title={item.comments}>
                    {item.comments}
                  </td>
                  <td className="px-4 text-left">
                    {item.createdAt ? dayjs(item.createdAt).format("DD/MM/YYYY") : "-"}
                  </td>
                  <td className="px-4 text-left">
                    {item.addedBy?.name || "Manager"}
                  </td>
                  <td className="px-4 text-center">
                    <button 
                      className={`transition-colors ${selectedRecord?._id === item._id ? "text-[#2C3EA1]" : "text-gray-400 hover:text-[#2C3EA1]"}`}
                    >
                      <GoEye size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="bg-[#F8F9FC] rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img 
                  src={selectedRecord?.employee?.profileImage || user?.profileImage || User1} 
                  alt="" 
                  className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-md bg-indigo-50"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 leading-tight">
                  {selectedRecord?.employee?.name || user?.name || "Employee"} {selectedRecord?.employee?.lastName || user?.lastName || ""}
                </h3>
                <p className="text-sm text-indigo-600 font-semibold mt-0.5">
                  {selectedRecord?.employee?.designation || user?.designation || "Department"}
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-500">{selectedRecord?.status || "FULL TIME"}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>Active Member</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 p-6 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 transition-hover">
               <OverallPerformanceChart isEmbedded={true} employeeId={selectedRecord?.employee?._id || user?._id} />
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 transition-hover flex flex-col">
               <h4 className="text-xs font-bold text-gray-800 mb-6 uppercase tracking-widest flex items-center gap-2">
                 <span className="w-1 h-4 bg-indigo-600 rounded-full"></span>
                 Recent Manager Comments
               </h4>
               <div className="flex-1">
                  <ManagerComments filteredEmployeeId={selectedRecord?.employee?._id || user?._id} />
               </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 transition-hover flex flex-col">
               <h4 className="text-xs font-bold text-gray-800 mb-6 uppercase tracking-widest flex items-center gap-2">
                 <span className="w-1 h-4 bg-indigo-600 rounded-full"></span>
                 Attendance & Time Management
               </h4>
               <div className="flex-1">
                  <AttendanceTimeManagement isEmbedded={true} employeeId={selectedRecord?.employee?._id || user?._id} />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Pagination */}
      <Pagination />
    </div>
  );
}
