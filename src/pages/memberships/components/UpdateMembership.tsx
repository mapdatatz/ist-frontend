import { Button, Modal, Form, Row, Col, Input, message } from "antd";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUpdateMembership } from "../../../api/memberships";

export default function UpdateMembership({ isVisible, setVisible, selected }: any) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: handleUpdateMembership,
    onSuccess: () => {
      message.success("Updated Successfully");
      form.resetFields();
      setVisible(false);
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
    },
    onError: () => {
      message.error("Something went wrong");
    },
  });

  const onSubmit = async () => {
    const {category, fee} = await form.getFieldsValue();
    const data = { category: category, fee: Number(fee) };
    await mutate({ _id: selected?._id, data });
  };

  const clearForm = async () => {
    form.resetFields();
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ category: selected?.category });
    form.setFieldsValue({ fee: selected?.fee });
  }, [selected]);

  return (
    <Modal
      open={isVisible}
      title="Update Membership"
      onCancel={() => setVisible(false)}
      footer={[
        <Button danger key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="updateMembership"
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
        id="updateMembership"
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
