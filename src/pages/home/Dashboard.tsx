import ExpectedWidget from "./components/ExpectedWidget";
import PaidWidget from "./components/PaidWidget";
import DebtWidget from "./components/DebtWidget";
import MembersWidget from "./components/MembersWidget";
import MainChart from "./components/MainChart";
import { useQuery } from "@tanstack/react-query";
import { handleFetchYears } from "../../api/years";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { BsCalendar2Week, BsCaretDown } from "react-icons/bs";
import { Popover } from "antd";
import { handleYearTotals } from "../../api/payments";
import SideChart from "./components/SideChart";

export default function Dashboard() {
  const today = new Date();
  const [isFiltered, setFiltered] = useState<boolean>(false);
  const [year, setYear] = useState({ year: today?.getFullYear() });
  const { data: years } = useQuery({
    queryKey: ["years"],
    queryFn: () => handleFetchYears(),
  });

  const { data: metrics, refetch } = useQuery({
    queryKey: ["metrics"],
    queryFn: () => handleYearTotals({ year: year?.year }),
  });


  const clearDate = () => {
    setYear({ year: today?.getFullYear() });
    setFiltered(false);
  };

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
              setFiltered(true);
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

  useEffect(() => {
    refetch();
  }, [year]);
  return (
    <div className="">
      <div className="h-10 bg-gray-200 border-b border-gray-300 flex justify-between items-center px-4">
        <div className="uppercase flex">
          <div className="flex items-center">
            <BsCalendar2Week />
            <Moment format="MMM DD, YYYY" className="font-bold mx-2">
              {today}
            </Moment>
          </div>
          <span className="ml-1 text-gray-600">TODAY</span>
        </div>
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
      </div>
      <div className="m-1">
        <div className="grid grid-cols-12 gap-1">
          <MembersWidget   year={year}/>
          <ExpectedWidget metrics={metrics} year={year} />
          <PaidWidget metrics={metrics} year={year} />
          <DebtWidget metrics={metrics} year={year} />
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8 border rounded-md m-2">
            <div className="mx-2  border-b py-2">
              <div className="font-bold text-2xl">Annual Payments</div>
              <div className="text-gray-600 text-xs">
                Payment records for {year?.year} and Past Four Years
              </div>
            </div>
            <div className="" style={{ height: 490 }}>
              <MainChart year={today?.getFullYear()} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 border rounded-md m-2">
            <SideChart metrics={metrics} year={year?.year} />
          </div>
        </div>
      </div>
    </div>
  );
}
