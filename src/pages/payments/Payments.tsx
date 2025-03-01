import { Button, Form, Input, Popover, Table, Tooltip } from "antd";
import { useContext, useEffect, useState } from "react";
import { RiFileExcel2Line, RiFilterOffLine } from "react-icons/ri";
import { SlReload } from "react-icons/sl";

import { ImFilePdf } from "react-icons/im";

import { TfiCreditCard } from "react-icons/tfi";
import { ExportToExcel } from "../../utils/exportExcel";

import MemberPayment from "./components/MemberPayment";
import { useQuery } from "@tanstack/react-query";
import Something from "../../components/shared/Something";
import { BiBuildingHouse, BiUser } from "react-icons/bi";
import moment from "moment";
import { handleFetchPayments, handleExportPayments } from "../../api/payments";
import formatMoney from "../../utils/formatMoney";
import { BsCaretDown } from "react-icons/bs";
import { handleFetchYears } from "../../api/years";
import { AuthContext } from "../../contexts/AuthContext";
import ReceiptPanel from "./components/ReceiptPanel";
import { handleFetchInstitute } from "../../api/institute";
import { LuPlus } from "react-icons/lu";
import CreatePayment from "./components/CreatePayment";
import UpdatePaydate from "./components/UpdatePaydate";
import Moment from "react-moment";
import { FiEdit } from "react-icons/fi";
import UpdatePayment from "./components/UpdatePayment";
const { Search } = Input;

export default function Payments() {
  const { user } = useContext(AuthContext);
  const today = new Date();
  const [selected, setSelected] = useState<any>({});
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [paydateModal, setPaydateModal] = useState<boolean>(false);
  const [receiptModal, setReceiptModal] = useState<boolean>(false);
  const [isExporting, setExporting] = useState<boolean>(false);
  const [year, setYear] = useState({ year: today?.getFullYear() });
  const [form] = Form.useForm();

  const { data: years } = useQuery({
    queryKey: ["years"],
    queryFn: () => handleFetchYears(),
  });

  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 10,
    total: 0,
  });

  const initials = {
    name: "",
  };

  const [filters, setFilters] = useState<any>({ ...initials });
  const params = `name=${filters?.name}&year=${year?.year}`;

  const {
    data: payments,
    refetch,
    isLoading,
    isFetched,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["payments", pagination.page, pagination.limit, params],
    queryFn: () =>
      handleFetchPayments({
        page: pagination?.page,
        limit: pagination?.limit,
        params,
      }),
  });

  const { data: institute } = useQuery({
    queryKey: ["institute"],
    queryFn: () => handleFetchInstitute(),
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

  const clearDate = () => {
    setYear({ year: today?.getFullYear() });
  };

  const handleRefetch = () => {
    refetch();
  };

  useEffect(() => {
    handleRefetch();
  }, [year]);

  const rangeOptions = (
    <div>
      {years?.map((item: any, index: number) => (
        <div
          className="flex flex-col justify-start items-start w-full"
          key={index}
        >
          <button
            onClick={() => {
              setYear(item);
            }}
            className="py-1 border-t focus:outline-none w-full flex items-start"
          >
            {item?.year}
          </button>
        </div>
      ))}

      <div className="flex flex-col justify-start items-start w-full border-t-2">
        <button
          onClick={() => clearDate()}
          className="p-2 border-t focus:outline-none w-full flex items-start border mt-2 bg-gray-50 text-red-500"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );

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
      title: "NAME",
      width: 140,
      render: (record: any) => {
        return (
          <div className="text-gray-700">
            <div className="flex items-center">
              {record?.isCorporate ? (
                <span className="flex items-center text-blue-700 text-xs">
                  <BiBuildingHouse className="mr-1 " />
                </span>
              ) : (
                <span className="flex items-center text-green-700 text-xs">
                  <BiUser className="mr-1" />
                </span>
              )}
              {record?.name || "-"}
            </div>
          </div>
        );
      },
    },
    {
      title: "YEAR",
      width: 60,
      render: (record: any) => {
        return (
          <div className="flex flex-col justify-start text-gray-700">
            <div className=""> {record?.year || "-"}</div>
          </div>
        );
      },
    },
    {
      title: "MEMBERSHIP",
      width: 120,
      render: (record: any) => {
        return (
          <div className="flex flex-col justify-start text-gray-700">
            <div className=""> {record?.membership?.category || "-"}</div>
          </div>
        );
      },
    },
    {
      title: "OWED",
      width: 100,
      render: (record: any) => {
        return (
          <div className="flex justify-end text-gray-700">
            <div className="">{formatMoney(record?.expectedAmount) || "-"}</div>
            {user?.isAdmin && (
              <button
                onClick={() => {
                  if (record?.isPaid) return;
                  setSelected({
                    ...record,
                  });
                  setUpdateModal(true);
                }}
                className={`flex justify-center items-center ml-1   px-3 py-1   ${
                  record?.isPaid
                    ? "text-gray-200 cursor-not-allowed"
                    : "text-gray-700 hover:text-yellow-600"
                }`}
              >
                <FiEdit />
              </button>
            )}
          </div>
        );
      },
    },
    {
      title: "PAID",
      width: 100,
      render: (record: any) => {
        return (
          <div className="flex justify-end text-gray-700">
            <div className=""> {formatMoney(record?.paidAmount) || "-"}</div>
          </div>
        );
      },
    },
    {
      title: "DEBT",
      width: 100,
      render: (record: any) => {
        return (
          <div className="flex justify-end text-gray-700">
            <div className=""> {formatMoney(record?.remainAmount) || "-"}</div>
          </div>
        );
      },
    },
    {
      title: "PAID DATE",
      width: 100,
      render: (record: any) => {
        return (
          <div className="flex justify-end">
            {record?.paidDate ? (
              <div className="flex flex-col justify-start text-gray-700">
                <Moment format="DD/MM/YYYY">{record?.paidDate}</Moment>
              </div>
            ) : (
              "-"
            )}

            {user?.isAdmin && (
              <div className="">
                {record?.isPaid && (
                  <button
                    onClick={() => {
                      setSelected({
                        ...record,
                      });
                      setPaydateModal(true);
                    }}
                    className="mx-1"
                  >
                    <FiEdit />
                  </button>
                )}
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "STATUS",
      width: 80,
      render: (record: any) => {
        return (
          <div className="flex flex-col justify-start text-gray-700">
            <div className="">
              {record?.isPaid ? (
                <span className="text-green-600">Paid</span>
              ) : (
                <span className="text-red-600">Unpaid</span>
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: "ACTION",
      width: 110,
      render: (record: any) => (
        <div className="flex justify-center">
          {record?.isPaid ? (
            <button
              onClick={() => {
                setSelected({
                  ...record,
                });
                setReceiptModal(true);
              }}
              className="flex items-center text-blue-600 hover:underline cursor-pointer"
            >
              <ImFilePdf /> <span className="mx-1">Receipt</span>
            </button>
          ) : (
            <div className="">
              {user?.isAdmin ? (
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      setSelected({
                        ...record,
                      });
                      setPaymentModal(true);
                    }}
                    className="flex justify-center items-center ml-1 text-gray-700 border rounded-md px-3 py-1 bg-green-100 hover:bg-green-200"
                  >
                    <TfiCreditCard color="green" />{" "}
                    <span className="ml-1">Pay</span>
                  </button>
                </div>
              ) : (
                <button className="flex justify-center items-center ml-1 text-gray-700 border rounded-md px-3 py-1 bg-gray-100 hover:bg-gray-200 cursor-not-allowed">
                  <TfiCreditCard color="gray" />{" "}
                  <span className="ml-1">Pay</span>
                </button>
              )}
            </div>
          )}
        </div>
      ),
    },
  ];

  const exportUsers = async () => {
    setExporting(true);
    const members = await handleExportPayments();
    await ExportToExcel(
      members?.map((item: any) => {
        return {
          Name: item?.name || "-",
          Mobile: item?.mobile || "-",
          Email: item?.email || "-",
          Year: item?.year || "-",
          Category: item?.isCorporate ? "Corporate" : "Individual",
          Membership: item?.membership?.category || "-",
          "Member ID": `IST-${item?.memberId}` || item?.memberId || "-",
          "Expected Amount": item?.expectedAmount || "-",
          "Paid Amount": item?.paidAmount || "-",
          "Remain Amount": item?.remainAmount || "-",
          "Payment Ref": item?.paymentRef || "-",
          "Payment Date": item?.paidDate
            ? moment(item?.paidDate).format("DD/MM/YYYY")
            : "-",
        };
      }),
      "Payments.xlsx"
    );
    setExporting(false);
  };

  useEffect(() => {
    setPagination({ ...pagination, total: payments?.total });
  }, [payments, isFetched]);

  return (
    <div className="grid gap-x-0 grid-cols-12">
      <div className="col-span-12 sm:col-span-12 md:col-span-12">
        <div className="bg-gray-100 min-w-full border overflow-hidden">
          <div className="bg-white">
            <div className="flex flex-col sm:flex-row justify-between border-b p-2">
              <div className="flex flex-col mb-2 sm:mb-0">
                <div className="flex items-center">
                  <div className="font-bold">Payments : </div>
                  <div className="text-gray-600 text-xs mt-1 mx-1">
                    <span className="font-bold">{year?.year}</span> Payment
                    Ledger
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
                <div className="">
                  <div className="flex items-center">
                    <Popover content={rangeOptions} title="" placement="bottom">
                      <button className="flex items-center justify-center cursor-pointer focus:outline-none  py-1 rounded-md">
                        <div className="font-bold">{year?.year}</div>
                        <div className="ml-1">
                          <BsCaretDown color="#E8472E" />
                        </div>
                      </button>
                    </Popover>
                  </div>
                </div>
                {user?.isAdmin && (
                  <button
                    onClick={() => setCreateModal(true)}
                    className="flex mx-2 justify-center items-center border px-4 py-1 h-10 hover:bg-gray-100"
                  >
                    <LuPlus size={18} /> <span className="mx-2">New</span>
                  </button>
                )}
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
              </div>
            </div>
            {isError ? (
              <Something refetch={refetch} isFetching={isFetching} />
            ) : (
              <div className="m-1">
                <Table
                  size="small"
                  dataSource={payments?.data}
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
        </div>
      </div>

      <MemberPayment
        isVisible={paymentModal}
        setVisible={setPaymentModal}
        refetch={refetch}
        selected={selected}
        year={year?.year}
      />

      <UpdatePayment
        isVisible={updateModal}
        setVisible={setUpdateModal}
        refetch={refetch}
        selected={selected}
        year={year?.year}
      />

      <UpdatePaydate
        isVisible={paydateModal}
        setVisible={setPaydateModal}
        refetch={refetch}
        selected={selected}
        year={year?.year}
      />

      <CreatePayment
        isVisible={createModal}
        setVisible={setCreateModal}
        refetch={handleRefetch}
      />

      <ReceiptPanel
        isVisible={receiptModal}
        setVisible={setReceiptModal}
        refetch={refetch}
        institute={institute}
        selected={selected}
        year={year?.year}
      />
    </div>
  );
}
