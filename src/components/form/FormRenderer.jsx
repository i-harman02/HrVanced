import Input from "./Input";
import AvatarInput from "./AvatarInput";

const FormRenderer = ({ fields, formData, setFormData, readOnly = false }) => {
  const handleChange = (e) => {
    if (readOnly) return; // ⛔ block edits
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name, file) => {
    if (readOnly) return; // ⛔ block avatar change
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((field) => (
        <div
          key={field.name}
          className={field.colSpan === 2 ? "md:col-span-2" : ""}
        >
          {field.type === "avatar" ? (
            <AvatarInput
              {...field}
              value={formData[field.name]}
              onChange={handleFileChange}
              disabled={readOnly}          // ✅ pass down
            />
          ) : (
            <Input
              {...field}
              value={formData[field.name] || ""}
              onChange={handleChange}
              readOnly={readOnly}          // ✅ pass down
              disabled={readOnly}          // ✅ pass down
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FormRenderer;
