import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination";
import { fetchEmployees } from "../../slices/employeeSlice";

const AvatarWithName = ({ avatar, name, profileImage }) => (
  <div className="flex items-center gap-2.5">
    <img
      className="w-7.5 h-7.5 rounded-md object-cover"
      src={profileImage || avatar || `https://i.pravatar.cc/150?u=${name}`}
      alt={name}
    />
    <span>{name}</span>
  </div>
);

const TeamRow = ({ user }) => (
  <tr className="hover:bg-gray-50">
    <td className="py-3 text-sm text-textgray">
      <AvatarWithName profileImage={user.profileImage} avatar={user.avatar} name={user.name} />
    </td>
    <td className="py-3 text-sm text-textgray font-medium">{user.employeeId || "---"}</td>
    <td className="py-3 text-sm text-textgray">{user.email}</td>
    <td className="py-3 text-sm text-textgray">{user.designation}</td>
    <td className="py-3 text-sm text-textgray">
      {user?.dateOfJoining
    ? new Date(user.dateOfJoining).toLocaleDateString()
    : "-"}
    </td>
  </tr>
);

const Myteam = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const { employees: teamData } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

 
  const isPrivileged = currentUser?.role === "admin" || 
                       currentUser?.role === "superadmin" || 
                       currentUser?.assignRole === "HR" || 
                       currentUser?.assignRole === "HR Manager";

  const filteredData = isPrivileged 
    ? teamData 
    : teamData.filter(emp => {
        // Exclude the current user from the list
        if (emp._id === currentUser?._id) return false;

        // Managers see employees with the same designation
        if (currentUser?.assignRole === "Manager") {
          return emp.designation === currentUser?.designation;
        }
      
        // TLs see their subordinates
        if (currentUser?.assignRole === "TL") {
          return emp.tl?._id === currentUser._id || emp.tl === currentUser._id || emp.manager?._id === currentUser._id || emp.manager === currentUser._id;
        }
     
        // Regular employees see their teammates (those under the same TL)
        const myTlId = currentUser?.tl?._id || currentUser?.tl;
        const empTlId = emp.tl?._id || emp.tl;
        return empTlId === myTlId && myTlId !== null && myTlId !== undefined;
      });

  const headers = [
    "Employee Name",
    "Employee ID",
    "Mail",
    "Designation",
    "Date Of Joining",
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl min-h-full flex flex-col relative">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-heading">
          My Team
        </h1>
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
            {filteredData.map((user, index) => (
              <TeamRow key={index} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  );
};

export default Myteam;