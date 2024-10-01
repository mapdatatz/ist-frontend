import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import {   handleUpdateQualification } from "../../../../api/members";
import { useEffect } from "react";
import TextArea from "antd/es/input/TextArea";

export default function UpdateQualification({
  isVisible,
  setVisible,
  member,
  selected,
}: any) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: handleUpdateQualification,
    onSuccess: () => {
      message.success("Updated Successfully");
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
    mutate({ _id: member?._id, qualificationId: selected?._id, data: values });
  };

  useEffect(() => {
    form.setFieldsValue({ title: selected?.title });
    form.setFieldsValue({ year: selected?.year });
    form.setFieldsValue({ description: selected?.description });
  }, [selected]);

  return (
    <Modal
      open={isVisible}
      title="Update Qualification"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="updateMemberQualification"
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
        id="updateMemberQualification"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <div className="">
          <Row gutter={[16, 0]}>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter title",
                  },
                ]}
              >
                <Input type="text" placeholder="Title" />
              </Form.Item>
            </Col>
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
                <Input type="text" placeholder="Year" />
              </Form.Item>
            </Col>
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
                <TextArea  placeholder="Description" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
}
