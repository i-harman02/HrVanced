import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchFilter from "../../components/Search";
import Pagination from "../../components/Pagination";
import NoProject from "./NoProject";
import { fetchAllProjects, updateProject, deleteProject } from "../../slices/projectSlice";
import AdminAllProject from "../../components/AdminAllProject";
import AddProjectModal from "./AddProjectModal";
import { IoMdClose } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString() : "-";

const statusColorMap = {
  Completed: "#75B51D",
  Pending: "#FBA300",
  "In Progress": "#2196F3",
  "At Risk": "#F44336",
};

const ProjectRow = ({ project, onEdit, onDelete, isPrivileged }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 text-sm text-heading font-medium">
        {project.projectName}
      </td>

      <td className="py-3 text-sm text-textgray">
        {project.startDate ? new Date(project.startDate).toLocaleDateString() : "-"}
      </td>

      <td className="py-3 text-sm text-textgray">
        {project.endDate ? new Date(project.endDate).toLocaleDateString() : "-"}
      </td>

      <td className="py-3 text-sm text-textgray font-medium">
        {project.team || "-"}
      </td>

      <td className="py-3 pe-4 min-w-30">
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 h-2 rounded-lg relative flex-1">
            <div
              className="h-full rounded-lg absolute left-0 top-0 transition-all duration-300"
              style={{
                width: `${project.progress || 0}%`,
                backgroundColor: statusColorMap[project.currentStatus] || "#2196F3",
              }}
            />
          </div>
          <span className="text-sm font-medium">{project.progress || 0}%</span>
        </div>
      </td>

      <td className="py-3">
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="text-[#65C9FF] hover:text-blue-500 block max-w-27.5 truncate"
        >
          {project.link || "-"}
        </a>
      </td>

      <td className="py-3 text-sm text-textgray max-w-27.5 truncate">
        {project.delayReason || "-"}
      </td>

      <td className="py-3">
        <span
          className="inline-block text-[10px] font-bold uppercase tracking-wider rounded-sm py-0.75 px-2"
          style={{
            color: statusColorMap[project.currentStatus] || "#2196F3",
            border: `0.5px solid ${statusColorMap[project.currentStatus] || "#2196F3"}`,
            backgroundColor: `${statusColorMap[project.currentStatus] || "#2196F3"}10`,
          }}
        >
          {project.currentStatus}
        </span>
      </td>
      {isPrivileged && (
        <td className="py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => onEdit(project)} className="text-textgray hover:text-blue-600 transition-colors">
              <LuPencilLine size={18} />
            </button>
            <button onClick={() => onDelete(project._id)} className="text-textgray hover:text-red-600 transition-colors">
              <RiDeleteBin6Line size={18} />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

const Project = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("name");
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  const handleCloseModal = () => {
    setShowAddProjectModal(false);
    setEditingProject(null);
    // Refresh the project list
    dispatch(fetchAllProjects());
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowAddProjectModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(id));
    }
  };

  const role = user?.role?.toLowerCase();
  const isAdmin = role === "admin" || role === "superadmin";
  const isHR = user?.assignRole === "HR" || user?.assignRole === "HR Manager" || user?.assignRole === "Manager";
  const isPrivileged = isAdmin || isHR;

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    let result = [...projects];
    if (!isPrivileged && user?.designation) {
      result = result.filter(p => p.team === user.designation);
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.projectName?.toLowerCase().includes(lowerSearch) ||
        p.currentStatus?.toLowerCase().includes(lowerSearch)
      );
    }

    result.sort((a, b) => {
      if (sortValue === "name") {
        return (a.projectName || "").localeCompare(b.projectName || "");
      } else if (sortValue === "date") {
        return new Date(b.startDate || 0) - new Date(a.startDate || 0);
      }
      return 0;
    });

    return result;
  }, [projects, searchTerm, sortValue]);

  const hasProjects = projects && projects.length > 0;

  const headers = [
    "Project Name",
    "Start Date",
    "End Date",
    "Team",
    "Progress",
    "Links",
    "Reason (if project going late)",
    "Status",
    ...(isPrivileged ? ["Action"] : [])
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl min-h-full flex flex-col">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-heading">Projects</h1>
        {hasProjects && (
          <div className="flex items-center gap-4">
            <SearchFilter 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortValue={sortValue}
              onSortChange={setSortValue}
            />
            {isAdmin && (
              <button
                onClick={() => setShowAddProjectModal(true)}
                className="px-4 py-2 bg-[#2C3EA1] text-white text-sm font-semibold rounded-lg hover:bg-[#1a2b88] transition-colors shadow-sm whitespace-nowrap"
              >
                + Add Project
              </button>
            )}
          </div>
        )}
      </div>

      { isPrivileged && <AdminAllProject/>}
     
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-textgray">
          Loading projects...
        </div>
      ) : filteredProjects.length > 0 ? (
        <>
          <div className="bg-white border border-bordergray rounded-lg px-6 pt-6 pb-3.5 overflow-x-auto mb-8">
            <table className="w-full min-w-250">
              <thead>
                <tr className="border-b border-bordergray">
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="pb-4 text-left text-sm font-bold text-heading"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <ProjectRow
                    key={project._id}
                    project={project}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isPrivileged={isPrivileged}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <Pagination />
        </>
      ) : hasProjects ? (
        <div className="flex-1 flex items-center justify-center text-textgray">
          No projects match your search.
        </div>
      ) : (
        <NoProject />
      )}

      {showAddProjectModal && (
        <AddProjectModal 
          onClose={handleCloseModal} 
          project={editingProject} 
        />
      )}
    </div>
  );
};

export default Project;
