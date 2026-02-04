import React from "react";
import FormRenderer from "../../components/form/FormRenderer";
import { formSections } from "../../configs/employeeForms/formSections";
import Button from "../../components/form/Button";

const BankInfo = ({ employee, loading }) => {
  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>No employee data</p>;

  const bank = employee.bankInformation || {};

  // 🔁 MongoDB → UI field mapping
  const formData = {
    bankName: bank.bankName || "",
    accountNumber: bank.bankAccountNumber || "",
    ifscCode: bank.ifscCode || "",
    accountName: bank.bankAccountName || "",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="mb-8 md:mb-0">
        <h2 className="text-base text-heading font-bold leading-tight mb-3.5">
          Bank Information
        </h2>
      </div>

      <div>
        <FormRenderer
          fields={formSections.bankInfo}
          formData={formData}
          readOnly={true}  
        />
        <Button />
      </div>
    </div>
  );
};

export default BankInfo;
