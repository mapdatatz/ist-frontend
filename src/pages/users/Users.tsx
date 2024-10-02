import { message, Table, Tooltip } from "antd";
import { useContext, useEffect, useState } from "react";
import { RiFileExcel2Line, RiDeleteBinLine } from "react-icons/ri";
import { SlReload } from "react-icons/sl";

import { LuUpload, LuPlus } from "react-icons/lu";
import { FaCrown } from "react-icons/fa";

import { FiEdit } from "react-icons/fi";
import { ExportToExcel } from "../../utils/exportExcel";

import CreateUser from "./components/CreateUser";
import UploadSign from "./components/UploadSign";
import UpdateUser from "./components/UpdateUser";
import { useQuery } from "@tanstack/react-query";
import { handleExportUsers, handleFetchUsers } from "../../api/users";
import Something from "../../components/shared/Something";
import BackNav from "../../components/toolbars/BackNav";
import ResetPassword from "./components/ResetPassword";
import { LuLock } from "react-icons/lu";
import UploadUsers from "./components/UploadUsers";
import { AuthContext } from "../../contexts/AuthContext";
import NoAccess from "../../components/shared/NoAccess";

export default function Users() {
  const { user } = useContext(AuthContext);

  const [selected, setSelected] = useState<any>({});
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [resetModal, setResetModal] = useState<boolean>(false);
  const [signModal, setSignModal] = useState<boolean>(false);
  const [uploadModal, setUploadModal] = useState<boolean>(false);
  const [isExporting, setExporting] = useState<boolean>(false);

  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 10,
    total: 0,
  });

  const {
    data: users,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["users", pagination.page, pagination.limit],
    queryFn: () =>
      handleFetchUsers({ page: pagination.page, limit: pagination.limit }),
  });

  const handlePageChange = (e: any) => {
    setPagination((prev: any) => ({
      ...prev,
      page: e.current,
      limit: e.pageSize,
    }));
  };
  const handleRefetch = () => {
    refetch();
  };

  const columns = [
    {
      title: "S/N",
      width: 60,
      render: (record: any, text: any, index: any) => (
        <span className="text-gray-700 ml-2">
          {pagination?.page * pagination?.limit - pagination?.limit + index + 1}
        </span>
      ),
    },
    {
      title: "FULLNAME",
      width: 140,
      render: (record: any) => {
        return (
          <div className="text-gray-700">
            <div className="">{record?.name || "-"}</div>
            {record?.isAdmin && (
              <div className="flex items-center">
                <div className="">
                  <FaCrown color="#16a34a" />
                </div>
                <div className="mx-1 text-green-600">Admin</div>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "EMAIL",
      width: 200,
      render: (record: any) => (
        <span className="text-gray-700">{record?.email || "-"}</span>
      ),
    },
    {
      title: "MOBILE",
      width: 140,
      render: (record: any) => (
        <span className="text-gray-700">{record?.mobile || "-"}</span>
      ),
    },
    {
      title: "ACCESS",
      width: 100,
      render: (record: any) => (
        <span className="text-gray-700">Level : {record?.accessLevel}</span>
      ),
    },
    {
      title: "ACTIVE",
      width: 80,
      render: (record: any) => (
        <span className="text-gray-700">
          {record?.isActive ? (
            <span className="text-green-600">Yes</span>
          ) : (
            <span className="text-red-600">No</span>
          )}
        </span>
      ),
    },
    {
      title: "ACTION",
      width: 140,
      render: (record: any) => (
        <div className="flex justify-end">
          <button
            onClick={() => {
              setSelected({
                ...record,
              });
              setUpdateModal(true);
            }}
            className="flex justify-center items-center text-gray-700 border rounded-md p-2 bg-yellow-100 hover:bg-yellow-200 cursor-pointer"
          >
            <FiEdit />
          </button>

          <button
            onClick={() => {
              setSelected({
                ...record,
              });
              setResetModal(true);
            }}
            className="flex justify-center items-center ml-1 text-gray-700 border rounded-md p-2 bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            <LuLock />
          </button>

          <button
            onClick={() => {
              setSelected({
                ...record,
              });
            }}
            className="flex justify-center items-center ml-1 text-gray-700 border rounded-md p-2 bg-red-100 hover:bg-red-200 cursor-not-allowed"
          >
            <RiDeleteBinLine color="red" />
          </button>
        </div>
      ),
    },
  ];

  const exportUsers = async () => {
    setExporting(true);
    const users = await handleExportUsers();
    await ExportToExcel(
      users?.map((item: any) => {
        return {
          NAME: item?.name || "-",
          EMAIL: item?.email || "-",
          MOBILE: item?.mobile || "-",
          ACTIVE: item?.isActive ? "Yes" : "No",
          ADMIN: item?.isAdmin ? "Yes" : "No",
          "ACCESS LEVEL": item?.accessLevel,
        };
      }),
      "Users.xlsx"
    );
    setExporting(false);
  };

  useEffect(() => {
    setPagination({ ...pagination, total: users?.total });
  }, [users]);

  if (!user?.isAdmin) {
    message.error("You Can't Access This Module");
    return <NoAccess />;
  }
  return (
    <div className="grid gap-x-0 grid-cols-12">
      <div className="col-span-12 sm:col-span-12 md:col-span-12">
        <div className="bg-gray-100 min-w-full border overflow-hidden">
          <BackNav link={`/admin`} />
          <div className="bg-white m-1">
          <div className="flex flex-col sm:flex-row justify-between border-b p-2">
          <div className="flex flex-col mb-2 sm:mb-0">
                <div className="font-bold">Users</div>
                <div className="text-gray-600">Manage User Details</div>
              </div>

              <div className="flex">
                <Tooltip title="Export To Excel">
                  <button
                    className="flex mx-2 justify-center items-center border px-4 py-1 h-10 hover:bg-gray-100"
                    onClick={() => exportUsers()}
                  >
                    {isExporting ? (
                      <SlReload />
                    ) : (
                      <RiFileExcel2Line size={20} />
                    )}
                  </button>
                </Tooltip>

                <button
                  onClick={() => setUploadModal(true)}
                  className="flex mx-2 justify-center items-center border px-4 py-1 h-10 hover:bg-gray-100"
                >
                  <LuUpload /> <span className="mx-2">Upload</span>
                </button>
                <button
                  onClick={() => setCreateModal(true)}
                  className="flex mx-2 justify-center items-center border px-4 py-1 h-10 hover:bg-gray-100"
                >
                  <LuPlus size={18} /> <span className="mx-2">New</span>
                </button>
              </div>
            </div>
            {isError ? (
              <Something refetch={refetch} isFetching={isFetching} />
            ) : (
              <div className="">
                <Table
                  size="small"
                  dataSource={users?.records}
                  columns={columns}
                  scroll={{ y: 660, x: 0 }}
                  rowKey="id"
                  bordered
                  pagination={{
                    current: pagination?.page,
                    pageSize: pagination?.limit,
                    total: pagination?.total,
                  }}
                  onChange={(e: any) => handlePageChange(e)}
                  loading={isLoading}
                />
              </div>
            )}
          </div>

          <CreateUser
            isVisible={createModal}
            setVisible={setCreateModal}
            refetch={handleRefetch}
          />

          <UpdateUser
            isVisible={updateModal}
            setVisible={setUpdateModal}
            refetch={refetch}
            selected={selected}
          />

          <UploadSign
            isVisible={signModal}
            setVisible={setSignModal}
            selected={selected}
            refetch={refetch}
          />

          <UploadUsers
            isVisible={uploadModal}
            setVisible={setUploadModal}
            selected={selected}
            refetch={refetch}
          />

          <ResetPassword
            isVisible={resetModal}
            setVisible={setResetModal}
            refetch={refetch}
            selected={selected}
          />
        </div>
      </div>
    </div>
  );
}
