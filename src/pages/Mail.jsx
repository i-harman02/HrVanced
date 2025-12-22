import React from "react";
import { FaStar } from "react-icons/fa6";

const Mail = () => {
  return (
    <div>
      <div className="bg-white p-8 border border-bordergray rounded-xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-heading leading-tight">
            Inbox
          </h1>
        </div>

        <div className="flex items-center gap-8 border-t-1 border-b-1 border-bordergray -mx-8 px-8">
          <p
            data-tab="all-mails"
            className="tab text-sm color-primary font-medium cursor-pointer py-5 border-b-2 border-[#2C3EA1] flex items-center gap-2"
          >
            All Mails <span className="bg-[#4F39F6]/8 w-5 h-5 rounded-sm flex items-center justify-center text-xs font-medium">4</span>
          </p>
          <p
            data-tab="unread"
            className="tab text-sm text-heading font-medium cursor-pointer py-5 flex items-center gap-2"
          >
            Unread <span className="bg-gray-200 w-5 h-5 rounded-sm flex items-center justify-center text-xs text-textgray font-medium">3</span>
          </p>
          <p
            data-tab="starred"
            className="tab text-sm text-heading font-medium cursor-pointer py-5 flex items-center gap-2"
          >
            Starred <span className="bg-gray-200 w-5 h-5 rounded-sm flex items-center justify-center text-xs text-textgray font-medium">4</span>
          </p>
          <p
            data-tab="replied"
            className="tab text-sm text-heading font-medium cursor-pointer py-5 flex items-center gap-2"
          >
            Replied <span className="bg-gray-200 w-5 h-5 rounded-sm flex items-center justify-center text-xs text-textgray font-medium">1</span>
          </p>
        </div>

        <div className="pt-8">
          <div className="flex gap-3 mb-8">
            <div className="flex items-center border border-bordergray rounded-sm max-w-96.25">
            <div className="relative border-r border-bordergray flex-1">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-[#364153]/50">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.3756 6.68667C12.3756 7.94156 11.9681 9.10077 11.2818 10.0413L14.7436 13.5052C15.0855 13.8469 15.0855 14.4019 14.7436 14.7437C14.4018 15.0854 13.8467 15.0854 13.5049 14.7437L10.043 11.2797C9.10235 11.9687 7.94292 12.3733 6.68778 12.3733C3.54583 12.3733 1 9.828 1 6.68667C1 3.54533 3.54583 1 6.68778 1C9.82973 1 12.3756 3.54533 12.3756 6.68667ZM6.68778 10.6236C7.20488 10.6236 7.71692 10.5218 8.19467 10.3239C8.67241 10.1261 9.1065 9.83607 9.47215 9.47049C9.8378 9.10491 10.1278 8.67091 10.3257 8.19326C10.5236 7.71561 10.6255 7.20367 10.6255 6.68667C10.6255 6.16966 10.5236 5.65772 10.3257 5.18007C10.1278 4.70242 9.8378 4.26842 9.47215 3.90284C9.1065 3.53726 8.67241 3.24727 8.19467 3.04942C7.71692 2.85158 7.20488 2.74974 6.68778 2.74974C6.17067 2.74974 5.65863 2.85158 5.18089 3.04942C4.70315 3.24727 4.26906 3.53726 3.90341 3.90284C3.53776 4.26842 3.24771 4.70242 3.04982 5.18007C2.85194 5.65772 2.75009 6.16966 2.75009 6.68667C2.75009 7.20367 2.85194 7.71561 3.04982 8.19326C3.24771 8.67091 3.53776 9.10491 3.90341 9.47049C4.26906 9.83607 4.70315 10.1261 5.18089 10.3239C5.65863 10.5218 6.17067 10.6236 6.68778 10.6236Z"
                    fill="#364153"
                    fill-opacity="0.5"
                  />
                </svg>
              </span>
              <input
                type="search"
                name="searchLead"
                id="searchLead"
                placeholder="Search Lead"
                className="w-full text-sm text-textheading font-medium leading-none placeholder-[#364153]/50 outline-none bg-transparent py-2.5 ps-8 pe-3"
              />
            </div>
            <div className="relative">

    
<span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-[#364153]/50">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.00012 13H11.0001M1.00012 8.83333H8.50012M1.00012 4.66667H6.00012M12.6668 9.66667V3M12.6668 3L15.1668 5.5M12.6668 3L10.1668 5.5"
                    stroke="#364153"
                    stroke-opacity="0.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
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
            <button
                type="button"
                className="bg-primary text-white text-sm font-medium cursor-pointer px-5 py-3 rounded-sm leading-[0.86]"
              >
                Compose
              </button>
          </div>
          
          <div data-content="products" className="tab-content">
            <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
              <div>
                <div className="p-6 border border-bordergray rounded-xl flex items-start gap-4">
                  <div>
                    <button className="text-[#ED8A19]">
                      <FaStar/>
                    </button>
                  </div>
                  <div>
                    <h3 className="text-heading text-sm font-bold mb-3">Aastha</h3>
                    <p className="text-textgray text-sm mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore m...</p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-textgray">Dec 1, 2025</span>
                      <span className="text-xs color-primary border-[0.5px] rounded-sm border-[#2C3EA1] py-1">New</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>

              </div>
            </div>
          </div>
          <div data-content="appointments" className="tab-content pt-8 hidden">
            <div class="flex justify-between items-center gap-3 mb-5">
              <h3 class="text-xl font-bold text-heading leading-none">
                Appointments
              </h3>
              <button
                type="button"
                class="bg-[#4F39F6] text-white text-sm font-medium cursor-pointer p-3 rounded-sm leading-[0.86]"
              >
                Schedule Appointments
              </button>
            </div>
            <div class="overflow-x-auto px-8 pt-8 border border-bordergray rounded-xl"></div>
          </div>
          <div data-content="back" className="tab-content pt-8 hidden">
            <div class="flex justify-between items-center gap-3 mb-8">
              <h3 class="text-xl font-bold text-heading leading-none">
                Back To List
              </h3>
            </div>
            <p class="text-sm text-textgray font-medium mb-5">
              Return to the full list of leads to view, filter, or manage other
              prospects.
            </p>
            <button
              type="button"
              class="bg-[#f3f3f3] border border-bordergray text-heading text-sm font-bold cursor-pointer p-3 rounded-sm leading-[0.72]"
            >
              <i class="fa-solid fa-arrow-left"></i> Back To lead list
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mail;