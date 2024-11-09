import { Button, Modal, Form, message, Row, Col, Input } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import formatMoney from "../../../utils/formatMoney";
import { handleUpdatePaymentAmount } from "../../../api/payments";

export default function UpdatePayment({
  isVisible,
  setVisible,
  selected,
  year,
}: any) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: handleUpdatePaymentAmount,
    onSuccess: () => {
      message.success("Updated Successfully");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({
        queryKey: ["memberPayments", selected?._id],
      });
    },
    onError: (error) => {
      message.error(`${error}`);
    },
  });

  const onSubmit = async () => {
    const { expectedAmount } = await form.getFieldsValue();
    const data = {
      expectedAmount,
    };
    await mutate({ _id: selected?._id, data });
    setVisible(false);
  };

  const clearForm = async () => {
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({ expectedAmount: selected?.expectedAmount });
  }, [selected]);

  return (
    <Modal
      open={isVisible}
      title={`Update Payment: ${year}`}
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="updatePayment"
          htmlType="submit"
          type="primary"
          onSubmit={onSubmit}
          loading={isPending}
        >
          Update
        </Button>,
      ]}
    >
      <Form
        id="updatePayment"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="text-2xl font-bold">{selected?.name}</div>
          <div className="font-bold">
            Current Amount: {formatMoney(selected?.expectedAmount)} /=
          </div>
        </div>
        <Row gutter={24}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
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
              <Input type="text" placeholder="Expected Amount" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
