import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppraisals, deleteAppraisal } from "../../slices/appraisalSlice";
import { fetchEmployees } from "../../slices/employeeSlice";
import AddAppraisalModal from "./AddAppraisalModal";
import Pagination from "../../components/Pagination";
import { FiEdit3, FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const AppraisalCycles = () => {
  const dispatch = useDispatch();
  const { appraisals, loading } = useSelector((state) => state.appraisal);
  const { employees } = useSelector((state) => state.employee);
  const [showModal, setShowModal] = useState(false);
  const [editingAppraisal, setEditingAppraisal] = useState(null);

  useEffect(() => {
    dispatch(fetchAppraisals());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appraisal cycle?")) {
      dispatch(deleteAppraisal(id));
    }
  };

  const handleEdit = (appraisal) => {
    setEditingAppraisal(appraisal);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingAppraisal(null);
    setShowModal(true);
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white border-0 lg:border border-gray-200 lg:rounded-xl min-h-full flex flex-col">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-heading">Appraisal Cycles</h1>
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm"
        >
          Add / Edit Appraisal
        </button>
      </div>

      <div className="bg-white border border-bordergray rounded-lg overflow-x-auto mb-6">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-bordergray bg-gray-50/50">
              <th className="p-4 text-left text-sm font-bold text-heading">Cycle Name</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Review Period</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Employees Name</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Start Date</th>
              <th className="p-4 text-left text-sm font-bold text-heading">End Date</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Status</th>
              <th className="p-4 text-left text-sm font-bold text-heading text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">Loading appraisals...</td>
              </tr>
            ) : appraisals.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">No appraisal cycles found</td>
              </tr>
            ) : (
              appraisals.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="p-4 text-sm text-heading font-medium">
                    {item.cycleName}
                  </td>
                  <td className="p-4 text-sm text-textgray">
                    {item.reviewPeriod}
                  </td>
                  <td className="p-4 text-sm text-heading font-medium">
                    {item.employee?.name} {item.employee?.lastName}
                  </td>
                  <td className="p-4 text-sm text-textgray">
                    {formatDate(item.startDate)}
                  </td>
                  <td className="p-4 text-sm text-textgray">
                    {formatDate(item.endDate)}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors">
                        <FiEye size={18} />
                      </button>
                      <button onClick={() => handleEdit(item)} className="text-gray-400 hover:text-blue-600 transition-colors">
                        <FiEdit3 size={18} />
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="text-gray-400 hover:text-red-600 transition-colors">
                        <RiDeleteBin6Line size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-auto">
        <Pagination />
      </div>

      {showModal && (
        <AddAppraisalModal
          onClose={() => setShowModal(false)}
          editingAppraisal={editingAppraisal}
          employees={employees}
        />
      )}
    </div>
  );
};

export default AppraisalCycles;
