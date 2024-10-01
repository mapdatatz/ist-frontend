import { Button, Modal, Form, Row, Col, Input, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleCreateYear } from "../../../api/years";

export default function CreateYear({ isVisible, setVisible }: any) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: handleCreateYear,
    onSuccess: () => {
      message.success("Created Successfully");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["years"] });
    },
    onError: (error) => {
      message.error(`${error}`);
    },
  });

  const onSubmit = async () => {
    const { year, expectedAmount } = await form.getFieldsValue();

    const data = {
      year: Number(year),
      expectedAmount: Number(expectedAmount),
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
      title="New Year"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="createYear"
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
        id="createYear"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <Row gutter={[16, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="year"
              label="Year"
              rules={[
                {
                  required: true,
                  message: "Please enter year",
                },
              ]}
            >
              <Input type="number" step={1} placeholder="Year" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="expectedAmount"
              label="Expected Amount"
              rules={[
                {
                  required: false,
                  message: "Please enter expected amount",
                },
              ]}
            >
              <Input
                type="number"
                step={1000000}
                placeholder="Expected Amount"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
