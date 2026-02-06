import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProjects } from "../../slices/projectSlice";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees } = useSelector((state) => state.employee);
  const { projects: allProjects } = useSelector((state) => state.project);
  const [employee, setEmployee] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const foundEmployee = employees.find((emp) => emp._id === id);
    if (foundEmployee) {
      setEmployee(foundEmployee);
    }
  }, [id, employees]);

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  if (!employee) {
    return (
      <div className="p-8 text-center text-gray-500">
        Employee not found or loading...
      </div>
    );
  }

  const experience = employee?.experience || [];
  const projects = allProjects?.filter((p) => p.team === employee?.designation) || [];

  const statusColorMap = {
    Completed: "bg-[#75B51D]",
    Pending: "bg-[#FBA300]",
    "In Progress": "bg-[#2196F3]",
    "At Risk": "bg-[#F44336]",
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl">
      <div className="flex items-center justify-between mb-9">
        <h1 className="text-2xl font-bold text-heading leading-tight">
          Employee Detail
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
        >
          Back to Employees
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 lg:p-8">
        <div className="border-b border-gray-200 pb-8 mb-8">
          <div className="flex items-center gap-3.5">
            <img
              src={employee.profileImage || "https://via.placeholder.com/80"}
              alt={employee.name}
              className="w-16 h-16 rounded-md object-cover"
            />

            <div className="flex-1">
              <h2 className="text-base font-bold text-black leading-none mb-2.5">
                {employee.name} {employee.lastName}
              </h2>
              <p className="text-sm text-textgray leading-none mb-2.5">
                {employee.email}
              </p>
              <p className="text-sm text-textgray leading-none">
                {employee.personalInformation?.telephones?.[0] || "N/A"}
              </p>
            </div>

            <div className="flex gap-3">
              <button className="text-textgray hover:text-blue-600 transition-colors cursor-pointer">
                <FiEdit3 size={16} />
              </button>
              <button className="text-textgray hover:text-red-600 transition-colors cursor-pointer">
                <RiDeleteBin6Line size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-base font-medium text-black mb-6">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-4">
                <InfoField
                  label="Employee Name"
                  value={`${employee.name} ${employee.lastName}`}
                />
                <InfoField
                  label="Employee Department"
                  value={employee.designation || "N/A"}
                />
                <InfoField
                  label="Joining Date"
                  value={
                    employee.dateOfJoining
                      ? new Date(employee.dateOfJoining).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "2-digit", year: "numeric" },
                        )
                      : "N/A"
                  }
                />
                <InfoField
                  label="Primary Contact"
                  value={
                    employee.personalInformation?.telephones?.[0] ||
                    "N/A"
                  }
                />
                <InfoField
                  label="Secondary Contact"
                  value={
                    employee.personalInformation?.telephones?.[1] ||
                    "N/A"
                  }
                />
                <InfoField
                  label="Permanent Address"
                  value={
                    employee.address ||
                    "N/A"
                  }
                  fullWidth
                />
                <InfoField
                  label="Temporary Address"
                  value={
                    employee.address ||
                    "N/A"
                  }
                  fullWidth
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-base font-medium text-black mb-6">
                  Emergency Contacts
                </h3>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <InfoField
                      label="Primary Contact"
                      value={
                        employee.emergencyContact?.primary?.phone?.[0] ||
                        "N/A"
                      }
                    />
                    <InfoField
                      label="Relationship"
                      value={
                        employee.emergencyContact?.primary?.relationship ||
                        "N/A"
                      }
                    />
                  </div>

                  <div className="space-y-4">
                    <InfoField
                      label="Secondary Contact"
                      value={
                        employee.emergencyContact?.secondary?.phone?.[0] ||
                        "N/A"
                      }
                    />
                    <InfoField
                      label="Relationship"
                      value={
                        employee.emergencyContact?.secondary?.relationship ||
                        "N/A"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-base font-medium text-black mb-6">
                  Experience
                </h3>

                <div>
                  {experience.map((exp, index) => (
                    <div key={index} className="flex gap-3.5 relative">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-3.5 h-3.5 bg-white rounded-full border-4 border-[#71717B] flex items-center justify-center shrink-0"></div>
                        {index < experience.length - 1 && (
                          <div className="w-px h-full bg-[#E5E7EB] my-1.25"></div>
                        )}
                      </div>

                      <div className="flex-1 mb-8">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-bold text-black leading-none">
                            {exp.companyName}
                          </p>
                          <span className="text-sm text-textgray leading-none">
                            {exp.jobTitle}
                          </span>
                        </div>
                        <p className="text-sm text-textgray leading-none">
                          {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-base font-medium text-black mb-7.5">
                Projects
              </h3>

              <div>
                {projects.length > 0 ? projects.map((project, index) => (
                  <div key={index} className="flex gap-3.5 relative">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-3.5 h-3.5 bg-white rounded-full border-4 border-[#71717B] flex items-center justify-center shrink-0"></div>
                      <div className="w-px h-full bg-[#E5E7EB] my-1.25"></div>
                    </div>

                    <div className="flex-1 mb-7">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-bold text-black leading-none">
                          {project.projectName}
                        </p>
                        <span className="text-sm text-textgray leading-none">
                          {project.team}
                        </span>
                      </div>
                      <p className="text-sm text-textgray leading-none mb-5">
                        {new Date(project.startDate).toLocaleDateString()} - {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Present'}
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${statusColorMap[project.currentStatus] || "bg-blue-500"} transition-all duration-300`}
                            style={{ width: `${project.progress || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-textgray text-right leading-none">
                          {project.progress || 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-textgray italic">No projects assigned.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ label, value, fullWidth }) => (
  <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
    <p className="text-sm font-bold text-black whitespace-nowrap">{label} :</p>
    <p className="text-sm text-textgray">{value}</p>
  </div>
);

export default EmployeeDetail;
