import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function LinearLink({ to, title }: any) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: false });

  console.log(match, to);

  return (
    <div
      className={`mr-1 ${
        match
          ? "text-ist-dark p-2 border-b border-ist-dark bg-gray-200 hover:text-ist-dark hover:cursor-pointer hover:bg-gray-200"
          : "text-gray-500 p-2 hover:text-ist-dark  hover:cursor-pointer hover:bg-gray-200 "
      }`}
    >
      <Link
        to={to}
        className={`hover:text-ist-dark ${
          match ? "text-ist-dark" : "text-gray-900"
        }`}
      >
        <div className="flex flex-col px-2 items-center">{title}</div>
      </Link>
    </div>
  );
}