import deleteData from "../services/deleteData";
import fetchData from "../services/fetchData";
import patchData from "../services/patchData";
import postData from "../services/postData";
import uploadData from "../services/uploadData";

const handleCreateYear = async ({ data }: any) => {
  const uri = `v1/years`;
  const response = postData({ data, uri });
  return response;
};

const handleFetchYears = async () => {
  const uri = `v1/years`;
  const response = fetchData({ uri });
  return response;
};


const handleUploadYears = async ({ data }: any) => {
  const uri = `v1/years/upload`;
  const response = uploadData({ data, uri });
  return response;
};


const handleExportYears = async () => {
  const uri = `v1/years/data/export`;
  const response = fetchData({ uri });
  return response;
};

const handleFetchYear = async ({ _id }: any) => {
  const uri = `v1/years/${_id}`;
  const response = fetchData({ uri });
  return response;
};

const handleUpdateYear = async ({ _id, data }: any) => {
  const uri = `v1/years/${_id}`;
  const response = patchData({ data, uri });
  return response;
};

const handleDeleteYear = async ({ _id }: any) => {
  const uri = `v1/years/${_id}`;
  const response = deleteData({ uri });
  return response;
};

export {
  handleCreateYear,
  handleFetchYears,
  handleFetchYear,
  handleUpdateYear,
  handleDeleteYear,
  handleUploadYears,
  handleExportYears
};
