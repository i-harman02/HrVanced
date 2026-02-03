import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { fetchEmployees } from "../../slices/employeeSlice";
import Signup from "../../pages/signup/Signup";
import { IoMdClose } from "react-icons/io";

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

const TeamRow = ({ user }) => (
  <tr className="hover:bg-gray-50">
    <td className="py-3 text-sm text-textgray">
      <AvatarWithName avatar={user.avatar} name={user.name} />
    </td>
    <td className="py-3 text-sm text-textgray">{user.email}</td>
    <td className="py-3 text-sm text-textgray">{user.assignRole}</td>
    <td className="py-3 text-sm text-textgray">
      <AvatarWithName avatar={user.tl?.avatar} name={user.tl?.name} />
    </td>
    <td className="py-3 text-sm text-textgray">
      <AvatarWithName
        avatar={user.manager?.avatar}
        name={user.manager?.name}
      />
    </td>
    <td className="py-3 text-sm text-textgray">
      {user?.dateOfJoining
    ? new Date(user.dateOfJoining).toLocaleDateString()
    : "-"}
    </td>
  </tr>
);

const Myteam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

  const { employees: teamData } = useSelector((state) => state.employee);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const headers = [
    "Employee Name",
    "Mail",
    "Assign Role.",
    "Employee TL",
    "Employee Manager",
    "Date Of Joining",
  ];

  const isAdmin = user?.role === "admin" || user?.role === "superadmin";

  return (
    <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl min-h-full flex flex-col relative">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-heading">
          {isAdmin ? "All Employees" : "My Team"}
        </h1>
        {isAdmin && (
          <button
            onClick={() => setShowAddEmployeeModal(true)}
            className="px-4 py-2 bg-[#2C3EA1] text-white text-sm font-semibold rounded-lg hover:bg-[#1a2b88] transition-colors shadow-sm"
          >
            + Add Employee
          </button>
        )}
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
            {teamData.map((user, index) => (
              <TeamRow key={index} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />

        {/* Add Employee Drawer */}
        {showAddEmployeeModal && (
            <div className="fixed inset-0 z-50 flex justify-end">
                {/* Overlay */}
                <div 
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
                    onClick={() => setShowAddEmployeeModal(false)}
                />
                
                {/* Drawer */}
                <div className="relative w-full max-w-2xl bg-white h-screen shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out">
                    <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Add Employees</h2>
                        <button onClick={() => setShowAddEmployeeModal(false)} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <IoMdClose size={24} />
                        </button>
                    </div>
                    
                    {/* Reuse Signup Form Component */}
                    <Signup onClose={() => setShowAddEmployeeModal(false)} />
                </div>
            </div>
        )}
    </div>
  );
};

export default Myteam;
        