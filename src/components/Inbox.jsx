import React from 'react'
import GroupImg from "../assets/Group.png";
const Inbox = () => {
  return (
    <div>  <div className="border-r border rounded-xl border-gray-200 p-4 md:p-8  ">
                  <div className="flex justify-between items-start ">
                    <div>
                      <span className=" text-gray leading-none text-base font-medium">
                        Inbox
                      </span>
                      <h2 className="text-base font-bold text-heading mt-11 mb-3">
                        Good Job
                      </h2>
                      <p className="text-sm text-gray-500">
                        You have no pending actions.
                      </p>
                    </div>

                    <div>
                      <img src={GroupImg} alt="" />
                    </div>
                  </div>
                </div></div>
  )
}

export default Inbox