import { useState } from "react";
import CreateExpertise from "./CreateExpertise";
import { RiEditBoxLine } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import UpdateExpertise from "./UpdateExpertise";
import DeleteExpertise from "./DeleteExpertise";
import {  IoSearchOutline } from "react-icons/io5";
import {  VscWorkspaceTrusted } from "react-icons/vsc";

export default function Expertises({ member }: any) {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>({});
  return (
    <div className="">
      <div className="flex justify-between bg-gray-200 border border-gray-300 p-2">
        <div className="flex items-center">
          <VscWorkspaceTrusted /> <span className="mx-2">Expertises</span>
        </div>
        <button
          onClick={() => setCreateModal(true)}
          className="border border-gray-400 px-2 flex justify-center items-center"
        >
          +
        </button>
      </div>

      {member?.expertises?.length > 0 ? (
        <div className="">
          {member?.expertises?.map((expertise: any) => (
            <div className="mb-2">
              <div className="flex justify-between">
                <div className="">
                  <div className="">
                    {expertise?.name || "-"}
                  </div>
                  <div className="text-xs">
                    <span className="font-bold">Description </span>
                    {expertise?.description || "-"}
                  </div>
                </div>
                <div className="flex mt-1">
                  <button
                    onClick={() => {
                      setSelected(expertise);
                      setUpdateModal(true);
                    }}
                    className="border border-gray-300 px-2 flex justify-center items-center h-8 mx-2 "
                  >
                    <RiEditBoxLine color="#eab308" />
                  </button>
                  <button
                    onClick={() => {
                      setSelected(expertise);
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
          <span>No Expertise Records</span>
        </div>
      )}

      <CreateExpertise
        isVisible={createModal}
        setVisible={setCreateModal}
        member={member}
      />
      <UpdateExpertise
        isVisible={updateModal}
        setVisible={setUpdateModal}
        member={member}
        selected={selected}
      />
      <DeleteExpertise
        isVisible={deleteModal}
        setVisible={setDeleteModal}
        member={member}
        selected={selected}
      />
    </div>
  );
}
