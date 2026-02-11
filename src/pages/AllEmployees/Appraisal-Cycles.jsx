import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../slices/employeeSlice";
import Pagination from "../../components/Pagination";
import { FiEye, FiSearch } from "react-icons/fi";
import dayjs from "dayjs";

const AppraisalCycles = () => {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employee);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const calculateAppraisal = (joiningDate, designation) => {
    if (!joiningDate) return { next: "-", period: "-" };
    
    const join = dayjs(joiningDate);
    const today = dayjs();
    const isIntern = designation?.toLowerCase().includes("intern");
    
    let nextDate;
    if (isIntern) {
      // 1st after 6 months, then every 1 year
      const firstAppraisal = join.add(6, 'month');
      if (today.isBefore(firstAppraisal)) {
        nextDate = firstAppraisal;
      } else {
        // Find the next yearly anniversary after the 6-month mark
        let years = 0;
        nextDate = firstAppraisal.add(years, 'year');
        while (nextDate.isBefore(today)) {
          years++;
          nextDate = firstAppraisal.add(years, 'year');
        }
      }
    } else {
      // Every 1 year
      let years = 1;
      nextDate = join.add(years, 'year');
      while (nextDate.isBefore(today)) {
        years++;
        nextDate = join.add(years, 'year');
      }
    }

    return {
      next: nextDate.format("MMM DD, YYYY"),
      period: `${nextDate.subtract(1, 'year').format("YYYY")} - ${nextDate.format("YYYY")}`,
      type: isIntern ? "Internship Review" : "Annual Appraisal"
    };
  };

  // Combined Filtering and Appraisal Logic
  const viewableAppraisals = employees?.map(emp => {
    const appraisal = calculateAppraisal(emp.dateOfJoining, emp.designation);
    return { ...emp, appraisal };
  }).filter(emp => {
    // 1. Must have a valid next date
    if (!emp.appraisal.next || emp.appraisal.next === "-") return false;
    
    // 2. Check if within 3 months (90 days)
    const nextDate = dayjs(emp.appraisal.next, "MMM DD, YYYY");
    const today = dayjs();
    const diffInMonths = nextDate.diff(today, 'month', true);
    
    return diffInMonths >= 0 && diffInMonths <= 3;
  }) || [];

  const filteredEmployees = viewableAppraisals.filter(emp => {
    const searchLow = searchTerm.toLowerCase();
    const fullName = `${emp.name || ""} ${emp.lastName || ""}`.toLowerCase();
    return fullName.includes(searchLow) || (emp.designation || "").toLowerCase().includes(searchLow);
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white border-0 lg:border border-gray-200 lg:rounded-xl min-h-full flex flex-col">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-heading">Appraisal Cycles</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search employee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#2C3EA1] outline-none w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-bordergray rounded-lg overflow-x-auto mb-6">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-bordergray bg-gray-50/50">
              <th className="p-4 text-left text-sm font-bold text-heading">Cycle Name</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Review Period</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Employees Name</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Designation</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Next Appraisal</th>
              <th className="p-4 text-left text-sm font-bold text-heading">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">Loading appraisals...</td>
              </tr>
            ) : filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">No appraisal cycles found</td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => {
                const appraisal = emp.appraisal;
                return (
                  <tr key={emp._id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="p-4 text-sm text-heading font-medium">
                      {appraisal.type}
                    </td>
                    <td className="p-4 text-sm text-textgray">
                      {appraisal.period}
                    </td>
                    <td className="p-4 text-sm text-heading font-medium">
                      {emp.name} {emp.lastName}
                    </td>
                    <td className="p-4 text-sm text-textgray">
                      {emp.designation || "-"}
                    </td>
                    <td className="p-4 text-sm text-textgray">
                      {appraisal.next}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        emp.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {emp.status || "Active"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-auto">
        <Pagination />
      </div>
    </div>
  );
};

export default AppraisalCycles;
