import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { PiSortDescending } from "react-icons/pi";
import { RiShareForwardFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

const Mail = () => {
  const [activeTab, setActiveTab] = useState("all");
  return (
    <div>
      <div className="bg-white p-8 border border-bordergray rounded-xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-heading leading-tight">
            Inbox
          </h1>
        </div>

        <div className="flex items-center gap-8 border-t-1 border-b-1 border-bordergray -mx-8 px-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`text-sm font-medium py-5 border-b-2 flex items-center gap-2 ${
              activeTab === "all"
                ? "color-primary border-[#2C3EA1]"
                : "text-heading border-transparent"
            }`}
          >
            All Mails
            <span
              className={`bg-[#4F39F6]/8 w-5 h-5 rounded-sm flex items-center justify-center text-xs font-medium ${
                activeTab === "all" ? "bg-[#4F39F6]/8" : "bg-gray-200"
              }`}
            >
              4
            </span>
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`text-sm font-medium py-5 flex items-center gap-2 border-b-2 ${
              activeTab === "unread"
                ? "color-primary border-[#2C3EA1]"
                : "text-heading border-transparent"
            }`}
          >
            Unread
            <span
              className={`bg-[#4F39F6]/8 w-5 h-5 rounded-sm flex items-center justify-center text-xs font-medium ${
                activeTab === "unread" ? "bg-[#4F39F6]/8" : "bg-gray-200"
              }`}
            >
              3
            </span>
          </button>
          <button
            onClick={() => setActiveTab("starred")}
            className={`text-sm font-medium py-5 flex items-center gap-2 border-b-2 ${
              activeTab === "starred"
                ? "color-primary border-[#2C3EA1]"
                : "text-heading border-transparent"
            }`}
          >
            Starred
            <span
              className={`bg-[#4F39F6]/8 w-5 h-5 rounded-sm flex items-center justify-center text-xs font-medium ${
                activeTab === "starred" ? "bg-[#4F39F6]/8" : "bg-gray-200"
              }`}
            >
              4
            </span>
          </button>
          <button
            onClick={() => setActiveTab("replied")}
            className={`text-sm font-medium py-5 flex items-center gap-2 border-b-2 ${
              activeTab === "replied"
                ? "color-primary border-[#2C3EA1]"
                : "text-heading border-transparent"
            }`}
          >
            Replied
            <span
              className={`bg-[#4F39F6]/8 w-5 h-5 rounded-sm flex items-center justify-center text-xs font-medium ${
                activeTab === "replied" ? "bg-[#4F39F6]/8" : "bg-gray-200"
              }`}
            >
              1
            </span>
          </button>
        </div>

        <div className="pt-8">
          <div className="flex gap-3 mb-8">
            <div className="flex items-center border border-bordergray rounded-sm max-w-96.25">
              <div className="relative border-r border-bordergray flex-1">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-base text-[#364153]/50">
                  <IoSearch />
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
            <button
              type="button"
              className="bg-primary text-white text-sm font-medium cursor-pointer px-5 py-3 rounded-sm leading-[0.86]"
            >
              Compose
            </button>
          </div>

          {activeTab === "all" && (
            <div className="grid grid-cols-[1fr_2fr] items-start gap-8">
              <div className="flex flex-col gap-4">
                <div className="p-6 border border-bordergray rounded-xl flex items-start gap-4">
                  <div>
                    <button className="text-[#ED8A19]">
                      <FaStar />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-heading text-sm font-bold mb-3">
                      Aastha
                    </h3>
                    <p className="text-textgray text-sm mb-5 leading-tight">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore m...
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-textgray">Dec 1, 2025</span>
                      <span className="text-xs color-primary bg-[#4F39F6]/5 leading-none border-[0.5px] rounded-sm border-[#2C3EA1] py-0.75 px-2">
                        New
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6 border border-bordergray rounded-xl flex items-start gap-4">
                  <div>
                    <button className="text-[#ED8A19]">
                      <FaStar />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-heading text-sm font-bold mb-3">
                      Spam
                    </h3>
                    <p className="text-textgray text-sm mb-5 leading-tight">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore m...
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-textgray">Dec 1, 2025</span>
                      <span className="text-xs color-primary bg-[#4F39F6]/5 leading-none border-[0.5px] rounded-sm border-[#2C3EA1] py-0.75 px-2">
                        New
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6 border border-bordergray rounded-xl flex items-start gap-4">
                  <div>
                    <button className="text-[#ED8A19]">
                      <FaStar />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-heading text-sm font-bold mb-3">
                      John Martinez
                    </h3>
                    <p className="text-textgray text-sm mb-5 leading-tight">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore m...
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-textgray">Dec 1, 2025</span>
                      <span className="text-xs text-[#75B51D] bg-[#75B51D]/5 leading-none border-[0.5px] rounded-sm border-[#75B51D] py-0.75 px-2">
                        Replied
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6 border border-bordergray rounded-xl flex items-start gap-4">
                  <div>
                    <button className="text-[#ED8A19]">
                      <FaStar />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-heading text-sm font-bold mb-3">
                      Anna Park
                    </h3>
                    <p className="text-textgray text-sm mb-5 leading-tight">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore m...
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-textgray">Dec 1, 2025</span>
                      <span className="text-xs color-primary bg-[#4F39F6]/5 leading-none border-[0.5px] rounded-sm border-[#2C3EA1] py-0.75 px-2">
                        New
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-bordergray rounded-xl px-8 pt-8 pb-6">
                <div className="flex justify-between items-center pb-8 border-b border-bordergray">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://i.pravatar.cc/150?img=43"
                      alt="User"
                      className="rounded-lg w-15 h-15"
                    />
                    <div>
                      <h2 className="text-xl text-heading font-bold leading-none mb-2.5">
                        Aastha
                      </h2>
                      <p className="text-sm text-textgray leading-tight">
                        <a href="#">Aastha@example.com</a>, (222) 455 - 2404,
                        Miami, FL
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-textgray leading-none">
                    12/2/2025, 10:30:00 AM
                  </p>
                </div>
                <div className="py-8 border-b border-bordergray">
                  <p className="text-2xl text-heading font-bold leading-tight mb-6.5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  </p>
                  <div className="text-base text-textgray leading-snug">
                    <p>Hi,</p>
                    <br />
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <br />
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                    <br />
                    <p>Looking forward to hearing from you.</p>
                    <br />
                    <p>Best regards,</p>
                    <p>John Smith</p>
                  </div>
                </div>
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    className="bg-primary text-white text-sm font-medium cursor-pointer px-4.5 py-2.25 border border-borderprimary rounded-sm leading-none flex items-center gap-1.5"
                  >
                    <svg
                      width="19"
                      height="16"
                      viewBox="0 0 19 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_84_6094)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.6378 8.17195C17.1243 7.6687 16.4958 7.29137 15.804 7.07089V1.35747C15.804 0.997444 15.6573 0.652167 15.3964 0.397593C15.1354 0.143018 14.7814 0 14.4124 0L1.3916 0C1.02253 0 0.668567 0.143018 0.407591 0.397593C0.146615 0.652167 0 0.997444 0 1.35747L0 11.3831C0.00155304 11.7422 0.148887 12.086 0.409749 12.3394L0.453044 12.3786C0.708672 12.609 1.04354 12.7376 1.3916 12.7391H3.09245V15.4404C3.09245 15.5886 3.15267 15.7307 3.25992 15.8356C3.36716 15.9405 3.51268 15.9996 3.66455 16C3.74572 15.9996 3.82591 15.9826 3.89994 15.9501C3.97397 15.9177 4.04021 15.8704 4.0944 15.8115L7.3724 12.7391H9.91284C10.14 13.4352 10.5338 14.0686 11.0617 14.5867C11.9337 15.4374 13.1165 15.9153 14.3497 15.9153C15.583 15.9153 16.7657 15.4374 17.6378 14.5867C18.5098 13.7361 18.9997 12.5823 18.9997 11.3793C18.9997 10.1763 18.5098 9.0226 17.6378 8.17195ZM14.6582 6.85219C14.0022 6.81033 13.3446 6.9046 12.7287 7.12878C12.1128 7.35296 11.5526 7.70196 11.085 8.15275C10.6175 8.60355 10.2532 9.14591 10.0163 9.74407C9.77929 10.3422 9.67501 10.9826 9.71029 11.6229H7.1451C6.99814 11.6214 6.85629 11.6755 6.74927 11.7738L4.23202 14.1327V12.1719C4.23161 12.0238 4.17099 11.8819 4.06345 11.7772C3.95592 11.6726 3.81024 11.6139 3.65837 11.6139H1.3916C1.33531 11.613 1.28091 11.5939 1.23698 11.5596L1.22152 11.5445C1.17556 11.5002 1.14944 11.4401 1.14884 11.3771V1.35747C1.15074 1.29496 1.17683 1.23548 1.22187 1.19099C1.26691 1.14649 1.32756 1.12029 1.3916 1.11765H14.4154C14.4802 1.11879 14.5419 1.1448 14.5871 1.19005C14.6097 1.21198 14.6276 1.23807 14.6398 1.26681C14.652 1.29555 14.6583 1.32636 14.6582 1.35747V6.85219ZM3.93205 5.02413C3.85431 5.02807 3.77657 5.01654 3.70355 4.99024C3.63053 4.96393 3.56376 4.92341 3.50731 4.87113C3.45086 4.81885 3.40591 4.75591 3.37519 4.68614C3.34447 4.61638 3.32863 4.54124 3.32863 4.46531C3.32863 4.38938 3.34447 4.31424 3.37519 4.24448C3.40591 4.17471 3.45086 4.11177 3.50731 4.05949C3.56376 4.00721 3.63053 3.96669 3.70355 3.94038C3.77657 3.91408 3.85431 3.90254 3.93205 3.90649H11.8735C11.9512 3.90254 12.0289 3.91408 12.102 3.94038C12.175 3.96669 12.2417 4.00721 12.2982 4.05949C12.3546 4.11177 12.3996 4.17471 12.4303 4.24448C12.461 4.31424 12.4769 4.38938 12.4769 4.46531C12.4769 4.54124 12.461 4.61638 12.4303 4.68614C12.3996 4.75591 12.3546 4.81885 12.2982 4.87113C12.2417 4.92341 12.175 4.96393 12.102 4.99024C12.0289 5.01654 11.9512 5.02807 11.8735 5.02413H3.93205ZM3.93205 8.33183C3.85431 8.33577 3.77657 8.32423 3.70355 8.29793C3.63053 8.27162 3.56376 8.2311 3.50731 8.17882C3.45086 8.12654 3.40591 8.0636 3.37519 7.99383C3.34447 7.92407 3.32863 7.84893 3.32863 7.773C3.32863 7.69707 3.34447 7.62193 3.37519 7.55217C3.40591 7.4824 3.45086 7.41946 3.50731 7.36718C3.56376 7.3149 3.63053 7.27438 3.70355 7.24807C3.77657 7.22177 3.85431 7.21024 3.93205 7.21418H9.24951C9.3963 7.22162 9.53456 7.28374 9.63576 7.38772C9.73697 7.49171 9.79339 7.62962 9.79339 7.773C9.79339 7.91638 9.73697 8.05429 9.63576 8.15828C9.53456 8.26226 9.3963 8.32438 9.24951 8.33183H3.93205ZM11.609 10.8311L13.7923 12.9819V11.9155C15.1715 11.635 16.2663 11.9442 17.092 12.9713C16.9482 10.8597 15.4715 9.84917 13.7923 9.7813V8.67873L11.609 10.8311Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_84_6094">
                          <rect width="19" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Reply
                  </button>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="bg-transparent text-textgray text-sm font-medium cursor-pointer px-3 py-2.25 border border-bordergray rounded-sm leading-none flex items-center justify-center gap-1.5"
                    >
                      <RiShareForwardFill />
                      Forward
                    </button>
                    <button
                      type="button"
                      className="bg-transparent text-textgray text-sm font-medium cursor-pointer p-2.5 border border-bordergray rounded-sm leading-none flex items-center justify-center"
                    >
                      <BsThreeDotsVertical />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "unread" && (
            <p className="text-sm text-textgray">Unread mails content</p>
          )}

          {activeTab === "starred" && (
            <p className="text-sm text-textgray">Starred mails</p>
          )}

          {activeTab === "replied" && (
            <p className="text-sm text-textgray">Replied mails</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mail;
