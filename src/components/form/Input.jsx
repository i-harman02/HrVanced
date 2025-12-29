const Input = ({ label, type = "text", name, value, onChange }) => {
  return (
    <>
     <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded-md px-3 py-2"
      />
    </div>
    </>

  );
};

export default Input;
