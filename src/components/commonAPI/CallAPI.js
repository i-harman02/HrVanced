import api from "../../api/axios";

export const apicall = async (endpoint, method = "GET", data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${api}/auth${endpoint}`, {
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
