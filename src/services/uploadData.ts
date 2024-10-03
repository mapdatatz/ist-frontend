const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const uploadData = async ({ data, uri }: any) => {
  try {
    const token = sessionStorage.getItem("token");
    const headers: HeadersInit = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
    const response = await fetch(`${REACT_APP_API_URL}/${uri}`, {
      method: "POST",
      headers,
      body: data,
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

export default uploadData;
