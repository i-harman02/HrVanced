import api from "./axios";

export const applyLeaveApi = (formData) => {
  return api.post("/leave/apply-leave", formData);
};

export const getMyLeavesApi = (params = {}) => {
  return api.get("/leave/all-leaves/me", { params });
};

export const getLeaveHistoryApi = () => {
  return api.get("/leave/history/me");
};

export const getLeaveStatsApi = () => {
  return api.get("/leave/stats/me");
};

export const getLeaveBalanceApi = () => {
  return api.get("/leave/balance/me");
};
