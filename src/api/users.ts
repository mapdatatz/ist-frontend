import deleteData from "../services/deleteData";
import fetchData from "../services/fetchData";
import patchData from "../services/patchData";
import postData from "../services/postData";
import uploadData from "../services/uploadData";

const handleFetchUsers = async ({ page, limit }: any) => {
  const uri = `v1/users?page=${page}&limit=${limit}`;
  const response = fetchData({ uri });
  return response;
};

const handleExportUsers = async () => {
  const uri = `v1/users/export`;
  const response = fetchData({ uri });
  return response;
};

const handleFetchUsersCount = async (id: any) => {
  const uri = `v1/users/count/all`;
  const response = fetchData({ uri });
  return response;
};

const handleCreateUser = async (data: any) => {
  const uri = `v1/users`;
  const response = postData({ data, uri });
  return response;
};

const handleUpdateProfile = async ({ _id, data }: any) => {
  const uri = `v1/users/${_id}/update/profile`;
  const response = patchData({ data, uri });
  return response;
};

const handleUpdateUser = async ({ _id, data }: any) => {
  const uri = `v1/users/${_id}`;
  const response = patchData({ data, uri });
  return response;
};

const handleUploadUsers = async ({ data }: any) => {
  const uri = `v1/users/upload`;
  const response = uploadData({ data, uri });
  return response;
};

const handleResetPassword = async ({ _id, data }: any) => {
  const uri = `v1/users/${_id}/reset/password`;
  const response = patchData({ data, uri });
  return response;
};

const handleDeleteUser = async (data: any) => {
  const uri = `v1/users`;
  const response = deleteData({ data, uri });
  return response;
};

export {
  handleFetchUsers,
  handleExportUsers,
  handleCreateUser,
  handleUpdateProfile,
  handleUpdateUser,
  handleDeleteUser,
  handleUploadUsers,
  handleResetPassword,
  handleFetchUsersCount,
};
