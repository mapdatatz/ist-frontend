import { IoReload } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";

export default function Denied() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center content-center mt-40">
      <img className="mx-auto h-10 w-auto mb-8" src={logo} alt="" />
      <div className="text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-alert-triangle"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />
        </svg>
      </div>
      <div className="">
        <p className="text-gray-500 mt-2 mb-3 text-lg">
          Sorry, Your IST account is not active
        </p>
        <p className="text-center text-gray-500 my-4">
          Please contact Administrator
        </p>
        <div className="text-center text-gray-500 text-xs underline -mt-3">
          <a
            href="https://ist.co.tz"
            target={"_blank"}
            rel="noreferrer"
          >
            https://ist.co.tz
          </a>
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <div className="border-t w-24"></div>
        <div className="mx-2 text-xs -mt-2">OR</div>
        <div className="border-t w-24"></div>
      </div>

      <NavLink
        to={"/"}
        className="flex justify-center items-center bg-ist px-4 py-1 mt-4 rounded-md hover:bg-ist-dark"
      >
        <div className="">
          <IoReload color={"#FFF"} />
        </div>
        <div className="text-white ml-2 mb-1">Retry</div>
      </NavLink>
    </div>
  );
}
