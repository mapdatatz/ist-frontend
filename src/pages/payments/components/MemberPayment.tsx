import { Button, Modal, Form, message, Row, Col, Input } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import formatMoney from "../../../utils/formatMoney";
import { handleMemberPayment } from "../../../api/payments";

export default function MemberPayment({
  isVisible,
  setVisible,
  selected,
  year,
}: any) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: handleMemberPayment,
    onSuccess: () => {
      message.success("Updated Successfully");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["memberPayments", selected?.member] });
    },
    onError: (error) => {
      message.error(`${error}`);
    },
  });

  const onSubmit = async () => {
    const { paymentRef } = await form.getFieldsValue();
    const data = {
      paidAmount: selected?.expectedAmount,
      paymentRef,
    };
    await mutate({ _id: selected?._id, data });
    setVisible(false);
  };

  const clearForm = async () => {
    form.resetFields();
  };

  useEffect(() => {}, [selected]);

  return (
    <Modal
      open={isVisible}
      title={`Add Payment: ${year}`}
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="memberPayment"
          htmlType="submit"
          type="primary"
          onSubmit={onSubmit}
          loading={isPending}
        >
          Pay
        </Button>,
      ]}
    >
      <Form
        id="memberPayment"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="text-2xl font-bold">{selected?.name}</div>
          <div className="">{year} Membership Fee of</div>
          <div className="font-bold">
            {formatMoney(selected?.expectedAmount)} /=
          </div>
        </div>
        <Row gutter={24}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Form.Item
              name="paymentRef"
              label="Payment Reference Number"
              rules={[
                {
                  required: false,
                  message: "Please enter year",
                },
              ]}
            >
              <Input type="text" placeholder="Reference Number" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
