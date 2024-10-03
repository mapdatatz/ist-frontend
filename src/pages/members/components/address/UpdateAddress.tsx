import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import { handleUpdateAddress } from "../../../../api/members";
import regions from "../../../../utils/allRegions";
import { useEffect } from "react";

const { Option } = Select;

export default function UpdateAddress({
  isVisible,
  setVisible,
  member,
  selected,
}: any) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: handleUpdateAddress,
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
    mutate({ _id: member?._id, addressId: selected?._id, data: values });
  };

  useEffect(() => {
    form.setFieldsValue({ country: selected?.country });
    form.setFieldsValue({ region: selected?.region });
    form.setFieldsValue({ district: selected?.district });
    form.setFieldsValue({ ward: selected?.ward });
    form.setFieldsValue({ street: selected?.street });
    form.setFieldsValue({ block: selected?.block });
    form.setFieldsValue({ plot: selected?.plot });
  }, [selected, form]);

  return (
    <Modal
      open={isVisible}
      title="Update Address"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="updateMemberAddress"
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
        id="updateMemberAddress"
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
                name="country"
                label="Country"
                rules={[
                  {
                    required: true,
                    message: "Please select country",
                  },
                ]}
              >
                <Select placeholder="Select Country">
                  <Option value="Tanzania">Tanzania</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="region"
                label="Region / City"
                rules={[
                  {
                    required: true,
                    message: "Please select region",
                  },
                ]}
              >
                <Select placeholder="Select Country">
                  {regions?.map((region: any) => (
                    <Option value={region?.name}>{region?.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="district"
                label="District"
                rules={[
                  {
                    required: false,
                    message: "Please enter district",
                  },
                ]}
              >
                <Input type="text" placeholder="District" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="ward"
                label="Ward"
                rules={[
                  {
                    required: false,
                    message: "Please enter ward",
                  },
                ]}
              >
                <Input type="text" placeholder="Ward" />
              </Form.Item>
            </Col>
 
          </Row>

          <Row gutter={[16, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="street"
                label="Street"
                rules={[
                  {
                    required: false,
                    message: "Please enter street",
                  },
                ]}
              >
                <Input type="text" placeholder="Street" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="block"
                label="Block"
                rules={[
                  {
                    required: false,
                    message: "Please enter block",
                  },
                ]}
              >
                <Input type="text" placeholder="Block" />
              </Form.Item>
            </Col>
            </Row>
            <Row gutter={[16, 0]}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="plot"
                label="Plot"
                rules={[
                  {
                    required: false,
                    message: "Please enter plot",
                  },
                ]}
              >
                <Input type="text" placeholder="Plot" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
}
