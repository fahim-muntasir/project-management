import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateTeamMutation } from "../../features/team/teamApi";

export default function Modal({ close }) {
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  const [createTeam, { isLoading, isSuccess, error: createTeamError }] =
    useCreateTeamMutation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (createTeamError?.data) {
      setError(createTeamError.data);
    }
  }, [createTeamError]);

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess, close]);

  const submitHandlear = (e) => {
    e.preventDefault();
    setError("");
    createTeam({
      creator: user?.email,
      data: {
        teamName,
        description,
        color,
        timestamp: new Date().getTime(),
      },
    });
  };

  return (
    <>
      <div
        onClick={close}
        className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
      ></div>
      <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Team
        </h2>
        <form onSubmit={submitHandlear} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="teamname" className="sr-only">
                Team name
              </label>
              <input
                id="teamname"
                name="teamname"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="teamdescription" className="sr-only">
                Team description
              </label>
              <textarea
                id="teamdescription"
                name="teamdescription"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Team description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center py-2 px-3">
              <label htmlFor="color" className="text-gray-500 text-sm mr-2">
                Select your teame color
              </label>
              <input
                id="color"
                name="color"
                type="color"
                required
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
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
