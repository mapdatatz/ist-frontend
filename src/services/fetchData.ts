const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const fetchData = async ({ uri }: any) => {
  try {
    const token = sessionStorage.getItem('token');

    const headers: HeadersInit = token ? {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    } : {
      'Content-Type': 'application/json'
    };

    const response = await fetch(`${REACT_APP_API_URL}/${uri}`, {
      method: "GET",
      headers 
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

export default fetchData;
