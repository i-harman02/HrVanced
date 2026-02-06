import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShift, updateShift } from "../../slices/shiftSlice";
import { IoMdClose } from "react-icons/io";

const AddShiftModal = ({ onClose, editingShift, employees }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    employee: "",
    shiftName: "",
    startTime: "",
    breakDuration: "1 hour",
    endTime: "",
    status: "Active",
  });

  useEffect(() => {
    if (editingShift) {
      setFormData({
        employee: editingShift.employee?._id || editingShift.employee,
        shiftName: editingShift.shiftName,
        startTime: editingShift.startTime,
        breakDuration: editingShift.breakDuration,
        endTime: editingShift.endTime,
        status: editingShift.status,
      });
    }
  }, [editingShift]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newData = { ...formData, [name]: value };

    if (name === "shiftName") {
      newData.breakDuration = "1 hour";
      if (value === "Day Shift") {
        newData.startTime = "10:00 AM";
        newData.endTime = "07:00 PM";
      } else if (value === "Evening Shift") {
        newData.startTime = "01:00 PM";
        newData.endTime = "10:00 PM";
      } else if (value === "Night Shift") {
        newData.startTime = "08:00 PM";
        newData.endTime = "05:00 AM";
      }
    }
    setFormData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingShift) {
      dispatch(updateShift({ id: editingShift._id, data: formData }));
    } else {
      dispatch(addShift(formData));
    }
    onClose();
  };

  const selectedEmployee = employees.find(emp => emp._id === formData.employee);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto animate-slide-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-heading">{editingShift ? "Edit Shift" : "Add Shift"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
            <select
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Select Employee</option>
              {employees
                .filter(emp => {
                  const role = emp.role?.toLowerCase();
                  const assignRole = emp.assignRole?.toLowerCase();
                  const designation = emp.designation?.toLowerCase();
                  const excludedRoles = ["admin", "superadmin", "manager"];
                  
                  return !excludedRoles.includes(role) && 
                         !excludedRoles.includes(assignRole) && 
                         !designation?.includes("manager");
                })
                .map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} {emp.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input
              type="text"
              value={selectedEmployee?.designation || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              placeholder="Select employee to see department"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shift Name</label>
            <select
               name="shiftName"
               value={formData.shiftName}
               onChange={handleChange}
               required
               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Select Shift</option>
              <option value="Day Shift">Day Shift (10 AM - 7 PM)</option>
              <option value="Evening Shift">Evening Shift (1 PM - 10 PM)</option>
              <option value="Night Shift">Night Shift (8 PM - 5 AM)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="text"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                placeholder="e.g. 09:30 AM"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="text"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                placeholder="e.g. 07:00 PM"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Break Duration</label>
            <input
              type="text"
              name="breakDuration"
              value={formData.breakDuration}
              onChange={handleChange}
              placeholder="e.g. 45 mins"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShiftModal;
