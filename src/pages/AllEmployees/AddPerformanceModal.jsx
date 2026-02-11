import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPerformance, updatePerformance } from "../../slices/performanceSlice";
import { fetchAllProjects } from "../../slices/projectSlice";
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa";

const AddPerformanceModal = ({ onClose, editingPerformance, employees }) => {
  const dispatch = useDispatch();
  
  const projectState = useSelector((state) => state.project || {});
  const projects = projectState.projects || [];
  
  const userState = useSelector((state) => state.user || {});
  const user = userState.user || null;

  const competencies = [
    "Job Knowledge",
    "Productivity",
    "Problem Solving",
    "Teamwork",
    "Communication",
    "Attendance",
    "Quality of Work"
  ];

  const [formData, setFormData] = useState({
    employee: "",
    addedBy: user?._id || "", 
    projectName: "",
    competency: "Job Knowledge",
    rating: 4,
    comments: "",
    date: new Date().toISOString().split('T')[0],
    status: "Active",
  });

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  useEffect(() => {
    if (editingPerformance) {
      setFormData({
        employee: editingPerformance.employee?._id || editingPerformance.employee || "",
        addedBy: editingPerformance.addedBy?._id || editingPerformance.addedBy || user?._id || "",
        projectName: editingPerformance.projectName?._id || editingPerformance.projectName || "",
        competency: editingPerformance.competency || "Job Knowledge",
        rating: editingPerformance.rating || 4,
        comments: editingPerformance.comments || "",
        date: editingPerformance.date ? new Date(editingPerformance.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        status: editingPerformance.status || "Active",
      });
    }
  }, [editingPerformance, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (rate) => {
    setFormData((prev) => ({ ...prev, rating: rate }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPerformance && editingPerformance._id) {
      dispatch(updatePerformance({ id: editingPerformance._id, ...formData }));
    } else {
      dispatch(addPerformance(formData));
    }
    onClose();
  };

  const filteredEmployees = (employees || []).filter(emp => {
    const role = (emp.role || emp.assignRole || "").toLowerCase();
    const excludedRoles = ["admin", "superadmin", "manager"];
    return !excludedRoles.includes(role);
  });

  const selectedEmployee = (employees || []).find(emp => emp._id === formData.employee);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end items-center">
      <div className="bg-white w-full max-w-lg h-[90vh] m-4 rounded-lg overflow-y-auto shadow-xl relative flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-heading">Add/Edit Performance</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 flex-1">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Employee Name</label>
              <select
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                required
                className="w-full p-2.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-[#2C3EA1] outline-none text-sm"
              >
                <option value="">Select Employee</option>
                {filteredEmployees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name} {emp.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={selectedEmployee?.designation || ""}
                  readOnly
                  className="w-full p-2.5 border border-gray-200 rounded-md bg-gray-50 text-gray-400 text-sm"
                  placeholder="e.g. BDE"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Project Name</label>
                <select
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-[#2C3EA1] outline-none text-sm"
                >
                  <option value="">Select Project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>{project.projectName}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Competency</label>
                <select
                  name="competency"
                  value={formData.competency}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-[#2C3EA1] outline-none text-sm"
                >
                  {competencies.map((comp) => (
                    <option key={comp} value={comp}>{comp}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Rating (1-5)</label>
                <div className="flex gap-2 text-xl pt-1">
                  {[1, 2, 3, 4, 5].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => handleRating(rate)}
                      className={`${formData.rating >= rate ? "text-yellow-400" : "text-gray-200"} hover:scale-110 transition-transform`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-[#2C3EA1] outline-none text-sm"
              >
                <option value="Active">Active</option>
                <option value="Needs Improvement">Needs Improvement</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Comments</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Lorem ipsum dolor sit amet..."
                className="w-full p-2.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-[#2C3EA1] outline-none text-sm resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-500 rounded-md hover:bg-gray-50 transition-colors font-semibold text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#2C3EA1] text-white rounded-md hover:bg-[#1a2b88] transition-colors font-semibold text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPerformanceModal;
