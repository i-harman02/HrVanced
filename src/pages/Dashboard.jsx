            import Leavechart from "../components/LeaveChart.jsx";
            import Celebrationtable from "../components/Celebrationtable.jsx";
            import Upcomingholidays from "../components/Upcomingholidays.jsx";
            import TodayLeave from "../components/TodayLeave.jsx";
            import Inbox from "../components/Inbox.jsx";
            const Dashboard = () => {
              return (
                <>
                  <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl">
                    <h2 className="text-2xl font-bold text-heading leading-tight mb-6">
                      Quick Access
                    </h2>
                      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 lg:gap-8 mb-8 ">
                      <div className="flex flex-col gap-6 lg:gap-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                          <Inbox />
                          <Upcomingholidays />
                        </div>
                        <Celebrationtable />
                      </div>
                      <div className="flex flex-col gap-6 lg:gap-8">
                        <TodayLeave />
                        <Leavechart />
                      </div>
                    </div>
                  </div>
                </>
              );
            };

            export default Dashboard;
