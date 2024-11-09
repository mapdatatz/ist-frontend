import { Button, Modal, Form, message, Row, Col, DatePicker } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { handleUpdatePaydate } from "../../../api/payments";
import validDates from "../../../utils/validDates";

export default function UpdatePaydate({
  isVisible,
  setVisible,
  selected,
  year,
}: any) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: handleUpdatePaydate,
    onSuccess: () => {
      message.success("Updated Successfully");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({
        queryKey: ["memberPayments", selected?._id],
      });
      setVisible(false);
    },
    onError: (error) => {
      message.error(`${error}`);
    },
  });

  const onSubmit = async () => {
    const { paidDate } = await form.getFieldsValue();
    const data = {
      paidDate,
    };
    await mutate({ _id: selected?._id, data });
  };

  const clearForm = async () => {
    form.resetFields();
  };

  useEffect(() => {}, [selected]);

  return (
    <Modal
      open={isVisible}
      title={`Update Payment Date: ${year}`}
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="updatePaydate"
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
        id="updatePaydate"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="text-2xl font-bold">{selected?.name}</div>
        </div>

        <Row gutter={24}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Form.Item
              name="paidDate"
              label="Payment Date"
              rules={[
                {
                  required: false,
                  message: "Please enter payment date",
                },
              ]}
            >
              <DatePicker
                type="text"
                format={"DD/MM/YYYY"}
                style={{ width: "100%" }}
                placeholder="Payment Date"
                disabledDate={validDates}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
