import React from "react";
import SearchFilter from "../components/Search";
import NoProject from "../components/NoProject";
import ProjectAssigned from "../components/ProjectAssigned";
import { PiFalloutShelter } from "react-icons/pi";

const Projects = () => {
  const hasProjects = true;
  return (
    <>
      <div className="p-4 md:p-6 lg:p-8 border-0 lg:border bg-white border-gray-200 lg:rounded-xl min-h-full flex flex-col">
        <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-heading leading-tight">
            Projects
          </h1>
          {hasProjects && <SearchFilter />}
        </div>

        {hasProjects ? <ProjectAssigned/> : <NoProject/>}
      </div>
    </>
  );
};

export default Projects;
