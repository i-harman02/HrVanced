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
  const { employees: teamData, loading } = useSelector((state) => state.employee);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const isPrivileged =
    currentUser?.role === "admin" ||
    currentUser?.role === "superadmin" ||
    currentUser?.assignRole === "HR" ||
    currentUser?.assignRole === "HR Manager";

  // Helper to normalize designation for grouping
  // Helper to normalize designation for grouping
  const getNormalizedDesignation = (des, tlName = "") => {
    if (!des) return "Staff";
    const d = des.trim();
    
    // Custom rule for Malkeet's team
    if (tlName && tlName.toLowerCase().includes("malkeet")) {
      if (
        d === "Angular Developer" || 
        d.toLowerCase().includes(".net") || 
        d.toLowerCase().includes(">net") ||
        d === "Full Stack Developer"
      ) {
        return "Full Stack Team";
      }
    }

    if (d === "UI/UX Designer" || d === "Web Designer") {
      return "Design Team";
    }

    if (d === "BDE" || d === "Business Development Associate" || d === "Business Development Executive") {
      return "BDE Team";
    }

    if (d === "HR" || d === "HR Manager" || d === "Hr") {
      return "HR Team";
    }

    if (
      d === "Frontend Developer (React)" || 
      d === "MERN Stack" || 
      d === "MERN Stack Developer"
    ) {
      return "MERN / React Team";
    }

    if (d === "Full Stack Developer") {
      return "Full Stack Team";
    }
    
    return d;
  };

  // Group logic: Team = Same TL + Same Designation (Designers grouped together)
  const groupedTeams = (teamData || []).reduce((acc, emp) => {
    const tlObj = emp.tl;
    const tlId = typeof tlObj === "object" ? tlObj?._id : tlObj;
    // Fix: Handle null tlObj correctly. typeof null is 'object'
    const tlName = (tlObj && typeof tlObj === "object" && tlObj.name) 
      ? tlObj.name 
      : "Company";
    
    // Normalize designation
    const rawDesignation = emp.designation || "Staff";
    const designation = getNormalizedDesignation(rawDesignation, tlName);

    const key = `${tlId || "general"}_${designation}`;

    if (!acc[key]) {
      acc[key] = {
        id: key,
        label: designation,
        tlId: tlId,
        designation: designation,
        members: [],
      };
    }
    acc[key].members.push(emp);
    return acc;
  }, {});

  const teamsList = Object.values(groupedTeams);

  // Filter teams visible to the user
  const visibleTeams = teamsList.filter((team) => {
    // 1. Admin/HR/SuperAdmin/Manager see ALL (Excluding teams with no TL)
    if (
      currentUser?.role === "admin" ||
      currentUser?.role === "superadmin" ||
      currentUser?.assignRole === "HR" ||
      currentUser?.assignRole === "HR Manager" ||
      currentUser?.assignRole === "Manager"
    ) {
      return team.tlId;
    }

    // 2. TLs see teams they lead
    if (currentUser?.assignRole === "TL") {
      return String(team.tlId) === String(currentUser._id);
    }

    // 3. Regular Employees see their own team (Same TL + Same Designation Group)
    const myTlId = currentUser?.tl?._id || currentUser?.tl;
    
    // Determine my TL name to check for special grouping
    let myTlName = "";
    if (currentUser?.tl && typeof currentUser.tl === 'object' && currentUser.tl.name) {
      myTlName = currentUser.tl.name;
    } else if (myTlId && teamData) {
       const tlUser = teamData.find(u => String(u._id) === String(myTlId));
       if (tlUser) myTlName = tlUser.name;
    }

    const myDesignation = getNormalizedDesignation(currentUser?.designation, myTlName);
    
    return (
      String(team.tlId) === String(myTlId) &&
      team.designation === myDesignation
    );
  });

  // Append "All Members" tab for privileged users
  if (
    currentUser?.role === "admin" ||
    currentUser?.role === "superadmin" ||
    currentUser?.assignRole === "HR" ||
    currentUser?.assignRole === "HR Manager" ||
    currentUser?.assignRole === "Manager"
  ) {
    let allMembers = teamData || [];
    
    // If user is just a Manager (not Admin/HR), hide Admins/SuperAdmins AND Managers from "All Members"
    if (currentUser?.assignRole === "Manager" && currentUser?.role !== "admin" && currentUser?.role !== "superadmin") {
      allMembers = allMembers.filter(member => 
        member.role !== "admin" && 
        member.role !== "superadmin" &&
        member.assignRole !== "Manager"
      );
    }

    visibleTeams.push({
      id: "all_employees",
      label: "All Members",
      tlId: "all",
      designation: "All",
      members: allMembers,
    });
  }

  // Set default active tab
  useEffect(() => {
    if (visibleTeams.length > 0 && !activeTab) {
      // Find my team first
      const myTlId = currentUser?.tl?._id || currentUser?.tl;
      
      // Determine my TL name
      let myTlName = "";
      if (currentUser?.tl && typeof currentUser.tl === 'object' && currentUser.tl.name) {
        myTlName = currentUser.tl.name;
      } else if (myTlId && teamData) {
         const tlUser = teamData.find(u => String(u._id) === String(myTlId));
         if (tlUser) myTlName = tlUser.name;
      }

      const myDesignation = getNormalizedDesignation(currentUser?.designation, myTlName);
      
      const myTeam = visibleTeams.find(
        (t) =>
          String(t.tlId) === String(myTlId) &&
          t.designation === myDesignation
      );
      setActiveTab(myTeam ? myTeam.id : visibleTeams[0].id);
    } else if (visibleTeams.length === 0) {
        setActiveTab(null);
    }
  }, [visibleTeams, activeTab, currentUser, teamData]);

  const currentTeam = visibleTeams.find((t) => t.id === activeTab);
  
  // Sort members by priority: Manager -> TL -> Others
  const filteredData = currentTeam 
    ? [...currentTeam.members].sort((a, b) => {
        const getPriority = (role) => {
          if (role === "Manager") return 1;
          if (role === "TL") return 2;  
          return 3;
        };
        return getPriority(a.assignRole) - getPriority(b.assignRole);
      }) 
    : [];

  const headers = [
    "Employee Name",
    "Employee ID",
    "Mail",
    "Designation",
    "Date Of Joining",
  ];

  if (loading && teamData.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">Loading Team Data...</div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl min-h-full flex flex-col relative">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-heading">
          {currentTeam?.label || "Team"}
        </h1>
      </div>

      {/* Tabs */}                                                                          
      {visibleTeams.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-50 rounded-xl border border-gray-100">
          {visibleTeams.map((team) => (
            <button
              key={team.id}
              onClick={() => setActiveTab(team.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === team.id
                  ? "bg-white text-primary shadow-sm border border-gray-200"
                  : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
              }`}
            >
              {team.label}
              <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-xs rounded-full text-gray-400">
                {team.members.length}
              </span>
            </button>
          ))}
        </div>
      )}

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
            {filteredData.length > 0 ? (
              filteredData.map((user, index) => (
                <TeamRow key={index} user={user} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400 italic">
                  No members found in this team.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  );
};

export default Myteam;