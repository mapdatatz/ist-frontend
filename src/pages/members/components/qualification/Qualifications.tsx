import { useState } from "react";
import CreateLicense from "./CreateQualification";
import { RiEditBoxLine } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import UpdateQualification from "./UpdateQualification";
import DeleteQualification from "./DeleteQualification";
import { IoBookOutline, IoSearchOutline } from "react-icons/io5";

export default function Qualifications({ member }: any) {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>({});
  return (
    <div className="">
      <div className="flex justify-between bg-gray-200 border border-gray-300 p-2">
        <div className="flex items-center">
          <IoBookOutline /> <span className="mx-2">Qualifications</span>
        </div>
        <button
          onClick={() => setCreateModal(true)}
          className="border border-gray-400 px-2 flex justify-center items-center"
        >
          +
        </button>
      </div>

      {member?.qualifications?.length > 0 ? (
        <div className="">
          {member?.qualifications?.map((item: any) => (
            <div className="mb-2">
              <div className="flex justify-between">
                <div className="">
                  <div className="">
                    Title: {item?.title || "-"}
                  </div>
                  <div className="">
                    Year: {item?.year || "-"}
                  </div>
                  <div className="text-xs">
                    <span className="font-bold">Description </span>
                    {item?.description || "-"}
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
          <span>No Qualifications Records</span>
        </div>
      )}

      <CreateLicense
        isVisible={createModal}
        setVisible={setCreateModal}
        member={member}
      />
      <UpdateQualification
        isVisible={updateModal}
        setVisible={setUpdateModal}
        member={member}
        selected={selected}
      />
      <DeleteQualification
        isVisible={deleteModal}
        setVisible={setDeleteModal}
        member={member}
        selected={selected}
      />
    </div>
  );
}
