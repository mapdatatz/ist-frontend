import { TbMoodSadSquint } from "react-icons/tb";
import { SlReload } from "react-icons/sl";
import { FiLoader } from "react-icons/fi";

export default function Error({ refetch, isFetching, error }: any) {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center my-20">
        <div className="flex items-center">
          <TbMoodSadSquint size={40} color="#9ca3af" />
        </div>
        <div className="text-white">{error}</div>

      </div>
    </div>
  );
}