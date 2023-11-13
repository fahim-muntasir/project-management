import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import { userLoggedOut } from "../features/auth/authSlice";

export default function Navbar() {
  const projects = useMatch("/projects");
  const teams = useMatch("/teams");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logouthandlear = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("auth");
  };

  return (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white">
      <div>
        <Link
          className={`mx-2 font-semibold ${
            projects ? "text-sky-500" : "text-gray-600"
          } hover:text-sky-500`}
          to="/projects"
        >
          Projects
        </Link>
        <Link
          className={`mx-2 font-semibold ${
            teams ? "text-sky-500" : "text-gray-600"
          } hover:text-sky-500`}
          to="/teams"
        >
          Team
        </Link>
      </div>
      <button
        onClick={logouthandlear}
        className="text-red-500 font-semibold underline mx-2"
      >
        LogOut
      </button>
      <div className="flex items-center justify-center ml-auto gap-2">
        <span className="text-sm text-gray-600 font-semibold ">
          {user?.name}
        </span>
        {user?.avatar ? (
          <img
            className=" w-8 h-8 overflow-hidden rounded-full cursor-pointer"
            src={user.avatar}
            alt=""
          />
        ) : (
          <img
            className=" w-8 h-8 overflow-hidden rounded-full cursor-pointer"
            src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
            alt=""
          />
        )}
      </div>
    </div>
  );
}
