const REACT_APP_API_URL = process.env.REACT_APP_API_URL

const uploadFile = async ({ file, uri }: any) => {
  try {
    const response = await fetch(`${REACT_APP_API_URL}/${uri}`, {
      method: "PATCH",
      body: file,
    });
    if (!response.ok) {
      const errorData = await response.json();
      return Promise.reject(errorData.message || "Something went wrong");
    }

    return await response.json();
  } catch (error) {
    return Promise.reject("Network error");
  }
};

export default uploadFile;
