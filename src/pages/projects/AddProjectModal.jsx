import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addProject, updateProject } from "../../slices/projectSlice";
import API from "../../api/axios";

const AddProjectModal = ({ onClose, project, preselectedClient }) => {
  const dispatch = useDispatch();

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    projectName: "",
    client: "",
    team: "",
    startDate: "",
    endDate: "",
    link: "",
    progress: "",
    currentStatus: "Pending",
    delayReason: "",
    projectDescription: "", // Not in image but in backend model
    rate: "", // Not in image but in backend model
    priority: "Medium", // Not in image but in backend model
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsRes = await API.get("/client/detail");
        setClients(clientsRes.data);
      } catch (err) {
        console.error("Failed to fetch clients", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        client: project.client?.id?._id || project.client?.id || "",
        team: project.team?._id || project.team || "",
        startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : "",
        endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : "",
      });
    } else if (preselectedClient) {
      // If a client is preselected (from client page), set it automatically
      setFormData(prev => ({
        ...prev,
        client: preselectedClient._id
      }));
    }
  }, [project, preselectedClient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Format data for backend
    const submissionData = {
      ...formData,
      client: { id: formData.client },
      progress: parseInt(formData.progress) || 0,
    };

    try {
      if (project) {
        await dispatch(updateProject({ id: project._id, ...submissionData })).unwrap();
        alert("Project updated successfully!");
      } else {
        await dispatch(addProject(submissionData)).unwrap();
        alert("Project added successfully!");
      }
      onClose();
    } catch (err) {
      console.error("Failed to save project", err);
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white h-screen shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out px-8 py-6">
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {project ? "Edit Project" : "Add New Projects"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors">
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Enter project name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-300"
              required
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Client Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Client</label>
            <select
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
              required
            >
              <option value="">Select Client</option>
              {clients.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.clientName}
                </option>
              ))}
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Designation</label>
            <select
              name="team"
              value={formData.team}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
              required
            >
              <option value="">Select Designation</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="BDE">BDE</option>
              <option value="Angular Developer">Angular Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value=".NET">.NET</option>
              <option value="Frontend Developer (React)">Frontend Developer (React)</option>
              <option value="Web Designer">Web Designer</option>
              <option value="HR">HR</option>
              <option value="MERN Stack">MERN Stack</option>
            </select>
          </div>

          {/* Links */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Links</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-300"
            />
          </div>

          {/* Progress */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Progress (%)</label>
            <input
              type="number"
              name="progress"
              value={formData.progress}
              onChange={handleChange}
              placeholder="e.g. 80"
              min="0"
              max="100"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-300"
            />
          </div>

          {/* Status and Reason */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
              <select
                name="currentStatus"
                value={formData.currentStatus}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="At Risk">At Risk</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Reason (Late)</label>
              <input
                type="text"
                name="delayReason"
                value={formData.delayReason}
                onChange={handleChange}
                placeholder="Reason for delay"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-300"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Project Description</label>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              placeholder="Describe the project..."
            ></textarea>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-6 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-bold text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-[#2C3EA1] text-white rounded-lg font-bold text-sm hover:bg-[#1a2b88] transition-all disabled:opacity-50 shadow-md"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
