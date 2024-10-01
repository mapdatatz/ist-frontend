import { Button, Modal, Form, Row, Col, Input, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleCreateMembership } from "../../../api/memberships";

export default function CreateMembership({ isVisible, setVisible }: any) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: handleCreateMembership,
    onSuccess: () => {
      message.success("Created Successfully");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
    },
    onError: (error) => {
      message.error(`${error}`);
    },
  });

  const onSubmit = async () => {
    const { category, fee } = await form.getFieldsValue();

    const data = {
      category,
      fee: Number(fee),
    };
    await mutate({ data });
    setVisible(false);
  };

  const clearForm = async () => {
    form.resetFields();
  };

  return (
    <Modal
      open={isVisible}
      title="New Memberships"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="createMembership"
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
        id="createMembership"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <Row gutter={[16, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: false,
                  message: "Please enter category",
                },
              ]}
            >
              <Input type="text" placeholder="Category" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="fee"
              label="Fee"
              rules={[
                {
                  required: true,
                  message: "Please enter fee amount",
                },
              ]}
            >
              <Input
                type="number"
                step={100000}
                placeholder="Fee Amount"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
