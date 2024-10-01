import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import { handleCreateAddress } from "../../../../api/members";
import regions from "../../../../utils/allRegions";

const { Option } = Select;

export default function CreateAddress({ isVisible, setVisible, member }: any) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: handleCreateAddress,
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
      title="New Address"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="createMemberAddress"
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
        id="createMemberAddress"
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
          </Row>

          <Row gutter={[16, 0]}>
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
