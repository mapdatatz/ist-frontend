import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Input,
  message,
  DatePicker,
  Select,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleCreateMember } from "../../../api/members";
import { handleFetchMemberships } from "../../../api/memberships";
import { useState } from "react";
import { TbCheck } from "react-icons/tb";

const Option = Select.Option;

export default function CreateMember({ isVisible, setVisible }: any) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const [type, setType] = useState({ id: 1, name: "Individual" });
  const types = [
    { id: 1, name: "Individual" },
    { id: 2, name: "Corporate" },
  ];

  const { data: memberships } = useQuery({
    queryKey: ["memberships"],
    queryFn: () => handleFetchMemberships(),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleCreateMember,
    onSuccess: () => {
      message.success("Created Successfully");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      message.error(`${error}`);
    },
  });

  const onSubmit = async () => {
    const values = await form.getFieldsValue();

    const data = {
      isCorporate: type?.name === "Corporate" ? true : false,
      ...values,
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
      title="New Member"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="createMember"
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
        id="createMember"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <div className="flex">
          {types?.map((item: any, index: number) => (
            <button
              type="button"
              onClick={() => setType(item)}
              className={`flex items-center border mr-2 px-2 py-1 w-1/2 ${
                item?.id === type?.id ? "bg-green-100" : ""
              }`}
              key={index}
            >
              <div
                className={` border w-6 h-6 flex justify-center items-center mr-2`}
              >
                {item?.id === type?.id ? <TbCheck color="#323232" /> : ""}
              </div>
              {item?.name}
            </button>
          ))}
        </div>
        <div className="">
          <Row gutter={[16, 0]}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
                label="Email Address"
                rules={[
                  {
                    required: true,
                    message: "Please enter email",
                  },
                ]}
              >
                <Input type="text" placeholder="Email Address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="mobile"
                label="Mobile Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter mobile number",
                  },
                ]}
              >
                <Input type="text" placeholder="Mobile Number" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="membership"
                label="Membership Category"
                rules={[
                  {
                    required: true,
                    message: "Please enter membership category",
                  },
                ]}
              >
                <Select placeholder="Membership Category">
                  {memberships?.map((item: any, index: number) => (
                    <Option key={index} value={item?._id}>
                      {item?.category}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {type?.name === "Corporate" && (
            <Row gutter={[16, 0]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  name="webiste"
                  label="Website"
                  rules={[
                    {
                      required: false,
                      message: "Please enter website",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Website" />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  name="tinNo"
                  label="TIN"
                  rules={[
                    {
                      required: false,
                      message: "Please enter tin",
                    },
                  ]}
                >
                  <Input type="text" placeholder="TIN" />
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row gutter={[16, 0]}>
      
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item
                name="nextUpgrade"
                label="Next Upgrade"
                rules={[
                  {
                    required: false,
                    message: "Please enter next upgrade",
                  },
                ]}
              >
                <DatePicker
                  type="text"
                  format={"DD/MM/YYYY"}
                  style={{ width: "100%" }}
                  placeholder="Next Upgrade"
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
}