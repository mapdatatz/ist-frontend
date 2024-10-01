import { useState } from "react";
import CreateAddress from "./CreateAddress";
import {  RiEditBoxLine } from "react-icons/ri";
import { FaRegTrashCan} from "react-icons/fa6"
import UpdateAddress from "./UpdateAddress";
import DeleteAddress from "./DeleteAddress";
import { SlLocationPin } from "react-icons/sl";
import { IoSearchOutline } from "react-icons/io5";

export default function Addresses({ member }: any) {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>({});
  return (
    <div className="">
      <div className="flex justify-between bg-gray-200 border border-gray-300 p-2">
        <div className="flex items-center"><SlLocationPin /> <span className="mx-2">Address</span></div>
        <button
          onClick={() => setCreateModal(true)}
          className="border border-gray-400 px-2 flex justify-center items-center"
        >
          +
        </button>
      </div>

      {member?.addresses?.length > 0 ? (
        <div className="">
          {member?.addresses?.map((address: any) => (
            <div className="mb-2">
              <div className="flex justify-between">
                <div className="">
                  <div className="">
                    <span className="font-bold">Country:</span>{" "}
                    {address?.country || "-"}
                  </div>
                  <div className="">
                    <span className="font-bold">Region:</span>{" "}
                    {address?.region || "-"}
                  </div>
                  <div className="">
                    <span className="font-bold">Ward: </span>
                    {address?.ward || "-"}
                  </div>
                  <div className="">
                    <span className="font-bold">Street:</span>{" "}
                    {address?.street || "-"}
                  </div>
                  <div className="">
                    <span className="font-bold">Block:</span>{" "}
                    {address?.block || "-"}
                  </div>
                  <div className="">
                    <span className="font-bold">Plot: </span>
                    {address?.plot || "-"}
                  </div>
                </div>
                <div className="flex mt-1">
                  <button
                    onClick={() => {
                      setSelected(address);
                      setUpdateModal(true);
                    }}
                    className="border border-gray-300 px-2 flex justify-center items-center h-8 mx-2 "
                  >
                    <RiEditBoxLine color="#eab308"/>
                  </button>
                  <button
                    onClick={() => {
                      setSelected(address);
                      setDeleteModal(true);
                    }}
                    className="border border-gray-300 px-2 flex justify-center items-center h-8"
                  >
                    <FaRegTrashCan  color="#dc2626"/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-4 border text-gray-500 text-xs">
          <IoSearchOutline size={20} />
          <span>No Address Addes</span>
        </div>
      )}

      <CreateAddress
        isVisible={createModal}
        setVisible={setCreateModal}
        member={member}
      />
      <UpdateAddress
        isVisible={updateModal}
        setVisible={setUpdateModal}
        member={member}
        selected={selected}
      />
      <DeleteAddress
        isVisible={deleteModal}
        setVisible={setDeleteModal}
        member={member}
        selected={selected}
      />
    </div>
  );
}
