import { message, Table, Tooltip } from "antd";
import { useContext, useEffect, useState } from "react";
import { RiFileExcel2Line, RiDeleteBinLine } from "react-icons/ri";
import { SlReload } from "react-icons/sl";

import {  LuPlus } from "react-icons/lu";

import { FiEdit } from "react-icons/fi";
import { ExportToExcel } from "../../utils/exportExcel";

import CreateYear from "./components/CreateYear";
import UpdateYear from "./components/UpdateYear";
import { useQuery } from "@tanstack/react-query";
import Something from "../../components/shared/Something";
import BackNav from "../../components/toolbars/BackNav";
import { handleExportYears, handleFetchYears } from "../../api/years";
import formatMoney from "../../utils/formatMoney";
import { AuthContext } from "../../contexts/AuthContext";
import NoAccess from "../../components/shared/NoAccess";

export default function Users() {
  const { user } = useContext(AuthContext);
  const [selected, setSelected] = useState<any>({});
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [isExporting, setExporting] = useState<boolean>(false);

  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 10,
    total: 0,
  });

  const {
    data: years,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["years"],
    queryFn: () => handleFetchYears(),
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
      title: "YEAR",
      width: 240,
      render: (record: any) => {
        return <span className="text-gray-700">{record?.year || "-"}</span>;
      },
    },
    {
      title: "EXPECTED AMOUNT",
      width: 180,
      render: (record: any) => {
        return (
          <div className="flex justify-start text-gray-700">
            {formatMoney(record?.expectedAmount) || "-"}
          </div>
        );
      },
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
    const years = await handleExportYears();
    await ExportToExcel(
      years?.map((item: any) => {
        return {
          Year: item?.year || "-",
          "Expected Amount": item?.expectedAmount || "-",
          "Paid Amount": item?.paidAmount || "-",
          "Debt Amount": item?.debtAmount || "-",
        };
      }),
      "Years.xlsx"
    );
    setExporting(false);
  };

  useEffect(() => {}, [years]);

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
                <div className="font-bold">Years</div>
                <div className="text-gray-600">Manage Years Details</div>
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
                  dataSource={years}
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

          <CreateYear
            isVisible={createModal}
            setVisible={setCreateModal}
            refetch={handleRefetch}
          />

          <UpdateYear
            isVisible={updateModal}
            setVisible={setUpdateModal}
            refetch={refetch}
            selected={selected}
          />
        </div>
      </div>
    </div>
  );
}
