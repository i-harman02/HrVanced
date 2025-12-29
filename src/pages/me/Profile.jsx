import React, { useState } from "react";

const Profile = () => {
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
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1048576) {
      // 1MB = 1048576 bytes
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("File size must be less than 1MB");
    }
  };

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
      <div className="grid sm:grid-cols-[1fr_2fr] xl:grid-cols-[1.3fr_2fr_1fr] gap-6 lg:gap-8">
        <div>
          <h2 className="text-base text-heading font-bold leading-tight mb-3.5">
            Organization Name
          </h2>
          <p className="text-sm text-textgray leading-tight sm:max-w-56.25">
            Use a permanent address where you can receive mail.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-7.5">
            <div className="w-24 h-24 rounded-md overflow-hidden shrink-0">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  className="w-full h-full"
                  src="https://i.pravatar.cc/150?img=32"
                  alt="Employee Image"
                />
              )}
            </div>
            <div>
              <label className="cursor-pointer">
                <button
                  type="button"
                  className="bg-white text-heading text-sm font-bold cursor-pointer px-3.5 py-2.5 border border-bordergray rounded-sm leading-none"
                >
                  Change Avatar
                </button>
                <input
                  type="file"
                  accept=".jpg,.gif,.png"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-textgray mt-3">
                JPG, GIF or PNG. 1MB max.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-6 lg:mt-8">
            {/* First Name */}
            <div>
              <label className="block text-sm text-heading font-bold mb-2.5">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-2.5 py-2 border border-bordergray rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2C3EA1]/15 text-sm leading-[1.3]"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm text-heading font-bold mb-2.5">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-2.5 py-2 border border-bordergray rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2C3EA1]/15 text-sm leading-[1.3]"
              />
            </div>

            {/* Email Address */}
            <div className="sm:col-span-2">
              <label className="block text-sm text-heading font-bold mb-2.5">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-2.5 py-2 border border-bordergray rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2C3EA1]/15 text-sm leading-[1.3]"
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm text-heading font-bold mb-2.5">
                Designation
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-2.5 py-2 border border-bordergray rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2C3EA1]/15 text-sm leading-[1.3]"
              >
                <option value="">-</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            {/* Assign Role */}
            <div>
              <label className="block text-sm text-heading font-bold mb-2.5">
                Assign Role
              </label>
              <select
                name="assignRole"
                value={formData.assignRole}
                onChange={handleChange}
                className="w-full px-2.5 py-2 border border-bordergray rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2C3EA1]/15 text-sm leading-[1.3]"
              >
                <option value="">-</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="editor">Editor</option>
              </select>
            </div>

            {/* Appraisal Date */}
            <div>
              <label className="block text-sm text-heading font-bold mb-2.5">
                Appraisal Date
              </label>
              <input
                type="date"
                name="appraisalDate"
                value={formData.appraisalDate}
                onChange={handleChange}
                placeholder="13/11/2025"
                className="w-full px-2.5 py-2 border border-bordergray rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2C3EA1]/15 text-sm leading-[1.3]"
              />
            </div>

            {/* Date Of Birth */}
            <div>
              <label className="block text-sm text-heading font-bold mb-2.5">
                Date Of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                placeholder="25/06/2001"
                className="w-full px-2.5 py-2 border border-bordergray rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2C3EA1]/15 text-sm leading-[1.3]"
              />
            </div>

            {/* Employee Salary */}
            <div className="sm:col-span-2">
              <label className="block text-sm text-heading font-bold mb-2.5">
                Employee Salary
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="-"
                className="w-full px-2.5 py-2 border border-bordergray rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2C3EA1]/15 text-sm leading-[1.3]"
              />
            </div>

            {/* Full Address */}
            <div className="sm:col-span-2">
              <label className="block text-sm text-heading font-bold mb-2.5">
                Full Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="-"
                className="w-full px-2.5 py-2 border border-bordergray rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2C3EA1]/15 text-sm leading-[1.3]"
              />
            </div>
          </div>

          {/* Action Buttons */}
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
              Send
            </button>
          </div>
        </div>

        <div className="hidden xl:block"></div>
      </div>
    </>
  );
};

export default Profile;
