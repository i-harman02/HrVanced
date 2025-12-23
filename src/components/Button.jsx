import React from "react";

const MyButton = ({ className, type, children }) => {
  let buttonType;
  if (type === "primary") {
    buttonType = "bg-blue-400 text-3xl";
  } else if (type === "secondary") {
    buttonType = "bg-gray-400 text-lg";
  }
  return (
    <button className={`${buttonType} ${className && className} bg-amber-400`}>
      {children}
    </button>






  );
};

export default MyButton;