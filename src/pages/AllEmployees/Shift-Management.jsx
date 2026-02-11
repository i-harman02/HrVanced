import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShifts } from "../../slices/shiftSlice";
import { fetchEmployees } from "../../slices/employeeSlice";
import AddShiftModal from "./AddShiftModal";
import Pagination from "../../components/Pagination";
import { FiEdit3, FiEye } from "react-icons/fi";

const ShiftManagement = () => {
  const dispatch = useDispatch();
  const { shifts, loading } = useSelector((state) => state.shift);
  const { employees } = useSelector((state) => state.employee);
  const [showModal, setShowModal] = useState(false);
  const [editingShift, setEditingShift] = useState(null);

  useEffect(() => {
    dispatch(fetchShifts());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEdit = (shift) => {
    setEditingShift(shift);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingShift(null);
    setShowModal(true);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white border-0 lg:border border-gray-200 lg:rounded-xl min-h-full flex flex-col">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-heading">Shift Management</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-[#2C3EA1] text-white text-sm font-semibold rounded hover:bg-[#1a2b88] transition-colors  "
        >
          Add / Edit Shift
        </button>
      </div>

      <div className="bg-white border border-bordergray rounded-lg overflow-x-auto mb-6">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-bordergray bg-gray-50/50">
              <th className="p-4 text-left text-sm font-bold text-heading">Employee Name</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Department</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Shift Name</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Start Time</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Break Duration</th>
              <th className="p-4 text-left text-sm font-bold text-heading">End Time</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Status</th>
              <th className="p-4 text-left text-sm font-bold text-heading text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="8" className="p-8 text-center text-gray-500">Loading...</td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-8 text-center text-gray-500">No employees found</td>
              </tr>
            ) : (
              employees
                .filter(emp => {
                  const role = emp.role?.toLowerCase();
                  const assignRole = emp.assignRole?.toLowerCase();
                  const designation = emp.designation?.toLowerCase();
                  const excludedRoles = ["admin", "superadmin", "manager"];
                  
                  return !excludedRoles.includes(role) && 
                         !excludedRoles.includes(assignRole) && 
                         !designation?.includes("manager");
                })
                .map((emp) => {
                const shift = shifts.find(s => (s.employee?._id || s.employee) === emp._id);
                return (
                  <tr key={emp._id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="p-4 text-sm text-heading font-medium">
                      {emp.name} {emp.lastName}
                    </td>
                    <td className="p-4 text-sm text-textgray italic">
                      {emp.designation || "N/A"}
                    </td>
                    <td className="p-4 text-sm text-textgray">
                      {shift ? shift.shiftName : <span className="text-gray-400 italic font-normal">Not Assigned</span>}
                    </td>
                    <td className="p-4 text-sm text-textgray">
                      {shift ? shift.startTime : "-"}
                    </td>
                    <td className="p-4 text-sm text-textgray">
                      {shift ? shift.breakDuration : "-"}
                    </td>
                    <td className="p-4 text-sm text-textgray">
                      {shift ? shift.endTime : "-"}
                    </td>
                    <td className="p-4">
                      {shift ? (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          shift.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {shift.status}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">---</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        {shift ? (
                          <>
                            <button className="text-gray-400 hover:text-blue-600 transition-colors">
                              <FiEye size={18} />
                            </button>
                            <button onClick={() => handleEdit(shift)} className="text-gray-400 hover:text-blue-600 transition-colors">
                              <FiEdit3 size={18} />
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => {
                              setEditingShift({ employee: emp._id });
                              setShowModal(true);
                            }}
                            className="text-white bg-primary/90 hover:bg-primary px-3 py-1 rounded text-xs font-medium transition-colors"
                          >
                            Assign Shift
                          </button>
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

      <div className="mt-auto">
        <Pagination />
      </div>

      {showModal && (
        <AddShiftModal
          onClose={() => setShowModal(false)}
          editingShift={editingShift}
          employees={employees}
        />
      )}
    </div>
  );
};

export default ShiftManagement;
