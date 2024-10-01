import { Link } from "react-router-dom";
import { LuFileCheck2 } from "react-icons/lu";

import formatShort from "../../../utils/formatShort";
import { GoChevronRight } from "react-icons/go";
import { BsCalendar3 } from "react-icons/bs";

export default function DebtWidget({ metrics, year }: any) {
  return (
    <Link
      to={`/payments`}
      className={`col-span-12 md:col-span-6 lg:col-span-3 bg-white p-4 rounded-md mx-1 mt-1 sm:mx-1 sm:my-1`}
      style={{
        backgroundColor: "#f87171",
        color: "#FFFFFF",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl sm:text-6xl font-bold">
          <LuFileCheck2 color="#ffffff" size={40} />
        </div>
        <div className="flex flex-col">
          <div className="text-2xl text-right">Debt</div>
          <div className="text-3xl text-right font-bold">
            {formatShort(metrics?.Debt)}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 flex justify-between pt-3">
        <div className="flex items-center"><BsCalendar3  className="mr-2"/> {year?.year}</div>
        <div className="flex items-center">
          Debt <GoChevronRight />
        </div>
      </div>
    </Link>
  );
}
