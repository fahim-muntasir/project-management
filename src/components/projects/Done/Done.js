import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProjectsQuery } from "../../../features/projects/projectsApi";
import { useGetTeamMemberTeamsQuery } from "../../../features/teamMembers/teamMembersApi";
import DoneItems from "./DoneItems";

export default function Done() {
  const { user } = useSelector((state) => state?.auth) || {};
  const { data: userTeams, isLoading } = useGetTeamMemberTeamsQuery(
    user?.email
  );
  const [isGetProjects, setIsGetProjects] = useState(false);
  const { data: projects } = useGetProjectsQuery(
    { status: "done", memberTeams: userTeams },
    {
      skip: !isGetProjects,
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (userTeams?.length > 0) {
      setIsGetProjects(true);
    }
  }, [userTeams, dispatch]);

  return (
    !isLoading && (
      <div className="flex flex-col flex-shrink-0 w-72">
        <div className="flex items-center justify-between flex-shrink-0 h-10 px-2">
          <span className="block text-sm font-semibold text-gray-200">
            Done
          </span>
          <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-sky-500 bg-slate-700 rounded">
            {projects?.length > 0 ? projects.length : 0}
          </span>
        </div>

        <DoneItems doneProjects={projects} userTeams={userTeams} />
      </div>
    )
  );
}
