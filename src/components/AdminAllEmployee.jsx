import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../slices/employeeSlice";
import Pagination from "./Pagination";

/* Reuse components */
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
    <td className="py-3 text-sm text-textgray">{user.personalInformation?.telephones}</td>
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

const AdminAllEmployee = () => {
  const dispatch = useDispatch();

  const { employees: teamData } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const headers = [
    "Employee Name",
    "Mail",
    "Mobile No.",
    "Employee TL",
    "Employee Manager",
    "Date Of Joining",
  ];

  return (
    <>
      <div className="bg-white border border-bordergray rounded-lg px-6 pt-6 pb-2 overflow-x-auto">
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
            {teamData?.map((user, index) => (
              <TeamRow key={index} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </>
  );
};

export default AdminAllEmployee;