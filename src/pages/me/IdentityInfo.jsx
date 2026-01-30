import React from "react";
import { useSelector } from "react-redux";

import FormRenderer from "../../components/form/FormRenderer";
import { formSections } from "../../configs/employeeForms/formSections";
import Button from "../../components/form/Button";

const IdentityInfo = () => {
  const { employees, loading } = useSelector((state) => state.employee);

  // for now: first employee
  const employee = employees?.[6];

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>No employee data</p>;

  const identity = employee.identityInformation || {};

  // 🔁 MongoDB → UI field mapping
  const formData = {
    panNum: identity.panNo || "",
    panName: identity.panName || "",
    panAddress: identity.panAddress || "",
    fatherName: identity.fatherName || "",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="mb-8 md:mb-0">
        <h2 className="text-base text-heading font-bold leading-tight mb-3.5">
          Identity Information
        </h2>
      </div>

      <div>
        <FormRenderer
          fields={formSections.identityInfo}
          formData={formData}
          readOnly={true}   
        />
        <Button />
      </div>
    </div>
  );
};

export default IdentityInfo;
