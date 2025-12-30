import Input from "./Input";

const FormRenderer = ({ fields, formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (                                                                              
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((field) => (
        <Input
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          value={formData[field.name] || ""}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default FormRenderer;
