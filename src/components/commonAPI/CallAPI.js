const BASE_URL = "http://localhost:9090/api/auth";

export const apicall = async (endpoint, method = "GET", data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: data ? JSON.stringify(data) : null,
  });

  const result = await res.json();

  if (!res.ok) {
    console.error("API Error:", result);
    throw result;
  }

  return result;
};
