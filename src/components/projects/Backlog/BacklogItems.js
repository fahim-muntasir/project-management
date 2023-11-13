import React from "react";
import { useDrop } from "react-dnd";
import { useEditProjectMutation } from "../../../features/projects/projectsApi";
import ProjectItem from "../ProjectItem";
import EmptyItem from "../EmptyItem";

export default function BacklogItems({ backlogProjects, userTeams }) {
  const [editProject] = useEditProjectMutation();

  let editProjecthandler = (item) => {
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
        projectStatus: "backlog",
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
  if (backlogProjects?.length > 0) {
    content = backlogProjects.map((project) => (
      <ProjectItem
        key={project.id}
        projectData={project}
        memberTeams={userTeams}
      />
    ));
  }

  if (backlogProjects?.length === 0) {
    content = <EmptyItem />;
  }

  return (
    <div
      ref={drop}
      className={`flex flex-col pb-2 overflow-autopx-2 overflow-y-auto px-2 h-full ${
        isOver && "ring ring-dotted ring-purple-400 opacity-70"
      }`}
    >
      {content}
    </div>
  );
}
