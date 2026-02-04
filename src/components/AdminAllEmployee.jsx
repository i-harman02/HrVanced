import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../slices/employeeSlice";
import Pagination from "./Pagination";
import { GoEye } from "react-icons/go";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

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
  <tr className="hover:bg-gray-50 border-b border-gray-200">
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
      <div className="flex items-center gap-3">
        <span className="cursor-pointer text-textgray"><GoEye size={16} /></span>
        <span className="cursor-pointer text-textgray"><LuPencilLine size={16} /></span>
        <span className="cursor-pointer text-textgray"><RiDeleteBin6Line size={16} /></span>
      </div>
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
    "Actions",
  ];

  return (
    <>
      <div className="bg-white border border-bordergray rounded-lg p-6 overflow-x-auto">
        <h4 className="text-base text-black font-semibold mb-6">All Employess</h4>
        <table className="w-full min-w-250 mb-6">
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

          <tbody>
            {teamData?.map((user, index) => (
              <TeamRow key={index} user={user} />
            ))}
          </tbody>
        </table>
        <Pagination />
      </div>
    </>
  );
};

export default AdminAllEmployee;