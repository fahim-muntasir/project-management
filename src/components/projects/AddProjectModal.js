import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { useCreateProjectMutation } from "../../features/projects/projectsApi";
import { useGetTeamMemberTeamsQuery } from "../../features/teamMembers/teamMembersApi";

export default function AddProjectModal({ close }) {
  const [selectTeam, setTeam] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");
  const { user } = useSelector((state) => state.auth) || {};
  const { data: userTeams, isLoading } = useGetTeamMemberTeamsQuery(
    user?.email
  );
  const [
    createProject,
    { isLoading: projectCreationLoading, isSuccess: createProjectSuccess },
  ] = useCreateProjectMutation() || [];

  useEffect(() => {
    if (createProjectSuccess) {
      close();
    }
  }, [createProjectSuccess, close]);

  let options = null;
  if (isLoading) {
    options = [{ value: "Please waite...", label: "" }];
  }
  if (userTeams?.length === 0) {
    options = [];
  }
  if (userTeams?.length > 0) {
    options = userTeams.map((team) => ({
      value: team?.teamId,
      label: team?.teamName,
      teamColor: team?.teamColor,
      teamName: team?.teamName,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectTeam) {
      createProject({
        memberTeams: userTeams,
        data: {
          teamId: selectTeam?.value,
          projectTitle,
          creator: user,
          teamColor: selectTeam?.teamColor,
          teamName: selectTeam?.teamName,
          projectStatus: "backlog",
          timestamp: new Date().getTime(),
        },
      });
    } else {
      alert("Please select a team!");
    }
  };

  return (
    <>
      <div
        onClick={close}
        className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
      ></div>
      <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Project
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="teamname" className="sr-only">
                Project Title
              </label>
              <input
                id="teamname"
                name="teamname"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Project Title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
            </div>

            <div className="flex items-center pt-2">
              <label
                htmlFor="color"
                className="text-gray-500 text-sm mr-2 sr-only"
              >
                Select your teame color
              </label>
              <Select
                className="appearance-none rounded-none relative block w-full placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                defaultValue={selectTeam}
                onChange={setTeam}
                options={options}
                placeholder="Select a team"
              />
            </div>
          </div>

          <div>
            <button
              disabled={projectCreationLoading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
