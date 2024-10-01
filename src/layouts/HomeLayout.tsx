import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <div className="w-full h-screen bg-gray-100 font-ist">
      <Outlet />
    </div>
  );
}
