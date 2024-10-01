import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="font-ist">
      <Outlet />
    </div>
  );
}