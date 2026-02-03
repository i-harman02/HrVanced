

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../slices/userSlice";
import HomeImg from "../../assets/Group 3475 (1).png";
import logo from "../../assets/vanced-logo.png";
import { FaPlus, FaTrash } from "react-icons/fa";


const Signup = ({ onClose }) => { // Accept onClose prop
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [formdata, setFormdata] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    superAdmin: false,
    assignRole: "",
    designation: "",
    address: "",
    gender: "",
    employeeId: "",
    dateOfJoining: "", 
    employeeSalary: "",
    birthday: "",
    profileImage: "",
    status: "Active",
    acceptPolicies: false,
    appraisalDate: "",
    personalInformation: {
      telephones: [""],
      nationality: "",
      maritalStatus: "",
      bloodGroup: "",
    },
    emergencyContact: {
      primary: { name: "", relationship: "", phone: [""] },
      secondary: { name: "", relationship: "", phone: [""] },
    },
    bankInformation: {
      bankName: "",
      bankAccountNumber: "",
      ifscCode: "",
      bankAccountName: "",
    },
    identityInformation: {
      panNo: "",
      panName: "",
      panAddress: "",
      fatherName: "",
    },
    education: [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startYear: "",
        endYear: "",
      },
    ],
    experience: [
      {
        jobTitle: "",
        companyName: "",
        startDate: "",
        endDate: "",
      },
    ],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormdata((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };
  
  const handleDeepNestedChange = (parent, section, field, value) => {
    setFormdata((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [section]: {
          ...prev[parent][section],
          [field]: value,
        },
      },
    }));
  };

   const handleArrayChange = (section, index, field, value) => {
    setFormdata((prev) => {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
    });
  };

  const addItem = (section, initialItem) => {
    setFormdata((prev) => ({
        ...prev,
        [section]: [...prev[section], initialItem]
    }));
  };

  const removeItem = (section, index) => {
    setFormdata((prev) => ({
        ...prev,
        [section]: prev[section].filter((_, i) => i !== index)
    }));
  };


  const isFormValid = formdata.name && formdata.email && formdata.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const payload = {
        ...formdata,
    };

    const res = await dispatch(signupUser(payload));

    if (res.meta.requestStatus === "fulfilled") {
      alert("Employee Added Successfully 🎉");
      if (onClose) {
        onClose(); // Close modal on success
      } else {
        if (user) {
          navigate("/my-team"); 
        } else {
          navigate("/login");
        }
      }
    } else {
      alert(res.payload || "Signup failed");
    }
  };

  // If used as a modal (onClose is present), render simpler layout
  if (onClose) {
     return (
        <form onSubmit={handleSubmit} className="p-6">
        
           
         
          <div className="mb-8">
             <h3 className="text-lg font-semibold text-blue-600 mb-4 border-b pb-2">Account Details</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="First Name *" name="name" value={formdata.name} onChange={handleChange} />
                <InputGroup label="Last Name" name="lastName" value={formdata.lastName} onChange={handleChange} />
                <InputGroup label="Email *" type="email" name="email" value={formdata.email} onChange={handleChange} />
                <InputGroup label="Password *" type="password" name="password" value={formdata.password} onChange={handleChange} />
                
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">Role</label>
                  <select name="role" value={formdata.role} onChange={handleChange} className="p-2 border rounded border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                
                 <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">Assign Role</label>
                   <input className="p-2 border rounded border-gray-300" name="assignRole" value={formdata.assignRole} onChange={handleChange} placeholder="e.g. Developer" />
                </div>
                 <InputGroup label="Designation" name="designation" value={formdata.designation} onChange={handleChange} />
                 <InputGroup label="Employee ID" name="employeeId" value={formdata.employeeId} onChange={handleChange} />
                 <InputGroup label="Status" name="status" value={formdata.status} onChange={handleChange} />
                 
                 <div className="flex items-center mt-6">
                    <input type="checkbox" name="superAdmin" checked={formdata.superAdmin} onChange={handleChange} className="w-4 h-4 text-blue-600" />
                    <label className="ml-2 text-gray-700 font-medium">Super Admin</label>
                 </div>
             </div>
          </div>


       
          <div className="mb-8">
       
            <h3 className="text-lg font-semibold text-blue-600 mb-4 border-b pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <InputGroup label="Date of Birth" type="date" name="birthday" value={formdata.birthday} onChange={handleChange} />
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">Gender</label>
                  <select name="gender" value={formdata.gender} onChange={handleChange} className="p-2 border rounded border-gray-300">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
               <InputGroup label="Nationality" value={formdata.personalInformation.nationality} onChange={(e) => handleNestedChange('personalInformation', 'nationality', e.target.value)} />
               <InputGroup label="Marital Status" value={formdata.personalInformation.maritalStatus} onChange={(e) => handleNestedChange('personalInformation', 'maritalStatus', e.target.value)} />
               <InputGroup label="Blood Group" value={formdata.personalInformation.bloodGroup} onChange={(e) => handleNestedChange('personalInformation', 'bloodGroup', e.target.value)} />
               <InputGroup label="Phone" value={formdata.personalInformation.telephones[0]} onChange={(e) => {
                   const newPhones = [...formdata.personalInformation.telephones];
                   newPhones[0] = e.target.value;
                   handleNestedChange('personalInformation', 'telephones', newPhones);
               }} />
               <div className="md:col-span-2">
                 <InputGroup label="Address" name="address" value={formdata.address} onChange={handleChange} />
               </div>
               <div className="md:col-span-2">
                 <InputGroup label="Profile Image URL" name="profileImage" value={formdata.profileImage} onChange={handleChange} />
               </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-600 mb-4 border-b pb-2">Employment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <InputGroup label="Date of Joining" type="date" name="dateOfJoining" value={formdata.dateOfJoining} onChange={handleChange} />
               <InputGroup label="Appraisal Date" type="date" name="appraisalDate" value={formdata.appraisalDate} onChange={handleChange} />
               <InputGroup label="Salary" type="number" name="employeeSalary" value={formdata.employeeSalary} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-8">
             <h3 className="text-lg font-semibold text-blue-600 mb-4 border-b pb-2">Bank Information</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="Bank Name" value={formdata.bankInformation.bankName} onChange={(e) => handleNestedChange('bankInformation', 'bankName', e.target.value)} />
                <InputGroup label="Account Number" value={formdata.bankInformation.bankAccountNumber} onChange={(e) => handleNestedChange('bankInformation', 'bankAccountNumber', e.target.value)} />
                <InputGroup label="IFSC Code" value={formdata.bankInformation.ifscCode} onChange={(e) => handleNestedChange('bankInformation', 'ifscCode', e.target.value)} />
                <InputGroup label="Account Holder Name" value={formdata.bankInformation.bankAccountName} onChange={(e) => handleNestedChange('bankInformation', 'bankAccountName', e.target.value)} />
             </div>
          </div>

           <div className="mb-8">
             <h3 className="text-lg font-semibold text-blue-600 mb-4 border-b pb-2">Identity Information</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="PAN Number" value={formdata.identityInformation.panNo} onChange={(e) => handleNestedChange('identityInformation', 'panNo', e.target.value)} />
                <InputGroup label="PAN Name" value={formdata.identityInformation.panName} onChange={(e) => handleNestedChange('identityInformation', 'panName', e.target.value)} />
                <InputGroup label="PAN Address" value={formdata.identityInformation.panAddress} onChange={(e) => handleNestedChange('identityInformation', 'panAddress', e.target.value)} />
                <InputGroup label="Father's Name" value={formdata.identityInformation.fatherName} onChange={(e) => handleNestedChange('identityInformation', 'fatherName', e.target.value)} />
             </div>
          </div>

          <div className="mb-8">
             <h3 className="text-lg font-semibold text-blue-600 mb-4 border-b pb-2">Emergency Contacts</h3>
             <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Primary Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <InputGroup label="Name" value={formdata.emergencyContact.primary.name} onChange={(e) => handleDeepNestedChange('emergencyContact', 'primary', 'name', e.target.value)} />
                    <InputGroup label="Relationship" value={formdata.emergencyContact.primary.relationship} onChange={(e) => handleDeepNestedChange('emergencyContact', 'primary', 'relationship', e.target.value)} />
                    <InputGroup label="Phone" value={formdata.emergencyContact.primary.phone[0]} onChange={(e) => {
                         const newPhones = [...formdata.emergencyContact.primary.phone];
                         newPhones[0] = e.target.value;
                         handleDeepNestedChange('emergencyContact', 'primary', 'phone', newPhones);
                    }} />
                </div>
             </div>
             <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Secondary Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <InputGroup label="Name" value={formdata.emergencyContact.secondary.name} onChange={(e) => handleDeepNestedChange('emergencyContact', 'secondary', 'name', e.target.value)} />
                    <InputGroup label="Relationship" value={formdata.emergencyContact.secondary.relationship} onChange={(e) => handleDeepNestedChange('emergencyContact', 'secondary', 'relationship', e.target.value)} />
                     <InputGroup label="Phone" value={formdata.emergencyContact.secondary.phone[0]} onChange={(e) => {
                         const newPhones = [...formdata.emergencyContact.secondary.phone];
                         newPhones[0] = e.target.value;
                         handleDeepNestedChange('emergencyContact', 'secondary', 'phone', newPhones);
                    }} />
                </div>
             </div>
          </div>
          
           
           <div className="mb-8">
             <div className="flex justify-between items-center mb-4 border-b pb-2">
                 <h3 className="text-lg font-semibold text-blue-600">Education</h3>
                 <button type="button" onClick={() => addItem('education', { institution: "", degree: "", fieldOfStudy: "", startYear: "", endYear: "" })} className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-800"><FaPlus /> Add</button>
             </div>
             {formdata.education.map((edu, index) => (
                 <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4 relative">
                     {index > 0 && <button type="button" onClick={() => removeItem('education', index)} className="absolute top-2 right-2 text-red-500"><FaTrash size={12} /></button>}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <InputGroup label="Institution" value={edu.institution} onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)} />
                        <InputGroup label="Degree" value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} />
                        <InputGroup label="Field of Study" value={edu.fieldOfStudy} onChange={(e) => handleArrayChange('education', index, 'fieldOfStudy', e.target.value)} />
                        <div className="flex gap-2">
                             <InputGroup label="Start Year" value={edu.startYear} onChange={(e) => handleArrayChange('education', index, 'startYear', e.target.value)} />
                             <InputGroup label="End Year" value={edu.endYear} onChange={(e) => handleArrayChange('education', index, 'endYear', e.target.value)} />
                        </div>
                     </div>
                 </div>
             ))}
           </div>

           
           <div className="mb-8">
             <div className="flex justify-between items-center mb-4 border-b pb-2">
                 <h3 className="text-lg font-semibold text-blue-600">Experience</h3>
                 <button type="button" onClick={() => addItem('experience', { jobTitle: "", companyName: "", startDate: "", endDate: "" })} className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-800"><FaPlus /> Add</button>
             </div>
             {formdata.experience.map((exp, index) => (
                 <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4 relative">
                      {index > 0 && <button type="button" onClick={() => removeItem('experience', index)} className="absolute top-2 right-2 text-red-500"><FaTrash size={12} /></button>}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <InputGroup label="Job Title" value={exp.jobTitle} onChange={(e) => handleArrayChange('experience', index, 'jobTitle', e.target.value)} />
                        <InputGroup label="Company Name" value={exp.companyName} onChange={(e) => handleArrayChange('experience', index, 'companyName', e.target.value)} />
                        <InputGroup label="Start Date" type="date" value={exp.startDate} onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)} />
                        <InputGroup label="End Date" type="date" value={exp.endDate} onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)} />
                     </div>
                 </div>
             ))}
           </div>
           
            <div className="mb-6 flex items-center">
                 <input type="checkbox" name="acceptPolicies" checked={formdata.acceptPolicies} onChange={handleChange} className="w-5 h-5 text-blue-600" />
                 <label className="ml-2 text-gray-700">I accept the company policies and terms.</label>
            </div>


            <div className="flex items-center gap-4 mt-8">
               <button type="button" onClick={onClose} className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-semibold">
                  Cancel
               </button>
               <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`flex-1 py-3 rounded-lg text-white font-semibold transition-all shadow-md
                  ${isFormValid ? "bg-blue-600 hover:bg-blue-700 hover:shadow-lg" : "bg-gray-400 cursor-not-allowed"}`}
               >
                  Save
               </button>
            </div>
        </form>
     )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Scrollable Form Section */}
      <div className="bg-white flex flex-col items-center justify-start h-screen overflow-y-auto w-full">
        <form onSubmit={handleSubmit} className="p-8 w-full max-w-2xl">
          <div className="text-center mb-8">
            <img className="mx-auto mb-4 w-32" src={logo} alt="Logo" />
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500">Please fill in the details below</p>
          </div>

          {/* --- Account Information --- */}
          <div className="mb-8">
             <h3 className="text-lg font-semibold text-blue-600 mb-4 border-b pb-2">Account Details</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="First Name *" name="name" value={formdata.name} onChange={handleChange} />
                <InputGroup label="Last Name" name="lastName" value={formdata.lastName} onChange={handleChange} />
                <InputGroup label="Email *" type="email" name="email" value={formdata.email} onChange={handleChange} />
                <InputGroup label="Password *" type="password" name="password" value={formdata.password} onChange={handleChange} />
                
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">Role</label>
                  <select name="role" value={formdata.role} onChange={handleChange} className="p-2 border rounded border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                
                 <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">Assign Role</label>
                   <input className="p-2 border rounded border-gray-300" name="assignRole" value={formdata.assignRole} onChange={handleChange} placeholder="e.g. Developer" />
                </div>
                 <InputGroup label="Designation" name="designation" value={formdata.designation} onChange={handleChange} />
                 <InputGroup label="Employee ID" name="employeeId" value={formdata.employeeId} onChange={handleChange} />
                 <InputGroup label="Status" name="status" value={formdata.status} onChange={handleChange} />
                 
                 <div className="flex items-center mt-6">
                    <input type="checkbox" name="superAdmin" checked={formdata.superAdmin} onChange={handleChange} className="w-4 h-4 text-blue-600" />
                    <label className="ml-2 text-gray-700 font-medium">Super Admin</label>
                 </div>
             </div>
          </div>


         
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-600 mb-4 border-b pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <InputGroup label="Date of Birth" type="date" name="birthday" value={formdata.birthday} onChange={handleChange} />
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">Gender</label>
                  <select name="gender" value={formdata.gender} onChange={handleChange} className="p-2 border rounded border-gray-300">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
               <InputGroup label="Nationality" value={formdata.personalInformation.nationality} onChange={(e) => handleNestedChange('personalInformation', 'nationality', e.target.value)} />
               <InputGroup label="Marital Status" value={formdata.personalInformation.maritalStatus} onChange={(e) => handleNestedChange('personalInformation', 'maritalStatus', e.target.value)} />
               <InputGroup label="Blood Group" value={formdata.personalInformation.bloodGroup} onChange={(e) => handleNestedChange('personalInformation', 'bloodGroup', e.target.value)} />
               <InputGroup label="Phone" value={formdata.personalInformation.telephones[0]} onChange={(e) => {
                   const newPhones = [...formdata.personalInformation.telephones];
                   newPhones[0] = e.target.value;
                   handleNestedChange('personalInformation', 'telephones', newPhones);
               }} />
               <div className="md:col-span-2">
                 <InputGroup label="Address" name="address" value={formdata.address} onChange={handleChange} />
               </div>
               <div className="md:col-span-2">
                 <InputGroup label="Profile Image URL" name="profileImage" value={formdata.profileImage} onChange={handleChange} />
               </div>
            </div>
          </div>

        {/* --- Employment Details --- */}
         <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-600 mb-4 border-b pb-2">Employment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <InputGroup label="Date of Joining" type="date" name="dateOfJoining" value={formdata.dateOfJoining} onChange={handleChange} />
               <InputGroup label="Appraisal Date" type="date" name="appraisalDate" value={formdata.appraisalDate} onChange={handleChange} />
               <InputGroup label="Salary" type="number" name="employeeSalary" value={formdata.employeeSalary} onChange={handleChange} />
            </div>
          </div>


          {/* --- Bank Information --- */}
          <div className="mb-8">
             <h3 className="text-lg font-semibold text-blue-600 mb-4 border-b pb-2">Bank Information</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="Bank Name" value={formdata.bankInformation.bankName} onChange={(e) => handleNestedChange('bankInformation', 'bankName', e.target.value)} />
                <InputGroup label="Account Number" value={formdata.bankInformation.bankAccountNumber} onChange={(e) => handleNestedChange('bankInformation', 'bankAccountNumber', e.target.value)} />
                <InputGroup label="IFSC Code" value={formdata.bankInformation.ifscCode} onChange={(e) => handleNestedChange('bankInformation', 'ifscCode', e.target.value)} />
                <InputGroup label="Account Holder Name" value={formdata.bankInformation.bankAccountName} onChange={(e) => handleNestedChange('bankInformation', 'bankAccountName', e.target.value)} />
             </div>
          </div>

          {/* --- Identity Information --- */}
           <div className="mb-8">
             <h3 className="text-lg font-semibold text-blue-600 mb-4 border-b pb-2">Identity Information</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="PAN Number" value={formdata.identityInformation.panNo} onChange={(e) => handleNestedChange('identityInformation', 'panNo', e.target.value)} />
                <InputGroup label="PAN Name" value={formdata.identityInformation.panName} onChange={(e) => handleNestedChange('identityInformation', 'panName', e.target.value)} />
                <InputGroup label="PAN Address" value={formdata.identityInformation.panAddress} onChange={(e) => handleNestedChange('identityInformation', 'panAddress', e.target.value)} />
                <InputGroup label="Father's Name" value={formdata.identityInformation.fatherName} onChange={(e) => handleNestedChange('identityInformation', 'fatherName', e.target.value)} />
             </div>
          </div>

          {/* --- Emergency Contacts --- */}
          <div className="mb-8">
             <h3 className="text-lg font-semibold text-blue-600 mb-4 border-b pb-2">Emergency Contacts</h3>
            
           
             <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Primary Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <InputGroup label="Name" value={formdata.emergencyContact.primary.name} onChange={(e) => handleDeepNestedChange('emergencyContact', 'primary', 'name', e.target.value)} />
                    <InputGroup label="Relationship" value={formdata.emergencyContact.primary.relationship} onChange={(e) => handleDeepNestedChange('emergencyContact', 'primary', 'relationship', e.target.value)} />
                    <InputGroup label="Phone" value={formdata.emergencyContact.primary.phone[0]} onChange={(e) => {
                         const newPhones = [...formdata.emergencyContact.primary.phone];
                         newPhones[0] = e.target.value;
                         handleDeepNestedChange('emergencyContact', 'primary', 'phone', newPhones);
                    }} />
                </div>
             </div>

          
             <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Secondary Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <InputGroup label="Name" value={formdata.emergencyContact.secondary.name} onChange={(e) => handleDeepNestedChange('emergencyContact', 'secondary', 'name', e.target.value)} />
                    <InputGroup label="Relationship" value={formdata.emergencyContact.secondary.relationship} onChange={(e) => handleDeepNestedChange('emergencyContact', 'secondary', 'relationship', e.target.value)} />
                     <InputGroup label="Phone" value={formdata.emergencyContact.secondary.phone[0]} onChange={(e) => {
                         const newPhones = [...formdata.emergencyContact.secondary.phone];
                         newPhones[0] = e.target.value;
                         handleDeepNestedChange('emergencyContact', 'secondary', 'phone', newPhones);
                    }} />
                </div>
             </div>
          </div>
          
          

            <div className="mb-6 flex items-center">
                 <input type="checkbox" name="acceptPolicies" checked={formdata.acceptPolicies} onChange={handleChange} className="w-5 h-5 text-blue-600" />
                 <label className="ml-2 text-gray-700">I accept the company policies and terms.</label>
            </div>
            
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all shadow-md
              ${isFormValid ? "bg-blue-600 hover:bg-blue-700 hover:shadow-lg" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Create Account
          </button>
          
           <div className="mt-6 text-center">
             <p className="text-gray-600">Already have an account? <span onClick={() => navigate("/login")} className="text-blue-600 cursor-pointer hover:underline font-medium">Log in</span></p>
           </div>
        </form>
      </div>

      <div className="hidden md:flex bg-[#2C3EA1] items-center justify-center p-8 h-screen sticky top-0">
        <div className="relative">
           <img src={HomeImg} alt="Illustration" className="max-w-full max-h-[80vh] object-contain" />
           <div className="absolute -bottom-10 left-0 w-full text-center text-white/80">
                {/* <h3 className="text-xl font-bold text-white mb-2">Welcome to HrVanced</h3> */}
                {/* <p>Streamline your HR management today.</p> */}
           </div>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, type = "text", name, value, onChange, placeholder }) => (
  <div className="flex flex-col">
    <label className="mb-1 font-medium text-gray-700 text-sm">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-2.5 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
    />
  </div>
);

export default Signup;
