import { Link, useLocation } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { PiUsersFourFill } from "react-icons/pi";
import { FaDiagramProject } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { MdOutlineSystemSecurityUpdateGood } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import logo from "../assets/vanced-logo.png";
import Userinfo from "../components/Userinfo"
import { MdArrowDropUp } from "react-icons/md";
import { useSelector , useDispatch} from "react-redux";
// import { } from "react-redux";
import { clearNotification } from "../slices/notification";

const menuItems = [
  { to: "/dashboard", label: "Dashboard", icon: IoMdHome },
  { to: "/me", label: "Me", icon: FaUser },
  { to: "/my-team", label: "My Team", icon: PiUsersFourFill },
  { to: "/projects", label: "Projects", icon: FaDiagramProject },
  { to: "/my-finances", label: "My Finances", icon: FaRupeeSign },
  { to: "/resignation", label: "Resignation", icon: GiNotebook },
  { to: "/privacy", label: "Privacy Policy", icon: MdOutlineSystemSecurityUpdateGood },
  { to: "/mail", label: "Mail", icon: IoIosMail },
  { to: "/message", label: "Message", icon: BiSolidMessageRounded },
];
const notificationMap = {
  "/mail": "mail",
  "/message": "message",
  "/projects": "projects",
  "/my-team": "team",
  "/my-finances": "finance",
};

const Sidebar = () => {
   const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [userinfo, setUserinfo ] =useState(false);
  const [isAllEmployeesOpen, setIsAllEmployeesOpen] = useState(false);
const notifications = useSelector((state) => state.notification);
const dispatch = useDispatch();
// const hasAnyNotification = Object.values(notifications).some(Boolean);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <img src={logo} alt="logo" className="h-7" />
        <button onClick={() => setOpen(true)}>
          <FiMenu size={22} />
        </button>
      </div>

      {/* Overlay (Mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 top-0 left-0 h-full bg-white border-r
          transition-transform duration-300
          w-65 flex flex-col justify-between
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          border-gray-200
        `}
      >
     
        <div>
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <img src={logo} alt="logo" className="h-8" />
            <button className="lg:hidden" onClick={() => setOpen(false)}>
              <FiX size={20} />
            </button>
          </div>

       
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const { to, label, icon: Icon } = item;
              const isAdmin = user?.role === "admin" || user?.role === "superadmin";

              if (label === "My Team" && isAdmin) {
                const subItems = [
                  { label: "All Employees", to: "/all-employees/list" },
                  { label: "Attendance Overview", to: "/all-employees/attendance" },
                  { label: "Roles & Designation", to: "/all-employees/roles" },
                  { label: "Shift Management", to: "/all-employees/shift" },
                  { label: "Performance", to: "/all-employees/performance" },
                  { label: "Appraisal Cycles", to: "/all-employees/appraisal" },
                  { label: "Review Forms", to: "/all-employees/review-forms" },
                  { label: "Manager Feedback", to: "/all-employees/feedback" },
                  { label: "All Team Leaders", to: "/all-employees/team-leaders" },
                  { label: "All Managers", to: "/all-employees/managers" },
                  { label: "All Clients", to: "/all-employees/clients" },
                ];

                const isActiveParent = subItems.some(sub => location.pathname === sub.to);

                return (
                  <div key="all-employees-menu">
                    <button
                      onClick={() => setIsAllEmployeesOpen(!isAllEmployeesOpen)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${isActiveParent || isAllEmployeesOpen ? "bg-[#F9FAFB] text-primary" : "text-heading hover:bg-[#F9FAFB]"}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="text-base" />
                        <span className="lg:block">All Employees</span>
                      </div>
                      <MdArrowDropUp 
                        size={20} 
                        className={`transition-transform duration-200 ${isAllEmployeesOpen ? "rotate-180" : ""}`} 
                      />
                    </button>


                 
                    {isAllEmployeesOpen && (
                      <div className="pl-9 mt-1 space-y-1">
                        {subItems.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            onClick={() => setOpen(false)}
                            className={`block px-3 py-2 rounded-md text-sm transition-colors
                              ${location.pathname === sub.to 
                                ? "text-primary font-medium bg-[#F0F2FF]" 
                                : "text-gray-500 hover:text-heading hover:bg-gray-50"}
                            `}
                          >
                           • {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

             
              const active = location.pathname === to;
              return (
               <Link
  key={to}
  to={to}
  onClick={() => {
    setOpen(false);
    const notifKey = notificationMap[to];
    if (notifKey) dispatch(clearNotification(notifKey));
  }}
  className={`relative flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
    ${active ? "bg-[#F9FAFB] text-primary" : "text-heading hover:bg-[#F9FAFB]"}
  `}
>
  <Icon className="text-base" />
  <span className="lg:block">{label}</span>

  {notificationMap[to] && notifications[notificationMap[to]] && (
      <span className="absolute right-4 w-2.5 h-2.5 bg-red-500 rounded-full" />
  )}
</Link>

              );
            })}
          </nav>
        </div>

        {/* Profile */}
        <div className="border-t border-gray-200 p-4 mt-auto">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40?img=12"
              className="w-10 h-10 rounded-md"
              alt="user"
            />
            <div className="text-sm font-medium text-heading">
              {user?.name }
            </div>
            
            <button
              onClick={() => setUserinfo(true)}
              className="mr-3"
            >
              <MdArrowDropUp size={22} />
            </button>

            {/* Chat Modal */}
            {userinfo  && <Userinfo onClose={() => setUserinfo (false)} />}
          </div>
            
         
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
