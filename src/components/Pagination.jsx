import React from "react";

const Pagination = () => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mt-auto">
        <p className="text-sm text-heading font-medium">
          Showing 1 to 05 of 20 results
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            className="bg-gray-50 text-textgray text-sm font-medium cursor-pointer px-3 py-2.5 border border-bordergray rounded-sm leading-none"
          >
            Previous
          </button>
          <button
            type="button"
            className="bg-gray-50 text-textgray text-sm font-medium cursor-pointer px-3 py-2.5 border border-bordergray rounded-sm leading-none"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
