// fields/baseFields.js
export const inputFields = {

  avatar:{  label: "Profile Photo",
    name: "avatar",
    type: "avatar", // 👈 custom type
    accept: "image/png, image/jpeg, image/gif",
    maxSize: 1024 * 1024, // 1MB
     },
  firstName: { label: "First Name", name: "firstName", type: "text" },
  lastName: { label: "Last Name", name: "lastName", type: "text" },
  email: { label: "Email address", name: "email", type: "email" },

  phone: { label: "Telephone Number", name: "phone", type: "text" },

  address: { label: "Full Address", name: "address", type: "text" },

  nationality: { label: "Nationality", name: "nationality", type: "text" },
  maritalStatus: { label: "Marital Status", name: "maritalStatus", type: "text" },
  bloodGroup: { label: "Blood Group", name: "bloodGroup", type: "text" },

  startDate: { label: "Start Date", name: "startDate", type: "date" },
  endDate: { label: "End Date", name: "endDate", type: "date" },
  appraisalDate: { label: "Appraisal Date", name: " appraisalDate", type: "date" },
  dateOfBirth: { label: "Date Of Birth", name: "dateOfBirth", type: "date" },

  bankName: { label: "Bank Name", name: "bankName", type: "text" },
  accountNumber: { label: "Account No.", name: "accountNumber", type: "text" },
  ifscCode: { label: "IFSC Code", name: "ifscCode", type: "text" },
  accountName: { label: "Name of Bank Account", name: "accountName", type: "text" },

  panNum: { label: "PAN No.", name: "panNum", type: "text" },
  panName: { label: "PAN Name", name: "panName", type: "text" },
  panAddress: { label: "PAN Address", name: "panAddress", type: "text" },
  fatherName: { label: "Father Name", name: "fatherName", type: "text" },

  instituteName: { label: "Institute Name", name: "instituteName", type: "text" },
  degree: { label: "Degree", name: "degree", type: "text" },
  fieldOfStudy: { label: "Field Of Study", name: "fieldOfStudy", type: "text" },

  designation: { label: "Designation", name: "designation", type: "text" },
  role: { label: "Assign Role", name: "role", type: "text" },

  jobTitle: { label: "Job Title", name: "jobTitle", type: "text" },
  companyName: { label: "Company Name", name: "companyName", type: "text" },
  salary: {label: "Employee Salary", name: "salary", type:"text"},

  emergencyName: { label: "Name", name: "emergencyName", type: "text" },
  relationship: { label: "Relationship", name: "relationship", type: "text" },
};
