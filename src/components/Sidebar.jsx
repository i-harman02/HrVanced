import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <aside className="w-[250px] bg-white border-r border-bordergray flex flex-col fixed left-0 top-0 h-screen overflow-y-auto">
        <div className="px-5 py-[22px] border-b border-bordergray">
          <h1 className="text-heading font-extrabold leading-tight">
            Vanced Solution
          </h1>
        </div>
        <nav className="flex-1 p-5">
          <Link
            to="/"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-primary bg-[#F9FAFB]"
          >
            <i className="fas fa-home text-base" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link
            to="/mail"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-heading hover:bg-[#F9FAFB]"
          >
            <i className="fa-solid fa-envelope text-base" />
            <span className="text-sm font-medium">Inbox</span>
          </Link>{" "}
          <Link
            to="/message"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-heading hover:bg-[#F9FAFB]"
          >
            <i className="fa-solid fa-address-book text-base" />
            <span className="text-sm font-medium">Contacts</span>
          </Link>
          <Link
            to="#"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-heading hover:bg-[#F9FAFB]"
          >
            <i className="fa-solid fa-user text-base" />
            <span className="text-sm font-medium">Leads</span>
          </Link>
          <Link
            to="#"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-heading hover:bg-[#F9FAFB]"
          >
            <i className="fa-solid fa-chart-column text-base" />
            <span className="text-sm font-medium">Pipeline</span>
          </Link>
          <Link
            to="#"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-heading hover:bg-[#F9FAFB]"
          >
            <i className="fa-solid fa-bullseye text-base" />
            <span className="text-sm font-medium">Campaigns</span>
          </Link>
          <Link
            to="#"
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-heading hover:bg-[#F9FAFB]"
          >
            <i className="fa-solid fa-toolbox text-base" />
            <span className="text-sm font-medium">Toolbox</span>
          </Link>
          <Link
            to=""
            className="flex items-center gap-2.5 p-2.5 rounded-sm text-heading hover:bg-[#F9FAFB]"
          >
            <i className="fas fa-cog text-base" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </nav>
        <div className="border-t border-bordergray p-5 mt-auto">
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
