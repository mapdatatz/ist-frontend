import fetchData from "../services/fetchData";
import patchData from "../services/patchData";
const handleFetchInstitute = async () => {
  const uri = `v1/institute`;
  const response = fetchData({ uri });
  return response;
};


const handleUpdateInstitute = async ({ _id, data }: any) => {
  const uri = `v1/institute/${_id}`;
  const response = patchData({ data, uri });
  return response;
};



export {
  handleFetchInstitute,
  handleUpdateInstitute,
};
