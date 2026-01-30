import React from "react";
import { useSelector } from "react-redux";

import FormRenderer from "../../components/form/FormRenderer";
import { formSections } from "../../configs/employeeForms/formSections";
import Button from "../../components/form/Button";

const Education = () => {
  const { employees, loading } = useSelector((state) => state.employee);

  // for now: first employee
  const employee = employees?.[5];

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>No employee data</p>;

  // education is an array
  const edu = employee.education?.[0] || {};

  // 🔁 MongoDB → UI mapping
  const formData = {
    instituteName: edu.institution || "",
    degree: edu.degree || "",
    fieldOfStudy: edu.fieldOfStudy || "",
    startDate: edu.startYear || "",
    endDate: edu.endYear || "",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="mb-8 md:mb-0">
        <h2 className="text-base text-heading font-bold leading-tight mb-3.5">
          Education
        </h2>
      </div>

      <div>
        <FormRenderer
          fields={formSections.educationInfo}
          formData={formData}
          readOnly={true}   
        />
        <Button />
      </div>
    </div>
  );
};

export default Education;
