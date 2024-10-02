import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import {  handleUpdateEducation } from "../../../../api/members";
import { useEffect } from "react";

const { Option } = Select;

export default function UpdateEducation({
  isVisible,
  setVisible,
  member,
  selected,
}: any) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: handleUpdateEducation,
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
    mutate({ _id: member?._id, educationId: selected?._id, data: values });
  };

  useEffect(() => {
    form.setFieldsValue({ level: selected?.level });
    form.setFieldsValue({ institution: selected?.institution });
    form.setFieldsValue({ startYear: selected?.startYear });
    form.setFieldsValue({ endYear: selected?.endYear });
    form.setFieldsValue({ result: selected?.result });
  }, [selected, form]);

  return (
    <Modal
      open={isVisible}
      title="Update Education"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="updateMemberEducation"
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
        id="updateMemberEducation"
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
                name="level"
                label="Level"
                rules={[
                  {
                    required: true,
                    message: "Please select level",
                  },
                ]}
              >
                <Select placeholder="Select Level">
                  <Option value="Primary School">Primary School</Option>
                  <Option value="Ordinary Level School">Ordinary Level School</Option>
                  <Option value="Advanced Level School">Advanced Level School</Option>
                  <Option value="Certificate Level College">Certificate Level College</Option>
                  <Option value="Diploma Level College">Diploma Level College</Option>
                  <Option value="Bachelor Degree">Bachelor Degree</Option>
                  <Option value="Masters Degree">Masters Degree</Option>
                  <Option value="PHD Degree">PHD Degree</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="institution"
                label="Institution"
                rules={[
                  {
                    required: true,
                    message: "Please select institution",
                  },
                ]}
              >
                <Input type="text" placeholder="Institution" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="startYear"
                label="Start Year"
                rules={[
                  {
                    required: false,
                    message: "Please enter start year",
                  },
                ]}
              >
                <Input type="number" placeholder="Start Year" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="endYear"
                label="End Year"
                rules={[
                  {
                    required: false,
                    message: "Please enter end year",
                  },
                ]}
              >
                <Input type="number" placeholder="End Year" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="result"
                label="Grade / Division / GPA (Optional)"
                rules={[
                  {
                    required: false,
                    message: "Please enter result",
                  },
                ]}
              >
                <Input type="text" placeholder="Grade / Division / GPA" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
}
