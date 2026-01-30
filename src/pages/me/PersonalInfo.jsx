import React from "react";
import { useSelector } from "react-redux";

import FormRenderer from "../../components/form/FormRenderer";
import { formSections } from "../../configs/employeeForms/formSections";
import Button from "../../components/form/Button";

const PersonalInfo = () => {
  const { employees, loading } = useSelector((state) => state.employee);

  // for now: first employee
  const employee = employees?.[5];

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>No employee data</p>;

  const personal = employee.personalInformation || {};

  // 🔁 MongoDB → UI field mapping
  const formData = {
    phone: personal.telephones?.[0] || "",
    nationality: personal.nationality || "",
    maritalStatus: personal.maritalStatus || "",
    bloodGroup: personal.bloodGroup || "",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="mb-8 md:mb-0">
        <h2 className="text-base text-heading font-bold leading-tight mb-3.5">
          Personal Information
        </h2>
        <p className="text-sm text-textgray leading-tight sm:max-w-56.25">
          Use a permanent Phone Number where you can receive Call.
        </p>
      </div>

      <div>
        <FormRenderer
          fields={formSections.personalInfo}
          formData={formData}
          readOnly={true}   
        />
        <Button /> {/* can hide later if needed */}
      </div>
    </div>
  );
};

export default PersonalInfo;
