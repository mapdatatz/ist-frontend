import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-6xl mt-24 font-bold">404</div>
      <div className="">Not Found</div>
      <Link to={"/"} className="bg-ist text-white py-1 px-8 mt-1 rounded-lg">
        Go Home
      </Link>
    </div>
  );
}
