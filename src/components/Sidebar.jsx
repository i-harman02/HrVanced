import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { PiUsersFourFill } from "react-icons/pi";
import { FaDiagramProject } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { MdOutlineSystemSecurityUpdateGood } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import logo from "../assets/vanced-logo.png";
import { BiSolidMessageRounded } from "react-icons/bi";

const Sidebar = () => {
  return (
    <>    
      <aside className="w-[250px] bg-white border-r border border-gray-200 flex flex-col h-screen overflow-y-auto">
        <div className="px-5 py-[22px] border-b border-gray-200 ">
          <img src={logo} alt="" />
        </div>
        <nav className="flex-1 p-5 ">
          <Link
            to="/"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-primary bg-[#F9FAFB]"
          >
            <IoMdHome className="text-base" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link
            to="/me"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-heading hover:bg-[#F9FAFB]"
          >
            <FaUser className="text-base" />
            <span className="text-sm font-medium">ME</span>
          </Link>{" "}
          <Link
            to="/myteam"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-heading hover:bg-[#F9FAFB]"
          >
            <PiUsersFourFill className="text-base" />
            <span className="text-sm font-medium">My Team</span>
          </Link>
          <Link
            to="/projects"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-heading hover:bg-[#F9FAFB]"
          >
            <FaDiagramProject className="text-base" />
            <span className="text-sm font-medium">Project</span>
          </Link>
          <Link
            to="/myfinaces"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-heading hover:bg-[#F9FAFB]"
          >
            <FaRupeeSign className="text-base" />
            <span className="text-sm font-medium">My Finances</span>
          </Link>
          <Link
            to="/resignation"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-heading hover:bg-[#F9FAFB]"
          >
            <GiNotebook className="text-base" />
            <span className="text-sm font-medium">Resignation</span>
          </Link>
          <Link
            to="/privacy"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-heading hover:bg-[#F9FAFB]"
          >
            <MdOutlineSystemSecurityUpdateGood className="text-base" />
            <span className="text-sm font-medium">Privacy policy</span>
          </Link>
          <Link
            to="/mail"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-heading hover:bg-[#F9FAFB]"
          >
            <IoIosMail />
            <span className="text-sm font-medium">Mail</span>
          </Link>
          <Link
            to="/message"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-heading hover:bg-[#F9FAFB]"
          >
           <BiSolidMessageRounded />
            <span className="text-sm font-medium">Message</span>
          </Link>
        </nav>
        <div className="border-t  border-gray-200 p-5 mt-auto">
          <button className="flex items-center gap-2 w-full">
            <img
              src="https://i.pravatar.cc/40?img=12"
              alt="User"
              className="w-10 h-10 rounded-sm"
            />
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-heading leading-tight mb-1.5">
                John Smith
              </div>
              <div className="text-xs text-textgray leading-tight">
                john@example.com
              </div>
            </div>
            <i className="fas fa-chevron-down text-[10px]" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
