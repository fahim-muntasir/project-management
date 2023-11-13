import React from "react";

export default function Error({ message }) {
    return (
        <p className=" bg-red-200 px-3 py-2 rounded-md text-red-500 ">
            {message}
        </p>
    );
}
