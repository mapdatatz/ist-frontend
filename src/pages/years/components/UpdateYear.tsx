import { Button, Modal, Form, Row, Col, Input, message } from "antd";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUpdateYear } from "../../../api/years";


export default function UpdateYear({ isVisible, setVisible, selected }: any) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: handleUpdateYear,
    onSuccess: () => {
      message.success("Updated Successfully");
      form.resetFields();
      setVisible(false);
      queryClient.invalidateQueries({ queryKey: ["years"] });
    },
    onError: () => {
      message.error("Something went wrong");
    },
  });

  const onSubmit = async () => {
    const {year, expectedAmount} = await form.getFieldsValue();
    const data = { year: Number(year), expectedAmount: Number(expectedAmount) };
    await mutate({ _id: selected?._id, data });
  };

  const clearForm = async () => {
    form.resetFields();
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ year: selected?.year });
    form.setFieldsValue({ expectedAmount: selected?.expectedAmount });
  }, [selected]);

  return (
    <Modal
      open={isVisible}
      title="Update Year"
      onCancel={() => setVisible(false)}
      footer={[
        <Button danger key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="updateYear"
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
        id="updateYear"
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
                  required: false,
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
                  required: true,
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
