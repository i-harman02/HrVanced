import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

const EditModal = ({ isOpen, onClose, title, fields, initialData, onSubmit }) => {
  const [formData, setFormData] = useState({});

  // Initialize form data when modal opens or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  const handleCancel = () => {
    setFormData(initialData || {});
    onClose();
  };

  if (!isOpen) return null;

  // Render input field based on field type
  const renderField = (field) => {
    const { name, label, type = "text", options, placeholder = "-" } = field;

    switch (type) {
      case "select":
        return (
          <select
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            className="w-full px-2.5 py-2.5 border border-bordergray rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/15 text-sm leading-none appearance-none bg-white cursor-pointer"
          >
            <option value="">-</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "date":
        return (
          <input
            type="date"
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full px-2.5 py-2 border border-bordergray rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/15 text-sm leading-none"
          />
        );

      case "number":
        return (
          <input
            type="number"
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full px-2.5 py-2 border border-bordergray rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/15 text-sm leading-none"
          />
        );

      default:
        return (
          <input
            type="text"
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full px-2.5 py-2 border border-bordergray rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/15 text-sm leading-none"
          />
        );
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-999" onClick={onClose} />

      {/* Modal */}
      <div className="fixed top-0 right-0 h-screen w-full sm:w-[90%] md:w-[60%] lg:w-[40%] xl:w-[36%] min-w-[320px] bg-white z-1000 shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-6 lg:px-8 lg:py-8 sticky top-0 bg-white z-10">
          <h3 className="font-bold text-2xl text-heading leading-tight">
            {title}
          </h3>
          <button
            className="text-2xl cursor-pointer text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            <IoCloseOutline />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 lg:px-8 lg:py-8">
          {/* Dynamic Fields */}
          {fields.map((field, index) => (
            <div key={field.name} className={index === fields.length - 1 ? "mb-8" : "mb-6"}>
              <label className="block text-sm text-heading font-medium mb-2.5">
                {field.label}
              </label>
              {renderField(field)}
            </div>
          ))}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-50 text-textgray text-sm font-medium cursor-pointer px-3.5 py-2.5 border border-bordergray rounded-sm leading-none hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white text-sm font-medium cursor-pointer px-3.5 py-2.5 rounded-sm leading-none hover:bg-primary/90 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditModal;