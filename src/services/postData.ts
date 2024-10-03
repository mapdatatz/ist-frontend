const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const postData = async ({ data, uri }: any) => {
  try {
    const token = sessionStorage.getItem("token");
    const headers: HeadersInit = token
      ? {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      : {
          "Content-Type": "application/json",
        };
    const response = await fetch(`${REACT_APP_API_URL}/${uri}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
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

export default postData;
