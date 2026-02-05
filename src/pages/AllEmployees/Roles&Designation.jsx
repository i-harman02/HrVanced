import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RolesStatsCard from "../../components/RolesStatsCard";
import DataTable, { TableActions, StatusBadge } from "../../components/DataTable";
import EditModal from "../../components/EditModal";

const RolesDesignation = () => {
  const dispatch = useDispatch();
  const [searchRole, setSearchRole] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'role' or 'designation'
  const [selectedData, setSelectedData] = useState(null);

  // Mock data - replace with Redux data
  const rolesStats = {
    totalRoles: 12,
    totalDesignation: 23,
    activeEmployees: 40,
    unassignedRoles: 2,
  };

  const systemRoles = [
    {
      id: 1,
      roleName: "Admin",
      description: "Full system access",
      permissions: "All",
      createdDate: "2024-01-15",
      status: "Active",
    },
    {
      id: 2,
      roleName: "Manager",
      description: "Team management access",
      permissions: "Read, Write, Update",
      createdDate: "2024-01-20",
      status: "Active",
    },
    {
      id: 3,
      roleName: "Employee",
      description: "Basic user access",
      permissions: "Read",
      createdDate: "2024-02-01",
      status: "Active",
    },
  ];

  const designations = [
    {
      id: 1,
      designationName: "Senior Developer",
      department: "Engineering",
      assigned: 5,
      reportedTo: "Tech Lead",
      status: "Active",
    },
    {
      id: 2,
      designationName: "Junior Developer",
      department: "Engineering",
      assigned: 8,
      reportedTo: "Senior Developer",
      status: "Active",
    },
    {
      id: 3,
      designationName: "UI/UX Designer",
      department: "Design",
      assigned: 3,
      reportedTo: "Design Lead",
      status: "Active",
    },
    {
      id: 4,
      designationName: "HR Manager",
      department: "Human Resources",
      assigned: 2,
      reportedTo: "Director",
      status: "Active",
    },
  ];

  // Fields configuration for System Role modal
  const roleFields = [
    { name: "roleName", label: "Role Name", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "permissions", label: "Permissions", type: "text" },
    { name: "createdDate", label: "Created Date", type: "date" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
    },
  ];

  // Fields configuration for Employee Designation modal
  const designationFields = [
    { name: "designationName", label: "Designation Name", type: "text" },
    { name: "department", label: "Department", type: "text" },
    { name: "assigned", label: "Assigned", type: "number" },
    { name: "reportedTo", label: "Reported To", type: "text" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
    },
  ];

  // Headers for System Roles Table
  const rolesHeaders = [
    "Role Name",
    "Description",
    "Permissions",
    "Created Date",
    "Status",
    "Actions",
  ];

  // Headers for Employee Designation Table
  const designationHeaders = [
    "Designation Name",
    "Department",
    "Assigned",
    "Reported To",
    "Status",
    "Actions",
  ];

  // Handle actions for roles
  const handleRoleView = (id) => {
    console.log("View role:", id);
  };

  const handleRoleEdit = (role) => {
    setSelectedData(role);
    setModalType("role");
    setIsModalOpen(true);
  };

  const handleRoleDelete = (id) => {
    console.log("Delete role:", id);
    // Add delete confirmation logic here
  };

  // Handle actions for designations
  const handleDesignationView = (id) => {
    console.log("View designation:", id);
  };

  const handleDesignationEdit = (designation) => {
    setSelectedData(designation);
    setModalType("designation");
    setIsModalOpen(true);
  };

  const handleDesignationDelete = (id) => {
    console.log("Delete designation:", id);
    // Add delete confirmation logic here
  };

  // Handle form submission
  const handleModalSubmit = (formData) => {
    console.log("Form submitted:", formData);
    console.log("Modal type:", modalType);
    // Add your update logic here
    // If role: dispatch(updateRole(formData))
    // If designation: dispatch(updateDesignation(formData))
  };

  // Render row for System Roles
  const renderRoleRow = (role) => (
    <tr key={role.id} className="hover:bg-gray-50 border-b border-gray-200">
      <td className="py-3 pe-3 text-sm text-textgray">{role.roleName}</td>
      <td className="py-3 pe-3 text-sm text-textgray">{role.description}</td>
      <td className="py-3 pe-3 text-sm text-textgray">{role.permissions}</td>
      <td className="py-3 pe-3 text-sm text-textgray">
        {new Date(role.createdDate).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </td>
      <td className="py-3 pe-3">
        <StatusBadge status={role.status} />
      </td>
      <td className="py-3">
        <TableActions
          onView={() => handleRoleView(role.id)}
          onEdit={() => handleRoleEdit(role)}
          onDelete={() => handleRoleDelete(role.id)}
        />
      </td>
    </tr>
  );

  // Render row for Employee Designation
  const renderDesignationRow = (designation) => (
    <tr
      key={designation.id}
      className="hover:bg-gray-50 border-b border-gray-200"
    >
      <td className="py-3 pe-3 text-sm text-textgray">
        {designation.designationName}
      </td>
      <td className="py-3 pe-3 text-sm text-textgray">{designation.department}</td>
      <td className="py-3 pe-3 text-sm text-textgray">{designation.assigned}</td>
      <td className="py-3 pe-3 text-sm text-textgray">{designation.reportedTo}</td>
      <td className="py-3 pe-3">
        <StatusBadge status={designation.status} />
      </td>
      <td className="py-3">
        <TableActions
          onView={() => handleDesignationView(designation.id)}
          onEdit={() => handleDesignationEdit(designation)}
          onDelete={() => handleDesignationDelete(designation.id)}
        />
      </td>
    </tr>
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white border-0 lg:border border-gray-200 lg:rounded-xl">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-heading leading-tight mb-8">
        Roles & Designation
      </h1>

      {/* Stats Cards */}
      <RolesStatsCard stats={rolesStats} />

      {/* System Roles Section */}
      <div className="mt-8">
        <DataTable
          title="System Roles"
          headers={rolesHeaders}
          data={systemRoles}
          searchValue={searchRole}
          onSearchChange={setSearchRole}
          renderRow={renderRoleRow}
        />
      </div>

      {/* Employee Designation Section */}
      <div className="mt-8">
        <DataTable
          title="Employee Designation"
          headers={designationHeaders}
          data={designations}
          searchValue={searchDesignation}
          onSearchChange={setSearchDesignation}
          renderRow={renderDesignationRow}
        />
      </div>

      {/* Single Reusable Modal */}
      <EditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedData(null);
          setModalType(null);
        }}
        title={
          modalType === "role"
            ? "Edit System Role"
            : "Edit Employee Designation"
        }
        fields={modalType === "role" ? roleFields : designationFields}
        initialData={selectedData}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default RolesDesignation;