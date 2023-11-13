import React from "react";
import { useDrop } from "react-dnd";
import { useEditProjectMutation } from "../../../features/projects/projectsApi";
import ProjectItem from "../ProjectItem";
import EmptyItem from "../EmptyItem";

export default function ReadyItems({ readyProjects, userTeams }) {
  const [editProject] = useEditProjectMutation();

  const editProjecthandler = (item) => {
    editProject({
      memberTeams: userTeams,
      currentStatus: item?.projectStatus,
      id: item?.id,
      data: {
        teamId: item?.teamId,
        projectTitle: item?.projectTitle,
        creator: item?.creator,
        teamColor: item?.teamColor,
        teamName: item?.teamName,
        projectStatus: "ready",
        timestamp: 1664015104908,
      },
    });
  };

  // dnd code
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PROJECT",
    drop: (item) => editProjecthandler(item),
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  }));

  let content = null;

  if (readyProjects?.length > 0) {
    content = readyProjects.map((project) => (
      <ProjectItem key={project.id} projectData={project} />
    ));
  }

  if (readyProjects?.length === 0) {
    content = <EmptyItem />;
  }

  return (
    <div
      id="ready"
      ref={drop}
      className={`flex flex-col pb-2 overflow-autopx-2 px-2 ${
        isOver && "ring ring-dotted ring-purple-400 opacity-70"
      }`}
    >
      {content}
    </div>
  );
}
