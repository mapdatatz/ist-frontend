import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, message, Modal } from "antd";
import {  handleDeleteEducation } from "../../../../api/members";
import { useEffect } from "react";

export default function DeleteEducation({
  isVisible,
  setVisible,
  member,
  selected,
}: any) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteEducation,
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
      educationId: selected?._id,
      data: values,
    });
  };

  useEffect(() => {
  }, [selected]);

  return (
    <Modal
      open={isVisible}
      title="Delete Education"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="deleteMemberEducation"
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
        id="deleteMemberEducation"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <div className="">
          <div className="">
            Are you sure you want to{" "}
            <span className="text-red-600 font-bold">Delete</span> Education level
          </div>
          <div className="">
                  <div className="text-xl font-bold ">Duration: {selected?.startYear} - {selected?.endYear}</div>
                  <div className="">
                    <span className="font-bold">Level:</span>{" "}
                    {selected?.level || "-"}
                  </div>
                  <div className="">
                    <span className="font-bold">Institution:</span>{" "}
                    {selected?.institution || "-"}
                  </div>
                  <div className="">
                    <span className="font-bold">Result: </span>
                    {selected?.result || "-"}
                  </div>
                </div>
        </div>
      </Form>
    </Modal>
  );
}
