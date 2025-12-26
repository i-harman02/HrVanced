import React from 'react'
import Pagination from '../components/Pagination';

const Myteam = () => {
  return (
    <>
      <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl min-h-full flex flex-col">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-heading leading-tight">
            My Team
          </h1>
        </div>

        <div className="bg-white border border-bordergray rounded-lg px-6 pt-6 pb-3.5 overflow-x-auto mb-8">
          <table className="w-full min-w-250">
            <thead>
              <tr className="border-b border-bordergray">
                <th className="pb-4 text-left text-sm font-bold text-heading">
                  Employee Name
                </th>
                <th className="pb-4 text-left text-sm font-bold text-heading">
                  Mail
                </th>
                <th className="pb-4 text-left text-sm font-bold text-heading">
                  Mobile No.
                </th>
                <th className="pb-4 text-left text-sm font-bold text-heading">
                  Employee TL
                </th>
                <th className="pb-4 text-left text-sm font-bold text-heading">
                  Employee Manager
                </th>
                <th class="pb-4 text-left text-sm font-bold text-heading">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=44"
                      alt="Team Member"
                    />
                    <span>Anamika</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  anamika@gmail.com
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  7836373933
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=7"
                      alt="Team Member"
                    />
                    <span>Deepak Kumar</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=8"
                      alt="Team Member"
                    />
                    <span>Udyam Kumar</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">Jul 21, 2023</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=14"
                      alt="Team Member"
                    />
                    <span>Anit Thakur</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  anit@gmail.com
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  7836373933
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=7"
                      alt="Team Member"
                    />
                    <span>Deepak Kumar</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=8"
                      alt="Team Member"
                    />
                    <span>Udyam Kumar</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">Jul 21, 2023</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=12"
                      alt="Team Member"
                    />
                    <span>Harman Singh</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  harman@gmail.com
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  7836373933
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=7"
                      alt="Team Member"
                    />
                    <span>Deepak Kumar</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=8"
                      alt="Team Member"
                    />
                    <span>Udyam Kumar</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">Jul 21, 2023</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=56"
                      alt="Team Member"
                    />
                    <span>Rahul Kumar</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  rahul@gmail.com
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  7836373933
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=7"
                      alt="Team Member"
                    />
                    <span>Deepak Kumar</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=8"
                      alt="Team Member"
                    />
                    <span>Udyam Kumar</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">Jul 21, 2023</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=68"
                      alt="Team Member"
                    />
                    <span>Abhishek</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  abhishek@gmail.com
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  7836373933
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=7"
                      alt="Team Member"
                    />
                    <span>Deepak Kumar</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=8"
                      alt="Team Member"
                    />
                    <span>Udyam Kumar</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">Jul 21, 2023</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Pagination/>
      </div>
    </>
  )
}

export default Myteam
