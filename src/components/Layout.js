import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat">
      <Navbar />
      {children}
    </div>
  );
}
