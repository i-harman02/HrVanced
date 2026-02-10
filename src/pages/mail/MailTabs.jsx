import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import MailList from "./MailList";
import MailView from "./MailView";
import GroupChat from "./GroupChat";
import ComposeModal from "./ComposeModal";
import api from "../../api/axios";
import socket from "../../socket";
import { FiPlus, FiSearch, FiInbox, FiRotateCw, FiUser, FiUsers, FiSend, FiStar, FiArchive, FiMail } from "react-icons/fi";
import { clearNotification } from "../../slices/notification";

const MailTabs = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification);
  const currentUser = useSelector((state) => state.user.user);
  const [mails, setMails] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [openCompose, setOpenCompose] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [box, setBox] = useState("all"); 
  const [selectedGroupId, setSelectedGroupId] = useState("GROUP_ALL");
  const [selectedGroupName, setSelectedGroupName] = useState("All Members");
  const [mainTab, setMainTab] = useState("inbox"); // "inbox" or "groups"
  const [subTab, setSubTab] = useState("all"); // "all", "unread", "starred", "sent"

  const fetchMails = useCallback(async () => {
    try {
      setLoading(true);
      // If we're in groups mode, box is group. If in inbox mode, we fetch 'all' to see sent+received
      const fetchBox = mainTab === "groups" ? "group" : (subTab === "sent" ? "sent" : "all");
      const res = await api.get(`/message/inbox?box=${fetchBox}${fetchBox === "group" ? `&groupId=${selectedGroupId}` : ''}`);
      setMails(res.data);
    } catch (err) {
      console.error(err);
      setMails([]);
    } finally {
      setLoading(false);
    }
  }, [mainTab, selectedGroupId, subTab]);

  useEffect(() => {
    api.get("/employee/list").then(res => setEmployees(res.data)).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetchMails();
    const handleNewMail = (mail) => {
      if (mainTab === "groups" && mail.isGroup) {
        if (mail.receiverId === selectedGroupId) setMails((prev) => [mail, ...prev]);
      } else if (mainTab === "inbox" && !mail.isGroup) {
        setMails((prev) => [mail, ...prev]);
      }
    };
    socket.on("newMail", handleNewMail);
    return () => socket.off("newMail", handleNewMail);
  }, [fetchMails, mainTab, selectedGroupId]);

  const handleUpdateMail = (mailId, updates) => {
    setMails((prev) => prev.map((m) => (m._id === mailId ? { ...m, ...updates } : m)));
  };

  const handleDeleteMail = (mailId) => {
    setMails((prev) => prev.filter((m) => m._id !== mailId));
    if (selectedMail?._id === mailId) setSelectedMail(null);
  };

  const filteredMails = mails.filter(mail => 
    mail.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mail.senderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mail.receiverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mail.body?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Helper to normalize designation for grouping (synced with MyTeam.jsx)
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

  const userId = currentUser?._id || currentUser?.id;

  const availableGroups = React.useMemo(() => {
    if (!currentUser || !employees.length) return [{ id: "GROUP_ALL", name: "All Members", icon: FiUsers }];

    // Group logic: Team = Same TL + Same Designation
    const groupedTeams = employees.reduce((acc, emp) => {
      const tlObj = emp.tl;
      const tlId = typeof tlObj === "object" ? tlObj?._id : tlObj;
      const tlName = (tlObj && typeof tlObj === "object" && tlObj.name) ? tlObj.name : "Company";
      
      const rawDesignation = emp.designation || "Staff";
      const designation = getNormalizedDesignation(rawDesignation, tlName);
  
      const key = `${tlId || "general"}_${designation}`;
      // Sanitize key for room ID (remove spaces, special chars if needed, but socket.io handles strings fine usually)
      // Let's keep it simple string like in MyTeam.jsx logic logic but we need a specific ID format
      // We'll use the key itself as the suffix
      
      if (!acc[key]) {
        acc[key] = {
          id: `TEAM_${key}`, // e.g. TEAM_12345_Design Team
          name: designation, // Display Name
          tlId: tlId,
          designation: designation,
          members: [],
          tlName: tlName
        };
      }
      acc[key].members.push(emp);
      return acc;
    }, {});
  
    const teamsList = Object.values(groupedTeams);
  
    // Filter teams visible to the user
    const visibleTeams = teamsList.filter((team) => {
      // 1. Admin/HR/SuperAdmin/Manager see ALL (Excluding teams with no TL potentially, or maybe all?)
      // User said "from tl id their are no group", implies TLs want to see their groups.
      // User said "from normal employee id their are two group".
      
      if (
        currentUser?.role === "admin" ||
        currentUser?.role === "superadmin" ||
        currentUser?.assignRole === "HR" ||
        currentUser?.assignRole === "HR Manager" ||
        currentUser?.assignRole === "Manager"
      ) {
         // Show all teams that have a TL (exclude generic Company teams if desired, per MyTeam logic)
         return team.tlId; 
      }
  
      // 2. TLs see teams they lead
      if (currentUser?.assignRole === "TL") {
        return String(team.tlId) === String(currentUser._id);
      }
  
      // 3. Regular Employees see their own team
      const myTlId = currentUser?.tl?._id || currentUser?.tl;
      
       // Determine my TL name
       let myTlName = "";
       if (currentUser?.tl && typeof currentUser.tl === 'object' && currentUser.tl.name) {
         myTlName = currentUser.tl.name;
       } else if (myTlId) {
          const tlUser = employees.find(u => String(u._id) === String(myTlId));
          if (tlUser) myTlName = tlUser.name;
       }
 
       const myDesignation = getNormalizedDesignation(currentUser?.designation, myTlName);
 
      return (
        String(team.tlId) === String(myTlId) &&
        team.designation === myDesignation
      );
    });

    const groups = visibleTeams.map(t => ({
      id: t.id,
      name: t.name, // Just the designation name
      icon: FiUser
    }));

    return [{ id: "GROUP_ALL", name: "All Members", icon: FiUsers }, ...groups];

  }, [employees, currentUser]);

  // Join rooms for available groups
  useEffect(() => {
    if (socket && availableGroups.length > 0) {
      availableGroups.forEach(group => {
        if (group.id !== "GROUP_ALL") {
          socket.emit("joinRoom", group.id);
        }
      });
    }
  }, [availableGroups]);

  return (
    <div className="">
    
      <div className=" p-4 md:p-6 lg:p-8 !pb-0 border-b border-gray-200 flex flex-col gap-6">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight capitalize">{mainTab}</h1>
        <div className="flex items-center gap-10">
          {["inbox", "groups"].map((tab) => (
            <button
              key={tab}
              onClick={() => { 
                setMainTab(tab); 
                setBox(tab === "inbox" ? "all" : "group"); 
                setSubTab("all"); 
                setSelectedMail(null); 
                dispatch(clearNotification(tab === "inbox" ? "mailInbox" : "mailGroups"));
              }}
              className={`pb-4 px-2 text-[13px] font-black uppercase tracking-widest transition-all relative ${
                mainTab === tab ? "color-primary" : " hover:text-gray-500"
              }`}
            >
              {tab === "inbox" ? "Inbox" : "Groups"}
              {tab === "inbox" && notifications.mailInbox && (
                <span className="absolute top-0 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
              {tab === "groups" && notifications.mailGroups && (
                <span className="absolute top-0 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
              {mainTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2C3EA1] rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      {mainTab === "inbox" ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-10 py-5 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-6">
              {[
                { id: "all", label: "All Mails", count: mails.length },
                { id: "unread", label: "Unread", count: mails.filter(m => !m.isRead && m.receiverId === userId).length },
                { id: "starred", label: "Starred", count: mails.filter(m => m.isStarred).length },
                { id: "sent", label: "Sent", count: mails.filter(m => m.senderId === userId).length },
              ].map(st => (
                <button
                  key={st.id}
                  onClick={() => setSubTab(st.id)}
                  className={`flex items-center gap-2.5 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-widest transition-all ${
                    subTab === st.id ? " text-[#2C3EA1] " : " "
                  }`}
                >
                  {st.label} <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${subTab === st.id ? "bg-[#2C3EA1] text-white" : "bg-gray-100 text-gray-400"}`}>{st.count}</span>
                </button>
              ))}
            </div>
          </div>

        
          <div className="px-6 py-6 flex items-center  gap-6">
             <div className="flex items-center border border-bordergray rounded-sm max-w-96.25 bg-white">
                <div className="relative border-r border-bordergray flex-1">
                  <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 " />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full text-sm text-textheading font-medium leading-none placeholder-[#364153]/50 outline-none bg-transparent py-2.5 ps-8 pe-3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <button className=" relative text-sm text-heading font-medium py-2.5 ps-8 pe-7 leading-[1.2] appearance-none outline-none bg-transparent cursor-pointer">
                   <FiRotateCw size={14} className="text-indigo-400 absolute left-2 top-1/2 -translate-y-1/2 " />
                   Sort By Name
                </button>
                
             </div>
             <button
               onClick={() => setOpenCompose(true)}
               className="bg-[#2C3EA1] rounded px-4 py-2 text-sm text-white hover:bg-[#24338a]"
             >
               Compose
             </button>
          </div>

          
          <div className="flex-1 flex border-t border-gray-200 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent hover:scrollbar-thumb-white/60">
             <div className="w-[440px] border-r border-gray-200 flex flex-col bg-white">
                <div className="flex-1 overflow-y-auto p-6 ">
                   <MailList 
                     box={box}
                     currentUser={currentUser}
                     mails={filteredMails.filter(m => {
                       if (subTab === "unread") return !m.isRead;
                       if (subTab === "starred") return m.isStarred;
                       return true;
                     })} 
                     onSelect={setSelectedMail} 
                     selectedMail={selectedMail}
                   />
                </div>
             </div>
             <div className="flex-1 bg-white">
                <MailView box={box} mail={selectedMail} onUpdate={handleUpdateMail} onDelete={handleDeleteMail} currentUser={currentUser} />
             </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex overflow-auto h-[600px]">
          <div className="w-[300px] border-r border-gray-200 flex flex-col p-4 md:p-6 lg:p-8">
          
            <div className="space-y-1">
              {availableGroups.map(g => (
                <button
                  key={g.id}
                  onClick={() => { setSelectedGroupId(g.id); setSelectedGroupName(g.name); }}
                  className={`w-full flex items-center gap-5 mb-4 text-[13px] font-bold transition-all duration-300 ${
                    selectedGroupId === g.id 
                    ? "bg-white text-[#2C3EA1] " 
                    : "text-gray-400"
                  }`}
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${selectedGroupId === g.id ? "bg-[#2C3EA1] text-white " : ""}`}>
                    <g.icon size={20} />
                  </div>
                  <span>{g.name}</span>
                </button>
              ))}
            </div>
            <div className="mt-auto p-8 bg-white/50 backdrop-blur-md rounded-3xl border border-indigo-100/30 border-dashed text-center">
               <FiArchive size={32} className="text-bg-[#2C3EA1] mx-auto mb-4" />
               <p className="text-[11px] text-[#2C3EA1]font-black uppercase tracking-widest  leading-relaxed">System protected data node</p>
            </div>
          </div>
          <div className="flex-1 bg-white overflow-hidden">
             <GroupChat groupId={selectedGroupId} groupName={selectedGroupName} />
          </div>
        </div>
      )}

      {openCompose && (
        <ComposeModal
          onClose={() => setOpenCompose(false)}
          onSent={(newMail) => {
            setMails((prev) => [newMail, ...prev]);
            setSelectedMail(newMail);
            setOpenCompose(false);
          }}
        />
      )}
    </div>
  );
};


export default MailTabs;
