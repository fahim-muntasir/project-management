import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  teamMembersApi,
  useAddMemberMutation,
} from "../../features/teamMembers/teamMembersApi";
import { useGetUserQuery } from "../../features/users/userApi";
import isValidEmail from "../../utils/isValidEmail";

export default function AddMemberModal({ teamData, close }) {
  const [memberEmail, setMemberEmail] = useState("");
  const [checkUser, setCheckUser] = useState(false);
  const [willAdd, setWillAdd] = useState(undefined);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { teamId, teamName, description, teamColor, teamCreationDate } =
    teamData || {};

  const { data: memberData } = useGetUserQuery(memberEmail, {
    refetchOnMountOrArgChange: true,
    skip: !checkUser,
  });

  const [addMember, { isSuccess: isAddMemberSuccess }] = useAddMemberMutation();

  useEffect(() => {
    if (isAddMemberSuccess) {
      close();
    }
  });

  useEffect(() => {
    if (memberData?.length > 0 && memberData?.[0]?.id) {
      dispatch(
        teamMembersApi.endpoints.getTeamMemberByTeamIdAndUserEmail.initiate(
          {
            teamId,
            email: memberEmail,
          },
          { forceRefetch: true }
        )
      )
        .unwrap()
        .then((data) => {
          setWillAdd(data);
        })
        .catch((err) => {
          setError("There was a problem!");
        });
    }
  }, [memberData, dispatch, memberEmail, teamId]);

  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doSearch = (value) => {
    setError("");
    if (isValidEmail(value)) {
      setCheckUser(true);
      setMemberEmail(value);
    } else {
      setError("This is not a valid email!");
    }
  };

  const inputHandler = debounceHandler(doSearch, 500);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember({
      teamId,
      teamName,
      teamColor,
      description,
      teamCreationDate,
      teamMemberEmail: memberEmail,
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
          Add Team Member
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="teamname" className="sr-only">
                Enter member email address
              </label>
              <input
                id="teamname"
                name="teamname"
                type="text"
                required
                className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm ${
                  (error || willAdd?.length > 0 || memberData?.length === 0) &&
                  "border-red-500 focus:border-red-500"
                } ${
                  willAdd !== undefined &&
                  willAdd?.length === 0 &&
                  memberData?.length > 0 &&
                  error === "" &&
                  "border-green-500 focus:border-green-500"
                }`}
                placeholder="Enter member email address"
                onChange={(e) => inputHandler(e.target.value)}
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              {willAdd?.length > 0 && error === "" && (
                <p className="text-xs text-red-500">
                  This user alrady added in this team!
                </p>
              )}

              {memberData?.length === 0 && error === "" && (
                <p className="text-xs text-red-500">This user not found!</p>
              )}
            </div>
          </div>

          <div>
            <button
              disabled={
                willAdd === undefined ||
                willAdd?.length > 0 ||
                memberData?.length === 0 ||
                error !== ""
              }
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
