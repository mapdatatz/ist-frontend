import REACT_APP_API_URL from "../utils/baseUrl"

const putData = async ({ data, uri }: any) => {
  try {
    const response = await fetch(`${REACT_APP_API_URL}/${uri}`, {
      method: "PUT",
      headers: {
        Accept: "application",
        "Content-Type": "application/json",
      },
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

export default putData;
