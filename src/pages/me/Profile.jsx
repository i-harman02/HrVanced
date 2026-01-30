import { useSelector } from "react-redux";
import FormRenderer from "../../components/form/FormRenderer";
import { formSections } from "../../configs/employeeForms/formSections";

const Profile = () => {
  const { employees, loading } = useSelector((state) => state.employee);

  const employee = employees?.[4]; 

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>No employee data</p>;

  const formData = {
    firstName: employee.name || "",
    lastName: employee.lastName || "",
    email: employee.email || "",
    designation: employee.designation || "",
    role: employee.assignRole || "",
    appraisalDate: employee.appraisalDate
      ? employee.appraisalDate.split("T")[0]
      : "",
    dateOfBirth: employee.birthday
      ? employee.birthday.split("T")[0]
      : "",
    salary: employee.employeeSalary || "",
    address: employee.address || "",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="mb-8 md:mb-0">
        <h2 className="text-base font-bold mb-3">
          Organization Name
        </h2>
        <p className="text-sm text-gray-500">
          Use a permanent address where you can receive mail.
        </p>
      </div>

      <div>
        <FormRenderer
          fields={formSections.profileInfo}
          formData={formData}
          readOnly={true}
        />
      </div>
    </div>
  );
};

export default Profile;
