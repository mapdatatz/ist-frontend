import { useState } from "react";
import CreateLicense from "./CreateLicense";
import { RiEditBoxLine } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import UpdateLicense from "./UpdateLicense";
import DeleteLicense from "./DeleteLicense";
import {  IoSearchOutline } from "react-icons/io5";
import { TbLicense } from "react-icons/tb";

export default function Licenses({ member }: any) {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>({});
  return (
    <div className="">
      <div className="flex justify-between bg-gray-200 border border-gray-300 p-2">
        <div className="flex items-center">
          <TbLicense /> <span className="mx-2">Licenses</span>
        </div>
        <button
          onClick={() => setCreateModal(true)}
          className="border border-gray-400 px-2 flex justify-center items-center"
        >
          +
        </button>
      </div>

      {member?.licenses?.length > 0 ? (
        <div className="">
          {member?.licenses?.map((license: any) => (
            <div className="mb-2">
              <div className="flex justify-between">
                <div className="">
                  <div className="">
                    {license?.name || "-"}
                  </div>
                  <div className="text-xs">
                    <span className="font-bold">Description </span>
                    {license?.description || "-"}
                  </div>
                </div>
                <div className="flex mt-1">
                  <button
                    onClick={() => {
                      setSelected(license);
                      setUpdateModal(true);
                    }}
                    className="border border-gray-300 px-2 flex justify-center items-center h-8 mx-2 "
                  >
                    <RiEditBoxLine color="#eab308" />
                  </button>
                  <button
                    onClick={() => {
                      setSelected(license);
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
          <span>No Licenses Added</span>
        </div>
      )}

      <CreateLicense
        isVisible={createModal}
        setVisible={setCreateModal}
        member={member}
      />
      <UpdateLicense
        isVisible={updateModal}
        setVisible={setUpdateModal}
        member={member}
        selected={selected}
      />
      <DeleteLicense
        isVisible={deleteModal}
        setVisible={setDeleteModal}
        member={member}
        selected={selected}
      />
    </div>
  );
}
