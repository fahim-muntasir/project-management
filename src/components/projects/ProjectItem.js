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
                onClick={actionOpenCloseHandlear}
                className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-200 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
              {isOpenAction && (
                <div className="absolute bg-white right-5 shadow-md top-8">
                  <ul>
                    <li
                      onClick={deleteHandler}
                      className="hover:bg-gray-100 p-2 flex text-sm items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                      >
                        <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
                      </svg>
                      Delete project
                    </li>
                  </ul>
                </div>
              )}
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
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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

          <img
            className="w-6 h-6 ml-auto rounded-full"
            src={projectData?.creator?.avatar}
            alt="creator"
          />
        </div>
      </div>
    </>
  );
}
