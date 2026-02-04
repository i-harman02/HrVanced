import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { fetchEmployees, deleteEmployee } from "../../slices/employeeSlice";
import Signup from "../../pages/signup/Signup";
import { IoMdClose } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";


const AvatarWithName = ({ avatar, name }) => (
  <div className="flex items-center gap-2.5">
    <img
      className="w-7.5 h-7.5 rounded-md"
      src={`https://i.pravatar.cc/150?img=${avatar || 1}`}
      alt={name}
    />
    <span>{name}</span>
  </div>
);

const TeamRow = ({ user, onEdit, onDelete }) => {
  const calculateExperience = (joiningDate) => {
    if (!joiningDate) return "-";
    
    const start = new Date(joiningDate);
    const end = new Date();
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }

    if (years === 0 && months === 0) return "Fresher";
    
    let result = "";
    if (years > 0) result += `0${years} years `;
    if (months > 0) result += `${months} months`;
    return result.trim();
  };

  return (
    <tr className="hover:bg-gray-50 border-b border-gray-100">
      <td className="py-3 text-sm text-textgray">
        <AvatarWithName avatar={user.avatar} name={user.name} />
      </td>
      <td className="py-3 text-sm text-textgray">{user.email}</td>
      <td className="py-3 text-sm text-textgray">
        {user.personalInformation?.telephones?.[0] || "-"}
      </td>
      <td className="py-3 text-sm text-textgray">
        <AvatarWithName avatar={user.tl?.avatar} name={user.tl?.name} />
      </td>
      <td className="py-3 text-sm text-textgray">
        <AvatarWithName
          avatar={user.manager?.avatar}
          name={user.manager?.name}
        />
      </td>
      <td className="py-3 text-sm text-textgray whitespace-nowrap">
        {calculateExperience(user.dateOfJoining)}
      </td>
      <td className="py-3 text-sm text-textgray">{user.designation || "-"}</td>
      <td className="py-3 text-sm text-textgray">
        <span className={`text-xs px-2 py-0.5 rounded  ${
          user.status === "Active" 
            ? "bg-green-100 text-green-800 border border-green-200" 
            : "bg-red-100 text-red-800 border border-red-200"
        }`}>
          {user.status || "Active"}
        </span>
      </td>
      <td className="py-3 text-sm text-textgray">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onEdit(user)}
            className=" hover:text-blue-700 transition-colors" 
            title="Edit"
          >
            <CiEdit size={20} />
          </button>
          <button 
            onClick={() => onDelete(user._id)}
            className=" hover:text-red-700 transition-colors" 
            title="Delete"
          >
            <RiDeleteBin5Line size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};

const AllEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const { employees: teamData } = useSelector((state) => state.employee);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowAddEmployeeModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(id));
    }
  };

  const handleCloseModal = () => {
    setShowAddEmployeeModal(false);
    setEditingEmployee(null);
  };

  const headers = [
    "Employee Name",
    "Mail",
    "Mobile Number",
    "Employee TL",
    "Employee Manager",
    "Experience",
    "Designation",
    "Status",
    "Action"
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl min-h-full flex flex-col relative">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-heading">
           All Employees
        </h1>
        <button
          onClick={() => setShowAddEmployeeModal(true)}
          className="px-4 py-2 bg-[#2C3EA1] text-white text-sm font-semibold rounded-lg hover:bg-[#1a2b88] transition-colors shadow-sm"
        >
          + Add Employee
        </button>
      </div>

      <div className="bg-white border border-bordergray rounded-lg px-6 pt-6 pb-2 overflow-x-auto mb-8">
        <table className="w-full min-w-250">
          <thead>
            <tr className="border-b border-bordergray">
              {headers.map((h) => (
                <th
                  key={h}
                  className="pb-4 text-left text-sm font-bold text-heading"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {teamData
              .filter((emp) => emp._id !== user?._id) // Filter out the current logged-in admin
              .map((user, index) => (
              <TeamRow 
                key={index} 
                user={user} 
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />

     
        {showAddEmployeeModal && (
            <div className="fixed inset-0 z-50 flex justify-end">
            
                <div 
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
                    onClick={() => setShowAddEmployeeModal(false)}
                />
                
                <div className="relative w-full max-w-2xl bg-white h-screen shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out">
                    <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">
                          {editingEmployee ? "Edit Employee" : "Add Employees"}
                        </h2>
                        <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <IoMdClose size={24} />
                        </button>
                    </div>
                    
                    
                    <Signup 
                      onClose={handleCloseModal} 
                      editingEmployee={editingEmployee} 
                    />
                </div>
            </div>
        )}
    </div>
  );
};

export default AllEmployee;
