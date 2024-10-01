import { useQuery } from "@tanstack/react-query";
import { TbUsers } from "react-icons/tb";
import { Link } from "react-router-dom";
import { handleFetchAllMembersCount } from "../../../api/members";
import { GoChevronRight } from "react-icons/go";
import { BsCalendar3 } from "react-icons/bs";

export default function MembersWidget({ year }: any) {
  const { data: count } = useQuery({
    queryKey: ["memberCount"],
    queryFn: handleFetchAllMembersCount,
  });
  return (
    <Link
      to={`/members`}
      className={`col-span-12 md:col-span-6 lg:col-span-3 bg-white p-4 rounded-md mx-1 mt-1 sm:mx-1 sm:my-1`}
      style={{
        backgroundColor: "#4A71FF",
        color: "#FFFFFF",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl sm:text-6xl font-bold">
          <TbUsers color="#ffffff" size={40} />
        </div>
        <div className="flex flex-col">
          <div className="text-2xl text-right">Members</div>
          <div className="text-3xl text-right font-bold">{count}</div>
        </div>
      </div>
      <div className="border-t border-gray-300 flex justify-between pt-3">
      <div className="flex items-center"><BsCalendar3  className="mr-2"/> {year?.year}</div>
        <div className="flex items-center">Members<GoChevronRight /></div>
      </div>
    </Link>
  );
}
