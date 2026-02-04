import Leavechart from "../../components/LeaveChart.jsx";
import Celebrationtable from "../../components/Celebrationtable.jsx";
import Upcomingholidays from "../../components/Upcomingholidays.jsx";
import TodayLeave from "../../components/TodayLeave.jsx";
import { IoChatbubbles } from "react-icons/io5";
import { useState } from "react";
import { useSelector } from "react-redux";
import ChatModal from "../../components/Chatmodal.jsx";
import Inbox from "../../components/Inbox.jsx";
import HrStatsCard from "../../components/HrStatsCard.jsx";
import AdminAllEmployee from "../../components/AdminAllEmployee.jsx";
import AdminAllClients from "../../components/AdminAllClients.jsx";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  
  const { user } = useSelector((state) => state.user);

  const role = user?.role?.toLowerCase();
  const isAdmin = role === "admin" || role === "superadmin";
  return (
    <>
      <div className="p-4 pb-0 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl">
        <h2 className="text-2xl font-bold text-heading leading-tight mb-6">
          Quick Access
        </h2>
          {isAdmin && <HrStatsCard />}

        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 lg:gap-8 mt-8">
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <Inbox />
              <Upcomingholidays />
            </div>
            <Celebrationtable />
            <AdminAllEmployee />
          </div>
          <div className="flex flex-col gap-6 lg:gap-8">
            <TodayLeave />
            <Leavechart />
            <AdminAllClients />
          </div>
        </div>
        <div>
            <button
              onClick={() => setOpen(true)}
              className="fixed bottom-6 right-6 bg-blue-800 text-white p-3 rounded-xl shadow-lg hover:bg-blue-900 transition z-40"
            >
              <IoChatbubbles size={22} />
            </button>

            {/* Chat Modal */}
            {open && <ChatModal onClose={() => setOpen(false)} />}
          </div>
      </div>
    </>
  );
};

export default Dashboard;
