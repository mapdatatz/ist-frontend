import { useQuery } from "@tanstack/react-query";
import BackNav from "../../components/toolbars/BackNav";
import { useParams } from "react-router";
import { handleFetchMember } from "../../api/members";
import { BiBuildingHouse, BiUser } from "react-icons/bi";
import { IoLinkOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import UpdateMember from "./components/UpdateMember";
import MemberPayments from "./components/MemberPayments";
import StatementPanel from "./components/StatementPanel";
import { ImFilePdf } from "react-icons/im";
import { handleMemberPayments } from "../../api/payments";
import { handleFetchInstitute } from "../../api/institute";
import MemberDetails from "./components/MemberDetails";

export default function Member({}: any) {
  const { user } = useContext(AuthContext);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [statementModal, setStatementModal] = useState<boolean>(false);

  const { id } = useParams();
  const { data: member } = useQuery({
    queryKey: ["members", id],
    queryFn: () => handleFetchMember({ _id: id }),
  });

  const {
    data: payments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["memberPayments", id],
    queryFn: () => handleMemberPayments({ memberId: id }),
  });

  const { data: institute } = useQuery({
    queryKey: ["institute"],
    queryFn: () => handleFetchInstitute(),
  });

  return (
    <div>
      <BackNav link={`/admin`} />
      <div className="p-1">
        <div className="grid grid-cols-12 bg-white">
          <div className="col-span-12">
            <div className="flex justify-between border-b mx-4 my-4 pb-4">
              <div className="flex">
                <div className="border w-36 h-36 mr-4 flex justify-center items-center">
                  {member?.isCorporate ? (
                    <BiBuildingHouse size={70} />
                  ) : (
                    <BiUser size={70} />
                  )}
                </div>
                <div className="">
                  <div className="font-bold text-2xl uppercase">
                    {member?.name || "-"}
                  </div>
                  <div className="mb-2">
                    {member?.isCorporate ? (
                      <div className="">
                        <span className="flex items-center text-blue-700 text-xs">
                          <BiBuildingHouse className="mr-1 " /> Corporate
                          {member?.website && (
                            <a
                              href={member?.website}
                              target="_blank"
                              rel="noreferrer"
                              className="mx-1 flex items-center"
                            >
                              <IoLinkOutline /> website
                            </a>
                          )}
                        </span>
                      </div>
                    ) : (
                      <span className="flex items-center text-green-700 text-xs">
                        <BiUser className="mr-1" /> Individual
                      </span>
                    )}
                    <div className="text-xs text-gray-600">
                      Member ID : IST-{member?.memberId}
                    </div>
                  </div>
                  <div className="">Email: {member?.email || "-"}</div>
                  <div className="">Mobile: {member?.mobile || "-"}</div>
                  <div className="flex items-center">
                    Membership: {member?.membership?.category || "-"}
                  </div>
                </div>
              </div>
              <div className="">
                <div className="mb-2">
                  <button
                    onClick={() => setStatementModal(true)}
                    className="flex justify-center border p-2 items-center focus:outline-none text-sm hover:text-blue-600"
                  >
                    <ImFilePdf className="mr-1" /> Member Statement
                  </button>
                </div>
                {user?.isAdmin && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setUpdateModal(true);
                      }}
                      className="flex justify-center items-center text-gray-600 border rounded-md p-2 bg-yellow-100 hover:bg-yellow-200 cursor-pointer"
                    >
                      <FiEdit />
                    </button>

                    <button
                      onClick={() => {}}
                      className="flex justify-center items-center ml-1 text-gray-600 border rounded-md p-2 bg-red-100 hover:bg-red-200 cursor-not-allowed"
                    >
                      <RiDeleteBinLine color="red" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="m-4">
              <MemberPayments
                payments={payments}
                isLoading={isLoading}
                refetch={refetch}
                member={member}
                memberId={member?._id}
                id={id}
                institute={institute}
              />
            </div>
            <div className="m-4">
              <MemberDetails member={member} id={id} />
            </div>
          </div>
        </div>
      </div>

      <UpdateMember
        isVisible={updateModal}
        setVisible={setUpdateModal}
        refetch={refetch}
        selected={member}
      />

      <StatementPanel
        isVisible={statementModal}
        setVisible={setStatementModal}
        refetch={refetch}
        payments={payments}
        institute={institute}
        selected={member}
      />
    </div>
  );
}
