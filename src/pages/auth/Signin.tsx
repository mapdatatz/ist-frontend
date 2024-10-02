import { useState, useEffect, useContext } from "react";
import logo from "../../assets/images/logo.png";
import banner from "../../assets/images/icon.jpg";
import spin from "../../assets/images/spin.svg";
import { Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import "../../assets/styles/waves.css";
import { Link } from "react-router-dom";
const {REACT_APP_API_URL} = process.env

export default function Signin() {
  const { token, signinUser } = useContext(AuthContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSpinning, setSpinning] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
    if (email.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password, navigate, token]);

  const handleSignin = async (e: any) => {
    try {
      setSpinning(true);
      e.preventDefault();
      const data = { email, password };
      const uri = `v1/users/login`;

      const res = await fetch(`${REACT_APP_API_URL}/${uri}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          message.error("Incorrect email or password");
          setSpinning(false);
          return;
        }
        message.error("Something went wrong");
        setSpinning(false);
        return;
      }

      if(!response?.user?.isActive){
        navigate("/denied");
        return
      }

      const credentials = {
        user: response?.user,
        token: response?.token,
      };
      signinUser(credentials);

      setSpinning(false);
    } catch (error) {
      message.error("Network Error");
      setSpinning(false);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleSignin(e);
    }
  };

  return (
    <div className="header">
      <div className="inner-header flexo">
        <div className="max-w-2xl w-full pt-24 sm:pt-32 px-5">
          <div className="flex flex-row justify-center w-full">
            <div className="w-full sm:w-1/2 p-4 bg-gray-100 rounded-tl-lg rounded-bl-lg">
              <div className="text-center mt-4">
                <img className="mx-auto h-20 w-auto " src={logo} alt="" />
                <p className="mt-4">Sign in with email and password </p>
              </div>
              <div className="mb-4">
                <form className="mt-2">
                  <input type="hidden" name="remember" value="true" />
                  <div className="rounded-md shadow-sm">
                    <div>
                      <Input
                        aria-label="Email"
                        name="email"
                        type="text"
                        size="large"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e)}
                        className="flex flex-row justify-center"
                        placeholder="Email"
                      />
                    </div>
                    <div className="-mt-px">
                      <Input.Password
                        aria-label="Password"
                        name="password"
                        type="password"
                        size="large"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e)}
                        className="flex flex-row justify-center"
                        placeholder="Password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <label className="ml-1 mr-1 block text-sm leading-5 text-gray-900">
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/forgot"
                      className="text-xs text-center flex items-center text-gray-800 hover:text-ist-dark"
                    >
                      Forgot your Password?
                    </Link>
                  </div>

                  <div className="border-t border-gray-300  max-w-md mt-2 mb-4 w-full"></div>

                  <div className="mt-6 mb-4">
                    <button
                      onClick={(e: any) => handleSignin(e)}
                      className="group relative w-full flex justify-center py-3 sm:py-2 px-4
              border border-transparent text-sm leading-5 font-medium
              rounded-md text-white bg-ist hover:bg-ist-dark
              focus:outline-none
              focus:shadow-outline-indigo  transition
              duration-150 ease-in-out"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg
                          className="h-5 w-5 text-white group-hover:text-whitetransition ease-in-out duration-150"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      {isSpinning ? (
                        <span>
                          <img
                            src={spin}
                            alt="spin"
                            height="20px"
                            width="20px"
                          />
                        </span>
                      ) : (
                        <span className="text-white">Sign in</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="w-0 bg-white sm:w-1/2 rounded-tr-lg rounded-br-lg flex">
              <div className="flex flex-col justify-center items-center  w-full">
                <img src={banner} className="w-72" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.7"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
}
