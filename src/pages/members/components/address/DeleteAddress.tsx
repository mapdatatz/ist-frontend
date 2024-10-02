import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, message, Modal } from "antd";
import { handleDeleteAddress } from "../../../../api/members";
import { useEffect } from "react";

export default function DeleteAddress({
  isVisible,
  setVisible,
  member,
  selected,
}: any) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteAddress,
    onSuccess: () => {
      message.success("Deleted Successfully");
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
    mutate({
      _id: member?._id,
      addressId: selected?._id,
      data: values,
    });
  };

  useEffect(() => {
    form.setFieldsValue({ country: selected?.country });
    form.setFieldsValue({ region: selected?.region });
    form.setFieldsValue({ ward: selected?.ward });
    form.setFieldsValue({ street: selected?.street });
    form.setFieldsValue({ block: selected?.block });
    form.setFieldsValue({ plot: selected?.plot });
  }, [selected, form]);

  return (
    <Modal
      open={isVisible}
      title="Delete Address"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="deleteMemberAddress"
          htmlType="submit"
          type="primary"
          onSubmit={onSubmit}
          loading={isPending}
        >
          Delete
        </Button>,
      ]}
    >
      <Form
        id="deleteMemberAddress"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <div className="">
          <div className="">
            Are you sure you want to{" "}
            <span className="text-red-600 font-bold">Delete</span> Address
          </div>
          <div className="">
            <div className="">
              <span className="font-bold">Country:</span>{" "}
              {selected?.country || "-"}
            </div>
            <div className="">
              <span className="font-bold">Region:</span>{" "}
              {selected?.region || "-"}
            </div>
            <div className="">
              <span className="font-bold">Ward: </span>
              {selected?.ward || "-"}
            </div>
            <div className="">
              <span className="font-bold">Street:</span>{" "}
              {selected?.street || "-"}
            </div>
            <div className="">
              <span className="font-bold">Block:</span> {selected?.block || "-"}
            </div>
            <div className="">
              <span className="font-bold">Plot: </span>
              {selected?.plot || "-"}
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
