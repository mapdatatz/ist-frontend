import { Link, useLocation, useNavigate } from "react-router-dom";
import { PasswordInput } from "antd-password-input-strength";
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import spin from "../../assets/images/spin.svg";
import { BiChevronLeft } from "react-icons/bi";
import { Col, Form, message, Row } from "antd";
import React from "react";
import zxcvbn from "zxcvbn";
const {BASE_API_URL} = process.env

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Reset() {
  const [isLoading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  let query = useQuery();
  let userEmail = query.get("email");
  let userToken = query.get("token");
  let userCode = query.get("code");

  const onSubmit = async (e: any) => {
    const { password, cpassword } = form.getFieldsValue();
    setLoading(true);
    e.preventDefault();
    const score = password.length === 0 ? -1 : zxcvbn(password).score;
    if (score < 3) {
      message.error("Use stronger password");
    } else {
      if (password !== cpassword) {
        message.error("Passwords must match");
        setLoading(false);
        return;
      }
      const data = {
        password,
        token: userToken,
        email: userEmail,
        code: userCode,
      };
      const uri = "users/password/reset/self";
      const res = await fetch(`${BASE_API_URL}/${uri}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response: any = await res.json();

      if (response.success) {
        message.success("Password was updated successfully");
        navigate("/");
      } else {
        message.error(response?.message);
        setLoading(false);
      }
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
                <div className="font-bold text-black my-4">RESET PASSWORD</div>
                <p>Enter and confirm your new password </p>
              </div>
              <div className="mb-4">
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm">
                  <Form
                    id="resetPassword"
                    form={form}
                    name="normal_login"
                    className="login-form"
                    onFinish={onSubmit}
                  >
                    <Row gutter={[16, 0]}>
                      <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                        <Form.Item
                          name="password"
                          className="py-2"
                          rules={[
                            {
                              required: true,
                              message: `Please enter Password`,
                            },
                          ]}
                        >
                          <PasswordInput
                            size="middle"
                            placeholder="New Password"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 0]} className="-mt-6">
                      <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                        <Form.Item
                          name="cpassword"
                          rules={[
                            {
                              required: true,
                              message: `Please enter Password`,
                            },
                          ]}
                        >
                          <PasswordInput
                            size="middle"
                            placeholder="Confirm Password"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </div>

                <Link
                  to="/"
                  className="text-xs text-center flex items-center text-karimjee hover:text-ist-dark mt-2 py-2 rounded-md"
                >
                  <BiChevronLeft size={20} />
                  Login
                </Link>

                <div className="border-t border-gray-300  max-w-md mt-4 mb-4 w-full"></div>

                <div className="mt-4 mb-4">
                  <button
                    onClick={(e: any) => onSubmit(e)}
                    className="group relative w-full flex justify-center py-3 sm:py-2 px-4
                        border border-transparent text-sm leading-5 font-medium
                        rounded-md text-white bg-ist hover:bg-ist-dark
                        focus:outline-none 
                        focus:shadow-outline-indigo active:bg-ist-dark transition
                        duration-150 ease-in-out"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    {isLoading ? (
                      <span>
                        <img src={spin} alt="spin" height="20px" width="20px" />
                      </span>
                    ) : (
                      <span className="text-white">Submit</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
