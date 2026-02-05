import React from "react";

const AttendanceStatsCard = ({ title, value, image, isList = false }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-base font-medium text-black mb-9">{title}</h3>

      <div className="flex items-center justify-between gap-2">
        {/* Value Section */}
        <div>
          {isList ? (
            <ul className="space-y-2.5">
              {value.map((item, index) => (
                <li key={index} className="text-xl font-bold text-black flex items-center gap-2 leading-none">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xl font-bold text-black">{value}</p>
          )}
        </div>

        {/* Image Section */}
        <div className="shrink-0">
          <img src={image} alt={title} className="w-27.5 h-27.5 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default AttendanceStatsCard;