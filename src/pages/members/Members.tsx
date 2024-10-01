import { Button, Form, Input, Table, Tooltip } from "antd";
import { useContext, useEffect, useState } from "react";
import { RiFileExcel2Line, RiFilterOffLine } from "react-icons/ri";
import { SlReload } from "react-icons/sl";

import { LuPlus } from "react-icons/lu";
import { ExportToExcel } from "../../utils/exportExcel";

import CreateMember from "./components/CreateMember";
import UpdateMember from "./components/UpdateMember";
import { useQuery } from "@tanstack/react-query";
import Something from "../../components/shared/Something";
import { handleExportMembers, handleFetchMembers } from "../../api/members";
import Moment from "react-moment";
import { BiBuildingHouse, BiUser } from "react-icons/bi";
import moment from "moment";
import { IoLinkOutline } from "react-icons/io5";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
const { Search } = Input;

export default function Members() {
  const { user } = useContext(AuthContext);
  const [selected, setSelected] = useState<any>({});
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [isExporting, setExporting] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 10,
    total: 0,
  });

  const initials = {
    name: "",
  };

  const [filters, setFilters] = useState<any>({ ...initials });
  const params = `name=${filters?.name}`;

  const {
    data: members,
    refetch,
    isLoading,
    isFetched,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["members", pagination.page, pagination.limit, params],
    queryFn: () =>
      handleFetchMembers({
        page: pagination?.page,
        limit: pagination?.limit,
        params,
      }),
  });

  const clearAllFilters = async () => {
    form.resetFields();
    setFilters({ ...initials });
    handleRefetch();
  };

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
        <span className="text-gray-600 ml-2">
          {pagination?.page * pagination?.limit - pagination?.limit + index + 1}
        </span>
      ),
    },
    {
      title: "NAME",
      width: 180,
      render: (record: any) => {
        return (
          <div className="">
            {record?.name || "-"}
            <div className="flex items-center">
              {record?.isCorporate ? (
                <div className="">
                  <span className="flex items-center text-blue-700 text-xs">
                    <BiBuildingHouse className="mr-1 " /> Corporate
                    {record?.website && (
                      <a
                        href={record?.website}
                        target="_blank"
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
            </div>
          </div>
        );
      },
    },
    {
      title: "CONTACT",
      width: 180,
      render: (record: any) => {
        return (
          <div className="flex flex-col justify-start">
            <div className="">Email: {record?.email || "-"}</div>
            <div className="text-xs text-gray-600">
              Mobile: {record?.mobile || "-"}
            </div>
          </div>
        );
      },
    },
    {
      title: "MEMBERSHIP",
      width: 180,
      render: (record: any) => {
        return (
          <div className="flex flex-col justify-start ">
            {record?.membership?.category}
            <div className="flex">
              <div className="text-xs text-gray-600">
                IST-{record?.memberId}
              </div>
              <div className="text-xs text-gray-600 mx-2">
                Since:{" "}
                <Moment format="DD/MM/YYYY">{record?.dateRegistered}</Moment>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "STATUS",
      width: 180,
      render: (record: any) => {
        return (
          <div className="flex flex-col justify-start text-gray-600">
            <div className="">
              Registration:{" "}
              {record?.isFullRegistered ? (
                <span className="text-green-600">Registered</span>
              ) : (
                <span className="text-red-600">Incomplete</span>
              )}
            </div>
            <div className="">
              Status:{" "}
              {record?.isActive ? (
                <span className="text-green-600">Active</span>
              ) : (
                <span className="text-red-600">Inactive</span>
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: "NEXT UPGRADE",
      width: 140,
      render: (record: any) => {
        return (
          <div className="flex flex-col justify-start ">
            <Moment format="DD/MM/YYYY">{record?.nextUpgrade}</Moment>
            <span className="text-xs text-gray-600">
              [ <Moment fromNow>{record?.nextUpgrade}</Moment> ]
            </span>
          </div>
        );
      },
    },
  ];
  const exportUsers = async () => {
    setExporting(true);
    const members = await handleExportMembers();
    await ExportToExcel(
      members?.map((item: any) => {
        return {
          Name: item?.name || "-",
          Mobile: item?.mobile || "-",
          Email: item?.email || "-",
          Type: item?.isCorporate ? "Corporate" : "Individual",
          Membership: item?.membership?.category || "-",
          "Member ID": `IST-${item?.memberId}`,
          "Registration Year": item?.regYear || "-",
          Registration: item?.isFullRegistered ? "Completed" : "Incomplete",
          "Next Upgrade": moment(item?.nextUpgrade).format("DD/MM/YYYY") || "-",
          Status: item?.isActive ? "Active" : "Inactive",
          "Member Since": moment(item?.createdAt).format("DD/MM/YYYY") || "-",
        };
      }),
      "Members.xlsx"
    );
    setExporting(false);
  };

  useEffect(() => {
    setPagination({ ...pagination, total: members?.total });
  }, [members, isFetched]);

  return (
    <div className="grid gap-x-0 grid-cols-12">
      <div className="col-span-12 sm:col-span-12 md:col-span-12">
        <div className="bg-gray-100 min-w-full border overflow-hidden">
          <div className="bg-white">
            <div className="flex flex-col sm:flex-row justify-between border-b p-2">
              <div className="flex flex-col mb-2 sm:mb-0">
                <div className="flex items-center">
                  <div className="font-bold">Members : </div>
                  <div className="text-gray-600 text-xs mt-1 mx-1">
                    Manage Members Details
                  </div>
                </div>
                <Form layout="inline" form={form}>
                  <Form.Item name="name">
                    <Search
                      placeholder="Search by name"
                      allowClear
                      onSearch={(e: any) => {
                        setFilters({ ...filters, name: e });
                      }}
                    />
                  </Form.Item>
                  <Button
                    className="ml-2 focus:outline-none hover:bg-red-100 rounded-none"
                    onClick={() => {
                      clearAllFilters();
                    }}
                  >
                    <RiFilterOffLine color="gray" />
                  </Button>
                </Form>
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
                {user?.isAdmin && (
                  <button
                    onClick={() => setCreateModal(true)}
                    className="flex mx-2 justify-center items-center border px-4 py-1 h-10 hover:bg-gray-100"
                  >
                    <LuPlus size={18} /> <span className="mx-2">New</span>
                  </button>
                )}
              </div>
            </div>
            {isError ? (
              <Something refetch={refetch} isFetching={isFetching} />
            ) : (
              <div className="m-1">
                <Table
                  size="small"
                  dataSource={members?.data}
                  columns={columns}
                  scroll={{ y: 660, x: 0 }}
                  rowKey="id"
                  bordered
                  pagination={{
                    current: pagination?.page,
                    pageSize: pagination?.limit,
                    total: pagination?.total,
                  }}
                  onRow={(record: any) => ({
                    onClick: () => {
                      navigate(`/members/${record?._id}`);
                    },
                  })}
                  rowClassName={"hover:cursor-pointer hover:bg-gray-100"}
                  onChange={(e: any) => handlePageChange(e)}
                  loading={isLoading}
                />
              </div>
            )}
          </div>

          <CreateMember
            isVisible={createModal}
            setVisible={setCreateModal}
            refetch={handleRefetch}
          />

          <UpdateMember
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
