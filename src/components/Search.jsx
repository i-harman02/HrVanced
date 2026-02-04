import React from "react";
import { IoSearch } from "react-icons/io5";
import { PiSortDescending } from "react-icons/pi";

const SearchFilter = ({ searchTerm, onSearchChange, sortValue, onSortChange }) => {
  return (
    <>
      <div className="flex items-center border border-bordergray rounded-sm max-w-96.25 bg-white">
        <div className="relative border-r border-bordergray flex-1">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-base text-[#364153]/50">
            <IoSearch />
          </span>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full text-sm text-textheading font-medium leading-none placeholder-[#364153]/50 outline-none bg-transparent py-2.5 ps-8 pe-3"
          />
        </div>
        <div className="relative">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-base text-[#364153]/50 pointer-events-none">
            <PiSortDescending />
          </span>
          <select
            name="searchFilter"
            id="searchFilter"
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm text-heading font-medium py-2.5 ps-8 pe-7 leading-[1.2] appearance-none outline-none bg-transparent cursor-pointer"
          >
            <option value="name">Sort By Name</option>
            <option value="date">Sort By Date</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
