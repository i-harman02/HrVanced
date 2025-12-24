import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="w-full flex-1 overflow-auto pt-14 p-0 lg:p-8 ms-0 lg:ms-62.5 ">
      
        <Outlet />
      </main>
    </div>




  );
};

export default Layout;
