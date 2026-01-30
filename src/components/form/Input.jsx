const Input = ({ label, name, type, value, onChange, readOnly, disabled }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
      />
    </div>
  );
};

export default Input;
