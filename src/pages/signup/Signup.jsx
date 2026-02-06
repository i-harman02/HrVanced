
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../slices/userSlice";
import { updateEmployee, fetchEmployees } from "../../slices/employeeSlice";
import HomeImg from "../../assets/Group 3475 (1).png";
import logo from "../../assets/vanced-logo.png";
import { FaPlus, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";


const Signup = ({ onClose, editingEmployee, forcedAssignRole }) => { // Accept onClose, editingEmployee and forcedAssignRole props
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { employees } = useSelector((state) => state.employee);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const [formdata, setFormdata] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "Employee",
    superAdmin: false,
    assignRole: forcedAssignRole || "Employee",
    designation: "",
    tl: "",
    manager: "",
    address: "",
    gender: "",
    employeeId: "",
    dateOfJoining: "", 
    employeeSalary: "",
    birthday: "",
    profileImage: "",
    status: "Active",
    acceptPolicies: false,
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

  useEffect(() => {
    if (editingEmployee) {
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

      setFormdata({
        ...editingEmployee,
        name: editingEmployee.name || "",
        lastName: editingEmployee.lastName || "",
        email: editingEmployee.email || "",
        role: editingEmployee.role || "Employee",
        assignRole: editingEmployee.assignRole || "Employee",
        designation: editingEmployee.designation || "",
        tl: editingEmployee.tl?._id || editingEmployee.tl || "",
        manager: editingEmployee.manager?._id || editingEmployee.manager || "",
        employeeId: editingEmployee.employeeId || "",
        status: editingEmployee.status || "Active",
        
        dateOfJoining: formatDate(editingEmployee.dateOfJoining),
        birthday: formatDate(editingEmployee.birthday),
        personalInformation: {
          telephones: editingEmployee.personalInformation?.telephones || [""],
          nationality: editingEmployee.personalInformation?.nationality || "",
          maritalStatus: editingEmployee.personalInformation?.maritalStatus || "",
          bloodGroup: editingEmployee.personalInformation?.bloodGroup || "",
        },
        emergencyContact: {
          primary: { 
            name: editingEmployee.emergencyContact?.primary?.name || "", 
            relationship: editingEmployee.emergencyContact?.primary?.relationship || "", 
            phone: editingEmployee.emergencyContact?.primary?.phone || [""] 
          },
          secondary: { 
            name: editingEmployee.emergencyContact?.secondary?.name || "", 
            relationship: editingEmployee.emergencyContact?.secondary?.relationship || "", 
            phone: editingEmployee.emergencyContact?.secondary?.phone || [""] 
          },
        },
        bankInformation: {
          bankName: editingEmployee.bankInformation?.bankName || "",
          bankAccountNumber: editingEmployee.bankInformation?.bankAccountNumber || "",
          ifscCode: editingEmployee.bankInformation?.ifscCode || "",
          bankAccountName: editingEmployee.bankInformation?.bankAccountName || "",
        },
        identityInformation: {
          panNo: editingEmployee.identityInformation?.panNo || "",
          panName: editingEmployee.identityInformation?.panName || "",
          panAddress: editingEmployee.identityInformation?.panAddress || "",
          fatherName: editingEmployee.identityInformation?.fatherName || "",
        },
        education: editingEmployee.education && editingEmployee.education.length > 0 
          ? editingEmployee.education 
          : [{ institution: "", degree: "", fieldOfStudy: "", startYear: "", endYear: "" }],
        experience: editingEmployee.experience && editingEmployee.experience.length > 0
          ? editingEmployee.experience.map(exp => ({
              ...exp,
              startDate: formatDate(exp.startDate),
              endDate: formatDate(exp.endDate)
            }))
          : [{ jobTitle: "", companyName: "", startDate: "", endDate: "" }],
      });
    } else if (forcedAssignRole) {
      setFormdata(prev => ({ ...prev, assignRole: forcedAssignRole }));
    }
  }, [editingEmployee, forcedAssignRole]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Auto-generate Employee ID when name is entered (only if not in edit mode)
    if (name === 'name' && value.trim() && !editingEmployee) {
      const namePrefix = value.trim().substring(0, 3).toUpperCase().padEnd(3, 'X');
      const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
      const generatedId = `EMP${namePrefix}${randomNum}`;
      
      setFormdata((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        employeeId: generatedId,
      }));
    } else {
      setFormdata((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
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


  const isFormValid = editingEmployee 
    ? (formdata.name && formdata.email)
    : (formdata.name && 
       formdata.lastName && 
       formdata.email && 
       formdata.password && 
       formdata.role && 
       formdata.assignRole && 
       formdata.designation && 
       formdata.employeeId && 
       formdata.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Clean payload: remove internal fields and handle empty ObjectIds
    const { _id, __v, password: rawPassword, tl, manager, ...rest } = formdata;
    
    const payload = {
      ...rest,
      tl: tl === "" ? null : tl,
      manager: manager === "" ? null : manager,
    };

    // Only include password if it's not empty (especially during edit)
    if (rawPassword) {
      payload.password = rawPassword;
    }

    const res = editingEmployee 
      ? await dispatch(updateEmployee({ id: editingEmployee._id, data: payload }))
      : await dispatch(signupUser(payload));

    if (res.meta.requestStatus === "fulfilled") {
      alert(editingEmployee ? "Employee Updated Successfully 🎉" : "Employee Added Successfully 🎉");
      if (onClose) {
        onClose(); 
      } else {
        if (user) {
          navigate("/my-team"); 
        } else {
          navigate("/login");
        }
      }
    } else {
      const errorDetail = res.payload?.error || "";
      const errorMsg = res.payload?.message || res.payload?.msg || res.payload || (editingEmployee ? "Update failed" : "Signup failed");
      alert(`${errorMsg}${errorDetail ? `\n\nDetail: ${errorDetail}` : ""}`);
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
                <InputGroup label={`Last Name ${editingEmployee ? '' : '*'}`} name="lastName" value={formdata.lastName} onChange={handleChange} />
                <InputGroup label="Email *" type="email" name="email" value={formdata.email} onChange={handleChange} autoComplete="new-password" />
                <InputGroup label={`Password ${editingEmployee ? '' : '*'}`} type="password" name="password" value={formdata.password} onChange={handleChange} autoComplete="new-password" placeholder={editingEmployee ? "Leave empty to keep current" : ""} />
                
                {(!forcedAssignRole || editingEmployee || forcedAssignRole === "Manager") && (
                  <>
                    <div className="flex flex-col">
                      <label className="mb-1 font-medium text-gray-700">{`Role ${editingEmployee ? '' : '*'}`}</label>
                      <select name="role" value={formdata.role?.toLowerCase()} onChange={handleChange} className="p-2 border rounded border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none">
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="mb-1 font-medium text-gray-700 text-sm">{`Assign Role ${editingEmployee ? '' : '*'}`}</label>
                      <select
                        name="assignRole"
                        value={formdata.assignRole}
                        onChange={handleChange}
                        className="p-2.5 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                      >
                        <option value="">Select Role</option>
                        <option value="Employee">Employee</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="TL">TL</option>
                        <option value="Intern">Intern</option>
                      </select>
                    </div>
                  </>
                )}

                {(formdata.assignRole !== "Manager" && formdata.assignRole !== "HR Manager" && formdata.assignRole !== "TL") && (
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700 text-sm">Reporting TL</label>
                    <select
                      name="tl"
                      value={formdata.tl}
                      onChange={handleChange}
                      className="p-2.5 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select TL</option>
                      {(employees || [])
                        .filter(emp => emp.assignRole === "TL")
                        .map(emp => (
                          <option key={emp._id} value={emp._id}>
                            {emp.name} {emp.lastName || ""}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                )}

                {(formdata.assignRole !== "Manager" && formdata.assignRole !== "HR Manager") && (
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700 text-sm">Reporting Manager</label>
                    <select
                      name="manager"
                      value={formdata.manager}
                      onChange={handleChange}
                      className="p-2.5 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select Manager</option>
                      {(employees || [])
                        .filter(emp => emp.assignRole === "Manager" || emp.assignRole === "HR Manager")
                        .map(emp => (
                          <option key={emp._id} value={emp._id}>
                            {emp.name} {emp.lastName || ""}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                )}

                 <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700 text-sm">{`Designation ${editingEmployee ? '' : '*'}`}</label>
                  <select
                    name="designation"
                    value={formdata.designation}
                    onChange={handleChange}
                    className="p-2.5 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Designation</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="BDE">BDE</option>
                    <option value="Angular Developer">Angular Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value=".NET">.NET</option>
                    <option value="Frontend Developer (React)">Frontend Developer (React)</option>
                    <option value="Web Designer">Web Designer</option>
                    <option value="HR">HR</option>
                    <option value="MERN Stack">MERN Stack</option>
                  </select>
                 </div>
                 <InputGroup label={`Employee ID ${editingEmployee ? '' : '*'}`} name="employeeId" value={formdata.employeeId} onChange={handleChange} disabled={true} />
                 <InputGroup label={`Status ${editingEmployee ? '' : '*'}`} name="status" value={formdata.status} onChange={handleChange} />
                 

             </div>
          </div>

          <div className="mb-6 flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-100 mx-6">
             <div className="flex items-center">
                 <input 
                   type="checkbox" 
                   id="showAdvanced"
                   checked={showAdvanced} 
                   onChange={(e) => setShowAdvanced(e.target.checked)} 
                   className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" 
                 />
                 <label htmlFor="showAdvanced" className="ml-2 text-sm font-semibold text-blue-800 cursor-pointer">Show Advanced Fields</label>
             </div>
             <p className="text-xs text-blue-600 italic">Optional details like bank, education, etc.</p>
          </div>

          {showAdvanced && (
            <div className="px-6">
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
            </div>
          )}
           
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
                <InputGroup label={`Last Name ${editingEmployee ? '' : '*'}`} name="lastName" value={formdata.lastName} onChange={handleChange} />
                <InputGroup label="Email *" type="email" name="email" value={formdata.email} onChange={handleChange} autoComplete="new-password" />
                <InputGroup label={`Password ${editingEmployee ? '' : '*'}`} type="password" name="password" value={formdata.password} onChange={handleChange} autoComplete="new-password" placeholder={editingEmployee ? "Leave empty to keep current" : ""} />
                
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">{`Role ${editingEmployee ? '' : '*'}`}</label>
                  <select name="role" value={formdata.role} onChange={handleChange} className="p-2 border rounded border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                  </select>
                </div>
                
                 <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700 text-sm">{`Assign Role ${editingEmployee ? '' : '*'}`}</label>
                  <select
                    name="assignRole"
                    value={formdata.assignRole}
                    onChange={handleChange}
                    className="p-2.5 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Role</option>
                    <option value="Employee">Employee</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="TL">TL</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>
                 <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700 text-sm">{`Designation ${editingEmployee ? '' : '*'}`}</label>
                  <select
                    name="designation"
                    value={formdata.designation}
                    onChange={handleChange}
                    className="p-2.5 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Designation</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="BDE">BDE</option>
                    <option value="Angular Developer">Angular Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value=".NET">.NET</option>
                    <option value="Frontend Developer (React)">Frontend Developer (React)</option>
                    <option value="Web Designer">Web Designer</option>
                    <option value="HR">HR</option>
                    <option value="MERN Stack">MERN Stack</option>
                  </select>
                 </div>
                 <InputGroup label={`Employee ID ${editingEmployee ? '' : '*'}`} name="employeeId" value={formdata.employeeId} onChange={handleChange} disabled={true} />
                 <InputGroup label={`Status ${editingEmployee ? '' : '*'}`} name="status" value={formdata.status} onChange={handleChange} />
                 

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

const InputGroup = ({ label, type = "text", name, value, onChange, placeholder, autoComplete, disabled }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium text-gray-700 text-sm">{label}</label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete || "off"}
          disabled={disabled}
          className={`w-full p-2.5 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-600' : ''}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Signup;
