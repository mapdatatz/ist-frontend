import { useState } from "react";
import CreateEducation from "./CreateEducation";
import { RiEditBoxLine } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import UpdateEducation from "./UpdateEducation";
import DeleteEducation from "./DeleteEducation";
import { IoBookOutline, IoSearchOutline } from "react-icons/io5";

export default function Educations({ member }: any) {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>({});
  return (
    <div className="">
      <div className="flex justify-between bg-gray-200 border border-gray-300 p-2">
        <div className="flex items-center">
          <IoBookOutline /> <span className="mx-2">Education</span>
        </div>
        <button
          onClick={() => setCreateModal(true)}
          className="border border-gray-400 px-2 flex justify-center items-center"
        >
          +
        </button>
      </div>

      {member?.educations?.length > 0 ? (
        <div className="">
          {member?.educations?.map((education: any) => (
            <div className="mb-2">
              <div className="flex justify-between">
                <div className="">
                  <div className="">
                    <span className="font-bold">Level:</span>{" "}
                    {education?.level || "-"}
                  </div>
                  <div className=" font-bold text-xs">
                    Duration: {education?.startYear} - {education?.endYear}
                  </div>

                  <div className="">
                    <span className="font-bold">Institution:</span>{" "}
                    {education?.institution || "-"}
                  </div>
                  <div className="">
                    <span className="font-bold">Result: </span>
                    {education?.result || "-"}
                  </div>
                </div>
                <div className="flex mt-1">
                  <button
                    onClick={() => {
                      setSelected(education);
                      setUpdateModal(true);
                    }}
                    className="border border-gray-300 px-2 flex justify-center items-center h-8 mx-2 "
                  >
                    <RiEditBoxLine color="#eab308" />
                  </button>
                  <button
                    onClick={() => {
                      setSelected(education);
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
          <span>No Education Records</span>
        </div>
      )}

      <CreateEducation
        isVisible={createModal}
        setVisible={setCreateModal}
        member={member}
      />
      <UpdateEducation
        isVisible={updateModal}
        setVisible={setUpdateModal}
        member={member}
        selected={selected}
      />
      <DeleteEducation
        isVisible={deleteModal}
        setVisible={setDeleteModal}
        member={member}
        selected={selected}
      />
    </div>
  );
}
