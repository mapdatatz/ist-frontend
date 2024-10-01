import { GoChevronLeft } from "react-icons/go";

export default function BackNav({ link }: any) {
  return (
    <button
      onClick={() => window.history.back()}
      className="bg-white flex items-center border-gray-300 py-2 px-2 hover:text-ist-dark w-full"
    >
      <div className="">
        <GoChevronLeft size={20} />
      </div>
      <div className="mx-1">Back</div>
    </button>
  );
}
