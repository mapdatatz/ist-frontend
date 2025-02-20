import { message } from "antd";
import { useContext, useEffect, useState } from "react";

import UpdateInstitute from "./components/UpdateInstitute";
import { useQuery } from "@tanstack/react-query";
import Something from "../../components/shared/Something";
import BackNav from "../../components/toolbars/BackNav";
import { AuthContext } from "../../contexts/AuthContext";
import NoAccess from "../../components/shared/NoAccess";
import { handleFetchInstitute } from "../../api/institute";
import { FiEdit } from "react-icons/fi";
import logo from "../../assets/images/logo.jpg";
import sign from "../../assets/images/sign.png";

export default function Institute() {
  const { user } = useContext(AuthContext);
  const [updateModal, setUpdateModal] = useState<boolean>(false);

  const {
    data: institute,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["institute"],
    queryFn: () => handleFetchInstitute(),
  });

  useEffect(() => {}, [institute]);

  if (!user?.isAdmin) {
    message.error("You Can't Access This Module");
    return <NoAccess />;
  }
  return (
    <div className="bg-gray-100">
      <BackNav link={`/admin`} />
      <div className="bg-white m-1">
        <div className="flex flex-col sm:flex-row justify-between border-b p-2">
          <div className="flex flex-col mb-2 sm:mb-0">
            <div className="font-bold">{institute?.name}</div>
            <div className="text-gray-600">Manage Details</div>
          </div>

          <div className="flex">
            <button
              onClick={() => setUpdateModal(true)}
              className="flex mx-2 justify-center items-center border px-4 py-1 h-10 hover:bg-gray-100"
            >
              <FiEdit size={18} /> <span className="mx-2">Update</span>
            </button>
          </div>
        </div>
        {isError ? (
          <Something refetch={refetch} isFetching={isFetching} />
        ) : (
          <div className="p-2">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-6">
                <div className="text-3xl font-bold mb-2">
                  Name: {institute?.name}
                </div>
                <div className="flex items-center border-b">
                  <div className="font-bold w-32">Country:</div>
                  {institute?.country || "-"}
                </div>
                <div className="flex items-center border-b">
                  <div className="font-bold w-32">Region:</div>
                  {institute?.region || "-"}
                </div>
                <div className="flex items-center border-b">
                  <div className="font-bold w-32">Municipal: </div>
                  {institute?.municipal || "-"}
                </div>
                <div className="flex items-center border-b">
                  <div className="font-bold w-32">Ward:</div>
                  {institute?.ward || "-"}
                </div>
                <div className="flex items-center border-b">
                  <div className="font-bold w-32">Street: </div>
                  {institute?.street || "-"}
                </div>
                <div className="flex items-center border-b">
                  <div className="font-bold w-32">Mobile: </div>
                  {institute?.mobile || "-"}
                </div>
                <div className="flex items-center border-b">
                  <div className="font-bold w-32">Email: </div>
                  {institute?.email || "-"}
                </div>
                <div className="flex items-center border-b">
                  <div className="font-bold w-32">Website: </div>
                  {institute?.website || "-"}
                </div>
                <div className="flex items-center border-b">
                  <div className="font-bold w-32">Toll Free: </div>
                  {institute?.tollfree || "-"}
                </div>
                <div className="flex items-center border-b">
                  <div className="font-bold w-32">Postal Code:</div>
                  {institute?.postal || "-"}
                </div>
                <div className="flex items-center border-b">
                  <div className="font-bold w-32">Block :</div>
                  {institute?.block || "-"}
                </div>
                <div className="flex items-center border-b">
                  <div className="font-bold w-32">Plot Number :</div>
                  {institute?.plot || "-"}
                </div>
                <div className="flex items-center border-b">
                  <div className="font-bold w-32">Website :</div>
                  {institute?.website ? (
                    <a
                      href={institute?.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 text-xs"
                    >
                      {institute?.website}
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
                <div className="flex border-b">
                  <div className="font-bold w-32">Toll-Free :</div>
                  {institute?.tollfree || "-"}
                </div>

                <div className="border-b pb-2 mb-2 mt-4">Official Logo</div>
                <div className="mb-4">
                  <img src={logo} width={150} alt="" />
                </div>
                <div className="border-b pb-2 mb-2">Treasurer Signature</div>
                <img src={sign} width={100} alt="" />
              </div>
            </div>
          </div>
        )}
      </div>

      <UpdateInstitute
        isVisible={updateModal}
        setVisible={setUpdateModal}
        refetch={refetch}
        selected={institute}
      />
    </div>
  );
}
