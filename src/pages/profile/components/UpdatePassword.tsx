import { useContext, useEffect, useState } from "react";

import { Button, Modal, Form, Row, Col } from "antd";
import { PasswordInput } from "antd-password-input-strength";
import { message } from "antd";
import zxcvbn from "zxcvbn";
import { AuthContext } from "../../../contexts/AuthContext";

export default function UpdatePassword({ isVisible, setVisible }: any) {
  const { user } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onSubmit = async () => {
    setLoading(true);
    const { password } = form.getFieldsValue();
    const score = password.length === 0 ? -1 : zxcvbn(password).score;
    if (score < 3) {
      message.error("Use stronger password");
    } else {
      const response: any = {};
      if (response.success) {
        message.success("Updated successfully");
        setVisible(false);
      } else {
        message.error(response.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    form.resetFields();
  }, [form, user]);

  return (
    <Modal
      open={isVisible}
      title={<div className="flex">Update Password</div>}
      onCancel={() => setVisible(false)}
      width={680}
      footer={[
        <Button key="back" danger onClick={() => setVisible(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          form="updatePword"
          htmlType="submit"
          type="primary"
          danger
          onSubmit={onSubmit}
          loading={isLoading}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        id="updatePword"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
      >
        <Row gutter={[16, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Form.Item
              name="oldpassword"
              rules={[
                {
                  required: true,
                  message: "Please enter old password",
                },
              ]}
            >
              <PasswordInput
                type="password"
                placeholder="Old Password"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: `Please enter Password`,
                },
              ]}
            >
              <PasswordInput
                type="password"
                placeholder="Old Password"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
