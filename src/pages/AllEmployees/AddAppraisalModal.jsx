import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAppraisal, updateAppraisal } from "../../slices/appraisalSlice";
import { IoMdClose } from "react-icons/io";

const AddAppraisalModal = ({ onClose, editingAppraisal, employees }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    cycleName: "",
    reviewPeriod: "3 Months",
    employee: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

  useEffect(() => {
    if (editingAppraisal) {
      setFormData({
        cycleName: editingAppraisal.cycleName || "",
        reviewPeriod: editingAppraisal.reviewPeriod || "3 Months",
        employee: editingAppraisal.employee?._id || editingAppraisal.employee || "",
        startDate: editingAppraisal.startDate ? new Date(editingAppraisal.startDate).toISOString().split('T')[0] : "",
        endDate: editingAppraisal.endDate ? new Date(editingAppraisal.endDate).toISOString().split('T')[0] : "",
        status: editingAppraisal.status || "Active",
      });
    }
  }, [editingAppraisal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAppraisal && editingAppraisal._id) {
      dispatch(updateAppraisal({ id: editingAppraisal._id, data: formData }));
    } else {
      dispatch(addAppraisal(formData));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto animate-slide-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-heading">{editingAppraisal?._id ? "Edit Appraisal" : "Add Appraisal"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
            <select
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} {emp.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cycle Name</label>
            <input
              type="text"
              name="cycleName"
              value={formData.cycleName}
              onChange={handleChange}
              required
              placeholder="e.g. Annual Appraisal 2025"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Review Period</label>
            <select
               name="reviewPeriod"
               value={formData.reviewPeriod}
               onChange={handleChange}
               required
               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="1 Year">1 Year</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppraisalModal;
