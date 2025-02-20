import { Button, Drawer, Space } from "antd";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { AiOutlineClose, AiOutlinePrinter } from "react-icons/ai";
import logo from "../../../assets/images/logoo.jpg";
import sign from "../../../assets/images/sign.png";
import Moment from "react-moment";
import formatMoney from "../../../utils/formatMoney";
import formatId from "../../../utils/formatId";

export default function ReceiptPanel({
  isVisible,
  setVisible,
  selected,
  institute,
  year,
}: any) {
  const docRef: any = useRef(null);
  const onClose = () => {
    setVisible(false);
  };
  return (
    <Drawer
      title={`RECEIPT: ${selected?.name} - ${year}`}
      placement={"right"}
      width={700}
      onClose={onClose}
      open={isVisible}
      closable={false}
      extra={
        <Space>
          <ReactToPrint
            trigger={() => {
              return (
                <button className="flex justify-center border p-2 items-center focus:outline-none  mr-2 text-sm hover:text-blue-600">
                  <AiOutlinePrinter className="mr-1" /> Print Receipt
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
          <div className="flex justify-center font-bold text-2xl mb-4 uppercase">
            {institute?.name}
          </div>
          <div className="flex justify-center mb-8">
            <img src={logo} width={130} alt="" />
          </div>
          <div className="font-bold text-center text-lg">RECEIPT</div>
          <div className="flex flex-col justify-center w-">
            <div className="">Ref No: {selected?.paymentRef}</div>
            <div className="">
              Payment Date :{" "}
              <Moment format="DD/MM/YYYY">{selected?.paidDate}</Moment>
            </div>
            <div className="mb-8">
              Received from <span className="font-bold">{selected?.name}</span>{" "}
              {selected?.memberId
                ? `with Member ID ${formatId(`IST`, selected?.memberId)}`
                : ""}
              , Being payment for <span className="font-bold">{year}</span> an
              amount of{" "}
              <span className="font-bold">
                {formatMoney(selected?.paidAmount)}/ = TZS
              </span>{" "}
              as a{" "}
              <span className="font-bold">
                {selected?.membership?.category}
              </span>{" "}
              member
            </div>
            <div className="">With thanks</div>
            <div className="">
              <img src={sign} width={100} alt="" />
            </div>
            <div className="font-bold">William Mpeli</div>
            <div className="">For: Treasury Office</div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
