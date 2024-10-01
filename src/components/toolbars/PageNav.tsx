import { RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function PageNav({ title,link }: any) {
  return (
    <Link
      to={`${link}`}
      className="bg-white flex items-center border-gray-300 py-2 px-2 hover:text-ist-dark"
    >
      <RiMenuFill />
      <div className="mx-1">{title}</div>
    </Link>
  );
}
