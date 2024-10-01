import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Col, DatePicker, Form, Input, message, Modal, Row } from "antd";
import { handleCreateEmployment } from "../../../../api/members";
import TextArea from "antd/es/input/TextArea";


export default function CreateEmployment({ isVisible, setVisible, member }: any) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: handleCreateEmployment,
    onSuccess: () => {
      message.success("Created Successfully");
      form.resetFields();
      setVisible(false);
      queryClient.invalidateQueries({ queryKey: ["members", member?._id] });
    },
    onError: (error) => {
      message.error(`${error}` || "Something went wrong");
    },
  });
  const clearForm = () => {
    form.resetFields();
  };
  const onSubmit = async () => {
    const values = await form.getFieldsValue();
    mutate({ _id: member?._id, data: values });
  };

  return (
    <Modal
      open={isVisible}
      title="New Employment Record"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="createMemberEmployment"
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
        id="createMemberEmployment"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <div className="">
          <Row gutter={[16, 0]}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="company"
                label="Company"
                rules={[
                  {
                    required: true,
                    message: "Please enter company",
                  },
                ]}
              >
                <Input type="text" placeholder="Company" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="position"
                label="Position"
                rules={[
                  {
                    required: true,
                    message: "Please enter position",
                  },
                ]}
              >
                <Input type="text" placeholder="Position" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[
                  {
                    required: false,
                    message: "Please enter start date",
                  },
                ]}
              >
                <DatePicker format={"DD/MM/YYYY"} style={{width: "100%"}} placeholder="Start Date" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[
                  {
                    required: false,
                    message: "Please enter end date",
                  },
                ]}
              >
                <DatePicker format={"DD/MM/YYYY"}  style={{width: "100%"}} placeholder="End Date" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: false,
                    message: "Please enter description",
                  },
                ]}
              >
                <TextArea placeholder="Description" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
}
