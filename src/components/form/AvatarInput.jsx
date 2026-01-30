const AvatarInput = ({
  label,
  name,
  accept,
  maxSize,
  value,
  onChange,
  disabled = false,   
}) => {
  const handleFile = (e) => {
    if (disabled) return; 

    const file = e.target.files[0];
    if (!file) return;

    if (file.size > maxSize) {
      alert("File size should be less than 1MB");
      return;
    }

    onChange(name, file);
  };

  return (
    <div
      className={`flex items-center gap-4 ${
        disabled ? "opacity-60" : ""
      }`}
    >
      <img
        src={value || "https://i.pravatar.cc/150?img=32"}
        alt="avatar"
        className="w-24 h-24 rounded-md object-cover"
      />

      <div>
     

        <label
          className={`text-xs font-medium border rounded-[4px] px-[8px] py-[12px]
            ${
              disabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "cursor-pointer text-black border-[#E5E7EB]"
            }
          `}
        >
          Change Avatar
          <input
            type="file"
            accept={accept}
            onChange={handleFile}
            className="hidden"
            disabled={disabled}  
          />
        </label>

        <p className="text-xs text-gray-500 mt-5">
          JPG, GIF or PNG. 1MB max.
        </p>
      </div>
    </div>
  );
};

export default AvatarInput;
