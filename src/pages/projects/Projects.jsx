import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchFilter from "../../components/Search";
import Pagination from "../../components/Pagination";
import NoProject from "./NoProject";
import { fetchAllProjects } from "../../slices/projectSlice";




const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString() : "-";

const statusColorMap = {
  Completed: "#75B51D",
  Pending: "#FBA300",
  "In Progress": "#2196F3",
  "At Risk": "#F44336",
};



const ProjectRow = ({ project }) => {
  return (
    <tr className="hover:bg-gray-50">
      {/* Project Name */}
      <td className="py-3 text-sm text-textgray">
        {project.projectName}
      </td>

      {/* Start Date */}
      <td className="py-3 text-sm text-textgray">
        {new Date(project.startDate).toLocaleDateString()}
      </td>

      {/* End Date */}
      <td className="py-3 text-sm text-textgray">
        {new Date(project.endDate).toLocaleDateString()}
      </td>

      {/* Team Members */}
      <td className="py-3">
        <div className="flex">
          {project.teamMembers?.map((id, index) => (
            <img
              key={index}
              className={`w-7.5 h-7.5 rounded-md ${
                index !== 0 ? "-ms-2.5" : ""
              }`}
              src={`https://i.pravatar.cc/40?img=${id}`}
              alt="Team Member"
            />
          ))}
        </div>
      </td>

      {/* Progress */}
      <td className="py-3 pe-4 min-w-30">
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 h-2 rounded-lg relative flex-1">
            <div
              className="h-full rounded-lg absolute left-0 top-0"
              style={{
                width: `${project.progress}%`,
                backgroundColor: project.progressColor,
              }}
            />
          </div>
          <span className="text-sm">{project.progress}%</span>
        </div>
      </td>

      {/* Link */}
      <td className="py-3">
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="text-[#65C9FF] block max-w-27.5 truncate"
        >
          {project.link}
        </a>
      </td>

      {/* Delay Reason */}
      <td className="py-3 text-sm text-textgray max-w-27.5 truncate">
        {project.delayReason || "-"}
      </td>

      {/* Status */}
      <td className="py-3">
        <span
          className="inline-block text-xs rounded-sm py-0.75 px-2"
          style={{
            color: project.statusColor,
            border: `0.5px solid ${project.statusColor}`,
            backgroundColor: `${project.statusColor}10`,
          }}
        >
          {project.currentStatus}
        </span>
      </td>
    </tr>
  );
};




const Project = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector(
    (state) => state.project
  );

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  const hasProjects = projects && projects.length > 0;

  const headers = [
    "Project Name",
    "Start Date",
    "End Date",
    "Team Members",
    "Progress",
    "Links",
    "Reason (if project going late)",
    "Status",
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl min-h-full flex flex-col">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-heading">Projects</h1>
        {hasProjects && <SearchFilter />}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-textgray">
          Loading projects...
        </div>
      ) : hasProjects ? (
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
                {projects.map((project) => (
                  <ProjectRow
                    key={project._id}
                    project={project}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <Pagination />
        </>
      ) : (
        <NoProject />
      )}
    </div>
  );
};

export default Project;
