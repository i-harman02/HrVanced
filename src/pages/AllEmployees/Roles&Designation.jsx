import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RolesStatsCard from "../../components/RolesStatsCard";
import DataTable, { TableActions, StatusBadge } from "../../components/DataTable";

const RolesDesignation = () => {
  const dispatch = useDispatch();
  const [searchRole, setSearchRole] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");

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
      createdDate: "Jan 15, 2024",
      status: "Active",
    },
    {
      id: 2,
      roleName: "Manager",
      description: "Team management access",
      permissions: "Read, Write, Update",
      createdDate: "Jan 20, 2024",
      status: "Active",
    },
    {
      id: 3,
      roleName: "Employee",
      description: "Basic user access",
      permissions: "Read",
      createdDate: "Feb 01, 2024",
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

  const handleRoleEdit = (id) => {
    console.log("Edit role:", id);
  };

  const handleRoleDelete = (id) => {
    console.log("Delete role:", id);
  };

  // Handle actions for designations
  const handleDesignationView = (id) => {
    console.log("View designation:", id);
  };

  const handleDesignationEdit = (id) => {
    console.log("Edit designation:", id);
  };

  const handleDesignationDelete = (id) => {
    console.log("Delete designation:", id);
  };

  // Render row for System Roles
  const renderRoleRow = (role) => (
    <tr key={role.id} className="hover:bg-gray-50 border-b border-gray-200">
      <td className="py-3 pe-3 text-sm text-textgray">{role.roleName}</td>
      <td className="py-3 pe-3 text-sm text-textgray">{role.description}</td>
      <td className="py-3 pe-3 text-sm text-textgray">{role.permissions}</td>
      <td className="py-3 pe-3 text-sm text-textgray">{role.createdDate}</td>
      <td className="py-3 pe-3">
        <StatusBadge status={role.status} />
      </td>
      <td className="py-3">
        <TableActions
          onView={() => handleRoleView(role.id)}
          onEdit={() => handleRoleEdit(role.id)}
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
          onEdit={() => handleDesignationEdit(designation.id)}
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
    </div>
  );
};
export default RolesDesignation;