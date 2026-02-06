export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role
    };
  } catch {
    return null;
  }
};
