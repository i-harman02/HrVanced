// fields/formSections.js
import { inputFields } from "./inputFields";

export const formSections = {
  profileInfo:[
    {...inputFields.avatar, colSpan: 2},
    inputFields.firstName,
    inputFields.lastName,
    {...inputFields.email, colSpan: 2},
    inputFields.designation,
    inputFields.role,
    inputFields.appraisalDate,
    inputFields.dateOfBirth,
    {...inputFields.salary, colSpan: 2},
    {...inputFields.address, colSpan: 2},
  ],
  nameInfo: [
    inputFields.lastName,
    inputFields.email,
  ],

  contactInfo: [
    inputFields.phone,
  ],

  address: [
    inputFields.address,
  ],

  personalInfo: [
    inputFields.phone,
    inputFields.nationality,
    inputFields.maritalStatus,
    inputFields.bloodGroup,
  ],

  emergencyContact: [
    inputFields.emergencyName,
    inputFields.relationship,
    {...inputFields.phone, colSpan: 2},
  ],

  designationRole: [
    inputFields.designation,
    inputFields.role,
  ],

  jobInfo: [
    inputFields.jobTitle,
    inputFields.companyName,
    inputFields.startDate,
    inputFields.endDate,
  ],

  duration: [
    inputFields.startDate,
    inputFields.endDate,
  ],

  bankInfo: [
    inputFields.bankName,
    inputFields.accountNumber,
    inputFields.ifscCode,
    inputFields.accountName,
  ],

  identityInfo: [
    inputFields.panNum,
    inputFields.panName,
    inputFields.panAddress,
    inputFields.fatherName,
  ],

  educationInfo: [
    inputFields.instituteName,
    inputFields.degree,
    {...inputFields.fieldOfStudy, colSpan: 2},
    inputFields.startDate,
    inputFields.endDate
  ],
};
