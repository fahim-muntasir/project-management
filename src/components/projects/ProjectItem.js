import moment from "moment/moment";
import { useState } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { useDeleteProjectMutation } from "../../features/projects/projectsApi";

export default function ProjectItem({ projectData, memberTeams }) {
  const [isOpenAction, setIsOpenAction] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { search } = useSelector((state) => state.filter);
  const [deleteProject] = useDeleteProjectMutation();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PROJECT",
    item: projectData,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const actionOpenCloseHandlear = () => {
    setIsOpenAction((prev) => !prev);
  };

  const deleteHandler = () => {
    deleteProject({
      id: projectData?.id,
      memberTeams,
      status: projectData?.projectStatus,
    });
  };

  const isSearch =
    search !== ""
      ? projectData.projectTitle.toLowerCase().includes(search.toLowerCase())
      : false;

  const teamMembers = [
    {
      id: 1,
      name: "Remy Sharp",
      avatarSrc: "https://avatars.githubusercontent.com/u/72383649?v=4",
    },
    {
      id: 2,
      name: "Travis Howard",
      avatarSrc: "https://avatars.githubusercontent.com/u/72383649?v=4",
    },
    {
      id: 3,
      name: "Cindy Baker",
      avatarSrc: "https://avatars.githubusercontent.com/u/72383649?v=4",
    },
    {
      id: 4,
      name: "Agnes Walker",
      avatarSrc: "https://avatars.githubusercontent.com/u/72383649?v=4",
    },
    {
      id: 5,
      name: "Trevor Henderson",
      avatarSrc: "https://avatars.githubusercontent.com/u/72383649?v=4",
    },
  ];

  const visibleMembers = teamMembers.slice(0, 3); // Show only the first three members
  const additionalMembersCount = teamMembers.length - visibleMembers.length;

  return (
    <>
      <div
        ref={drag}
        className={` ${
          isDragging && "opacity-20"
        } relative flex flex-col items-start p-4 mt-3 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer group ${
          isSearch && "ring ring-purple-500"
        }`}
        draggable="true"
      >
        {projectData?.projectStatus === "backlog" &&
          projectData?.creator?.email === user?.email && (
            <div>
              <button
                onClick={deleteHandler}
                className="absolute top-0 right-2 flex items-center justify-center w-5 h-5 mt-3 mr-2 text-gray-200 rounded hover:bg-red-600 hover:bg-opacity-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                  fill="#ef4444"
                >
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </button>
            </div>
          )}
        <span
          className={`flex items-center h-6 px-3 text-xs font-semibold text-[${projectData?.teamColor}] opacity-100 text-shadow rounded-full bg-[${projectData?.teamColor}] bg-opacity-10 drop-shadow-sm `}
        >
          {projectData?.teamName}
        </span>
        <h4 className="mt-3 text-sm font-medium text-gray-200 ">
          {projectData?.projectTitle}
        </h4>
        <div className="flex items-center  justify-between w-full mt-3 text-xs font-medium text-gray-400">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none">
              {moment(projectData?.timestamp).format("MMM DD")}
            </span>
          </div>

          {/* <div className="flex items-center space-x-[-0.5rem]">
            <img
              className="w-6 h-6 ml-auto rounded-full"
              src={projectData?.creator?.avatar}
              alt="creator"
            />
          </div> */}

          <div className="flex items-center space-x-[-0.5rem]">
            {additionalMembersCount > 0 && (
              <div className="relative" style={{ left: "-0.2rem" }}>
                <div className="w-6 h-6 rounded-full text-sky-500 bg-slate-700 border border-slate-700 flex items-center justify-center">
                  {additionalMembersCount}+
                </div>
              </div>
            )}
            {visibleMembers.map((member) => (
              <div key={member.id} className="relative">
                <img
                  className="w-6 h-6 rounded-full border border-slate-700"
                  src={member.avatarSrc}
                  alt={member.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
