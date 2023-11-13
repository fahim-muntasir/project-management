import React from "react";

export default function Blank() {
    return (
        <div className=" animate-pulse relative flex flex-col p-4 mt-3 bg-gray-100 rounded-lg cursor-pointer bg-opacity-100 group hover:bg-opacity-100">
            <div className="animate-pulse">
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-6 bg-slate-500 rounded-lg w-16"></div>
                    <div className="space-y-3 w-full">
                        <div className="h-2 bg-slate-500 rounded block"></div>
                        <div className="h-2 bg-slate-500 rounded block"></div>
                    </div>
                    <div className="h-2 bg-slate-500 rounded-lg w-16"></div>
                </div>
            </div>
        </div>
    );
}
