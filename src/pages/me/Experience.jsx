import React from "react";
import FormRenderer from "../../components/form/FormRenderer";
import { formSections } from "../../configs/employeeForms/formSections";
import Button from "../../components/form/Button";

const Experience = ({ employee, loading }) => {
  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>No employee data</p>;

  // experience is an array
  const exp = employee.experience?.[0] || {};

  // helper to format date for input[type="date"]
  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "";

  // 🔁 MongoDB → UI mapping
  const formData = {
    jobTitle: exp.jobTitle || "",
    companyName: exp.companyName || "",
    startDate: formatDate(exp.startDate),
    endDate: formatDate(exp.endDate),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="mb-8 md:mb-0">
        <h2 className="text-base text-heading font-bold leading-tight mb-3.5">
          Experience
        </h2>
      </div>

      <div>
        <FormRenderer
          fields={formSections.jobInfo}
          formData={formData}
          readOnly={true}  
        />
        <Button />
      </div>
    </div>
  );
};

export default Experience;
