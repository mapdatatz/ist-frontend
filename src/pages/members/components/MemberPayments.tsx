import { useQuery } from "@tanstack/react-query";
import { handleMemberPayments } from "../../../api/payments";
import { ImFilePdf } from "react-icons/im";
import formatMoney from "../../../utils/formatMoney";
import { TfiCreditCard } from "react-icons/tfi";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Table } from "antd";
import MemberPayment from "../../payments/components/MemberPayment";
import ReceiptPanel from "../../payments/components/ReceiptPanel";

export default function MemberPayments({ id, memberId, member, payments, isLoading, refetch, institute }: any) {
  const { user } = useContext(AuthContext);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [receiptModal, setReceiptModal] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);


  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 10,
    total: 0,
  });

  const handlePageChange = (e: any) => {
    setPagination((prev: any) => ({
      ...prev,
      page: e.current,
      limit: e.pageSize,
    }));
  };

  const columns = [
    {
      title: "S/N",
      width: 40,
      render: (record: any, text: any, index: any) => (
        <span className="text-gray-700 ml-2">
          {pagination?.page * pagination?.limit - pagination?.limit + index + 1}
        </span>
      ),
    },
    {
      title: "YEAR",
      width: 40,
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
      width: 100,
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
          <div className="flex flex-col justify-start text-gray-700">
            <div className="">{formatMoney(record?.expectedAmount) || "-"}</div>
          </div>
        );
      },
    },
    {
      title: "PAID",
      width: 100,
      render: (record: any) => {
        return (
          <div className="flex flex-col justify-start text-gray-700">
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
          <div className="flex flex-col justify-start text-gray-700">
            <div className=""> {formatMoney(record?.remainAmount) || "-"}</div>
          </div>
        );
      },
    },
    {
      title: "STATUS",
      width: 120,
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
      width: 70,
      render: (record: any) => (
        <div className="flex justify-center">
          {record?.isPaid ? (
            <button
              onClick={() => {
                setSelectedPayment({
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
                <button
                  onClick={() => {
                    setSelectedPayment({
                      ...record,
                    });
                    setUpdateModal(true);
                  }}
                  className="flex justify-center items-center ml-1 text-gray-700 border rounded-md px-3 py-1 bg-green-100 hover:bg-green-200"
                >
                  <TfiCreditCard color="green" />
                  <span className="ml-1">Pay</span>
                </button>
              ) : (
                <button className="flex justify-center items-center ml-1 text-gray-700 border rounded-md px-3 py-1 bg-gray-100 hover:bg-gray-200 cursor-not-allowed">
                  <TfiCreditCard color="gray" />
                  <span className="ml-1">Pay</span>
                </button>
              )}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4">Member Payments</div>
      <div className="">
        <Table
          size="small"
          dataSource={payments}
          columns={columns}
          scroll={{ y: 660, x: 0 }}
          rowKey="id"
          bordered
          pagination={false}
          rowClassName={"hover:cursor-pointer hover:bg-gray-100"}
          onChange={(e: any) => handlePageChange(e)}
          loading={isLoading}
        />
      </div>

      <MemberPayment
        isVisible={updateModal}
        setVisible={setUpdateModal}
        refetch={refetch}
        selected={selectedPayment}
        year={selectedPayment?.year}
      />

      <ReceiptPanel
        isVisible={receiptModal}
        setVisible={setReceiptModal}
        refetch={refetch}
        selected={selectedPayment}
        institute={institute}
        year={selectedPayment?.year}
      />
    </div>
  );
}
