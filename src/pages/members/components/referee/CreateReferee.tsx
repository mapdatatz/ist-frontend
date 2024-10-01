import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import { handleCreateReferee } from "../../../../api/members";
import TextArea from "antd/es/input/TextArea";

export default function CreateReferee({
  isVisible,
  setVisible,
  member,
}: any) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: handleCreateReferee,
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
      title="New Referee"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="createMemberReferee"
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
        id="createMemberReferee"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <div className="">
          <Row gutter={[16, 0]}>
            <Col xs={{ span: 24 }} lg={{ span: 12}}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter name",
                  },
                ]}
              >
                <Input type="text" placeholder="Name" />
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
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
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
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item
                name="office"
                label="Office / Company"
                rules={[
                  {
                    required: false,
                    message: "Please enter office",
                  },
                ]}
              >
                <TextArea  placeholder="Office" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
}
