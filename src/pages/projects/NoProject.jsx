import React from "react";
import noProject from "../assets/no-projects-img.png";

const NoProject = () => {
  return (
    <>
      <div className="p-8 min-h-83.5 border border-bordergray rounded-xl flex flex-col justify-center items-center gap-10">
        <img className="w-33.25" src={noProject} alt="No Projects" />
        <p className="text-base text-heading font-bold">
          Projects have not been assigned yet.
        </p>
      </div>
    </>
  );
};

export default NoProject;
