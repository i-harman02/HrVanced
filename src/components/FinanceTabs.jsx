import React, { useState } from "react";
import IndFlag from "../assets/ind-flag.png";
import PayImg from "../assets/my-pay-img.png";

const FinanceTabs = () => {
  const [activeTab, setActiveTab] = useState("summary");
  return (
    <>
      <div className="flex items-center gap-8 border-b border-bordergray whitespace-nowrap overflow-auto mb-8">
        <button
          onClick={() => setActiveTab("summary")}
          className={`text-sm font-medium pb-5 border-b-2 cursor-pointer ${
            activeTab === "summary"
              ? "color-primary border-[#2C3EA1]"
              : "text-heading border-transparent"
          }`}
        >
          Summary
        </button>
        <button
          onClick={() => setActiveTab("myPay")}
          className={`text-sm font-medium pb-5 border-b-2 cursor-pointer ${
            activeTab === "myPay"
              ? "color-primary border-[#2C3EA1]"
              : "text-heading border-transparent"
          }`}
        >
          My Pay
        </button>
      </div>

      {activeTab === "summary" && (
        <div className="flex flex-col gap-8">
          <div className="bg-white border border-bordergray rounded-lg px-6 pt-6 pb-3.5 overflow-x-auto">
            <h3 className="text-base text-heading font-medium mb-6">
              Identity Information
            </h3>
            <table className="w-full min-w-250">
              <thead>
                <tr className="border-b border-bordergray">
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    Identity
                  </th>
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    Pan Number
                  </th>
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    Pan Name
                  </th>
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    Father Name
                  </th>
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    Address Proof
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="py-3 text-sm text-textgray leading-none">
                    <div className="flex items-center gap-2.5">
                      <img
                        className="w-7.5 h-7.5 rounded-md object-cover"
                        src={IndFlag}
                        alt="Flag"
                      />
                      <span>PAN Card</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-textgray leading-none">
                    FJLPA7867G
                  </td>
                  <td className="py-3 text-sm text-textgray leading-none">-</td>
                  <td className="py-3 text-sm text-textgray leading-none">-</td>
                  <td className="py-3 text-sm text-textgray leading-none">-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white border border-bordergray rounded-lg px-6 pt-6 pb-3.5 overflow-x-auto">
            <h3 className="text-base text-heading font-medium mb-6">
              Payment Information
            </h3>
            <table className="w-full min-w-250">
              <thead>
                <tr className="border-b border-bordergray">
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    Salary payment mode
                  </th>
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    Bank
                  </th>
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    Account Number
                  </th>
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    IFSC CODE
                  </th>
                  <th className="pb-4 text-left text-sm font-bold text-heading">
                    Name of the Account
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="py-3 text-sm text-textgray leading-none">
                    Bank Server
                  </td>
                  <td className="py-3 text-sm text-textgray leading-none">
                    HDFC
                  </td>
                  <td className="py-3 text-sm text-textgray leading-none">-</td>
                  <td className="py-3 text-sm text-textgray leading-none">-</td>
                  <td className="py-3 text-sm text-textgray leading-none">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "myPay" && (
        <div className="bg-white border border-bordergray rounded-lg p-6 flex flex-wrap gap-4 justify-between max-w-173">
          <div className="flex-1">
            <h3 className="text-base text-heading font-medium mb-5.5">
              Current Monthly Salary
            </h3>
            <p className="text-sm text-heading font-medium mb-2.5">
              INR :
            </p>
            <div className="p-3 border border-bordergray rounded-sm h-9 max-w-83"></div>
          </div>
          <img src={PayImg} className="w-40.5" alt="Payment Image" />
        </div>
      )}
    </>
  );
};

export default FinanceTabs;
