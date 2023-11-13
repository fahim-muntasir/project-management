import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Layout from "../Layout";
import Backlog from "../projects/Backlog/Backlog";
import Blocked from "../projects/Blocked/Blocked";
import Doing from "../projects/Doing/Doing";
import Done from "../projects/Done/Done";
import Ready from "../projects/Ready/Ready";
import Review from "../projects/Review/Review";
import SearchBox from "../SearchBox";
import AddProjectModal from "../projects/AddProjectModal";

export default function Projects() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <Layout>
      <DndProvider backend={HTML5Backend}>
        <div className="px-10 mt-6 flex justify-start">
          <h1 className="text-2xl font-bold text-gray-200">Project</h1>
          <button
            onClick={open}
            className="flex items-center justify-center bg-sky-500 ml-auto rounded hover:bg-sky-600 text-sm px-2 text-indigo-100"
          >
            + Create
          </button>
        </div>
        <div className="px-10 mt-4">
          <SearchBox />
        </div>
        <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
          <Backlog />
          <Ready />
          <Doing />
          <Review />
          <Blocked />
          <Done />
          <div className="flex-shrink-0 w-6"></div>
        </div>
      </DndProvider>
      {isOpen && <AddProjectModal close={close} />}
    </Layout>
  );
}
