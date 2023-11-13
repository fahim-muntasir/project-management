import React from "react";
import { useDrop } from "react-dnd";
import { useEditProjectMutation } from "../../../features/projects/projectsApi";
import ProjectItem from "../ProjectItem";
import EmptyItem from "../EmptyItem";

export default function DoneItems({ doneProjects, userTeams }) {
  const [editProject] = useEditProjectMutation();
  // dnd code
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PROJECT",
    drop: (item) => {
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
          projectStatus: "done",
          timestamp: 1664015104908,
        },
      });
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  }));

  let content = null;

  if (doneProjects?.length > 0) {
    content = doneProjects.map((project) => (
      <ProjectItem key={project.id} projectData={project} />
    ));
  }

  if (doneProjects?.length === 0) {
    content = <EmptyItem />;
  }

  return (
    <div
      ref={drop}
      className={`flex flex-col pb-2 overflow-autopx-2 px-2 ${
        isOver && "ring ring-dotted ring-purple-400 opacity-70"
      }`}
    >
      {" "}
      {content}{" "}
    </div>
  );
}
