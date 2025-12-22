import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-[250px] w-full p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
