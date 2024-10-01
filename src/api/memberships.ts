import deleteData from "../services/deleteData";
import fetchData from "../services/fetchData";
import patchData from "../services/patchData";
import postData from "../services/postData";
import uploadData from "../services/uploadData";

const handleCreateMembership = async ({ data }: any) => {
  const uri = `v1/memberships`;
  const response = postData({ data, uri });
  return response;
};

const handleFetchMemberships = async () => {
  const uri = `v1/memberships`;
  const response = fetchData({ uri });
  return response;
};


const handleUploadMemberships = async ({ data }: any) => {
  const uri = `v1/memberships/upload`;
  const response = uploadData({ data, uri });
  return response;
};


const handleExportMemberships = async () => {
  const uri = `v1/memberships/data/export`;
  const response = fetchData({ uri });
  return response;
};

const handleFetchMembership = async ({ _id }: any) => {
  const uri = `v1/memberships/${_id}`;
  const response = fetchData({ uri });
  return response;
};

const handleUpdateMembership = async ({ _id, data }: any) => {
  const uri = `v1/memberships/${_id}`;
  const response = patchData({ data, uri });
  return response;
};

const handleDeleteMembership = async ({ _id }: any) => {
  const uri = `v1/memberships/${_id}`;
  const response = deleteData({ uri });
  return response;
};

export { 
  handleCreateMembership,
  handleFetchMemberships,
  handleFetchMembership,
  handleUpdateMembership,
  handleDeleteMembership,
  handleUploadMemberships,
  handleExportMemberships
};
