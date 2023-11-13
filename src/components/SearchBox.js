import React from "react";
import { useDispatch } from "react-redux";
import { search } from "../features/filters/filterSlice";

export default function SearchBox() {
  const dispatch = useDispatch();

  const debounceHandler = (fn, delay) => {
    let timeout;
    return (...arg) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...arg);
      }, delay);
    };
  };

  const doSearch = (value) => {
    dispatch(search(value));
  };

  const searchHandler = debounceHandler(doSearch, 500);

  return (
    <input
      className="flex items-center py-2 px-4 text-sm bg-slate-800 focus:bg-transparent w-80 border text-gray-200 border-slate-700 rounded-lg focus:outline-none"
      type="search"
      placeholder="Search project…"
      onChange={(e) => searchHandler(e.target.value)}
    />
  );
}
