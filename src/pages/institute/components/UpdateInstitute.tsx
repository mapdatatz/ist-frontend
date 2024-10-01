import { Button, Modal, Form, Row, Col, Select, Input, message } from "antd";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUpdateInstitute } from "../../../api/institute";

export default function UpdateInstitute({
  isVisible,
  setVisible,
  selected,
}: any) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: handleUpdateInstitute,
    onSuccess: () => {
      message.success("Updated Successfully");
      form.resetFields();
      setVisible(false);
      queryClient.invalidateQueries({ queryKey: ["institute"] });
    },
    onError: () => {
      message.error("Something went wrong");
    },
  });

  const onSubmit = async () => {
    const values = await form.getFieldsValue();
    await mutate({ _id: selected?._id, data: { ...values } });
  };

  const clearForm = async () => {
    form.resetFields();
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ name: selected?.name });
    form.setFieldsValue({ email: selected?.email });
    form.setFieldsValue({ mobile: selected?.mobile });
    form.setFieldsValue({ country: selected?.country });
    form.setFieldsValue({ region: selected?.region });
    form.setFieldsValue({ municipal: selected?.municipal });
    form.setFieldsValue({ ward: selected?.ward });
    form.setFieldsValue({ street: selected?.street });
    form.setFieldsValue({ postal: selected?.postal });
    form.setFieldsValue({ block: selected?.block });
    form.setFieldsValue({ plot: selected?.plot });
    form.setFieldsValue({ website: selected?.website });
    form.setFieldsValue({ tollfree: selected?.tollfree });
  }, [selected]);

  return (
    <Modal
      open={isVisible}
      title="Update IST"
      onCancel={() => setVisible(false)}
      footer={[
        <Button danger key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="updateInstitute"
          htmlType="submit"
          type="primary"
          onSubmit={onSubmit}
          loading={isPending}
          danger
        >
          Update
        </Button>,
      ]}
    >
      <Form
        id="updateInstitute"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
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
              name="website"
              label="Website"
              rules={[
                {
                  required: true,
                  message: "Please enter website",
                },
              ]}
            >
              <Input type="text" placeholder="Website" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: false,
                  message: "Please enter email",
                },
              ]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="country"
              label="Country"
              rules={[
                {
                  required: true,
                  message: "Please enter country",
                },
              ]}
            >
              <Input type="text" placeholder="Country" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="region"
              label="Region"
              rules={[
                {
                  required: true,
                  message: "Please enter region",
                },
              ]}
            >
              <Input type="text" placeholder="Region" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="municipal"
              label="Municipal"
              rules={[
                {
                  required: true,
                  message: "Please enter municipal",
                },
              ]}
            >
              <Input type="text" placeholder="Municipal" />
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
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="postal"
              label="Postal Code"
              rules={[
                {
                  required: false,
                  message: "Please enter postal code",
                },
              ]}
            >
              <Input type="text" placeholder="Postal Code" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="tollfree"
              label="Toll Free Number"
              rules={[
                {
                  required: false,
                  message: "Please enter toll free number",
                },
              ]}
            >
              <Input type="text" placeholder="Toll Free Number" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
