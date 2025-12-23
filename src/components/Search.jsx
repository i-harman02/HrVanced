import React from "react";
import { IoSearch } from "react-icons/io5";
import { PiSortDescending } from "react-icons/pi";

const SearchFilter = () => {
  return (
    <>
      <div className="flex items-center border border-bordergray rounded-sm max-w-96.25">
        <div className="relative border-r border-bordergray flex-1">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-base text-[#364153]/50">
            <IoSearch />
          </span>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search"
            className="w-full text-sm text-textheading font-medium leading-none placeholder-[#364153]/50 outline-none bg-transparent py-2.5 ps-8 pe-3"
          />
        </div>
        <div className="relative">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-base text-[#364153]/50">
            <PiSortDescending />
          </span>
          <select
            name="searchFilter"
            id="searchFilter"
            className="text-sm text-heading font-medium py-2.5 ps-8 pe-3 leading-[1.2] appearance-none"
          >
            <option value="Sort by name">Sort By Name</option>
            <option value="Sort by date">Sort By Date</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
