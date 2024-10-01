import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function AdminLink({ children, icon, to }: any) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: false });

  return (
    <div
      className={`border-r-2 ${
        match ? "border-ist-dark bg-gray-50" : "border-gray-200 "
      }`}
    >
      <Link
        to={to}
        className={`hover:text-ist-dark ${
          match ? "text-ist-dark" : "text-gray-900"
        }`}
      >
        <div className="flex flex-col py-4 px-2  items-center">
          <div className="">{icon}</div>
          <div className="" style={{ fontSize: 12 }}>
            {children}
          </div>
        </div>
      </Link>
    </div>
  );
}