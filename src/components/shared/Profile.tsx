import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Dismiss from "./Dismiss";
import { AuthContext } from "../../contexts/AuthContext";
import { FiUser } from "react-icons/fi";

export default function Profile({ isVisible, setVisible }: any) {
  const { user, signoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <></>;
  }

  const {
    mobile = "",
    email = "",
    site = {},
  } = user;

  const toggleProfile = () => {
    setVisible(!isVisible);
  };

  const toggleOff = () => {
    setVisible(!isVisible);
  };

  const gotoProfile = () => {
    setVisible(false);
    navigate("/profile");
  };

  const handleSignout = () => {
    signoutUser();
  };

  return (
    <div className="flex items-center z-10">
      {isVisible ? <Dismiss toggleOff={toggleOff} /> : null}
      <div className="ml-3 relative">
        <div>
          <button
            className="max-w-xs flex items-center text-sm border rounded-lg text-white  hover:bg-red-700   focus:outline-none focus:bg-red-700"
            id="user-menu"
            aria-label="User menu"
            onClick={toggleProfile}
            aria-haspopup="true"
          >
            <span className="flex justify-center items-center text-xs  w-8 h-8 p-1 ">
            <FiUser size={20} />
            </span>
          </button>
        </div>

        <div
          className={
            isVisible
              ? "block origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg"
              : "hidden origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg"
          }
        >
          <div
            className="rounded-md bg-white shadow-xs"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <div className="block px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-200 bg-gray-100">
              <h3 className=" font-bold">
               {user?.name}
              </h3>
              <h3>
                <span className="text-xs">{site?.name}</span>
              </h3>
            </div>


            <span className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
              Mobile: {mobile}
            </span>

            <span className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 ">
              Email: {email}
            </span>

            <span className="block px-4 py-2 text-xs border-gray-400  text-gray-700 hover:bg-gray-100">
              Access Level:  {user?.accessLevel}
            </span>
            <div className="flex flex-row justify-between border-t border-gray-200">
              <div className="w-1/2 border-r border-gray-200">
                <button
                  onClick={gotoProfile}
                  className="flex justify-center items-center w-full  focus:outline-none px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user mr-2"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>My Account</span>
                </button>
              </div>
              <div className="w-1/2 ">
                <button
                  onClick={handleSignout}
                  className="flex justify-center items-center w-full focus:outline-none px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-toyota rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-log-out mr-2"
                  >
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}