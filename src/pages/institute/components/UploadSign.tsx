import { Button, Modal, Form, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import getBase64 from "../../../utils/getBase64";
import { AuthContext } from "../../../contexts/AuthContext";
import postData from "../../../services/postData";

export default function UploadSign({
  isVisible,
  setVisible,
  selected,
  refetch,
}: any) {
  const { auth } = useContext(AuthContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile]: any = useState(null);
  const [swalProps, setSwalProps] = useState({});
  const [form] = Form.useForm();

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const onSubmit = async () => {
    setLoading(true);

    let base64,
      type,
      size = null;

    if (selectedFile) {
      base64 = await getBase64(selectedFile);
      type = selectedFile?.type?.slice(selectedFile?.type - 3);
      size = selectedFile?.size;
    }

    const data = {
      signature: base64,
      filetype: type,
      filesize: size,
    };
    const uri = `api/users/${selected?._id}/signature`;
    const response = await postData({ data, uri, token: auth?._id });
    if (response.success) {
      setSwalProps({
        show: true,
        title: "Uploaded",
        text: "Signature Uploaded Successfully",
        icon: "success",
      });
      await refetch();
      setVisible(false);
      await refetch();
      setLoading(false);
    } else {
      setSwalProps({
        show: true,
        title: "Sorry",
        text: "Something went wrong",
        icon: "error",
      });
      await refetch();
      setVisible(false);
      setLoading(false);
      setSwalProps({});
      setLoading(false);
      return;
    }

    refetch();
    setVisible(false);
    setLoading(false);
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
  }, [selected]);

  return (
    <Modal
      open={isVisible}
      title="Upload Signature"
      onCancel={() => setVisible(false)}
      footer={[
        <Button danger key="back" onClick={clearForm}>
          Clear
        </Button>,
        <Button
          key="submit"
          form="uploadUserSign"
          htmlType="submit"
          type="primary"
          onSubmit={onSubmit}
          loading={isLoading}
          danger
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        id="uploadUserSign"
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
                <div className="text-gray-600 mt-2">Signature Selected</div>
                <div className="text-gray-500">{selectedFile?.name}</div>
              </div>
            ) : (
              <Form.Item
                name="file"
                label="Upload Signature"
                rules={[
                  {
                    required: false,
                    message: "Please select file",
                  },
                ]}
              >
                <Input
                  type="file"
                  placeholder="Signature"
                  onChange={changeHandler}
                />
              </Form.Item>
            )}
          </div>
        </div>
      </Form>
    </Modal>
  );
}
