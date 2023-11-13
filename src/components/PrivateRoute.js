import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const { accessToken, user } = useSelector((state) => state.auth);
    return accessToken && user ? <Outlet /> : <Navigate to="/" />;
}
