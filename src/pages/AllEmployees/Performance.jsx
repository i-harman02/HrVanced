import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerformances, deletePerformance } from "../../slices/performanceSlice";
import { fetchEmployees } from "../../slices/employeeSlice";
import { fetchRequestedLeaves, fetchMyLeaves } from "../../slices/leaveSlice";
import AddPerformanceModal from "./AddPerformanceModal"; 
import Pagination from "../../components/Pagination";
import { FiEdit3, FiEye, FiSearch } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import OverallPerformanceChart from "../../components/PerfomanceChart";
import ManagerComments from "../../components/ManagerComments";
import AttendanceTimeManagement from "../../components/AttendanceTimeManagement";
import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";

const AvatarWithName = ({ profileImage, name, employeeId }) => {
  const navigate = useNavigate();
  return (
    <div 
      className="flex items-center gap-2.5 cursor-pointer group/name"
      onClick={(e) => {
        e.stopPropagation();
        if (employeeId) navigate(`/all-employees/detail/${employeeId}`);
      }}
    >
      <img
        className="w-8 h-8 rounded-md object-cover border border-gray-100 group-hover/name:ring-2 group-hover/name:ring-[#2C3EA1] transition-all"
        src={profileImage || `https://i.pravatar.cc/150?u=${name}`}
        alt={name}
      />
      <span className="text-sm text-heading font-medium group-hover/name:text-[#2C3EA1] transition-colors decoration-[#2C3EA1] hover:underline whitespace-nowrap">
        {name}
      </span>
    </div>
  );
};

const Performance = () => {
  const dispatch = useDispatch();
  
  const performanceState = useSelector((state) => state.performance || {});
  const performances = performanceState.performances || [];
  const loading = performanceState.loading || false;
  
  const employeeState = useSelector((state) => state.employee || {});
  const employees = employeeState.employees || [];
  
  const userState = useSelector((state) => state.user || {});
  const user = userState.user || null;

  const [showModal, setShowModal] = useState(false);
  const [editingPerformance, setEditingPerformance] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    dispatch(fetchPerformances());
    dispatch(fetchEmployees());
    // Fetch leave data to make attendance stats dynamic
    dispatch(fetchMyLeaves());
    dispatch(fetchRequestedLeaves({ id: "all" }));
  }, [dispatch]);

  const handleEdit = (perf) => {
    setEditingPerformance(perf);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingPerformance(null);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this performance record?")) {
      dispatch(deletePerformance(id));
    }
  };

  // Role-based filtering for Employee List
  const userRole = (user?.role || user?.assignRole || "").toLowerCase().trim();
  const isAdminOrManager = ["admin", "superadmin", "manager", "hr manager"].includes(userRole);
  const isTL = userRole === "tl";

  // Filter employees based on role
  const viewableEmployees = employees.filter(emp => {
    if (isAdminOrManager) return true;
    if (isTL) return emp._id === user?._id || (emp.tl?._id || emp.tl) === user?._id;
    return emp._id === user?._id;
  });

  // Dynamic Search Filtering Logic for Employees
  const filteredEmployees = viewableEmployees.filter(emp => {
    const searchLow = searchTerm.toLowerCase();
    const fullName = `${emp.name || ""} ${emp.lastName || ""}`.toLowerCase();
    const designation = (emp.designation || "").toLowerCase();
    
    return fullName.includes(searchLow) || designation.includes(searchLow);
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white border-0 lg:border border-gray-200 lg:rounded-xl min-h-full flex flex-col">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-heading">Performance</h1>
          <p className="text-sm text-textgray">Monitor and manage employee performance assessments.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search employee, project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#2C3EA1] outline-none w-full sm:w-64"
            />
          </div>
          {isAdminOrManager && (
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-[#2C3EA1] text-white text-sm font-semibold rounded hover:bg-[#1a2b88] transition-colors whitespace-nowrap"
            >
              Add Performance Record
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-bordergray rounded-lg overflow-x-auto mb-6">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-bordergray bg-gray-50/50">
              <th className="p-4 text-left text-sm font-bold text-heading">Employee Name</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Project Name</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Comments</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Date</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Added By</th>
              <th className="p-4 text-center text-sm font-bold text-heading">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && employees.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-12 text-center text-gray-500 font-medium">Loading employee data...</td>
              </tr>
            ) : filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-12 text-center text-gray-500 font-medium">
                  {searchTerm ? `No employees found matching "${searchTerm}"` : "No team members found"}
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => {
                const latestPerf = performances.find(p => (p.employee?._id || p.employee) === emp._id);
                
                return (
                  <tr 
                    key={emp._id}
                    className="hover:bg-gray-50/80 transition-colors cursor-pointer border-b border-gray-100"
                    onClick={() => navigate(`/all-employees/detail/${emp._id}`)}
                  >
                    <td className="p-4 text-left">
                      <AvatarWithName 
                        profileImage={emp.profileImage} 
                        name={`${emp.name} ${emp.lastName || ""}`} 
                        employeeId={emp._id}
                      />
                    </td>
                    <td className="p-4 text-left text-sm text-textgray">
                      {latestPerf?.projectName?.projectName || latestPerf?.projectName || "Horse Host"}
                    </td>
                    <td className="p-4 text-left text-sm text-textgray max-w-xs truncate" title={latestPerf?.comments || ""}>
                      {latestPerf?.comments || "Not working good on this"}
                    </td>
                    <td className="p-4 text-left text-sm text-textgray">
                        {latestPerf?.createdAt ? dayjs(latestPerf.createdAt).format("DD/MM/YYYY") : "12/02/2026"}
                    </td>
                    <td className="p-4 text-left text-sm text-textgray">
                      {latestPerf?.addedBy?.name || "Anit"}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          className="p-1.5 text-gray-400 hover:text-[#2C3EA1] bg-gray-50 rounded-lg transition-all"
                        >
                          <FiEye size={18} />
                        </button>
                        {isAdminOrManager && (
                          <>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleEdit(latestPerf || { employee: emp }); }} 
                              className="p-1.5 text-gray-400 hover:text-blue-600 bg-gray-50 rounded-lg transition-colors"
                            >
                              <FiEdit3 size={18} />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); if(latestPerf) handleDelete(latestPerf._id); }} 
                              className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-50 rounded-lg transition-colors"
                            >
                              <RiDeleteBin6Line size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-textgray">
        <span className="italic">
          Showing {filteredEmployees.length > 0 ? 1 : 0} to {Math.min(5, filteredEmployees.length)} of {filteredEmployees.length} results
        </span>
        <Pagination />
      </div>

      {showModal && (
        <AddPerformanceModal
          onClose={() => setShowModal(false)}
          editingPerformance={editingPerformance}
          employees={employees}
        />
      )}
    </div>
  );
};

export default Performance;
