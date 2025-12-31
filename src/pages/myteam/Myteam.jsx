import Pagination from "../../components/Pagination";

const teamData = [
  {
    name: "Anamika",
    avatar: 44,
    email: "anamika@gmail.com",
    phone: "7836373933",
    tl: { name: "Deepak Kumar", avatar: 7 },
    manager: { name: "Udyam Kumar", avatar: 8 },
    createdAt: "Jul 21, 2023",
  },
  {
    name: "Anit Thakur",
    avatar: 14,
    email: "anit@gmail.com",
    phone: "7836373933",
    tl: { name: "Deepak Kumar", avatar: 7 },
    manager: { name: "Udyam Kumar", avatar: 8 },
    createdAt: "Jul 21, 2023",
  },
  {
    name: "Harman Singh",
    avatar: 12,
    email: "harman@gmail.com",
    phone: "7836373933",
    tl: { name: "Deepak Kumar", avatar: 7 },
    manager: { name: "Udyam Kumar", avatar: 8 },
    createdAt: "Jul 21, 2023",
  },
  {
    name: "Rahul Kumar",
    avatar: 56,
    email: "rahul@gmail.com",
    phone: "7836373933",
    tl: { name: "Deepak Kumar", avatar: 7 },
    manager: { name: "Udyam Kumar", avatar: 8 },
    createdAt: "Jul 21, 2023",
  },
  {
    name: "Abhishek",
    avatar: 68,
    email: "abhishek@gmail.com",
    phone: "7836373933",
    tl: { name: "Deepak Kumar", avatar: 7 },
    manager: { name: "Udyam Kumar", avatar: 8 },
    createdAt: "Jul 21, 2023",
  },
];

const AvatarWithName = ({ avatar, name }) => (
  <div className="flex items-center gap-2.5">
    <img
      className="w-7.5 h-7.5 rounded-md"
      src={`https://i.pravatar.cc/150?img=${avatar}`}
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
    <td className="py-3 text-sm text-textgray">{user.phone}</td>
    <td className="py-3 text-sm text-textgray">
      <AvatarWithName avatar={user.tl.avatar} name={user.tl.name} />
    </td>
    <td className="py-3 text-sm text-textgray">
      <AvatarWithName avatar={user.manager.avatar} name={user.manager.name} />
    </td>
    <td className="py-3 text-sm text-textgray">{user.createdAt}</td>
  </tr>
);

const Myteam = () => {
  const headers = [
    "Employee Name",
    "Mail",
    "Mobile No.",
    "Employee TL",
    "Employee Manager",
    "Created At",
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl min-h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-heading">My Team</h1>
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
    </div>
  );
};

export default Myteam;
