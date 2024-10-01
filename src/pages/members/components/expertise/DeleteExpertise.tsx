import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, message, Modal } from "antd";
import { handleDeleteExpertise } from "../../../../api/members";
import { useEffect } from "react";

export default function DeleteExpertise({
  isVisible,
  setVisible,
  member,
  selected,
}: any) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteExpertise,
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
      expertiseId: selected?._id,
      data: values,
    });
  };

  useEffect(() => {}, [selected]);

  return (
    <Modal
      open={isVisible}
      title="Delete Expertise"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="deleteMemberExpertise"
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
        id="deleteMemberExpertise"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <div className="">
          <div className="">
            Are you sure you want to{" "}
            <span className="text-red-600 font-bold">Delete</span> Expertise
          </div>
          <div className="">
            <div className="">{selected?.name || "-"}</div>
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
