import React from 'react';
import Pagination from '../../components/Pagination';

const ProjectAssigned = () => {
  return (
    <>
        <div className="bg-white border border-bordergray rounded-lg px-6 pt-6 pb-3.5 overflow-x-auto mb-8">
          <table className="w-full min-w-250">
            <thead>
              <tr className="border-b border-bordergray">
                <th className="pb-4 text-left text-sm font-bold text-heading min-w-27.5">
                  Project Name
                </th>
                <th className="pb-4 text-left text-sm font-bold text-heading min-w-27.5">
                  Start Date
                </th>
                <th className="pb-4 text-left text-sm font-bold text-heading min-w-27.5">
                  End Date
                </th>
                <th className="pb-4 text-left text-sm font-bold text-heading min-w-27.5">
                  Team Members
                </th>
                <th className="pb-4 text-left text-sm font-bold text-heading min-w-37.5">
                  Progress
                </th>
                <th class="pb-4 text-left text-sm font-bold text-heading">
                  Links
                </th>
                <th className="pb-4 text-left text-sm font-bold text-heading">
                  Reason{" "}
                  <span className="font-normal">(if project going late)</span>
                </th>
                <th className="pb-4 text-left text-sm font-bold text-heading">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="py-3 text-sm text-textgray leading-none">
                  Trimax
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  Jan 01, 2023
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  Jan 01, 2025
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=3"
                      alt="Team Member"
                    />
                    <img
                      className="w-7.5 h-7.5 rounded-md -ms-2.5"
                      src="https://i.pravatar.cc/40?img=14"
                      alt="Team Member"
                    />
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none pe-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 h-2 rounded-lg relative flex-1">
                      <div className="bg-[#75B51D] h-full rounded-lg absolute left-0 top-0 w-4/5"></div>
                    </div>
                    <span>80%</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <a
                    className="text-[#65C9FF] block max-w-27.5 truncate"
                    href="https://app.nineyard.com/shipyard/create-shipments"
                    target="_blank"
                  >
                    https://app.nineyard.com/shipyard/create-shipments
                  </a>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">-</td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <span className="inline-block text-xs text-[#75B51D] border-[0.5px] border-[#75B51D] rounded-sm py-0.75 px-2 leading-none bg-[#75B51D]/5">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 text-sm text-textgray leading-none">
                  Hatzalah
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  Jan 01, 2023
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  Jan 01, 2025
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/40?img=12"
                      alt="Team Member"
                    />
                    <img
                      className="w-7.5 h-7.5 rounded-md -ms-2.5"
                      src="https://i.pravatar.cc/40?img=13"
                      alt="Team Member"
                    />
                    <img
                      className="w-7.5 h-7.5 rounded-md -ms-2.5"
                      src="https://i.pravatar.cc/40?img=14"
                      alt="Team Member"
                    />
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none pe-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 h-2 rounded-lg relative flex-1">
                      <div className="bg-[#FBA300] h-full rounded-lg absolute left-0 top-0 w-1/2"></div>
                    </div>
                    <span>50%</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <a
                    className="text-[#65C9FF] block max-w-27.5 truncate"
                    href="https://app.nineyard.com/shipyard/create-shipments"
                    target="_blank"
                  >
                    https://app.nineyard.com/shipyard/create-shipments
                  </a>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                    <p className="max-w-27.5 truncate">Lorem ipsum dolor sit amet,</p>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <span className="inline-block text-xs text-[#FBA300] border-[0.5px] border-[#FBA300] rounded-sm py-0.75 px-2 leading-none bg-[#B5801D]/5">
                    Pending
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 text-sm text-textgray leading-none">
                  Nineyard
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  Jan 01, 2023
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  Jan 01, 2025
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <div className="flex">
                    <img
                      className="w-7.5 h-7.5 rounded-md"
                      src="https://i.pravatar.cc/150?img=3"
                      alt="Team Member"
                    />
                    <img
                      className="w-7.5 h-7.5 rounded-md -ms-2.5"
                      src="https://i.pravatar.cc/40?img=12"
                      alt="Team Member"
                    />
                    <img
                      className="w-7.5 h-7.5 rounded-md -ms-2.5"
                      src="https://i.pravatar.cc/40?img=13"
                      alt="Team Member"
                    />
                    <img
                      className="w-7.5 h-7.5 rounded-md -ms-2.5"
                      src="https://i.pravatar.cc/40?img=14"
                      alt="Team Member"
                    />
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none pe-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 h-2 rounded-lg relative flex-1">
                      <div className="bg-[#75B51D] h-full rounded-lg absolute left-0 top-0 w-4/5"></div>
                    </div>
                    <span>80%</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <a
                    className="text-[#65C9FF] block max-w-27.5 truncate"
                    href="https://app.nineyard.com/shipyard/create-shipments"
                    target="_blank"
                  >
                    https://app.nineyard.com/shipyard/create-shipments
                  </a>
                </td>
                <td className="py-3 text-sm text-textgray leading-none">-</td>
                <td className="py-3 text-sm text-textgray leading-none">
                  <span className="inline-block text-xs text-[#75B51D] border-[0.5px] border-[#75B51D] rounded-sm py-0.75 px-2 leading-none bg-[#75B51D]/5">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Pagination/>
    </>
  )
}

export default ProjectAssigned;