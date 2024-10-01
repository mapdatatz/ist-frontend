import { Link } from "react-router-dom";
import {  useContext, useState } from "react";
import Profile from "../../components/shared/Profile";
import { AiOutlineMenu } from "react-icons/ai";
import { AuthContext } from "../../contexts/AuthContext";


export default function Header() {
  const {menuOpen, setMenuOpen} = useContext(AuthContext)
  const [isVisible, setVisible] = useState<boolean>(false)

  return (
    <div className="h-16 bg-ist flex justify-between items-center px-2">
      <div className="flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="flex sm:hidden mr-4">
          <AiOutlineMenu size={30} color="#FFFFFF" />
        </button>

      <Link to={"/dashboard"} className="flex items-center justify-center">
        <div className="flex items-center">
          <div className="text-white text-2xl font-bold">
            IST
          </div>
          <div className="hidden sm:block border-l text-white text-xl mx-2 px-2 font-extralight">
          SURVEYORS MANAGEMENT PORTAL
        </div>
        <div className=" sm:hidden border-l text-white text-2xl mx-2 px-2 font-thin">
          SMP
        </div>
        </div>

      </Link>
      </div>
      <div className="flex text-white text-3xl"></div>
      <div className="flex items-center">
        <Profile  isVisible={isVisible} setVisible={setVisible}/>
      </div>
    </div>
  );
}
