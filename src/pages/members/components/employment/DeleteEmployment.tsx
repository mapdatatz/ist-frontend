import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, message, Modal } from "antd";
import { handleDeleteEmployment } from "../../../../api/members";
import { useEffect } from "react";
import Moment from "react-moment";

export default function DeleteEmployment({
  isVisible,
  setVisible,
  member,
  selected,
}: any) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteEmployment,
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
      employmentId: selected?._id,
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
  }, [selected]);

  return (
    <Modal
      open={isVisible}
      title="Delete Employment Record"
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="deleteMemberEmployment"
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
        id="deleteMemberEmployment"
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        layout="vertical"
      >
        <div className="">
          <div className="">
            Are you sure you want to{" "}
            <span className="text-red-600 font-bold">Delete</span> Employment
            Record
          </div>
          <div className="">
            <div className="">
              <span className="font-bold">Company:</span>{" "}
              {selected?.company || "-"}
            </div>
            <div className="text-xs font-bold ">
              Duration:{" "}
              <Moment format="Do MMM, YYYY">{selected?.startDate}</Moment> -{" "}
              <Moment format="Do MMM, YYYY">{selected?.endDate}</Moment>
            </div>

            <div className="">
              <span className="font-bold">Position:</span>{" "}
              {selected?.position || "-"}
            </div>
            <div className="text-xs">
              <div className="font-bold">Description</div>
              {selected?.description || "-"}
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
