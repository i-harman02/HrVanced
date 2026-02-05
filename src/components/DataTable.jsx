import React from "react";
import { GoEye } from "react-icons/go";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import SearchFilter from "./Search";

const DataTable = ({
  title,
  headers,
  data,
  searchValue,
  onSearchChange,
  renderRow,
  highlightBorder = false,
}) => {
  return (
    <div
      className="bg-white rounded-xl p-6 border border-gray-200"
    >
      {/* Header with Search and Sort */}
      <div className="flex items-center gap-3 flex-wrap justify-between mb-6">
        <h3 className="text-base font-medium text-black">{title}</h3>

        <SearchFilter />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-150">
          <thead>
            <tr className="border-b border-gray-200">
              {headers.map((header) => (
                <th
                  key={header}
                  className="pb-4 pe-3 text-left text-sm font-bold text-heading"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item) => renderRow(item))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="py-3 pe-3 text-sm text-textgray"
                >
                  -
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Reusable Actions Component
export const TableActions = ({ onView, onEdit, onDelete }) => (
  <div className="flex items-center gap-3">
    <button
      onClick={onView}
      className="cursor-pointer text-textgray hover:text-primary transition-colors"
    >
      <GoEye size={16} />
    </button>
    <button
      onClick={onEdit}
      className="cursor-pointer text-textgray hover:text-primary transition-colors"
    >
      <LuPencilLine size={16} />
    </button>
    <button
      onClick={onDelete}
      className="cursor-pointer text-textgray hover:text-red-600 transition-colors"
    >
      <RiDeleteBin6Line size={16} />
    </button>
  </div>
);

// Reusable Status Badge Component
export const StatusBadge = ({ status }) => (
  <span
    className={`inline-block px-2 py-1 text-xs font-medium leading-none border-[0.5px] rounded ${
      status === "Active"
        ? "text-[#75B51D] bg-[#75B51D0D] border-[#75B51D]"
        : "text-gray-700 bg-gray-100 border-gray-300"
    }`}
  >
    {status}
  </span>
);

export default DataTable;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   