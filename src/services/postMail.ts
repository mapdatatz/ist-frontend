const {REACT_APP_API_URL} = process.env
import Cookies from "js-cookie";

const postMail = async ({ data, uri }: any) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${REACT_APP_API_URL}/${uri}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
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

export { postMail };
