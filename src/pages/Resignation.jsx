import React from "react";
import Pagination from "../components/Pagination";
import { useState } from "react";
import ResignationModal from "../components/AddResignationModal";


const Resignation = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl min-h-full flex flex-col">
        <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-heading leading-tight">
            Resignation
          </h1>
          <button
            type="button" onClick={() => setOpen(true)}
            className="bg-primary text-white text-sm font-medium cursor-pointer p-3 rounded-sm leading-[0.86]"
          >
            Add Resignation
          </button>
          {open && <ResignationModal onClose={() => setOpen(false)} />}
        </div>

        <div className="bg-white border border-bordergray rounded-lg px-6 pt-6 pb-3.5 mb-8 overflow-x-auto flex-1 relative">
          <table className="w-full min-w-250">
            <thead>
              <tr className="border-b border-bordergray">
                <th className="pb-4 text-left text-sm font-bold text-heading">
                  Employee Name
                </th>
                <th className="pb-4 text-left text-sm font-bold text-heading">
                  Department
                </th>
                <th className="pb-4 text-left text-sm font-bold text-heading">
                  Reason
                </th>
                <th className="pb-4 text-left text-sm font-bold text-heading">
                  Resigned Date
                </th>
                <th className="pb-4 text-left text-sm font-bold text-heading">
                  Status
                </th>
                <th className="pb-4 text-left text-sm font-bold text-heading">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            </tbody>
          </table>
          <p className="text-sm text-heading font-bold absolute top-[calc(50%+36px)] left-1/2 -translate-x-1/2 -translate-y-1/2">No Row</p>
        </div>

        <Pagination/>
      </div>
    </>
  );
};

export default Resignation;
