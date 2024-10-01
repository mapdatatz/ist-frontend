import { useState } from "react";
import CreateEmployment from "./CreateEmployment";
import {  RiEditBoxLine } from "react-icons/ri";
import {  IoBriefcaseOutline, IoSearchOutline } from "react-icons/io5";
import { FaRegTrashCan} from "react-icons/fa6"
import UpdateEmployment from "./UpdateEmployment";
import DeleteEducation from "./DeleteEmployment";
import Moment from "react-moment";

export default function Employments({ member }: any) {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>({});
  return (
    <div className="">
      <div className="flex justify-between bg-gray-200 border border-gray-300 p-2">
      <div className="flex items-center"><IoBriefcaseOutline /> <span className="mx-2">Employment</span></div>
        <button
          onClick={() => setCreateModal(true)}
          className="border border-gray-400 px-2 flex justify-center items-center"
        >
          +
        </button>
      </div>

      {member?.employments?.length > 0 ? (
        <div className="">
          {member?.employments?.map((education: any) => (
            <div className="mb-2">
              <div className="flex justify-between">
                <div className="">
                <div className="">
                    <span className="font-bold">Company:</span>{" "}
                    {education?.company || "-"}
                  </div>
                  <div className="text-xs font-bold ">Duration: <Moment
                  format="Do MMM, YYYY">{education?.startDate}</Moment> - <Moment format="Do MMM, YYYY">{education?.endDate}</Moment></div>

                  <div className="">
                    <span className="font-bold">Position:</span>{" "}
                    {education?.position || "-"}
                  </div>
                  <div className="text-xs">
                    <div className="font-bold">Description</div>
                    {education?.description || "-"}
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
                    <RiEditBoxLine color="#eab308"/>
                  </button>
                  <button
                    onClick={() => {
                      setSelected(education);
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
          <span>No Employment Records</span>
        </div>
      )}

      <CreateEmployment
        isVisible={createModal}
        setVisible={setCreateModal}
        member={member}
      />
      <UpdateEmployment
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
