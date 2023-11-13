import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuthCheck from "./components/hooks/useAuthCheck";
import PablicRoute from "./components/PablicRoute";
import Login from "./components/pages/Login";
import Projects from "./components/pages/Projects";
import Teams from "./components/pages/Teams";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    const authChecked = useAuthCheck();
    
    return authChecked ? (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PablicRoute />}>
                    <Route path="/" element={<Login />} />
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/projects" element={<Projects />} />
                </Route>
            </Routes>
        </BrowserRouter>
    ) : (
        <div className="w-full h-screen flex justify-center items-center text-7xl">
            <i className="fa-sharp fa-solid fa-spinner animate-spin text-gray-400"></i>
        </div>
    );
}

export default App;
