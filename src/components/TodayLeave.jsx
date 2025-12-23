import React from 'react'
import Holiday from "../assets/Rectangle 56.png";
import Leave from "../assets/Group 3477.png";
import Leave1 from "../assets/Group 3478.png";

const TodayLeave = () => {
  return (
    <div>      <div className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col">
                <h3 className="text-base font-semibold text-gray-800 mb-6">
                  On Leave Today
                </h3>
                <div className="flex gap-2 items-center mb-5">
                  <div>
                    <img src={Leave} alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1 ">Meenu Thakur</p>
                    <p className="text-[12px] text-gray-500">
                      On Full Day Leave
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div>
                    <img src={Leave1} alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1 ">Anamika</p>
                    <p className="text-[12px] text-gray-500">
                      On Full Day Leave
                    </p>
                  </div>
                </div>
              </div></div>
  )
}

export default TodayLeave