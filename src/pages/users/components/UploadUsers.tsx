import { Button, Modal, Form, message, Input } from "antd";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUploadUsers } from "../../../api/users";
import { BsCheck2Circle } from "react-icons/bs";

export default function UploadUsers({ isVisible, setVisible, selected }: any) {
  const queryClient = useQueryClient();
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile]: any = useState(null);
  const [form] = Form.useForm();
  const [isUploaded, setUploaded] = useState(false);
  const [response, setResponse] = useState<any>({});

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleUploadUsers,
    onSuccess: (data) => {
      message.success("Updated Successfully");
      form.resetFields();
      setResponse(data);
      setUploaded(true);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      message.error(`${error}`);
    },
  });

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    await mutate({ data: formData });
  };

  const clearForm = async () => {
    form.resetFields();
    setSelectedFile(null);
    setIsSelected(false);
  };

  useEffect(() => {
    form.resetFields();
    setSelectedFile(null);
    setIsSelected(false);
  }, []);

  return (
    <Modal
      open={isVisible}
      title="Upload Users"
      onCancel={() => setVisible(false)}
      footer={
        isUploaded
          ? null
          : [
              <Button key="back" onClick={clearForm}>
                Clear
              </Button>,
              <Button
                key="submit"
                form="uploadUsers"
                htmlType="submit"
                type="primary"
                onSubmit={onSubmit}
                loading={isPending}
              >
                Upload
              </Button>,
            ]
      }
    >
      {isUploaded ? (
        <div className="">
          <div className="">Uploaded Successfully</div>
          <div className="text-green-600 border flex">
            <div className="w-40 border-r p-2">Passed Records:</div>
            <div className="p-2 font-bold text-end">
              {response?.data?.passCount}
            </div>
          </div>
          <div className="text-red-600 border flex">
            <div className="w-40 border-r p-2">Failed Records:</div>
            <div className="p-2 font-bold text-end ">
              {response?.data?.failCount}
            </div>
          </div>
          <button
            onClick={() => {
              setUploaded(false);
              setVisible(false);
              clearForm()
            }}
            className=" bg-ist my-4 text-white text-center py-2 w-full"
          >
            Okay
          </button>
        </div>
      ) : (
        <Form
          id="uploadUsers"
          form={form}
          name="normal_login"
          className="login-form"
          onFinish={onSubmit}
          layout="vertical"
        >
          <div className="flex flex-col justify-center items-center bg-gray-100 h-32 rounded-md border">
            <div className="flex flex-col justify-center items-center">
              {isSelected ? (
                <div className="flex flex-col justify-center items-center">
                  <BsCheck2Circle color={"#16a34a"} size={30} />
                  <div className="text-gray-600 mt-2">File Selected</div>
                  <div className="text-gray-500">{selectedFile?.name}</div>
                </div>
              ) : (
                <Form.Item
                  name="file"
                  label="Upload Users"
                  rules={[
                    {
                      required: false,
                      message: "Please select file",
                    },
                  ]}
                >
                  <Input
                    type="file"
                    accept=".xlsx, .xls"
                    placeholder="Users"
                    onChange={changeHandler}
                  />
                </Form.Item>
              )}
            </div>
          </div>
        </Form>
      )}
    </Modal>
  );
}
