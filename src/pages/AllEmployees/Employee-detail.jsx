import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees } = useSelector((state) => state.employee);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const foundEmployee = employees.find((emp) => emp._id === id);
    if (foundEmployee) {
      setEmployee(foundEmployee);
    }
  }, [id, employees]);

  if (!employee) {
    return (
      <div className="p-8 text-center text-gray-500">
        Employee not found or loading...
      </div>
    );
  }

  const projects = [
    {
      name: "Nineyard",
      team: "Angular Team",
      startDate: "Jan 01, 2023",
      endDate: "Jan 01, 2025",
      progress: 90,
      color: "bg-[#75B51D]",
    },
    {
      name: "Hatzalah",
      team: "Angular Team",
      startDate: "Jan 01, 2023",
      endDate: "Jan 01, 2025",
      progress: 80,
      color: "bg-[#75B51D]",
    },
    {
      name: "Pitch Playlist",
      team: "Angular Team",
      startDate: "Jan 01, 2023",
      endDate: "Jan 01, 2025",
      progress: 40,
      color: "bg-[#E8685B]",
    },
    {
      name: "Benson",
      team: "Angular Team",
      startDate: "Jan 01, 2023",
      endDate: "Jan 01, 2025",
      progress: 60,
      color: "bg-[#F18F2F]",
    },
  ];

  const experience = [
    {
      company: "Vanced Solutions",
      duration: "03 Years",
      period: "Jan 01, 2023 - Present",
    },
    {
      company: "Info Tech",
      duration: "01 Years",
      period: "Jan 01, 2022 - Jan 01, 2023",
    },
  ];

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
                  value={employee.department || "Angular Team"}
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
                  label="Appraisal Date"
                  value={
                    employee.appraisalDate
                      ? new Date(employee.appraisalDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "2-digit", year: "numeric" },
                        )
                      : "Dec 21, 2024"
                  }
                />
                <InfoField
                  label="Primary Contact"
                  value={
                    employee.personalInformation?.telephones?.[0] ||
                    "7836373933"
                  }
                />
                <InfoField
                  label="Secondary Contact"
                  value={
                    employee.personalInformation?.telephones?.[1] ||
                    "7836373933"
                  }
                />
                <InfoField
                  label="Permanent Address"
                  value={
                    employee.personalInformation?.permanentAddress ||
                    "123 Maple Street, Apt 4B, Anytown, CA 90210, USA"
                  }
                  fullWidth
                />
                <InfoField
                  label="Temporary Address"
                  value={
                    employee.personalInformation?.temporaryAddress ||
                    "123 Maple Street, Apt 4B, Anytown, CA 90210, USA"
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
                        "7836373933"
                      }
                    />
                    <InfoField
                      label="Relationship"
                      value={
                        employee.emergencyContact?.primary?.relationship ||
                        "Father"
                      }
                    />
                  </div>

                  <div className="space-y-4">
                    <InfoField
                      label="Secondary Contact"
                      value={
                        employee.emergencyContact?.secondary?.phone?.[0] ||
                        "7836373933"
                      }
                    />
                    <InfoField
                      label="Relationship"
                      value={
                        employee.emergencyContact?.secondary?.relationship ||
                        "Mother"
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
                            {exp.company}
                          </p>
                          <span className="text-sm text-textgray leading-none">
                            {exp.duration}
                          </span>
                        </div>
                        <p className="text-sm text-textgray leading-none">
                          {exp.period}
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
                {projects.map((project, index) => (
                  <div key={index} className="flex gap-3.5 relative">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-3.5 h-3.5 bg-white rounded-full border-4 border-[#71717B] flex items-center justify-center shrink-0"></div>
                      <div className="w-px h-full bg-[#E5E7EB] my-1.25"></div>
                    </div>

                    <div className="flex-1 mb-7">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-bold text-black leading-none">
                          {project.name}
                        </p>
                        <span className="text-sm text-textgray leading-none">
                          {project.team}
                        </span>
                      </div>
                      <p className="text-sm text-textgray leading-none mb-5">
                        {project.startDate} - {project.endDate}
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${project.color} transition-all duration-300`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-textgray text-right leading-none">
                          {project.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
