import React from "react";
import SearchFilter from "../components/Search";
import noProject from "../assets/no-projects-img.png";

const Projects = () => {
  return (
    <>
      <div className="bg-white p-8 border border-bordergray rounded-xl min-h-full">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-heading leading-tight">
            Projects
          </h1>
          <SearchFilter />
        </div>

        <div className="p-8 min-h-83.5 border border-bordergray rounded-xl flex flex-col justify-center items-center gap-10">
          <img className="w-33.25" src={noProject} alt="No Projects" />
          <p className="text-base text-heading font-bold">
            Projects have not been assigned yet.
          </p>
        </div>

        <div className="bg-white border border-bordergray rounded-lg px-6 pt-6 pb-3.5 overflow-x-auto">
            <table className="w-full min-w-250">
              <thead>
                <tr className="border-b border-bordergray">
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    Project Name
                  </th>
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    Start Date
                  </th>
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    End Date
                  </th>
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    Team Members
                  </th>
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    Progress
                  </th>
                  <th class="pb-4 text-left text-sm font-bold text-heading">
                    Links
                  </th>
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    Reason <span className="font-normal">(if project going late)</span>
                  </th>
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y border-bordergray">
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
                      <img className="w-7.5 h-7.5 rounded-md" src="https://i.pravatar.cc/150?img=3" alt="Team Member" />
                      <img className="w-7.5 h-7.5 rounded-md -ms-2.5" src="https://i.pravatar.cc/40?img=12" alt="Team Member" />
                      <img className="w-7.5 h-7.5 rounded-md -ms-2.5" src="https://i.pravatar.cc/40?img=13" alt="Team Member" />
                      <img className="w-7.5 h-7.5 rounded-md -ms-2.5" src="https://i.pravatar.cc/40?img=14" alt="Team Member" />
                    </div>
                  </td>
                  <td className="py-3 text-sm text-textgray leading-none">
                    (222) 455 - 2404
                  </td>
                  <td className="py-3 text-sm text-textgray leading-none">
                    <a className="text-[#65C9FF] block max-w-55 truncate" href="https://app.nineyard.com/shipyard/create-shipments" target="_blank">https://app.nineyard.com/shipyard/create-shipments</a>
                  </td>
                  <td className="py-3 text-sm text-textgray leading-none">
                    -
                  </td>
                  <td className="py-3 text-sm text-textgray leading-none">
                    <span className="inline-block text-xs text-[#75B51D] border-[0.5px] border-[#75B51D] rounded-sm py-0.75 px-2 leading-none bg-[#75B51D]/5">
                      Review
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  );
};

export default Projects;
