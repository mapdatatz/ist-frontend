import { useEffect } from "react";
import formatMoney from "../../../utils/formatMoney";
import MembershipChart from "./MembershipChart";

export default function SideChart({ metrics, year }: any) {
  const percentage = Number(
    ((metrics?.Paid / metrics?.Expected) * 100).toFixed()
  );

  useEffect(() => {}, [year]);
  return (
    <div className="flex flex-col">
      <div className="" style={{ height: 280 }}>
        <MembershipChart year={year} />
      </div>
      <div className="grid grid-cols-12 p-6">
        <div className="col-span-12 mb-6">
          <div className="">
            <div className="text-6xl font-bold">{isNaN(percentage) ? 0 : percentage}%</div>
            <div className="text-xs text-start">PAID MEMBERS : {year}</div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex justify-between border-b py-2">
            <div>Expected:</div>
            <div className="">{formatMoney(metrics?.Expected)} /=</div>
          </div>
          <div className="flex justify-between border-b py-2">
            <div>Paid:</div>
            <div className="">{formatMoney(metrics?.Paid)} /=</div>
          </div>
          <div className="flex justify-between">
            <div>Debt: </div>
            <div className="">{formatMoney(metrics?.Debt)} /=</div>
          </div>
        </div>
      </div>
    </div>
  );
}
