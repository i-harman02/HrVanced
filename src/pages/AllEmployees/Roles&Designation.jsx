import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import RolesStatsCard from "../../components/RolesStatsCard";
import DataTable, { TableActions, StatusBadge } from "../../components/DataTable";
import EditModal from "../../components/EditModal";
import { fetchEmployees } from "../../slices/employeeSlice";
import { fetchDesignations, createDesignation, updateDesignation, deleteDesignation } from "../../slices/designationSlice";
import { fetchRoles, createRole, updateRole, deleteRole } from "../../slices/roleSlice"; 
import { 
  FiShield, FiUsers, FiSettings, FiEye, FiEdit, FiTrash2, 
  FiCheck, FiX, FiActivity, FiFilter,
  FiGrid, FiList, FiDownload, FiClock, FiTrendingUp, FiPlus
} from "react-icons/fi";

const RolesDesignation = () => {
  const dispatch = useDispatch();
  const { employees, loading: empLoading } = useSelector((state) => state.employee);
  const { designations, loading: desLoading } = useSelector((state) => state.designation);
  const { roles, loading: roleLoading } = useSelector((state) => state.role);
  
  const [searchRole, setSearchRole] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");
  const [activeTab, setActiveTab] = useState("overview"); 
  const [viewMode, setViewMode] = useState("grid"); 
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); 
  const [selectedData, setSelectedData] = useState(null);
  const [isPermissionMatrixOpen, setIsPermissionMatrixOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchDesignations());
    dispatch(fetchRoles());
  }, [dispatch]);

  // Dynamic Stats Calculation
  const stats = useMemo(() => {
    const activeSize = (employees || []).filter(emp => emp.status === "Active").length;
    const rolesCount = roles?.length || 0;
    const desCount = designations?.length || 0;
    const unassignedCount = (employees || []).filter(emp => !emp.assignRole || !emp.designation).length;

    return {
      totalRoles: rolesCount,
      totalDesignation: desCount,
      activeEmployees: activeSize,
      unassignedRoles: unassignedCount,
    };
  }, [employees, designations, roles]);

  const systemModules = [
    { id: "employees", name: "Employee Management", icon: FiUsers },
    { id: "projects", name: "Project Management", icon: FiGrid },
    { id: "attendance", name: "Attendance", icon: FiClock },
    { id: "leaves", name: "Leave Management", icon: FiActivity },
    { id: "payroll", name: "Payroll", icon: FiTrendingUp },
    { id: "reports", name: "Reports & Analytics", icon: FiDownload },
    { id: "settings", name: "System Settings", icon: FiSettings },
  ];

  const permissionTypes = ["create", "read", "update", "delete"];

  // Process Backend Roles for UI
  const processedRoles = useMemo(() => {
    const colors = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#EC4899"];
    
    return (roles || []).map((role, index) => {
      const count = (employees || []).filter(emp => emp.assignRole === role.roleName).length;
      return {
        ...role,
        id: role._id,
        employeeCount: count,
        color: colors[index % colors.length],
        permissionMatrix: {
          employees: { create: role.roleName === "Admin", read: true, update: role.roleName === "Admin", delete: role.roleName === "Admin" },
          projects: { create: role.roleName === "Admin" || role.roleName === "Manager", read: true, update: role.roleName === "Admin" || role.roleName === "Manager", delete: role.roleName === "Admin" },
          attendance: { create: true, read: true, update: role.roleName === "Admin", delete: role.roleName === "Admin" },
          leaves: { create: true, read: true, update: role.roleName === "Admin" || role.roleName === "HR", delete: role.roleName === "Admin" },
          payroll: { create: role.roleName === "Admin" || role.roleName === "HR", read: role.roleName === "Admin" || role.roleName === "HR", update: role.roleName === "Admin" || role.roleName === "HR", delete: role.roleName === "Admin" },
          reports: { create: role.roleName === "Admin", read: true, update: false, delete: false },
          settings: { create: role.roleName === "Admin", read: role.roleName === "Admin", update: role.roleName === "Admin", delete: role.roleName === "Admin" },
        }
      };
    });
  }, [roles, employees]);

  // Designations with headcount
  const displayDesignations = useMemo(() => {
    return (designations || []).map(des => {
      const count = (employees || []).filter(emp => emp.designation === des.designationName).length;
      return {
        ...des,
        assigned: count,
        id: des._id
      };
    });
  }, [designations, employees]);

  const handleModalSubmit = async (formData) => {
    try {
      if (modalType === "add-designation") {
        await dispatch(createDesignation(formData));
      } else if (modalType === "designation") {
        await dispatch(updateDesignation({ id: selectedData._id, data: formData }));
      } else if (modalType === "add-role") {
        await dispatch(createRole(formData));
      } else if (modalType === "role") {
        await dispatch(updateRole({ id: selectedData._id, data: formData }));
      }
      setIsModalOpen(false);
      setSelectedData(null);
      dispatch(fetchEmployees()); 
      dispatch(fetchRoles()); 
      dispatch(fetchDesignations());
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  const handleDeleteDesignation = async (id) => {
    if (window.confirm("Are you sure you want to delete this designation?")) {
      await dispatch(deleteDesignation(id));
      dispatch(fetchEmployees());
    }
  };

  const handleDeleteRole = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      await dispatch(deleteRole(id));
      dispatch(fetchEmployees());
    }
  };

  const renderRoleRow = (role) => (
    <tr key={role.id} className="hover:bg-gray-50 border-b border-gray-200">
      <td className="py-3 text-sm text-textgray">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: role.color }}></div>
          <span className="font-medium">{role.roleName}</span>
        </div>
      </td>
      <td className="py-3 text-sm text-textgray">{role.description}</td>
      <td className="py-3 text-sm">
        <button onClick={() => { setSelectedRole(role); setIsPermissionMatrixOpen(true); }} className="text-primary font-medium flex items-center gap-1">
          <FiShield className="w-4 h-4" /> Matrix
        </button>
      </td>
      <td className="py-3 text-sm text-textgray">
        <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">{role.employeeCount} Members</span>
      </td>
      <td className="py-3 pe-3"><StatusBadge status={role.status} /></td>
      <td className="py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => { setSelectedData(role); setModalType("role"); setIsModalOpen(true); }} className="text-blue-600 hover:text-blue-800 transition-colors"><FiEdit size={16} /></button>
          <button onClick={() => handleDeleteRole(role._id)} className="text-red-600 hover:text-red-800 transition-colors"><FiTrash2 size={16} /></button>
        </div>
      </td>
    </tr>
  );

  const renderDesignationRow = (designation) => (
    <tr key={designation.id} className="hover:bg-gray-50 border-b border-gray-200">
      <td className="py-3 text-sm text-textgray font-medium">{designation.designationName}</td>
      <td className="py-3 text-sm text-textgray">{designation.department || "General"}</td>
      <td className="py-3 text-sm text-textgray">
        <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs">{designation.assigned} Active Staff</span>
      </td>
      <td className="py-3 pe-3"><StatusBadge status={designation.status} /></td>
      <td className="py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => { setSelectedData(designation); setModalType("designation"); setIsModalOpen(true); }} className="text-blue-600 hover:text-blue-800 transition-colors"><FiEdit size={16} /></button>
          <button onClick={() => handleDeleteDesignation(designation._id)} className="text-red-600 hover:text-red-800 transition-colors"><FiTrash2 size={16} /></button>
        </div>
      </td>
    </tr>
  );

  const renderRoleCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {processedRoles.filter(r => r.roleName.toLowerCase().includes(searchRole.toLowerCase())).map((role) => (
        <div key={role.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${role.color}20` }}>
                <FiShield style={{ color: role.color }} />
              </div>
              <h3 className="font-semibold text-heading">{role.roleName}</h3>
            </div>
            <StatusBadge status={role.status} />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button onClick={() => { setSelectedRole(role); setIsPermissionMatrixOpen(true); }} className="text-primary text-sm font-medium">Manage Permissions</button>
            <div className="flex items-center gap-2">
              <button onClick={() => { setSelectedData(role); setModalType("role"); setIsModalOpen(true); }} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><FiEdit /></button>
              <button onClick={() => handleDeleteRole(role._id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><FiTrash2 /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPermissionMatrix = () => {
    if (!isPermissionMatrixOpen || !selectedRole) return null;
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
          <div className="bg-primary text-white p-6 flex justify-between items-center">
             <h2 className="text-2xl font-bold">{selectedRole.roleName} Permissions</h2>
             <button onClick={() => setIsPermissionMatrixOpen(false)} className="p-2 hover:bg-white/20 rounded-lg"><FiX className="w-6 h-6" /></button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <table className="w-full text-left">
              <thead><tr className="border-b-2 border-gray-200"><th className="py-4 font-semibold">Module</th>{permissionTypes.map(pt => <th key={pt} className="text-center py-4 capitalize">{pt}</th>)}</tr></thead>
              <tbody>
                {systemModules.map((module) => (
                  <tr key={module.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 flex items-center gap-3"><module.icon className="text-primary" /><span>{module.name}</span></td>
                    {permissionTypes.map((permType) => (
                      <td key={permType} className="py-4 text-center">
                        {selectedRole.permissionMatrix[module.id][permType] ? <FiCheck className="mx-auto text-green-600" /> : <FiX className="mx-auto text-gray-300" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white border-0 lg:border border-gray-200 lg:rounded-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-heading mb-2">Roles & Designation Management</h1>
          <p className="text-textgray">Organization hierarchy synced with {employees?.length || 0} employees</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button onClick={() => { setModalType("add-designation"); setSelectedData(null); setIsModalOpen(true); }} className="px-4 py-2 bg-[#2C3EA1] text-white flex items-center gap-2 text-sm font-semibold rounded hover:bg-[#1a2b88] transition-colors ">
            <FiPlus /> Add Designation
          </button>
          <button onClick={() => { setModalType("add-role"); setSelectedData(null); setIsModalOpen(true); }} className="px-4 py-2 bg-[#2C3EA1] text-white flex items-center gap-2 text-sm font-semibold rounded hover:bg-[#1a2b88] transition-colors ">
            <FiShield /> Add Role
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
        {[ { id: "overview", label: "Overview", icon: FiGrid }, { id: "roles", label: "System Roles", icon: FiShield }, { id: "designations", label: "Designations", icon: FiUsers }, { id: "audit", label: "Activity Log", icon: FiActivity }, ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-3 font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? "text-primary border-b-2 border-primary" : "text-textgray hover:text-heading"}`} >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
        ))}
      </div>

      {empLoading || desLoading || roleLoading ? ( <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div> ) : (
        <>
          {activeTab === "overview" && (
            <div className="space-y-8">
              <RolesStatsCard stats={stats} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-6 rounded-xl">
                    <h3 className="font-bold text-heading mb-2">System Roles</h3>
                    <button onClick={() => setActiveTab("roles")} className="text-primary text-sm font-medium">Manage →</button>
                 </div>
                 <div className="bg-gradient-to-br from-blue-50 to-transparent border border-blue-200 p-6 rounded-xl">
                    <h3 className="font-bold text-heading mb-2">Designations</h3>
                    <button onClick={() => setActiveTab("designations")} className="text-blue-600 text-sm font-medium">Manage →</button>
                 </div>
              </div>
            </div>
          )}
          {activeTab === "roles" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-heading">System Roles</h2>
                <div className="flex gap-2">
                  <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-primary text-white" : "bg-gray-100"}`}><FiGrid /></button>
                  <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg ${viewMode === "list" ? "bg-primary text-white" : "bg-gray-100"}`}><FiList /></button>
                </div>
              </div>
              {viewMode === "grid" ? renderRoleCards() : (
                <DataTable headers={["Role Name", "Description", "Matrix", "Headcount", "Status", "Actions"]} data={processedRoles.filter(r => r.roleName.toLowerCase().includes(searchRole.toLowerCase()))} searchValue={searchRole} onSearchChange={setSearchRole} renderRow={renderRoleRow} />
              )}
            </div>
          )}
          {activeTab === "designations" && (
            <div className="mt-4">
              <DataTable title="Designations" headers={["Designation Name", "Department", "Staffing", "Status", "Actions"]} data={displayDesignations.filter(d => d.designationName.toLowerCase().includes(searchDesignation.toLowerCase()))} searchValue={searchDesignation} onSearchChange={setSearchDesignation} renderRow={renderDesignationRow} />
            </div>
          )}
          {activeTab === "audit" && <div className="p-8 text-center text-textgray">Audit log synced with organizational changes.</div>}
        </>
      )}
      {renderPermissionMatrix()}
      <EditModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setSelectedData(null); }} 
        title={modalType?.includes("role") ? (selectedData ? "Edit Role" : "Add Role") : (selectedData ? "Edit Designation" : "Add Designation")} 
        fields={modalType?.includes("role") ? [
          { name: "roleName", label: "Role Name", type: "text", required: true },
          { name: "description", label: "Description", type: "text" },
          { name: "status", label: "Status", type: "select", options: [{ value: "Active", label: "Active" }, { value: "Inactive", label: "Inactive" }] },
        ] : [
          { name: "designationName", label: "Designation Name", type: "text", required: true },
          { name: "department", label: "Department", type: "text" },
          { name: "status", label: "Status", type: "select", options: [{ value: "Active", label: "Active" }, { value: "Inactive", label: "Inactive" }] },
        ]} 
        initialData={selectedData || { status: 'Active' }} 
        onSubmit={handleModalSubmit} 
      />
    </div>
  );
};

export default RolesDesignation;