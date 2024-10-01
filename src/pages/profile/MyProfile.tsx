import {
  BarChartOutlined,
  CheckSquareTwoTone,
  CloseSquareTwoTone,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FiEdit, FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import UpdateDetails from "./components/UpdateDetails";
import UpdatePassword from "./components/UpdatePassword";
import { GoChevronLeft } from "react-icons/go";
import { Link } from "react-router-dom";

export default function MyProfile() {
  const [detailsModal, setDetailsModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { user, signoutUser } = useContext(AuthContext);


  return (
    <>
      <button
        onClick={() => window.history.back()}
        className="bg-white flex items-center border-gray-300 py-2 px-2 hover:text-ist-dark w-full"
      >
        <div className="">
          <GoChevronLeft size={20} />
        </div>
        <div className="mx-1">Back</div>
      </button>
      <div className="m-2 bg-white">
        <div className="flex justify-between bg-white m-1 p-2">
          <div className="">My Profile</div>
          <div className="flex">
            <button
              onClick={() => setDetailsModal(true)}
              className="rounded-md flex justify-center items-center border border-gray-200 px-2 py-1 focus:outline-none hover:bg-gray-200"
            >
              <FiEdit />
              <span className="ml-2">Details</span>
            </button>
            <button
              onClick={() => setPasswordModal(true)}
              className="rounded-md flex justify-center items-center border ml-2 border-gray-200 px-2 py-1 focus:outline-none hover:bg-gray-200"
            >
              <RiLockPasswordLine />
              <span className="ml-2">Password</span>
            </button>
            <UpdateDetails
              isVisible={detailsModal}
              isLoading={isLoading}
              setVisible={setDetailsModal}
            />

            <UpdatePassword
              isVisible={passwordModal}
              isLoading={isLoading}
              setVisible={setPasswordModal}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 m-4">
          <div className="col-span-12 sm:col-span-6 md:col-span-3 bg-white border rounded-lg  mb-4">
            <div className="flex flex-col justify-between items-center py-2">
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gray-300">
                <span className="text-lg text-blue-900"><FiUser size={40} /></span>
              </div>
              <span className="text-blue-800 text-sm mt-2 font-bold">
                {user?.name}
              </span>
              <span className="text-gray-600 text-sm ">{user?.email}</span>
              <span className="text-gray-600 text-sm ">{user?.mobile}</span>
    
            </div>
            <div className="flex justify-between items-center border-t bg-white rounded-br-lg rounded-bl-lg">
              <div className="flex items-center justify-center py-2 w-full text-center text-xs">
                <span className="mr-2">Account Status:</span>
                {user?.isActive ? (
                  <div className="flex justify-center items-center">
                    <div className="flex justify-center items-center">
                      <CheckSquareTwoTone twoToneColor="#52c41a" />
                    </div>
                    <div className="ml-1 text-green-500">Active</div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center">
                    <div className="flex justify-center items-center">
                      <CloseSquareTwoTone twoToneColor="#ff0000" />
                    </div>
                    <div className="ml-1 text-red-500">In Active</div>
                  </div>
                )}
              </div>
            </div>
              <div className="flex justify-center items-center mb-2">
                <button
                  className="bg-gray-100 py-1 px-6 rounded-md hover:bg-red-100"
                  onClick={() => signoutUser()}
                >
                  Sign out
                </button>
              </div>

          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-9 bg-white border rounded-lg flex flex-col justify-center items-center mb-4">
            <div className="flex flex-col justify-center items-center text-gray-600 p-8">
              <BarChartOutlined />
              <div className="">Account Metrics</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
