import { Button, Modal, Form, Row, Col, Select, Input, message } from "antd";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUpdateUser } from "../../../api/users";

const { Option } = Select;

export default function UpdateUser({ isVisible, setVisible, selected }: any) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: handleUpdateUser,
    onSuccess: () => {
      message.success("Updated Successfully");
      form.resetFields();
      setVisible(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      message.error("Something went wrong");
    },
  });

  const onSubmit = async () => {
    const values = await form.getFieldsValue();
    const data = { ...values, accessLevel: Number(values?.accessLevel) };
    await mutate({ _id: selected?._id, data });
  };

  const clearForm = async () => {
    form.resetFields();
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ name: selected?.name });
    form.setFieldsValue({ email: selected?.email });
    form.setFieldsValue({ mobile: selected?.mobile });
    form.setFieldsValue({ isActive: selected?.isActive });
    form.setFieldsValue({ isAdmin: selected?.isAdmin });
    form.setFieldsValue({ accessLevel: selected?.accessLevel });
  }, [selected, form]);

  return (
    <Modal
      open={isVisible}
      title="Update User"
      onCancel={() => setVisible(false)}
      footer={[
        <Button danger key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="updateUser"
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
        id="updateUser"
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
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: "Please enter full name",
                },
              ]}
            >
              <Input type="text" placeholder="Full Name" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter email",
                },
              ]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="mobile"
              label="Mobile"
              rules={[
                {
                  required: false,
                  message: "Please enter mobile",
                },
              ]}
            >
              <Input type="text" placeholder="Mobile" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="accessLevel"
              label={"Access Level"}
              rules={[
                {
                  required: false,
                  message: "Please select access level",
                },
              ]}
            >
              <Select placeholder="Access Level">
                <Option value={0}>Level 0</Option>
                <Option value={1}>Level 1</Option>
                <Option value={2}>Level 2</Option>
                <Option value={3}>Level 3</Option>
                <Option value={4}>Level 4</Option>
                <Option value={9}>Level 9</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="isActive"
              label={"Active"}
              rules={[
                {
                  required: false,
                  message: "Please select one option",
                },
              ]}
            >
              <Select placeholder="Active">
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="isAdmin"
              label={"Admin"}
              rules={[
                {
                  required: false,
                  message: "Please select one option",
                },
              ]}
            >
              <Select placeholder="Admin">
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
