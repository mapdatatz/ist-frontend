import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import spin from "../../assets/images/spin.svg";
import { BiChevronLeft } from "react-icons/bi";
import { Input, message } from "antd";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function Forgot() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (email.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const uri = `users/email/${email}`;

    const res = await fetch(`${REACT_APP_API_URL}/${uri}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response: any = await res.json();

    if (response?.success) {
      const name: any = `${response?.payload?.firstname}`;
      const data = {
        email,
        name,
        link: `http://localhost:3000/reset?token=${response?.payload?._id}&email=${email}&code=${response?.payload?.code}`,
      };
      const uri = `mail/password/reset`;
      const result = await fetch(`${REACT_APP_API_URL}/${uri}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const mail = await result.json();

      if (mail?.success) {
        message.success("Email was sent successfully");
        navigate("/");
      } else {
        message.error("Something went wrong");
      }
      setLoading(false);
      setLoading(false);
    } else {
      message.error("Sorry, Email does not exist");
      setLoading(false);
      setLoading(false);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleSubmit(e);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="inner-header flexo">
        <div className="max-w-2xl w-full pt-24 sm:pt-36 px-5">
          <div className="flex flex-row justify-center w-full">
            <div className="p-4 w-96 bg-gray-100 rounded-lg">
              <div className="text-center mt-2">
              <img className="mx-auto h-20 w-auto " src={logo} alt="" />
                <div className="font-bold text-black my-4">FORGOT PASSWORD</div>
                <p>Enter valid email address</p>
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
                  </div>

                  <Link
                    to="/"
                    className="text-xs text-center flex items-center text-black hover:text-ist-dark mt-2 py-2 rounded-md"
                  >
                    <BiChevronLeft size={20} />
                    Go back
                  </Link>

                  <div className="border-t border-gray-300  max-w-md mt-4 mb-4 w-full"></div>

                  <div className="mt-4 mb-4">
                    <button
                      onClick={(e: any) => handleSubmit(e)}
                      className="group relative w-full flex justify-center py-3 sm:py-2 px-4
                      border border-transparent text-sm leading-5 font-medium
                      rounded-md text-white bg-ist hover:bg-red-700
                      focus:outline-none focus:border-automark-dark
                      focus:shadow-outline-indigo active:bg-automark-dark transition
                      duration-150 ease-in-out"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                      {isLoading ? (
                        <div className="flex">
                          <img
                            src={spin}
                            alt="spin"
                            height="20px"
                            width="20px"
                          />
                          <span className="ml-1">Verifying Email</span>
                        </div>
                      ) : (
                        <span className="text-white">
                          Send password reset link
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
