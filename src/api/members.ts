import deleteData from "../services/deleteData";
import fetchData from "../services/fetchData";
import patchData from "../services/patchData";
import postData from "../services/postData";
import uploadData from "../services/uploadData";

const handleCreateMember = async ({ data }: any) => {
  const uri = `v1/members`;
  const response = postData({ data, uri });
  return response;
};

const handleFetchMembers = async ({page, limit, params}: any) => {
  const uri = `v1/members?page=${page}&limit=${limit}&${params}`;
  const response = fetchData({ uri });
  return response;
};

const handleFetchCorporates = async ({page, limit, params}: any) => {
  const uri = `v1/members/type/corporates?page=${page}&limit=${limit}&${params}`;
  const response = fetchData({ uri });
  return response;
};


const handleUploadMembers = async ({ data }: any) => {
  const uri = `v1/members/upload`;
  const response = uploadData({ data, uri });
  return response;
};



const handleFetchAllMembersCount = async (id: any) => {
  const uri = `v1/members/count/all`;
  const response = fetchData({ uri });
  return response;
};

const handleFetchCorpMembersCount = async (id: any) => {
  const uri = `v1/members/count/corp`;
  const response = fetchData({ uri });
  return response;
};

const handleFetchIndiMembersCount = async (id: any) => {
  const uri = `v1/members/count/indi`;
  const response = fetchData({ uri });
  return response;
};


const handleExportMembers = async () => {
  const uri = `v1/members/data/export`;
  const response = fetchData({ uri });
  return response;
};

const handleFetchMember = async ({ _id }: any) => {
  const uri = `v1/members/${_id}`;
  const response = fetchData({ uri });
  return response;
};

const handleUpdateMember = async ({ _id, data }: any) => {
  const uri = `v1/members/${_id}`;
  const response = patchData({ data, uri });
  return response;
};

const handleDeleteMember = async ({ _id }: any) => {
  const uri = `v1/members/${_id}`;
  const response = deleteData({ uri });
  return response;
};


// ADDRESS
const handleCreateAddress = async ({ _id, data }: any) => {
  const uri = `v1/members/${_id}/addresses`;
  const response = postData({ data, uri });
  return response;
};

const handleUpdateAddress = async ({ _id, addressId, data }: any) => {
  const uri = `v1/members/${_id}/addresses/${addressId}`;
  const response = patchData({ data, uri });
  return response;
};

const handleDeleteAddress = async ({ _id, addressId, data }: any) => {
  const uri = `v1/members/${_id}/addresses/${addressId}`;
  const response = deleteData({ data, uri });
  return response;
};


// EDUCATION
const handleCreateEducation = async ({ _id, data }: any) => {
  const uri = `v1/members/${_id}/educations`;
  const response = postData({ data, uri });
  return response;
};

const handleUpdateEducation = async ({ _id, educationId, data }: any) => {
  const uri = `v1/members/${_id}/educations/${educationId}`;
  const response = patchData({ data, uri });
  return response;
};

const handleDeleteEducation = async ({ _id, educationId, data }: any) => {
  const uri = `v1/members/${_id}/educations/${educationId}`;
  const response = deleteData({ data, uri });
  return response;
};


// EMPLOYMENT
const handleCreateEmployment = async ({ _id, data }: any) => {
  const uri = `v1/members/${_id}/employments`;
  const response = postData({ data, uri });
  return response;
};

const handleUpdateEmployment = async ({ _id, employmentId, data }: any) => {
  const uri = `v1/members/${_id}/employments/${employmentId}`;
  const response = patchData({ data, uri });
  return response;
};

const handleDeleteEmployment = async ({ _id, employmentId, data }: any) => {
  const uri = `v1/members/${_id}/employments/${employmentId}`;
  const response = deleteData({ data, uri });
  return response;
};

// EXPERTISE
const handleCreateExpertise = async ({ _id, data }: any) => {
  const uri = `v1/members/${_id}/expertises`;
  const response = postData({ data, uri });
  return response;
};

const handleUpdateExpertise = async ({ _id, expertiseId, data }: any) => {
  const uri = `v1/members/${_id}/expertises/${expertiseId}`;
  const response = patchData({ data, uri });
  return response;
};

const handleDeleteExpertise = async ({ _id, expertiseId, data }: any) => {
  const uri = `v1/members/${_id}/expertises/${expertiseId}`;
  const response = deleteData({ data, uri });
  return response;
};


// LICENSES
const handleCreateLicense = async ({ _id, data }: any) => {
  const uri = `v1/members/${_id}/licenses`;
  const response = postData({ data, uri });
  return response;
};

const handleUpdateLicense = async ({ _id, licenseId, data }: any) => {
  const uri = `v1/members/${_id}/licenses/${licenseId}`;
  const response = patchData({ data, uri });
  return response;
};

const handleDeleteLicense = async ({ _id, licenseId, data }: any) => {
  const uri = `v1/members/${_id}/licenses/${licenseId}`;
  const response = deleteData({ data, uri });
  return response;
};


// QUALIFICATIONS
const handleCreateQualification = async ({ _id, data }: any) => {
  const uri = `v1/members/${_id}/qualifications`;
  const response = postData({ data, uri });
  return response;
};

const handleUpdateQualification = async ({ _id, qualificationId, data }: any) => {
  const uri = `v1/members/${_id}/qualifications/${qualificationId}`;
  const response = patchData({ data, uri });
  return response;
};

const handleDeleteQualification = async ({ _id, qualificationId, data }: any) => {
  const uri = `v1/members/${_id}/qualifications/${qualificationId}`;
  const response = deleteData({ data, uri });
  return response;
};


// REFEREES
const handleCreateReferee = async ({ _id, data }: any) => {
  const uri = `v1/members/${_id}/referees`;
  const response = postData({ data, uri });
  return response;
};

const handleUpdateReferee = async ({ _id, refereeId, data }: any) => {
  const uri = `v1/members/${_id}/referees/${refereeId}`;
  const response = patchData({ data, uri });
  return response;
};

const handleDeleteReferee = async ({ _id, refereeId, data }: any) => {
  const uri = `v1/members/${_id}/referees/${refereeId}`;
  const response = deleteData({ data, uri });
  return response;
};

export { 
  handleCreateMember,
  handleFetchMembers,
  handleFetchCorporates,
  handleFetchMember,
  handleUpdateMember,
  handleDeleteMember,
  handleUploadMembers,
  handleFetchAllMembersCount,
  handleFetchCorpMembersCount,
  handleFetchIndiMembersCount,
  handleExportMembers,

  handleCreateAddress,
  handleUpdateAddress,
  handleDeleteAddress,

  handleCreateEducation,
  handleUpdateEducation,
  handleDeleteEducation,

  handleCreateEmployment,
  handleUpdateEmployment,
  handleDeleteEmployment,

  handleCreateExpertise,
  handleUpdateExpertise,
  handleDeleteExpertise,

  handleCreateLicense,
  handleUpdateLicense,
  handleDeleteLicense,

  handleCreateQualification,
  handleUpdateQualification,
  handleDeleteQualification,

  handleCreateReferee,
  handleUpdateReferee,
  handleDeleteReferee
};
