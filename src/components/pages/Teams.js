import React, { useState } from "react";
import Layout from "../Layout";
import AddTeameModal from "../teams/AddTeameModal";
import TeamItems from "../teams/TeamItems";

export default function Teams() {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  return (
    <Layout>
      <div className="px-10 mt-6 flex justify-start ">
        <h1 className="text-2xl text-gray-200 font-bold">Teams</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center bg-sky-500 ml-auto rounded hover:bg-sky-600 text-sm px-2 text-indigo-100"
        >
          + Create
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
        <TeamItems />
      </div>
      {open && <AddTeameModal close={close} />}
    </Layout>
  );
}
