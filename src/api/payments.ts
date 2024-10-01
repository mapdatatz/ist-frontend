import deleteData from "../services/deleteData";
import fetchData from "../services/fetchData";
import patchData from "../services/patchData";
import postData from "../services/postData";

const handleCreatePayment = async ({ data }: any) => {
  const uri = `v1/payments`;
  const response = postData({ data, uri });
  return response;
};

const handleFetchPayments = async ({ page, limit,params }: any) => {
  const uri = `v1/payments?page=${page}&limit=${limit}&${params}`;
  const response = fetchData({ uri });
  return response;
};

const handleExportPayments = async () => {
  const uri = `v1/payments/data/export`;
  const response = fetchData({ uri });
  return response;
};

const handleChartTotals = async ({ years }: any) => {
  const uri = `v1/payments/data/chart?years=[${years}]`;
  const response = fetchData({ uri });
  return response;
};

const handleCategoryTotals = async ({ year }: any) => {
  const uri = `v1/payments/data/category?year=${year}`;
  const response = fetchData({ uri });
  return response;
};

const handleYearTotals = async ({ year }: any) => {
  const uri = `v1/payments/data/year?year=${year}`;
  const response = fetchData({ uri });
  return response;
};

const handleFetchPayment = async ({ _id }: any) => {
  const uri = `v1/payments/${_id}`;
  const response = fetchData({ uri });
  return response;
};

const handleMemberPayment = async ({ _id, data }: any) => {
  const uri = `v1/payments/${_id}/pay`;
  const response = postData({ uri, data });
  return response;
};

const handleMemberPayments = async ({ memberId }: any) => {
  const uri = `v1/payments/members/${memberId}`;
  const response = fetchData({ uri });
  return response;
};

const handleUpdatePayment = async ({ _id, data }: any) => {
  const uri = `v1/payments/${_id}`;
  const response = patchData({ data, uri });
  return response;
};

const handleDeletePayment = async ({ _id }: any) => {
  const uri = `v1/payments/${_id}`;
  const response = deleteData({ uri });
  return response;
};

export {
  handleCreatePayment,
  handleFetchPayments,
  handleFetchPayment,
  handleChartTotals,
  handleCategoryTotals,
  handleYearTotals,
  handleMemberPayment,
  handleMemberPayments,
  handleUpdatePayment,
  handleDeletePayment,
  handleExportPayments,
};
