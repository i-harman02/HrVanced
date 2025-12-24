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

const menuItems = [
  { to: "/", label: "Dashboard", icon: IoMdHome },
  { to: "/me", label: "Me", icon: FaUser },
  { to: "/myteam", label: "My Team", icon: PiUsersFourFill },
  { to: "/projects", label: "Projects", icon: FaDiagramProject },
  { to: "/myfinaces", label: "My Finances", icon: FaRupeeSign },
  { to: "/resignation", label: "Resignation", icon: GiNotebook },
  { to: "/privacy", label: "Privacy Policy", icon: MdOutlineSystemSecurityUpdateGood },
  { to: "/mail", label: "Mail", icon: IoIosMail },
  { to: "/message", label: "Message", icon: BiSolidMessageRounded },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [userinfo, setUserinfo ] =useState(false);

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
        {/* Header */}
        <div>
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <img src={logo} alt="logo" className="h-8" />
            <button className="lg:hidden" onClick={() => setOpen(false)}>
              <FiX size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {menuItems.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                    ${active
                      ? "bg-[#F9FAFB] text-primary"
                      : "text-heading hover:bg-[#F9FAFB]"
                    }
                  `}
                >
                  <Icon className="text-base" />
                  <span className="lg:block">{label}</span>
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
              Anit Thakur
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
