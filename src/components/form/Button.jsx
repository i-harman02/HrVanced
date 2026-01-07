import { useState } from "react";
const Button = () => {

 const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    designation: "",
    assignRole: "",
    appraisalDate: "",
    dateOfBirth: "",
    salary: "",
    address: "",
  });

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Employee profile saved successfully!");
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      designation: "",
      assignRole: "",
      appraisalDate: "",
      dateOfBirth: "",
      salary: "",
      address: "",
    });
    setAvatarPreview(null);
  };

  return (
    <>
    <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-50 text-textgray text-sm font-medium cursor-pointer px-3.5 py-2.5 border border-bordergray rounded-sm leading-none"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-primary text-white text-sm font-medium cursor-pointer px-3.5 py-2.5 border border-borderprimary rounded-sm leading-none"
            >
              Save
            </button>
          </div>
    </>
  )
}

export default Button