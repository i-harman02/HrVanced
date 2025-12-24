import React from 'react'
import Holiday from "../assets/Rectangle 56.png";
const Upcomingholidays = () => {
  return (
    <div>            <div className="rounded-xl border border-gray-200 p-4 md:p-6 ">
                      <div className="flex justify-between items-start mb-10">
                        <span className="text-base leading-none font-medium">
                          Upcoming Holidays
                        </span>
                        <span className="text-sm leading-none text-gray-500">
                          View All
                        </span>
                      </div>
    
                      <div className="flex gap-2 items-center">
                        <div>
                          <img src={Holiday} alt="" />
                        </div>
                        <div>
                          <p className="text-sm font-medium ">Christmas</p>
                          <p className="text-[12px] text-gray-500">Dec 25, 2025</p>
                        </div>
                      </div>
                    </div></div>
  )
}

export default Upcomingholidays