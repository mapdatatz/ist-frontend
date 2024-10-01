import { Button, Modal, Form, Row, Col, Select, Input, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleCreateUser } from "../../../api/users";
import zxcvbn from "zxcvbn";
import { PasswordInput } from "antd-password-input-strength";

const { Option } = Select;

export default function CreateUser({ isVisible, setVisible }: any) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: handleCreateUser,
    onSuccess: () => {
      message.success("Created Successfully");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      message.error(`${error}`);
    },
  });

  const onSubmit = async () => {
    const { name, mobile, email, password, accessLevel } =
      await form.getFieldsValue();

    const score = password.length === 0 ? -1 : zxcvbn(password).score;
    if (score < 3) {
      message.error("Use stronger password");
    } else {
      const data = {
        name,
        email,
        mobile,
        password,
        accessLevel: Number(accessLevel),
      };
      await mutate(data);
    }
    setVisible(false);
  };

  const clearForm = async () => {
    form.resetFields();
  };

  return (
    <Modal
      open={isVisible}
      title="New User"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="createUser"
          htmlType="submit"
          type="primary"
          onSubmit={onSubmit}
          loading={isPending}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        id="createUser"
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
        </Row>
        <Row gutter={[16, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="password"
              label={"Password"}
              rules={[
                {
                  required: false,
                  message: `Please enter Password`,
                },
              ]}
            >
              <PasswordInput placeholder="Password" style={{ width: "95%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
