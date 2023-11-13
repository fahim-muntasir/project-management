import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import Error from "../Error";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { data, isLoading, error: loginError }] = useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (loginError?.data) {
      setError(loginError.data);
    }

    if (data?.accessToken && data?.user) {
      navigate("/teams");
    }
  }, [data, loginError, navigate]);

  const submitHandlear = (e) => {
    e.preventDefault();
    setError("");
    login({ email, password });
  };

  return (
    <div className="grid place-items-center h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-[500px] space-y-8 p-10 shadow-[0.2rem_0.2rem_4rem_rgba(0,0,0,.1)] bg-white">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome Back!
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submitHandlear}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>
            {error && <Error message={error} />}
          </form>
        </div>
      </div>
    </div>
  );
}
