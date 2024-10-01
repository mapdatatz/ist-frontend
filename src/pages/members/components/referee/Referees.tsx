import { useState } from "react";
import CreateReferee from "./CreateReferee";
import { RiEditBoxLine } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import UpdateReferee from "./UpdateReferee";
import DeleteReferee from "./DeleteReferee";
import {  IoSearchOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";

export default function Referees({ member }: any) {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>({});
  return (
    <div className="">
      <div className="flex justify-between bg-gray-200 border border-gray-300 p-2">
        <div className="flex items-center">
          <FiUsers /> <span className="mx-2">Referees</span>
        </div>
        <button
          onClick={() => setCreateModal(true)}
          className="border border-gray-400 px-2 flex justify-center items-center"
        >
          +
        </button>
      </div>

      {member?.referees?.length > 0 ? (
        <div className="">
          {member?.referees?.map((item: any) => (
            <div className="mb-2">
              <div className="flex justify-between">
                <div className="">
                  <div className="">
                    <span className="font-bold">Name: </span>{" "}
                    {item?.name || "-"}
                  </div>
                  <div className="">
                    <span className="font-bold">Office: </span>{" "}
                    {item?.office || "-"}
                  </div>
                  <div className="">
                    <span className="font-bold">Email:</span>{" "}
                    {item?.email || "-"}
                  </div>
                  <div className="">
                    <span className="font-bold">Mobile: </span>{" "}
                    {item?.mobile || "-"}
                  </div>
                </div>
                <div className="flex mt-1">
                  <button
                    onClick={() => {
                      setSelected(item);
                      setUpdateModal(true);
                    }}
                    className="border border-gray-300 px-2 flex justify-center items-center h-8 mx-2 "
                  >
                    <RiEditBoxLine color="#eab308" />
                  </button>
                  <button
                    onClick={() => {
                      setSelected(item);
                      setDeleteModal(true);
                    }}
                    className="border border-gray-300 px-2 flex justify-center items-center h-8"
                  >
                    <FaRegTrashCan color="#dc2626" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-4 border text-gray-500 text-xs">
          <IoSearchOutline size={20} />
          <span>No Referees Records</span>
        </div>
      )}

      <CreateReferee
        isVisible={createModal}
        setVisible={setCreateModal}
        member={member}
      />
      <UpdateReferee
        isVisible={updateModal}
        setVisible={setUpdateModal}
        member={member}
        selected={selected}
      />
      <DeleteReferee
        isVisible={deleteModal}
        setVisible={setDeleteModal}
        member={member}
        selected={selected}
      />
    </div>
  );
}
