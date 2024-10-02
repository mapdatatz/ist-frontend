import { useContext, useEffect } from "react";

import { Button, Modal, Form, Row, Col, Input, message } from "antd";
import { AuthContext } from "../../../contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUpdateProfile } from "../../../api/users";

export default function UpdateDetails({ isVisible, setVisible }: any) {
  const { user, updateUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: handleUpdateProfile,
    onSuccess: (data: any) => {
      message.success("Updated Successfully");
      form.resetFields();
      updateUser(data?.user);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setVisible(false);
    },
    onError: (error) => {
      message.error(`${error}`);
    },
  });

  const onSubmit = async () => {
    const { name, mobile, email } = await form.getFieldsValue();
    await mutate({ _id: user?.id, data: { name, mobile, email } });
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ name: user?.name });
    form.setFieldsValue({ mobile: user?.mobile });
    form.setFieldsValue({ email: user?.email });
  }, [form, user]);

  return (
    <Modal
      open={isVisible}
      title={<div className="flex">Update Details</div>}
      onCancel={() => setVisible(!isVisible)}
      width={680}
      footer={[
        <Button key="back" danger onClick={() => setVisible(!isVisible)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          form="updateProfile"
          htmlType="submit"
          type="primary"
          onSubmit={onSubmit}
          loading={isPending}
          danger
        >
          Update
        </Button>,
      ]}
    >
      <Form
        id="updateProfile"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <Row gutter={[16, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="name"
              label={"Name"}
              rules={[
                {
                  required: true,
                  message: "Please enter firstname",
                },
              ]}
            >
              <Input placeholder="First Name" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="email"
              label={"Email"}
              rules={[
                {
                  required: true,
                  message: "Please enter email",
                },
              ]}
            >
              <Input
                type={"email"}
                placeholder="Email"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="mobile"
              label={"Mobile"}
              rules={[
                {
                  required: true,
                  message: "Please enter lastname",
                },
              ]}
            >
              <Input placeholder="Last Name" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
