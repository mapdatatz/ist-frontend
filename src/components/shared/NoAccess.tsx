import { HiChevronLeft } from "react-icons/hi";
import { TbMoodSadSquint } from "react-icons/tb";

export default function NoAccess() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center my-20">
        <div className="flex items-center">
          <TbMoodSadSquint size={40} color="#9ca3af" />
        </div>
        <div className="text-gray-400">Opps!, Sorry</div>
        <button className="flex items-center  px-6 py-1 pt-1 mt-2  text-red-600 rounded-md">
          <span>You Can't Access This Module</span>
        </button>

        <button
          onClick={() => window.history.back()}
          className="flex justify-center items-center bg-red-600 px-4 py-1 mt-4 rounded-md hover:bg-red-700"
        >
          <div className="">
            <HiChevronLeft color={"#FFF"} />
          </div>
          <div className="text-white ml-2 mb-1">Go Back</div>
        </button>
      </div>
    </div>
  );
}
