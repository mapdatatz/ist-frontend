import { Button, Drawer, Space } from "antd";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { AiOutlineClose, AiOutlinePrinter } from "react-icons/ai";
import logo from "../../../assets/images/logo.jpg";
import Moment from "react-moment";
import formatMoney from "../../../utils/formatMoney";
import formatId from "../../../utils/formatId";

export default function StatementPanel({
  isVisible,
  setVisible,
  selected,
  institute,
  payments,
}: any) {
  const docRef: any = useRef(null);
  const onClose = () => {
    setVisible(false);
  };

  const getTotals = () => {
    let expectedTotal = 0;
    let paidTotal = 0;
    let remainTotal = 0;
    payments?.forEach((payment: any) => {
      expectedTotal += payment?.expectedAmount;
      paidTotal += payment?.paidAmount;
      remainTotal += payment?.remainAmount;
    });
    return { expectedTotal, paidTotal, remainTotal };
  };

  const available = payments?.length;

  const data = new Array(28).fill({ id: 1 });
  let few = data.slice(0, 28 - available);

  const { expectedTotal, paidTotal, remainTotal } = getTotals();
  return (
    <Drawer
      title={`STATEMENT: ${selected?.name}`}
      placement={"right"}
      width={800}
      onClose={onClose}
      open={isVisible}
      closable={false}
      extra={
        <Space>
          <ReactToPrint
            trigger={() => {
              return (
                <button className="flex justify-center border p-2 items-center focus:outline-none  mr-2 text-sm hover:text-blue-600">
                  <AiOutlinePrinter className="mr-1" /> Print Statement
                </button>
              );
            }}
            content={() => docRef.current}
            documentTitle={`Receipt`}
          />
          <Button className="" onClick={onClose}>
            <AiOutlineClose />
          </Button>
        </Space>
      }
    >
      <div className="-mt-12">
        <div className="p-16" ref={docRef}>
          <div className="flex justify-center font-bold text-3xl mb-2 uppercase">
           {institute?.name || "-"}
          </div>
          <div className="border-b border-black text-center text-lg mb-6 pb-2">
            MEMBER PAYMENT STATEMENT
          </div>
          <div className="flex justify-between items-center mb-8 mt-4">
            <div className="w-1/3 flex flex-col">
              <div className="font-bold">{selected?.name}</div>
              <div className="">Email: {selected?.email || "-"}</div>
              <div className="">Mobile: {selected?.mobile || "-"}</div>
              <div className="">
                {selected?.isCorporate ? "Corporate" : "Individual"}
              </div>
            </div>
            <div className="w-1/3 flex justify-center">
              <img src={logo} alt="" />
            </div>
            <div className="w-1/3">
              <div className="">
                Statement Date: <Moment format="DD/MM/YYYY"></Moment>
              </div>
              <div className="truncate">
                Membership: {selected?.membership?.category || "-"}
              </div>
              <div className="">Member ID: {formatId(`IST`,selected?.memberId)}</div>
              <div className="text-white">-</div>
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <div className="border border-black w-80">
              <div className="text-center py-1 border-b border-black bg-gray-200 font-bold">
                Payment Details
              </div>
              <div className="flex justify-between">
                <div className="border-r border-black px-2 py-1">
                  Balance Due:
                </div>
                <div className="font-bold px-2 py-1 text-red-600">
                  {formatMoney(remainTotal)}/= TZS
                </div>
              </div>
            </div>
          </div>

          <div className="" style={{fontSize: 13}}>
            <div className="flex justify-end text-xs">All Amounts in TZS</div>
            <div className="grid grid-cols-12 border border-black font-bold">
              <div className="col-span-1 text-center px-2">S/N</div>
              <div className="col-span-2 text-center">YEAR</div>
              <div className="col-span-3 text-center">MEMBERSHIP</div>
              <div className="col-span-2 text-right px-2">EXPECTED</div>
              <div className="col-span-2 text-right px-2">PAID</div>
              <div className="col-span-2 text-right px-2">DEBT</div>
            </div>
            {payments?.map((item: any, index: number) => (
              <div
                className="grid grid-cols-12 border-b border-black"
                key={index}
              >
                <div className="col-span-1 px-2 border-l border-black text-center">
                  {index + 1}.
                </div>
                <div className="col-span-2 text-center">{item?.year}</div>
                <div className="col-span-3 text-center truncate ">
                  {item?.membership?.category}
                </div>
                <div className="col-span-2 text-right px-2">
                  {formatMoney(item?.expectedAmount)}
                </div>
                <div className="col-span-2 text-right px-2">
                  {formatMoney(item?.paidAmount)}
                </div>
                <div className="col-span-2 text-right px-2 border-r border-black">
                  {formatMoney(item?.remainAmount)}
                </div>
              </div>
            ))}
            {few?.map((item: any, index: number) => (
              <div
                className="grid grid-cols-12 border-b border-black text-white"
                key={index}
              >
                <div className="col-span-1 px-2 border-l border-black">-</div>
                <div className="col-span-2">-</div>
                <div className="col-span-3 truncate">-</div>
                <div className="col-span-2 text-right px-2">-</div>
                <div className="col-span-2 text-right px-2">-</div>
                <div className="col-span-2 text-right px-2 border-r border-black">
                  -
                </div>
              </div>
            ))}

            <div className="grid grid-cols-12 border border-black font-bold">
              <div className="col-span-6 px-2">TOTAL</div>
              <div className="col-span-2 text-right px-2">
                {formatMoney(expectedTotal)}
              </div>
              <div className="col-span-2 text-right px-2">
                {formatMoney(paidTotal)}
              </div>
              <div className="col-span-2 text-right px-2">
                {formatMoney(remainTotal)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
