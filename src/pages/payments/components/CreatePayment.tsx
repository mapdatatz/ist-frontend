import { Button, Modal, Form, Row, message, Select, Col } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleFetchYears } from "../../../api/years";
import { handleCreatePayment } from "../../../api/payments";

const Option = Select.Option;

export default function CreatePayment({ isVisible, setVisible }: any) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { data: years } = useQuery({
    queryKey: ["years"],
    queryFn: () => handleFetchYears(),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleCreatePayment,
    onSuccess: () => {
      message.success("Created Successfully");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: (error) => {
      message.error(`${error}`);
    },
  });

  const onSubmit = async () => {
    const { year } = await form.getFieldsValue();

    const data = {
      year,
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
      title="New Payment Lerger"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="createPayment"
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
        id="createPayment"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <Row gutter={24}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
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
              <Select placeholder="Year">
                {years?.map((item: any, index: number) => (
                  <Option key={index} value={item?.year}>
                    {item?.year}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
