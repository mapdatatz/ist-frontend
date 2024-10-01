import { useContext } from "react";
import { TbCalendarCog, TbColorFilter, TbUserPlus } from "react-icons/tb";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import NoAccess from "../../components/shared/NoAccess";
import { message } from "antd";
import { FiSettings } from "react-icons/fi";

export default function Manage() {
  const { user } = useContext(AuthContext);
  if (!user?.isAdmin) {
    message.error("You Can't Access This Module");
    return <NoAccess />;
  }
  return (
    <div className="m-1">
      <div className="grid grid-cols-12 gap-2">
        <Link
          to={"/manage/users"}
          className="col-span-12 sm:col-span-2 border border-red-200 flex justify-center items-center p-4 bg-red-100 hover:bg-red-200"
        >
          <div className="flex flex-col justify-center items-center">
            <TbUserPlus size={40} />
            Users
          </div>
        </Link>

        <Link
          to={"/manage/memberships"}
          className="col-span-12 sm:col-span-2 border border-red-200 flex justify-center items-center p-4 bg-red-100 hover:bg-red-200"
        >
          <div className="flex flex-col justify-center items-center">
            <TbColorFilter size={40} />
            Memberships
          </div>
        </Link>
        <Link
          to={"/manage/years"}
          className="col-span-12 sm:col-span-2 border border-red-200 flex justify-center items-center p-4 bg-red-100 hover:bg-red-200"
        >
          <div className="flex flex-col justify-center items-center">
            <TbCalendarCog size={40} />
            Years
          </div>
        </Link>

        <Link
          to={"/manage/institute"}
          className="col-span-12 sm:col-span-2 border border-red-200 flex justify-center items-center p-4 bg-red-100 hover:bg-red-200"
        >
          <div className="flex flex-col justify-center items-center">
            <FiSettings size={38} />
            IST
          </div>
        </Link>
      </div>
    </div>
  );
}
