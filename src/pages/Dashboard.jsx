import Leavechart from "../components/LeaveChart.jsx";
import Celebrationtable from "../components/Celebrationtable.jsx";
import Upcomingholidays from "../components/Upcomingholidays.jsx";
import TodayLeave from "../components/TodayLeave.jsx";
import Inbox from "../components/Inbox.jsx";
const Dashboard = () => {
  return (
    <>
      <div className="p-8 border bg-white border-gray-200 rounded-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-heading leading-tight">
            Quick Access
          </h2>
        </div>
        <div className="  gap-8">
          <div className="grid grid-cols-[2fr_1fr] mb-8 gap-8 ">
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-8">
                <Inbox />
               <Upcomingholidays />
              </div>
              <Celebrationtable />
               </div>
            <div className="flex flex-col gap-8">
              <TodayLeave />
               <Leavechart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
