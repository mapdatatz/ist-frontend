import { Outlet } from "react-router";
import Header from "./components/Header";
import {
  TbBuildingBank,
  TbMoneybag,
  TbSettings,
  TbSmartHome,
  TbUsers,
} from "react-icons/tb";
import AdminLink from "./components/AdminLink";
import logo from "../assets/images/logo.png";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function MainLayout() {
  const { menuOpen, setMenuOpen } = useContext(AuthContext);
  const menus = [
    {
      id: 1,
      to: "/dashboard",
      name: "Dashboard",
      icon: <TbSmartHome size={28} />,
    },
    {
      id: 2,
      to: "/payments",
      name: "Payments",
      icon: <TbMoneybag size={28} />,
    },
    {
      id: 3,
      to: "/members",
      name: "Members",
      icon: <TbUsers size={28} />,
    },

    {
      id: 4,
      to: "/corporates",
      name: "Corporates",
      icon: <TbBuildingBank size={28} />,
    },
    {
      id: 5,
      to: "/manage",
      name: "Manage",
      icon: <TbSettings size={28} />,
    },
  ];
  return (
    <div className="flex bg-gray-100 min-h-screen font-ist">
      <div className="w-full">
        <div className="flex">
          {menuOpen && (
            <div className="bg-gray-200 w-24 min-h-screen">
              <div className="bg-ist h-16 border-r border-ist-pale flex justify-center items-center">
                <img
                  src={logo}
                  alt=""
                  width={50}
                  className="bg-white rounded-full mr-2"
                />
              </div>

              <div className="border-r border-gray-300 ">
                {menus.map((menu: any, index: number) => (
                  <AdminLink to={`${menu.to}`} icon={menu.icon} key={index}>
                    {menu.name}
                  </AdminLink>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
