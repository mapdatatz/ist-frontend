import { TbMoodSadSquint } from "react-icons/tb";
import { SlReload } from "react-icons/sl";
import { FiLoader } from "react-icons/fi";

export default function Something({ refetch, isFetching }: any) {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center my-20">
        <div className="flex items-center">
          <TbMoodSadSquint size={40} color="#9ca3af" />
        </div>
        <div className="text-gray-400">Something went wrong</div>
        <button
          onClick={() => refetch()}
          className="flex items-center  px-6 py-1 pt-1 mt-2 bg-ist text-white rounded-md"
        >
          <div className="">{isFetching ? <FiLoader /> : <SlReload />}</div>
          <span className="ml-1">Retry</span>
        </button>
      </div>
    </div>
  );
}