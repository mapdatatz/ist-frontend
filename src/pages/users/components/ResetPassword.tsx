import { Button, Modal, Form, Row, Col, message } from "antd";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PasswordInput } from "antd-password-input-strength";
import zxcvbn from "zxcvbn";
import { handleResetPassword } from "../../../api/users";


export default function ResetPassword({
  isVisible,
  setVisible,
  selected,
}: any) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: handleResetPassword,
    onSuccess: () => {
      message.success("Updated Successfully");
      form.resetFields();
      setVisible(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      message.error("Something went wrong");
    },
  });

  const onSubmit = async () => {
    const { password } = await form.getFieldsValue();
    const score = password.length === 0 ? -1 : zxcvbn(password).score;
    if (score < 3) {
      message.error("Use stronger password");
    } else {
      const data = { password };
      await mutate({ _id: selected?._id, data });
    }
  };

  const clearForm = async () => {
    form.resetFields();
  };

  useEffect(() => {
    form.resetFields();
  }, [selected]);

  return (
    <Modal
      open={isVisible}
      title="Reset Password"
      onCancel={() => setVisible(false)}
      footer={[
        <Button danger key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="resetUserPassword"
          htmlType="submit"
          type="primary"
          onSubmit={onSubmit}
          loading={isPending}
          danger
        >
          Reset
        </Button>,
      ]}
    >
      <Form
        id="resetUserPassword"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <div className="flex flex-row, justify-between"></div>

        <div>
          Reset Password for{" "}
          <span className="font-bold text-red-600">{selected?.name}</span>
        </div>

        <Row gutter={[16, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Form.Item
              name="password"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: `Please enter Password`,
                },
              ]}
            >
              <PasswordInput placeholder="New Password" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
