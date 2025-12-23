export const generateToken = () => {
  return "token_" + Math.random().toString(36).substring(2) + Date.now();
};
