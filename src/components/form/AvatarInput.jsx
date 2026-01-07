const AvatarInput = ({ label, name, accept, maxSize, value, onChange }) => {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > maxSize) {
      alert("File size should be less than 1MB");
      return;
    }

    onChange(name, file);
  };

  return (
    <div className="flex items-center gap-4">
      <img
        src="https://i.pravatar.cc/150?img=32"
        alt="avatar"
        className="w-24 h-24 rounded-md object-cover"
      />

      <div>
        <label className="block font-medium mb-1"></label>

        <label className="cursor-pointer text-xs font-medium text-black border border-[#E5E7EB] rounded-[4px] px-[8px] py-[12px] ">
          Change Avatar
          <input
            type="file"
            accept={accept}
            onChange={handleFile}
            className="hidden"
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
