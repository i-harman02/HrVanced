const Dashboard = () => {
  return (
    <>
      <div>
        <div className="flex min-h-screen bg-gray-100">
          <main className="flex-1  overflow-auto p-10 ">
            <div className="p-8 border bg-white border-gray-200 rounded-xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-heading leading-tight">
                  Quick Access
                </h2>
              </div>
              <div className="grid grid-cols-3 mb-8 gap-8 ">
                <div className="border-r border rounded-xl border-gray-200 p-6  ">
                  <div className="flex justify-between items-start ">
                    <div>
                      {" "}
                      <span className="text-sm text-textgray leading-none">
                        Inbox
                      </span>
                      <h2 className="text-2xl font-bold text-heading leading-[1.1] mt-11 mb-3">
                        Good Job
                      </h2>
                      <p>You have no pending actions.</p>
                    </div>

                    <div>
                      <img src="" alt="" />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 py-8 px-10.5">
                  <div className="flex justify-between items-start mb-5">
                    <span className="text-sm text-textgray leading-none">
                      Leads Today
                    </span>
                    <span className="text-xs text-valuepink leading-none">
                      +2.4%
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-heading leading-[1.1]">
                    0
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 py-8 px-10.5">
                  <div className="flex justify-between items-start mb-5">
                    <span className="text-sm text-textgray leading-none">
                      Connected Accounts
                    </span>
                    <span className="text-xs text-valuegreen leading-none">
                      +1.1%
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-heading leading-[1.1]">
                    3
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 mb-8 border border-bordergray rounded-xl">
                <div className="border-r border-bordergray py-8 px-10.5">
                  <div className="flex justify-between items-start mb-5">
                    <span className="text-sm text-textgray leading-none">
                      New Contact
                    </span>
                    <span className="text-xs text-valuegreen leading-none">
                      +4.75%
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-heading leading-[1.1]">
                    3506
                  </div>
                </div>
                <div className="border-r border-bordergray py-8 px-10.5">
                  <div className="flex justify-between items-start mb-5">
                    <span className="text-sm text-textgray leading-none">
                      Texts Sent
                    </span>
                    <span className="text-xs text-valuegreen leading-none">
                      +2.4%
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-heading leading-[1.1]">
                    3/3
                  </div>
                </div>
                <div className="border-r border-bordergray py-8 px-10.5">
                  <div className="flex justify-between items-start mb-5">
                    <span className="text-sm text-textgray leading-none">
                      Text Received
                    </span>
                    <span className="text-xs text-valuepink leading-none">
                      +1.1%
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-heading leading-[1.1]">
                    0/37
                  </div>
                </div>
                <div className="py-8 px-10.5">
                  <div className="flex justify-between items-start mb-5">
                    <span className="text-sm text-textgray leading-none">
                      Complete Campaigns
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-heading leading-[1.1]">
                    1/1
                  </div>
                </div>
              </div>
              {/* Data Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_380px] gap-8 mb-8">
                {/* Line Chart - Leads This Week */}
                <div
                  className="bg-white border border-gray-200 rounded-lg px-8 py-8 flex flex-col"
                  style={{ height: 400 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">
                    Leads This Week
                  </h3>
                  <div className="flex-1 relative">
                    <canvas id="lineChart" />
                  </div>
                </div>
                {/* Donut Chart - Leads by Source */}
                <div
                  className="bg-white border border-gray-200 rounded-lg px-8 py-8 flex flex-col"
                  style={{ height: 400 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">
                    Leads by Source
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="w-48 h-48 mb-6">
                      <canvas id="donutChart" />
                    </div>
                    <div className="w-full space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-indigo-600" />
                          <span className="text-sm text-gray-700">
                            Advertisement
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          29
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-indigo-400" />
                          <span className="text-sm text-gray-700">
                            Trade Show
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          29
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-indigo-200" />
                          <span className="text-sm text-gray-700">
                            Partners
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          16
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
