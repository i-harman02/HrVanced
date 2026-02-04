import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoMdArrowBack } from 'react-icons/io';

const EmployeeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { employees } = useSelector((state) => state.employee);
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const foundEmployee = employees.find(emp => emp._id === id);
        if (foundEmployee) {
            setEmployee(foundEmployee);
        }
    }, [id, employees]);

    if (!employee) {
        return (
            <div className="p-8 text-center text-gray-500">
                Employee not found or loading...
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-6 font-medium"
            >
                <IoMdArrowBack size={20} />
                Back to List
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header Section */}
                <div className="bg-blue-600 px-8 py-10 text-white">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white/30 capitalize">
                            {employee.name?.[0]}{employee.lastName?.[0]}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{employee.name} {employee.lastName}</h1>
                            <p className="text-blue-100 text-lg">{employee.designation}</p>
                            <div className="flex gap-3 mt-2">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                                    ID: {employee.employeeId}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${employee.status === 'Active' ? 'bg-green-400/30 text-green-50' : 'bg-red-400/30 text-red-50'}`}>
                                    {employee.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    {/* Account Details */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Account Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem label="Email" value={employee.email} />
                            <DetailItem label="Role" value={employee.role} />
                            <DetailItem label="Assign Role" value={employee.assignRole} />
                            <DetailItem label="Join Date" value={employee.dateOfJoining ? new Date(employee.dateOfJoining).toLocaleDateString() : 'N/A'} />
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Personal Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem label="Gender" value={employee.gender || 'N/A'} />
                            <DetailItem label="Birthday" value={employee.birthday ? new Date(employee.birthday).toLocaleDateString() : 'N/A'} />
                            <DetailItem label="Phone" value={employee.personalInformation?.telephones?.[0] || 'N/A'} />
                            <DetailItem label="Nationality" value={employee.personalInformation?.nationality || 'N/A'} />
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Emergency Contact</h2>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">Primary Contact</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                <div><span className="font-medium">Name:</span> {employee.emergencyContact?.primary?.name || 'N/A'}</div>
                                <div><span className="font-medium">Rel:</span> {employee.emergencyContact?.primary?.relationship || 'N/A'}</div>
                                <div className="col-span-2"><span className="font-medium">Phone:</span> {employee.emergencyContact?.primary?.phone?.[0] || 'N/A'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Bank Information */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Bank Information</h2>
                        <div className="grid grid-cols-1 gap-3">
                            <DetailItem label="Bank Name" value={employee.bankInformation?.bankName || 'N/A'} />
                            <DetailItem label="Account Number" value={employee.bankInformation?.bankAccountNumber || 'N/A'} />
                            <DetailItem label="IFSC Code" value={employee.bankInformation?.ifscCode || 'N/A'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div>
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
        <p className="text-gray-700 font-medium">{value}</p>
    </div>
);

export default EmployeeDetail;