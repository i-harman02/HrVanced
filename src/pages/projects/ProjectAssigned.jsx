import React from "react";
import Pagination from "../../components/Pagination";

const projects = [
  {
    name: "Trimax",
    start: "Mar 18, 2022",
    end: "Mar 11, 2040",
    members: [3, 14],
    progress: 80,
    progressColor: "#75B51D",
    link: "https://beta.trimax.datavanced.com/",
    reason: "-",
    status: "Completed",
    statusColor: "#75B51D",
  },
  {
    name: "Hatzalah",
    start: "May 17, 2020",
    end: "Jan 16, 2045",
    members: [12, 13, 14],
    progress: 50,
    progressColor: "#FBA300",
    link: "https://hatzalah.org/",
    reason: "Lorem ipsum dolor sit amet,",
    status: "Pending",
    statusColor: "#FBA300",
  },
  {
    name: "Nineyard",
    start: "Feb 21, 2021",
    end: "Jun 10, 2035",
    members: [3, 12, 13, 14],
    progress: 80,
    progressColor: "#75B51D",
    link: "https://app.nineyard.com/shipyard/create-shipments",
    reason: "-",
    status: "Completed",
    statusColor: "#75B51D",
  },
];

const ProjectRow = ({ project }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 text-sm text-textgray">{project.name}</td>
      <td className="py-3 text-sm text-textgray">{project.start}</td>
      <td className="py-3 text-sm text-textgray">{project.end}</td>

      {/* Team Members */}
      <td className="py-3">
        <div className="flex">
          {project.members.map((id, index) => (
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

      {/* Links */}
      <td className="py-3 ">
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="text-[#65C9FF] block max-w-27.5 truncate"
        >
          {project.link}
        </a>
      </td>

      {/* Reason */}
      <td className="py-3 text-sm text-textgray max-w-27.5 truncate">
        {project.reason}
      </td>

      {/* Status */}
      <td className="py-3">
        <span
          className="inline-block text-xs rounded-sm py-0.75 px-2 leading-none"
          style={{
            color: project.statusColor,
            border: `0.5px solid ${project.statusColor}`,
            backgroundColor: `${project.statusColor}10`,
          }}
        >
          {project.status}
        </span>
      </td>
    </tr>
  );
};

const ProjectAssigned = () => {
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
            {projects.map((project, index) => (
              <ProjectRow key={index} project={project} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </>
  );
};

export default ProjectAssigned;
