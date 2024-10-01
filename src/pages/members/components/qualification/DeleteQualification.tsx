import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, message, Modal } from "antd";
import { handleDeleteQualification } from "../../../../api/members";
import { useEffect } from "react";

export default function DeleteQualification({
  isVisible,
  setVisible,
  member,
  selected,
}: any) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteQualification,
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
      qualificationId: selected?._id,
      data: values,
    });
  };

  useEffect(() => {}, [selected]);

  return (
    <Modal
      open={isVisible}
      title="Delete Qualification"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="deleteMemberQualification"
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
        id="deleteMemberQualification"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <div className="">
          <div className="">
            Are you sure you want to{" "}
            <span className="text-red-600 font-bold">Delete</span> Qualification
          </div>
          <div className="">
            <div className="">Title: {selected?.title || "-"}</div>
            <div className="">Year: {selected?.year || "-"}</div>
            <div className="text-xs">
              <span className="font-bold">Description </span>
              {selected?.description || "-"}
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
